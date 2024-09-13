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

            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'layout' => 'upload-step1'
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }

    
    /**
     * Discover page for frontend
     */
    public function audio_page($media_id)
    {
		$settings = $this->app->SystemSetting();

        $item = $this->repo->find($media_id);
        
		try 
        {
            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'item' => $item,
                'genres' => $this->categoryRepo->getGenres(),
                'layout' => 'audio_page'
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }
    

    
    /**
     * Discover page for frontend
     */
    public function discover()
    {
		$settings = $this->app->SystemSetting();

        $params = $this->app->params();

        $params['limit'] = 12;
        $list = $this->repo->getWithFilter($params);
        
		try 
        {
            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'list' => $list,
                'genres' => $this->categoryRepo->getGenres(),
                'layout' => 'discover'
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }
    
    
    /**
     * Discover page for frontend
     */
    public function likes()
    {
		$settings = $this->app->SystemSetting();
        
		$this->app->customer_auth();

        $params = $this->app->params();

        $params['limit'] = 12;
        $params['likes'] = true;
        $params['customer_id'] = $this->app->customer->customer_id;
        $list = $this->repo->getWithFilter($params);
        
		try 
        {
            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'list' => $list,
                'genres' => $this->categoryRepo->getGenres(),
                'layout' => 'likes'
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }
    
    
    /**
     * Genres page for frontend
     */
    public function genres()
    {
		$settings = $this->app->SystemSetting();
		$this->app->customer_auth();
        $params = $this->app->params();

		try 
        {
            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'genres' => $this->categoryRepo->getGenres(),
                'layout' => 'genres'
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }

    
    /**
     * Single Genre page for frontend
     */
    public function genre($prefix)
    {
		$settings = $this->app->SystemSetting();
		$this->app->customer_auth();
        $params = $this->app->params();

		try 
        {
            $item = $this->categoryRepo->getGenreByPrefix($prefix);
            
            $params['limit'] = 12;
            $params['genre'] = $item->category_id;
            $list = $this->repo->getWithFilter($params);
            
            $item->langs;

            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'item' => $item,
                'list' => $list,
                'layout' => 'genre'
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }
    
    /**
     * Edit info page for frontend
     */
    public function upload_info($media_id)
    {
		$settings = $this->app->SystemSetting();

        $item = $this->repo->find($media_id);

        $filePath = $this->mediaRepo->audio_dir.$item->main_file->path;
        $ext = explode('.', $filePath);
        if (!file_exists($_SERVER['DOCUMENT_ROOT'].str_replace('.'.end($ext), '.png', $filePath))) 
        {
            $generateWave = $this->generateWave( str_replace('/uploads/audio/', '',  $filePath));
        }

		try {

            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'item' => $item,
                'genres' => $this->categoryRepo->getGenres(),
                'layout' => 'upload-step2'
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }



	public function upload()
	{

		$this->app = new \config\APP;
        
		foreach ($this->app->request()->files as $key => $value) {
			$file = $this->mediaRepo->upload($value, 'audio', true);
    
            
            $getID3 = new getID3;
            // Analyze file
            $fileInfo = $getID3->analyze($_SERVER['DOCUMENT_ROOT']. $this->mediaRepo->_dir.$file);

            $params = [];
            $params['name'] = $value->getClientOriginalName();
            $params['description'] = $value->getClientOriginalName();
            $params['files'] = [ ['type'=> 'audio', 'storage'=> 'local', 'path'=> $this->mediaRepo->_dir.$file] ];
            $params['author_id'] = $this->app->customer_id() ?? 0;
            if (isset($fileInfo['playtime_seconds']))
            {
                $params['field'] = [ 'duration'=> round($fileInfo['playtime_seconds'], 0) ];
            }
            
            $save = $this->repo->store($params);

            $this->generateWave($file);
			// $output2 = shell_exec('ffmpeg -i '.$filePath.' -c copy -map 0 -movflags +faststart '.$encodedFilePath.' ');

		}

        return array('success'=>1, 'result'=>translate('Uploaded'), 'redirect'=>"media/edit/$save->media_id");

        // return $fileInfo;
		// return json_encode(['data'=> ['message'=>'Uploaded successfully']]);
	}

    public function generateWave($file)
    {
        $this->mediaRepo->_dir = '/uploads/audio/';

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
            
            $item = $this->repo->find($params['media_id']);
            
            $getID3 = new getID3;
            // Analyze file
            $fileInfo = $getID3->analyze($_SERVER['DOCUMENT_ROOT']. $item->main_file->path);

            if (isset($fileInfo['playtime_seconds']))
                $params['field'] = [ 'duration'=> round($fileInfo['playtime_seconds'], 0) ];
            
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
