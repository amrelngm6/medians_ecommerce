<?php

namespace Medians\Media\Application;
use Shared\dbaser\CustomController;
use getID3;

use Medians\Media\Infrastructure\MediaRepository;
use Medians\Media\Infrastructure\MediaItemRepository;


class MediaItemController extends CustomController 
{

	protected $app;
	
	protected $repo;

	protected $mediaItemRepo;

	function __construct()
	{
        $this->app = new \config\APP;
		$this->repo = new MediaRepository;
		$this->mediaItemRepo = new MediaItemRepository;
	}


    
    /**
     * Upload page for frontend
     */
    public function upload_page()
    {
		$settings = $this->app->SystemSetting();

		try {

            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/upload-step1.html.twig', [
                'app' => $this->app,
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }

    
    /**
     * Upload page for frontend
     */
    public function upload_info($media_id)
    {
		$settings = $this->app->SystemSetting();

        
		try {

            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/upload-step2.html.twig', [
                'app' => $this->app,
                'item' => $this->mediaItemRepo->find($media_id)
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }



	public function upload()
	{

		$this->app = new \config\APP;
        
		foreach ($this->app->request()->files as $key => $value) {
            // print_r();
			$file = $this->repo->upload($value, 'audio');
    
            $params = [];
            $params['name'] = $value->getClientOriginalName();
            $params['description'] = $value->getClientOriginalName();
            $params['files'] = [ ['type'=> 'audio', 'storage'=> 'local', 'path'=> $this->repo->_dir.$file] ];
            
            $save = $this->mediaItemRepo->store($params);

            $filePath = $_SERVER['DOCUMENT_ROOT']. $this->repo->_dir. $file;
            $encodedFilePath = $_SERVER['DOCUMENT_ROOT']. $this->repo->_dir. 'encoded_'.$file;
            $outputPath = $_SERVER['DOCUMENT_ROOT']. $this->repo->_dir. str_replace(['mp3','wav','ogg'], 'png', $file);

            $getID3 = new getID3;
            // Analyze file
            $fileInfo = $getID3->analyze($filePath);

			$output = shell_exec('ffmpeg -i '.$filePath.'  -filter_complex "showwavespic=s=1024x200" -frames:v 1  '.$outputPath.' ');
			$output2 = shell_exec('ffmpeg -i '.$filePath.' -c copy -map 0 -movflags +faststart '.$encodedFilePath.' ');

		}

        return array('success'=>1, 'result'=>translate('Uploaded'), 'redirect'=>"media/edit/$save->media_id");

        return $fileInfo;
		// return json_encode(['data'=> ['message'=>'Uploaded successfully']]);
	}


}
