<?php

namespace Medians\Media\Application;
use Shared\dbaser\CustomController;
use getID3;

use Medians\Media\Infrastructure\MediaRepository;
use Medians\Media\Infrastructure\MediaItemRepository;
use Medians\Categories\Infrastructure\CategoryRepository;
use Medians\Customers\Infrastructure\CustomerRepository;


class VideoController extends CustomController 
{

	protected $app;
	
	protected $repo;

	protected $mediaRepo;
	protected $categoryRepo;
	protected $customerRepo;

	function __construct()
	{
        $this->app = new \config\APP;
		$this->repo = new MediaItemRepository;
		$this->mediaRepo = new MediaRepository;
		$this->categoryRepo = new CategoryRepository;
		$this->customerRepo = new CustomerRepository;
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
                'type' => 'video',
                'layout' => isset($this->app->customer->customer_id) ? 'videos/upload' : 'signin'
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }


    
    
    /**
     * Audio page for frontend
     */
    public function video_page($media_id)
    {
		$settings = $this->app->SystemSetting();

        $item = $this->repo->find($media_id);
        
		try 
        {
            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'item' => $item,
                'genres' => $this->categoryRepo->getGenres(),
                'layout' => 'video_page'
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
        
        $params['limit'] = $settings['view_items_limit'] ?? null;
        $params['author_id'] = $customer->customer_id ?? 0;
        $params['type'] = 'video';
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
     * Discover page for frontend
     */
    public function discover()
    {
		$settings = $this->app->SystemSetting();

        $params = $this->app->params();

        $params['limit'] = $settings['view_items_limit'] ?? null;
        $params['type'] = 'video';
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
                'layout' => 'videos/discover'
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
        $params['type'] = 'video';
        $list = $this->repo->getWithFilter($params);
        
		try 
        {
            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'list' => $list,
                'genres' => $this->categoryRepo->getGenres(),
                'layout' => 'search/search',
                'sub_layout' => 'video',
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
        $params['type'] = 'video';
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
        $params['type'] = 'video';
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
                'layout' => 'videos/genres'
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

        if (empty($item->main_file->path))
            return Page404();


        $filePath = $item->main_file->path;
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
                'layout' => isset($this->app->customer->customer_id) ? 'videos/edit' : 'signin'
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

                        $file = $this->mediaRepo->upload($value, 'video', true);
                        
                        $params['name'] = $value->getClientOriginalName();
                        $params['description'] = $value->getClientOriginalName();
                        
                        $save = $this->store($params, $this->mediaRepo->_dir.$file, $settings);
                    }
                }
            }
            
            return array('success'=>1, 'result'=>translate('Uploaded'), 'redirect'=>"/video/edit/$save->media_id");

        } catch (\Throwable $th) {
        	throw new \Exception("Error Processing Request ".$th->getMessage(), 1);
        }

	}



    public function store($params, $filePath, $settings)
    {
        try {
            
            $params['files'] = [ ['type'=> 'video', 'title' => $params['name'] ?? '', 'storage'=> $settings['default_storage'] ?? 'local', 'path'=> $filePath] ];
            $params['author_id'] = $this->app->customer_id() ?? 0;
            
            $save = $this->repo->store($params);

            if ($settings['default_storage'] == 'google')
            {
                $service = new GoogleStorageService();
                $upload = $service->uploadFileToGCS($filePath);
            }

            return $save;

        } catch (\Throwable $th) {
            throw new \Exception("Error Processing Request ".$th->getMessage(), 1);
            
        }

	}



	public function update()
	{
		$this->app = new \config\APP;

        $params = $this->app->params();
        $item = $this->repo->find($params['media_id']);
		
        try {

            $item = $this->repo->find($params['media_id']);
        
            if ($this->repo->update($params))
            {
                return array('success'=>1, 'result'=>translate('Updated'), 'reload'=>1);
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

            if ($this->repo->delete($params['media_id']))
            {
                return array('success'=>1, 'result'=>translate('Deleted'), 'reload'=>1);
            }

        } catch (Exception $e) {
        	throw new \Exception("Error Processing Request", 1);
        }
	}


}
