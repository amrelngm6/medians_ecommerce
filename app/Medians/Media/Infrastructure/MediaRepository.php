<?php

namespace Medians\Media\Infrastructure;


use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Medians\Uploads\Domain\MediaUpload;

class MediaRepository 
{

	public $dir;

	public $_dir;

	public $images_dir = '/uploads/images/';

	public $files_dir = '/uploads/files/';

	public $customers_dir = '/uploads/customers/';

	public $videos_dir = '/uploads/videos/';


	public function getList($type = 'media', $user = null)
	{

		$this->setDir($type);

		return $this->fetchMedia($type, $user);
	}


	public function setDir($type)
	{

		switch ($type) 
		{
			case 'files':
				$this->_dir = $this->files_dir;
				break;
							
			default:
				$this->_dir = $this->images_dir;
				break;
		}

		if (is_dir($_SERVER['DOCUMENT_ROOT'].$this->_dir))
		{
			$this->dir = $_SERVER['DOCUMENT_ROOT'].$this->_dir;
		}

		return $this;
	}


	public function fetchFolder($type)
	{
		$data = [];
		foreach (glob($this->dir.'*.*') as $key => $value) 
		{
			$ext = explode('.', $value);
			if (in_array(end($ext),  $this->getTypes($type)))
			{
				$data[] = $this->setMedia($value, ($key+1)); 
			}
		}

		return $data;
	}


	public function fetchMedia($type, $user)
	{
		$data = [];
		$items = MediaUpload::get();
		foreach ($items as $key => $value) 
		{
			$ext = explode('.', $value->path);
			if (in_array(end($ext),  $this->getTypes($type)))
			{
				$data[] = $this->setMedia($value->path, ($key+1)); 
			}
		}

		return $data;
	}


	public static function setMedia($value, $id = 1)
	{
		$filepath = str_replace($_SERVER['DOCUMENT_ROOT'], '', $value);
		return [
			'id' => $id, 
			'file_name' => $filepath, 
			'download_url' => $filepath, 
			'image'=>[
				'width' => '', 
				'height' => ''
			],
			'data_url'=> $filepath
		];
	}


	public static function getTypes($type)
	{
		switch ($type) 
		{
			case 'files':
				return ['html', 'pdf', 'doc', 'docx', 'xls', 'xlsx']; 
				break;
			
			default:
				return ['png', 'jpg', 'jpeg', 'bmp', 'svg']; 
				break;
		}
	}


	public function upload(UploadedFile $file, $type = 'media')
    {

		$this->setDir($type);

		$this->validate($type, $file->guessExtension());

        $originalFilename = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeFilename = $this->slug($originalFilename);
        $fileName = $safeFilename.'-'.uniqid().'.'.$file->guessExtension();
		$store = MediaUpload::addItem($this->_dir.$fileName, $type);

        try {
            $file->move($this->dir, $fileName);
        } catch (FileException $e) {
        	return $e->getMessage();
        }


        return $fileName;
    }

	public function validate($type, $ext)
	{
		if (!in_array($ext, $this->getTypes($type)))
		{
			throw new \Exception("This file is not allowed", 1);
		}	
	}

    public function delete($file)
    {

    	$filepath = $_SERVER['DOCUMENT_ROOT'].$file;

    	if (is_file($filepath))
    	{
    		return unlink($filepath);
    	}
    }

    public function resize($file, $w=null, $h='-1')
    {

    	$filepath = $_SERVER['DOCUMENT_ROOT'].$file;
    	$output = str_replace('/images/', '/thumbnails/', str_replace(['.png','.jpg','.jpeg'],'.webp', $filepath));

    	if (is_file($filepath))
    	{
			shell_exec('ffmpeg -i '.$filepath.' -vf scale="'.$w.':'.$h.'" '.$output);
    	}
    }

    public static function slug($value)
    {
    	return str_replace(['&',' ','@', '!','#','(',')','+','?'], '_', $value);
    }


}
