<?php

namespace Medians\Media\Application;
use Shared\dbaser\CustomController;
use getID3;

use Medians\Media\Infrastructure\MediaRepository;
use Medians\Media\Infrastructure\MediaItemRepository;
use Medians\Categories\Infrastructure\CategoryRepository;
use Medians\Customers\Infrastructure\CustomerRepository;
use Medians\Playlists\Infrastructure\PlaylistRepository;


class MediaItemController extends CustomController 
{

	protected $app;
	
	protected $repo;

	protected $mediaRepo;
	protected $categoryRepo;
	protected $customerRepo;
	protected $playlistRepo;

	function __construct()
	{
        $this->app = new \config\APP;
		$this->repo = new MediaItemRepository;
		$this->mediaRepo = new MediaRepository;
		$this->categoryRepo = new CategoryRepository;
		$this->customerRepo = new CustomerRepository;
		$this->playlistRepo = new PlaylistRepository;
	}


    
    
    /**
     * Upload Audio page for frontend
     */
    public function upload_page()
    {
		$settings = $this->app->SystemSetting();

        $this->app->customer_auth();

		try {

            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'type' => 'audio',
                'layout' => isset($this->app->customer->customer_id) ? 'upload-audio' : 'signin'
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }


    
    
    /**
     * Audio page for frontend
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
     * Studio page for frontend
     */
    public function studio()
    {
		$settings = $this->app->SystemSetting();

        $customer = $this->app->customer_auth();
        
		try 
        {
            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'customer' => $customer,
                'layout' => isset($this->app->customer->customer_id) ? 'studio' : 'signin'
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }
    
    /**
     * Studio media page for frontend
     */
    public function studio_media()
    {
		$settings = $this->app->SystemSetting();

        $customer = $this->app->customer_auth();
        $params = $this->app->params();
        
        // $this->checkSession($customer);

        $params['limit'] = $settings['view_items_limit'] ?? null;
        $params['author_id'] = $customer->customer_id ?? 0;
        $params['type'] = 'audio';
        $list = $this->repo->getWithFilter($params);

		try 
        {
            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'customer' => $customer,
                'list' => $list,
                'layout' => isset($this->app->customer->customer_id) ? 'studio_media' : 'signin'
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }
    
    
    /**
     * Studio media page for frontend
     */
    public function studio_playlists()
    {
		$settings = $this->app->SystemSetting();

        $customer = $this->app->customer_auth();
        
        $this->checkSession($customer);

		try 
        {
            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
				'items' => $this->playlistRepo->getByCustomer($customer->customer_id),
                'layout' => isset($this->app->customer->customer_id) ? 'studio_playlists' : 'signin'
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

        $params['limit'] = $settings['view_items_limit'] ?? null;
        $params['type'] = 'audio';
        $list = $this->repo->getWithFilter($params);

        
        $artistRepo = new \Medians\Customers\Infrastructure\CustomerRepository;
        $query['limit'] = $settings['view_items_limit'] ?? null;
        $channels = $artistRepo->getWithFilter($query);
        
		try 
        {
            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'list' => $list,
                'channels' => $channels,
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
    public function search()
    {
		$settings = $this->app->SystemSetting();

        $params = $this->app->params();

        $params['limit'] = $settings['view_items_limit'] ?? null;
        $params['type'] = 'audio';
        $list = $this->repo->getWithFilter($params);
        
		try 
        {
            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'list' => $list,
                'genres' => $this->categoryRepo->getGenres(),
                'layout' => 'search/search',
                'sub_layout' => 'audio',
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }
    
    
    /**
     * Discover page for frontend
     */
    public function search_popup()
    {
		$settings = $this->app->SystemSetting();

        $params = $this->app->params();

        $params['limit'] = $settings['view_items_limit'] ?? null;
        $list = $this->repo->getWithFilter($params);
        
		try 
        {
            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/pages/popup-list.html.twig', [
                'app' => $this->app,
                'list' => $list,
                'genres' => $this->categoryRepo->getGenres(),
                'layout' => 'popup-list',
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }
    
    
    /**
     * Likes page for frontend
     */
    public function likes()
    {
		$settings = $this->app->SystemSetting();
        
		$this->app->customer_auth();

        $params = $this->app->params();

        $params['limit'] = $settings['view_items_limit'] ?? null;
        $params['likes'] = true;
        $params['customer_id'] = $this->app->customer->customer_id ?? 0;
        $list = $this->repo->getWithFilter($params);
        
		try 
        {
            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'list' => $list,
                'genres' => $this->categoryRepo->getGenres(),
                'layout' => isset($this->app->customer->customer_id) ? 'likes' : 'signin'
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
            
            if (empty($item->category_id))
    			throw new \Exception(translate('Page not found'), 1);

            $params['limit'] = $settings['view_items_limit'] ?? null;
            $params['genre'] = $item->category_id;
            $list = $this->repo->getWithFilter($params);
            
            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'item' => $item,
                'list' => $list,
                'genres' => $this->categoryRepo->getGenres(),
                'layout' => 'genre'
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }
    








    /**
     * Edit info page for frontend
     */
    public function edit_media($media_id)
    {
		$this->app->customer_auth();

		$settings = $this->app->SystemSetting();

        $item = $this->repo->find($media_id);

        $filePath = $this->mediaRepo->audio_dir.$item->main_file->path;
        $ext = explode('.', $filePath);
        if (!file_exists($_SERVER['DOCUMENT_ROOT'].str_replace('.'.end($ext), '.png', $filePath))) 
        {
            $generateWave = $this->generateWave( $filePath );
        }

		try {

            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'item' => $item,
                'genre_type' => 'genres',
                'model_type' => 'MediaItem',
                'genres' => $this->categoryRepo->getGenres(),
                'layout' => isset($this->app->customer->customer_id) ? 'media-edit' : 'signin'
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }




    /**
     * Submit Upload Media page
     */
	public function upload()
	{

		$this->app = new \config\APP;
        
        $params = $this->app->params();
		$settings = $this->app->SystemSetting();
        
        try {
                
            if (!empty($params['link']))
            {
                
                $params['name'] = '';
                $params['description'] = '';
                $tempFilePath = '/uploads/audio/tmp/'.md5($params['link']).'.mp3';
                file_put_contents($_SERVER['DOCUMENT_ROOT'].$tempFilePath, fopen($params['link'], 'r'));
                $save = $this->store($params, $tempFilePath, $settings);

            } else {
                    
                foreach ($this->app->request()->files as $key => $value) {
                    if ($value) {

                        $file = $this->mediaRepo->upload($value, 'audio', true);
                        
                        $params['name'] = $value->getClientOriginalName();
                        $params['description'] = $value->getClientOriginalName();
                        
                        $save = $this->store($params, $this->mediaRepo->_dir.$file, $settings);
        
                        // $this->generateWave( $this->mediaRepo->_dir.$file);

                    }
                }
            }
            
            return array('success'=>1, 'result'=>translate('Uploaded'), 'redirect'=>"media/edit/$save->media_id");

        } catch (\Throwable $th) {
        	throw new \Exception("Error Processing Request ".$th->getMessage(), 1);
        }

	}



    public function store($params, $filePath, $settings)
    {
        try {
            

            $getID3 = new getID3;
            // Analyze file
            $fileInfo = $getID3->analyze($_SERVER['DOCUMENT_ROOT']. $filePath);

            $params['files'] = [ ['type'=> 'audio', 'storage'=> $settings['default_storage'] ?? 'local', 'path'=> $filePath] ];
            // $params['author_id'] = $this->app->customer_id() ?? 0;
            
            if (isset($fileInfo['playtime_seconds']))
            {
                $params['field'] = [ 'duration'=> round($fileInfo['playtime_seconds'], 0) ];
            }

            if (!empty($fileInfo['id3v2']['APIC'])) {
                $imageData = $fileInfo['id3v2']['APIC'][0]['data']; // Album art data
                // Save the image to a file
                $params['picture'] = $this->mediaRepo->images_dir.str_replace(['.mp3','.wav'], '.png', (str_replace(['/uploads/audio','/tmp'], '', $filePath)));
                $outputImagePath = $_SERVER['DOCUMENT_ROOT'].$params['picture'];
                file_put_contents($outputImagePath, $imageData);
            }

            $save = $this->repo->store($params);

            // $generateWave = $this->generateWave($filePath);

            if ($settings['default_storage'] == 'google')
            {
                $service = new GoogleStorageService();
                $upload = $service->uploadFileToGCS($filePath);
                // ($generateWave && $upload) ? unlink($_SERVER['DOCUMENT_ROOT'].$filePath) : '';
            }

            return $save;

        } catch (\Throwable $th) {
            throw new \Exception("Error Processing Request ".$th->getMessage(), 1);
            
        }

	}



    public function generateWave($file)
    {

		$settings = $this->app->SystemSetting();

        $ffmpeg = $settings['ffmpeg_path'];
        // $ffmpeg = 'ffmpeg';
        $filePath = $_SERVER['DOCUMENT_ROOT']. $file;
        $outputPath = $_SERVER['DOCUMENT_ROOT']. str_replace(['mp3','wav','ogg'], 'png', $file);

        $shell = file_exists($outputPath) ? $outputPath : shell_exec($ffmpeg.' -i '.$filePath.' -filter_complex "showwavespic=s=1024x200:colors=yellow|blue|green" -frames:v 1  '.$outputPath.' ');
        return $shell;
    }


    

	public function update()
	{
		$this->app = new \config\APP;

        $params = $this->app->params();
        $item = $this->repo->find($params['media_id']);
		
        try {

            $files = $this->app->request()->files;

            foreach ($files as $key => $value) {
                if ($value) {
                    $picture = $this->mediaRepo->upload($value);
                    $params['picture'] = $this->mediaRepo->_dir.$picture;
                }
            }   
            
            
            $item = $this->repo->find($params['media_id']);
            
            $getID3 = new getID3;

            // Analyze file
            $fileInfo = $getID3->analyze($_SERVER['DOCUMENT_ROOT']. $item->main_file->path);

            if (isset($fileInfo['playtime_seconds'])) {
                $params['field'] = [ 'duration'=> round($fileInfo['playtime_seconds'], 0) ];
            }
        
            // $params['author_id'] = $this->app->customer_auth()->customer_id ?? 0;

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


    /**
     * Check if customer session is valid
     */
    public function checkSession($customer)
    {
        if (empty($customer->customer_id))
            $this->app->redirect('/customer/login');
    }

    

}
