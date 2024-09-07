<?php

namespace Medians\Media\Application;
use Shared\dbaser\CustomController;
use getID3;

use Medians\Media\Infrastructure\MediaRepository;
use Medians\Media\Infrastructure\MediaItemRepository;
use Medians\Categories\Infrastructure\CategoryRepository;


class MediaItemController extends CustomController 
{

	protected $app;
	
	protected $repo;

	protected $mediaRepo;
	protected $categoryRepo;

	function __construct()
	{
        $this->app = new \config\APP;
		$this->repo = new MediaItemRepository;
		$this->mediaRepo = new MediaRepository;
		$this->categoryRepo = new CategoryRepository;
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

        $item = $this->repo->find($media_id);

        $filePath = $item->main_file->path;
        $ext = explode('.', $filePath);
        if (!file_exists($_SERVER['DOCUMENT_ROOT'].str_replace('.'.end($ext), '.png', $filePath)))
        {
            $generateWave = $this->generateWave( str_replace('/uploads/audio', '',  $filePath));
        }
        
		try {

            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/upload-step2.html.twig', [
                'app' => $this->app,
                'item' => $item,
                'genres' => $this->categoryRepo->getGenres(),
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }



	public function upload()
	{

		$this->app = new \config\APP;
        
		foreach ($this->app->request()->files as $key => $value) {
			$file = $this->mediaRepo->upload($value, 'audio');
    
            $params = [];
            $params['name'] = $value->getClientOriginalName();
            $params['description'] = $value->getClientOriginalName();
            $params['files'] = [ ['type'=> 'audio', 'storage'=> 'local', 'path'=> $this->mediaRepo->_dir.$file] ];
            
            $save = $this->repo->store($params);

            $this->generateWave($file);
			// $output2 = shell_exec('ffmpeg -i '.$filePath.' -c copy -map 0 -movflags +faststart '.$encodedFilePath.' ');

            // $getID3 = new getID3;
            // Analyze file
            // $fileInfo = $getID3->analyze($filePath);
		}

        return array('success'=>1, 'result'=>translate('Uploaded'), 'redirect'=>"media/edit/$save->media_id");

        // return $fileInfo;
		// return json_encode(['data'=> ['message'=>'Uploaded successfully']]);
	}

    public function generateWave($file)
    {
        $this->mediaRepo->_dir = '/uploads/audio';

        $ffmpeg = $_SERVER['DOCUMENT_ROOT'].'/app/Shared/ffmpeg';
        // $ffmpeg = 'ffmpeg';
        $filePath = $_SERVER['DOCUMENT_ROOT']. $this->mediaRepo->_dir. $file;
        $outputPath = $_SERVER['DOCUMENT_ROOT']. $this->mediaRepo->_dir. str_replace(['mp3','wav','ogg'], 'png', $file);
        
        $shell = shell_exec($ffmpeg.' -i '.$filePath.' -filter_complex "showwavespic=s=1024x200:colors=yellow|blue|green" -frames:v 1  '.$outputPath.' ');
        return $shell;
    }


    

	public function update()
	{
		$this->app = new \config\APP;

        $params = $this->app->params();
		
        try {
            
            foreach ($this->app->request()->files as $key => $value) {
                if ($value) {
                    $picture = $this->mediaRepo->upload($value);
                    $params['picture'] = $this->mediaRepo->_dir.$picture;
                }
            }
            
            if ($this->repo->update($params))
            {
                return array('success'=>1, 'result'=>translate('Updated'), 'reload'=>0);
            }

        } catch (\Exception $e) {
        	throw new \Exception("Error Processing Request " .$e->getMessage(), 1);
        }
	}


	public function delete() 
	{
		$this->app = new \config\APP;

		$params = $this->app->params();
		
        try {

            if ($this->repo->delete($params['category_id']))
            {
                return array('success'=>1, 'result'=>translate('Deleted'), 'reload'=>1);
            }

        } catch (Exception $e) {
        	throw new \Exception("Error Processing Request", 1);
        }
	}

}
