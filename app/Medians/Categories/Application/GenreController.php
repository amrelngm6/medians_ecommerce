<?php

namespace Medians\Categories\Application;

use Medians\Categories\Infrastructure\CategoryRepository;

use Shared\dbaser\CustomController;

class GenreController extends CustomController
{

	/**
	* @var Object
	*/
	protected $repo;

	protected $app;
	

	function __construct()
	{
		$this->repo = new CategoryRepository();
	}

	

	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function columns( ) 
	{
		return [
            [ 'value'=> "category_id", 'text'=> "#"],
            [ 'value'=> "name", 'text'=> translate('name'), 'sortable'=> true ],
            [ 'value'=> "picture", 'text'=> translate('picture'), 'sortable'=> true ],
            [ 'value'=> "parent.name", 'text'=> translate('Parent'), 'sortable'=> true ],
            [ 'value'=> "path", 'text'=> translate('Path'), 'sortable'=> true ],
            [ 'value'=> "status", 'text'=> translate('Status'), 'sortable'=> true ],
            [ 'value'=> "edit", 'text'=> translate('edit')  ],
            [ 'value'=> "delete", 'text'=> translate('delete')  ],
        ];
	}



	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function fillable( ) 
	{

		return [
            [ 'key'=> "category_id", 'title'=> "#", 'column_type'=>'hidden'],
			[ 'key'=> "name", 'title'=> translate('name'), 'required'=>true,  'fillable'=> true, 'column_type'=>'text' ],
			[ 'key'=> "description", 'title'=> translate('description'),  'fillable'=> true, 'column_type'=>'textarea' ],
			[ 'key'=> "parent_id", 'title'=> translate('parent genre'),  'withLabel'=>true,
				'sortable'=> true, 'fillable'=> true, 'column_type'=>'select','text_key'=>'name', 'column_key' => 'category_id',
				'data' => $this->repo->get(100)  
			],

        ];
	}

	/**
	 * Admin index items
	 * 
	 */ 
	public function index(  ) 
	{
	    return render('categories', [
	        'load_vue' => true,
	        'title' => translate('Genres'),
	        'items' => $this->repo->getAllGenres(100),
	        'columns' => $this->columns(),
	        'fillable' => $this->fillable(),
			'model' => 'Genre'
	    ]);
	}


	/**
	 * Admin index items
	 * 
	 */ 
	public function create(  ) 
	{
	    return render('category_wizard', [
	        'load_vue' => true,
	        'title' => translate('Product Categories'),
	        'items' => $this->repo->get(100),
	        'columns' => $this->columns(),
			'categories' => $this->repo->list(),
			'fillable' => $this->fillable(),
	    ]);
	}




	public function store() 
	{

		$this->app = new \config\APP;

		$params = $this->app->params();
        try {	

        	$this->validate($params);

			$params['model'] = \Medians\Categories\Domain\Genre::class;
            $returnData = (!empty($this->repo->store($params))) 
            ? array('success'=>1, 'result'=>translate('Added'), 'reload'=>1)
            : array('success'=>0, 'result'=>'Error', 'error'=>1);

        } catch (\Exception $e) {
        	return array('result'=>$e->getMessage(), 'error'=>1);
        }

		return $returnData;
	}



	public function update()
	{
		$this->app = new \config\APP;

		$params = $this->app->params();
		
        try {

            if ($this->repo->update($params))
            {
                return array('success'=>1, 'result'=>translate('Updated'), 'reload'=>0);
            }

        } catch (\Exception $e) {
        	throw new \Exception("Error Processing Request", 1);
        	
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

	public function validate($params) 
	{



	}

	
	/**
	 * Frontend genre page
	 * 
	 */ 
	public function page( $genreContent ) 
	{
		$this->app = new \config\APP;

		return $this->genre($genreContent->prefix);
	}


	/**
	 * Frontend genre page by prefix
	 * 
	 */ 
    public function genre($prefix)
    {
		$settings = $this->app->SystemSetting();
		$this->app->customer_auth();
        $params = $this->app->params();

		$mediaRepo = new \Medians\Media\Infrastructure\MediaItemRepository;
		
		try 
        {
            $item = $this->repo->getGenreByPrefix($prefix);
            
            if (empty($item->category_id))
    			throw new \Exception(translate('Page not found'), 1);

            $params['limit'] = $settings['view_items_limit'] ?? null;
            $params['genre'] = $item->category_id;
            $list = $mediaRepo->getWithFilter($params);
            
            return printResponse(render('views/front/'.($settings['template'] ?? 'default').'/layout.html.twig', [
                'app' => $this->app,
                'item' => $item,
                'list' => $list,
                'genres' => $this->repo->getGenres(),
                'layout' => 'genre'
            ], 'output'));
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }
    

}
