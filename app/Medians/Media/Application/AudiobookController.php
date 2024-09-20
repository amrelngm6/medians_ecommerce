<?php

namespace Medians\Media\Application;
use Shared\dbaser\CustomController;
use getID3;

use Medians\Media\Infrastructure\MediaRepository;
use Medians\Media\Infrastructure\MediaItemRepository;
use Medians\Categories\Infrastructure\CategoryRepository;
use Medians\Customers\Infrastructure\CustomerRepository;
use Medians\Playlists\Infrastructure\PlaylistRepository;


class AudiobookController extends CustomController 
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
     * Studio media page for frontend
     */
    public function studio_audiobooks()
    {
		$settings = $this->app->SystemSetting();

        $customer = $this->app->customer_auth();
        
        $params['limit'] = 20;
        $params['author_id'] = $customer->customer_id ?? 0;
        $params['type'] = 'audiobook';
        $list = $this->repo->getWithFilter($params);

		try 
        {
            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'customer' => $customer,
                'list' => $list,
                'layout' => isset($this->app->customer->customer_id) ? 'audiobook/studio' : 'signin'
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }
    
    
    
    /**
     * Upload Audio Book page for frontend
     */
    public function audiobook_upload_page()
    {
		$settings = $this->app->SystemSetting();

        $this->app->customer_auth();

		try {

            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'type' => 'audiobook',
                'layout' => isset($this->app->customer->customer_id) ? 'audiobook/upload' : 'signin'
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
        $params['type'] = 'audiobook';
        $list = $this->repo->getWithFilter($params);
        
		try 
        {
            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'list' => $list,
                'genres' => $this->categoryRepo->getBookGenres(),
                'layout' => 'audiobook/discover'
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }
    






    /**
     * Edit info page for frontend
     */
    public function edit_audiobook($media_id)
    {
		$this->app->customer_auth();

		$settings = $this->app->SystemSetting();

        $item = $this->repo->find($media_id);

		try {

            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'item' => $item,
                'genre_type' => 'book_genres',
                'model_type' => 'audiobook',
                'genres' => $this->categoryRepo->getBookGenres(),
                'layout' => isset($this->app->customer->customer_id) ? 'upload-step2' : 'signin'
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }

    /**
     * Edit Book Chapter page for frontend
     */
    public function edit_chapters($media_id)
    {
		$this->app->customer_auth();

		$settings = $this->app->SystemSetting();

        $item = $this->repo->find($media_id);

		try {

            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'item' => $item,
                'genre_type' => 'book_genres',
                'model_type' => 'Audiobook',
                'genres' => $this->categoryRepo->getBookGenres(),
                'layout' => isset($this->app->customer->customer_id) ? 'audiobook/chapters' : 'signin'
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
        
        $item = $this->repo->find($params['media_id']);

		foreach ($this->app->request()->files as $key => $value) {
		
            $file = $this->mediaRepo->upload($value, 'audio', true);
    
            $getID3 = new getID3;

            // Analyze file
            $fileInfo = $getID3->analyze($_SERVER['DOCUMENT_ROOT']. $this->mediaRepo->_dir.$file);

            $fileArray = [ 'type'=> 'audio', 'title' => $value->getClientOriginalName(), 'storage'=> 'local', 'path'=> $this->mediaRepo->_dir.$file];

            $update = $this->repo->storeFile($fileArray, $item);
		}

        return array('success'=>1, 'result'=>translate('Uploaded'), 'reload'=>1);
	}







    
	public function store() 
	{	

		$params = $this->app->params();

        try {	
			
			$customer = $this->app->customer_auth();

			$params['status'] = isset($params['status']) ? 'on' : null;

            foreach ($this->app->request()->files as $key => $value) {
                $file = $this->mediaRepo->upload($value);
        
                $getID3 = new getID3;
                // Analyze file
                $fileInfo = $getID3->analyze($_SERVER['DOCUMENT_ROOT']. $this->mediaRepo->_dir.$file);

                $params['files'] = [ ['type'=> 'audio', 'storage'=> 'local', 'path'=> $this->mediaRepo->_dir.$file] ];
                $params['author_id'] = $this->app->customer_id() ?? 0;
    			$params['status'] = isset($params['status']) ? 'on' : null;
            }

			try {

				$returnData = $this->repo->store($params);

				return $returnData
				? array('success'=>1, 'result'=>translate('Added'), 'redirect'=>'/audiobook/edit/'.$returnData->media_id)
				: array('success'=>0, 'result'=>'Error', 'error'=>1);
	
			} catch (\Throwable $th) {
				return array('error'=>$th->getMessage());
			}

        } catch (Exception $e) {
        	return array('error'=>$e->getMessage());
        }

		return $returnData;
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
            
            // $params['author_id'] = $this->app->customer_auth()->customer_id ?? 0;
                

            if ($this->repo->update($params))
            {
                return array('success'=>1, 'result'=>translate('Updated'), 'reload'=>0);
            }

        } catch (\Exception $e) {
        	throw new \Exception("Error Processing Request " .$e->getMessage(), 1);
        }
	}


	public function update_chapters()
	{
		$this->app = new \config\APP;

		$params = $this->app->params();
		
        try {
            
            $item = $this->repo->find($params['media_id']);

            if ($this->repo->storeChapters($params['chapters'], $item))
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
