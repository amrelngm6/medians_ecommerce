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
                'layout' => 'videos/page'
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
                'layout' => isset($this->app->customer->customer_id) ? 'videos/studio' : 'signin'
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
    public function edit_video($media_id)
    {
		$this->app->customer_auth();

		$settings = $this->app->SystemSetting();

        $item = $this->repo->find($media_id);

        if (empty($item->main_file->path))
            return Page404();


        $videoPath = $_SERVER['DOCUMENT_ROOT'].$item->main_file->path;
        $outputDir = $_SERVER['DOCUMENT_ROOT']. $this->mediaRepo->videos_dir. 'screenshots/';
        $list = $this->generateScreenshots($videoPath, $outputDir, $settings);

		try {

            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'item' => $item,
                'genre_type' => 'genres',
                'model_type' => 'MediaItem',
                'list' => $list,
                'genres' => $this->categoryRepo->getGenres(),
                'layout' => isset($this->app->customer->customer_id) ? 'videos/edit' : 'signin'
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }
    
    public function load_screenshots()
    {
		$this->app->customer_auth();

		$settings = $this->app->SystemSetting();

		$params = $this->app->params();

        $item = $this->repo->find($params['media_id']);

        if (empty($item->main_file->path))
            return Page404();

		try {

            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/includes/layout.html.twig', [
                'app' => $this->app,
                'list' => $list,
                'layout' => isset($this->app->customer->customer_id) ? 'videos/edit' : 'signin'
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }


    /**
     * Download & Validate from URL
     */
    public function downloadRemoteFile($tempFileFullPath, $link)
    {
        
        $videoUrl = 'https://rr1---sn-ax8xaj5ggpxg-q5jz.googlevideo.com/videoplayback?expire=1727984645&ei=pZ_-ZvPCF9Wy9fwP0dfsoAg&ip=202.181.16.165&id=o-ABCjPEfgxvgYZ2aEy8KjxpRBF0jjf7pkMG94qCpBM_jj&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=rR&mm=31%2C29&mn=sn-ax8xaj5ggpxg-q5jz%2Csn-h5576nsy&ms=au%2Crdu&mv=m&mvi=1&pl=24&initcwndbps=610000&bui=AXLXGFSYnKcKX0WqcDlQJpOJkrDKRNI61eqa-DnK-aQZmSrNAYAE-CeUTnV0WHtKZ3vPWd24rq8p6CCo&spc=54MbxYT5ADLLq4kBCo659dI6Q4nDSx6Ob4FXfH_6F_8RWp4GRBa5&vprv=1&svpuc=1&mime=video%2Fmp4&ns=U9sqtG4Mcv00JGHqNZVESB8Q&rqh=1&cnr=14&ratebypass=yes&dur=1690.505&lmt=1726025334408138&mt=1727962615&fvip=4&fexp=51300760&c=WEB_CREATOR&sefc=1&txp=5438434&n=lm_cB7o9pGSFig&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIgceXynTtuI732fy8FB998u53szNemLQtjtqn4RrfjS3sCIQCLwBSw60bFArREDKR9rFLP7MaOXmV50Brp2FEJRKWYrw%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=ACJ0pHgwRQIhALCjY0maxiOD6e5FOBVAL-64lCeS3inxnMviGj39u039AiBmoEazo5Qn2MwF0r3N5zsrtlPLLqmY79z9opr8ZXp0ZQ%3D%3D&title=%D9%85%D8%B3%D9%84%D8%B3%D9%84%20%D8%A7%D9%84%D9%83%D8%A8%D9%8A%D8%B1%20%D8%A3%D9%88%D9%8A%20%D8%A7%D9%84%D8%AC%D8%B2%D8%A1%20%D8%A7%D9%84%D8%AB%D8%A7%D9%86%D9%8A%20%7C%20%D8%A7%D9%84%D8%AD%D9%84%D9%82%D8%A9%20%D8%A7%D9%84%D8%AE%D8%A7%D9%85%D8%B3%D8%A9%20%D8%B9%D8%B4%D8%B1%20-%20(15)%20Episode%20%7C%20%D8%A3%D8%AD%D9%85%D8%AF%20%D9%85%D9%83%D9%8A';

        // Initialize a cURL session to fetch the video stream
        $ch = curl_init($videoUrl);

        // Tell cURL to return the transfer as a string instead of outputting it directly
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Follow redirects

        // Set headers to match a browser request
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
            'Referer: https://www.facebook.com/',
        ]);

        // Execute the cURL session
        $response = curl_exec($ch);

        // file_put_contents('./b.mp4', $response);


        // return;

        
        // // Initialize a cURL session to fetch the video stream
        // $ch = curl_init($link);

        // // Tell cURL to return the transfer as a string instead of outputting it directly
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Follow redirects

        // // Set headers to match a browser request
        // curl_setopt($ch, CURLOPT_HTTPHEADER, [
        //     'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36',
        //     'Referer: https://www.facebook.com/',
        // ]);

        // // Execute the cURL session
        // $response = curl_exec($ch);

        $save = file_put_contents($tempFileFullPath, $response);
        if ($save)
        {
            $filesize = filesize($tempFileFullPath);
            // $filesize < 100 ? unlink($tempFileFullPath)   : null;
            $filesize < 100 ? throw new \Exception("File size is ".$filesize, 1) : null;
        }
        
        return;

        
        // $save = file_put_contents($tempFileFullPath, fopen($link, 'r'));

        // if ($save && file_exists($tempFileFullPath) ) 
        // {
        //     if (filesize($tempFileFullPath) > 1) {
        //         return true;
        //     }
        // }

        // $save = file_put_contents($tempFileFullPath, file_get_contents($link));

        // if ($save && file_exists($tempFileFullPath) ) 
        // {
        //     if (filesize($tempFileFullPath) > 1) {
        //         return true;
        //     }
        // }
        

        $filesize = filesize($tempFileFullPath);
        // $filesize < 100 ? unlink($tempFileFullPath)   : null;
        $filesize < 100 ? throw new \Exception("File size is ".$filesize, 1) : null;
        
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
                $tempFilePath = '/uploads/videos/tmp/'.md5($params['link']).'.mp4';
                $tempFileFullPath = $_SERVER['DOCUMENT_ROOT'].$tempFilePath;
                
                if ($this->downloadRemoteFile($tempFileFullPath, $params['link']) ) 
                {
                    $save = $this->store($params, $tempFilePath, $settings);
                }

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
            
            return array('success'=>1, 'result'=>translate('Uploaded'));
            return array('success'=>1, 'result'=>translate('Uploaded'), 'redirect'=>"/video/edit/$save->media_id");

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
            
            if (isset($fileInfo['playtime_seconds']))
            {
                $params['field'] = [ 'duration'=> round($fileInfo['playtime_seconds'], 0) ];
            }

            if (isset($fileInfo['tags']['id3v2']))
            {
                $params['name'] = $fileInfo['tags']['id3v2']['title'][0] ?? ($params['name'] ?? 'Unknown Title');
                $params['description'] = $fileInfo['tags']['id3v2']['comment'][0] ?? ($params['name'] ?? 'No Description');
            }

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


    function generateScreenshots($videoPath, $outputDir, $settings, $screenshotCount = 10 ) {

        $path_arr = explode('/', $videoPath);
        $fileName = str_replace(['.mp4', '.ogg', '.wmv'], '.jpg', end($path_arr));
        $duration = $this->getVideoDuration($videoPath, $settings);
        $ffmpeg = $settings['ffmpeg_path'] ?? 'ffmpeg';
        
        if ($duration <= 0) {
            $duration = $this->getVideoDuration($this->reencodeVideo($videoPath) ?? $videoPath, $settings);
        }
    
        if ($duration <= 0) {
            die("Unable to get video duration.");
        }
    
        // Create output directory if it doesn't exist
        if (!file_exists($outputDir)) {
            mkdir($outputDir, 0777, true);
        }
    
        // Calculate interval between each screenshot (every 10% of the duration)
        $interval = $duration / $screenshotCount;
    
        for ($i = 1; $i <= $screenshotCount; $i++) {
            $time = $i * $interval;
    
            // Format time into hh:mm:ss for ffmpeg
            $formattedTime = gmdate("H:i:s", intval($time));
    
            $outputFile = $outputDir . "screenshot_" . $i . "_" . $fileName;
            
            // Command to capture screenshot at the specific time
            $command = "$ffmpeg -ss $formattedTime -i " . escapeshellarg($videoPath) . " -vframes 1 -q:v 2 " . escapeshellarg($outputFile) . " 2>&1";
    
            // Execute the command
            file_exists($outputFile) ? null : shell_exec($command);
            if (file_exists($outputFile))
            {
                $items[$i] = str_replace($_SERVER['DOCUMENT_ROOT'], '', $outputFile);
            }
        }

        return $items;
    }

    function getVideoDuration($videoPath, $settings) {
        
        $ffmpeg = $settings['ffmpeg_path'] ?? 'ffmpeg';

        $command = "$ffmpeg -i " . escapeshellarg($videoPath) . " 2>&1";
        $output = shell_exec($command);
    
        preg_match('/Duration: (\d+):(\d+):(\d+\.\d+)/', $output, $matches);
        
        if (!empty($matches)) {
            $hours = $matches[1];
            $minutes = $matches[2];
            $seconds = $matches[3];
            
            return ($hours * 3600) + ($minutes * 60) + $seconds;
        }
    
        return 0; 
    }
    

    function reencodeVideo($inputVideoPath) {

        $settings = $this->app->SystemSetting();
        $ffmpeg = $settings['ffmpeg_path'] ?? 'ffmpeg';

        // FFmpeg command to re-encode the video
        $outputVideoPath = str_replace('/tmp', '', $inputVideoPath);
        if (file_exists($outputVideoPath))
            return $outputVideoPath;

        $command = "$ffmpeg -i " . escapeshellarg($inputVideoPath) . " -c:v libx264 -preset fast -crf 22 -c:a aac -b:a 128k " . escapeshellarg($outputVideoPath) . " 2>&1";

        // Execute the command
        $run = shell_exec($command);
        
        // Check if the re-encoded file was created successfully
        return file_exists($outputVideoPath) && filesize($outputVideoPath) > 0 ? $outputVideoPath : null;
    }

}
