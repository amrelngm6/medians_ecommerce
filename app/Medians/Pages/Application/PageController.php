<?php

namespace Medians\Pages\Application;
use Medians\Pages\Infrastructure\PageRepository;
use Medians\Menus\Infrastructure\MenuRepository;
use Medians\Content\Infrastructure\ContentRepository;
use Medians\Pages\Domain\Page;
use Medians\Products\Domain\Product;
use Medians\Categories\Domain\Category;
use Shared\dbaser\CustomController;

class PageController extends CustomController 
{

    public $app;

    public $repo;

    public $contentRepo;

    public $menuRepo;

    function __construct()
    {
        $this->app = new \Config\APP;
        $this->repo = new PageRepository;
        $this->contentRepo = new ContentRepository;
        $this->menuRepo = new MenuRepository;
    }
    

	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function columns( ) 
	{

		return [
            [ 'value'=> "page_id", 'text'=> "#"],
            [ 'value'=> "title", 'text'=> translate('Title'), 'sortable'=> true ],
            [ 'value'=> "lang_content.prefix", 'text'=> translate('link'), 'sortable'=> true ],
            [ 'value'=> "homepage", 'text'=> translate('Is Homepage'), 'sortable'=> true ],
            [ 'value'=> "status", 'text'=> translate('Status'), 'sortable'=> true ],
			['value'=>'details', 'text'=>translate('Details')],
			['value'=>'edit', 'text'=>translate('Edit')],
			['value'=>'delete', 'text'=>translate('Delete')],
        ];
	}

	

	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function fillable () 
	{

		return [
            [ 'key'=> "page_id", 'title'=> "#", 'column_type'=>'hidden'],
            [ 'key'=> "title", 'title'=> translate('Title'), 'required'=>true, 'fillable'=> true, 'column_type'=>'text' ],
            [ 'key'=> "prefix", 'title'=> translate('prefix'), 'fillable'=> true, 'column_type'=>'text' ],
            [ 'key'=> "homepage", 'title'=> translate('Is Homepage'), 'fillable'=> true, 'column_type'=>'checkbox' ],
            [ 'key'=> "status", 'title'=> translate('Status'), 'fillable'=> true, 'column_type'=>'checkbox' ],
        ];
	}

	

	/**
	 * Admin index items
	 * 
	 * @param Silex\Application $app
	 * @param \Twig\Environment $twig
	 * 
	 */ 
	public function index( ) 
	{
		
		try {
			
		    return render('pages', [
		        'load_vue' => true,
		        'title' => translate('Pages'),
		        'columns' => $this->columns(),
		        'fillable' => $this->fillable(),
		        'items' => $this->repo->get(),
		    ]);
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
			
		}
	}



    
	public function store() 
	{

		$params = $this->app->params();

        try {	

			if (!trim($params['title']))
			{
				throw new \Exception(json_encode(['error'=>'Empty title']));
			}

        	$params['created_by'] = $this->app->auth()->id;
        	$params['content'] = $this->handleLangs($params);

            $returnData = (!empty($this->repo->store($params))) 
            ? array('success'=>1, 'result'=>translate('Added'), 'reload'=>1)
            : array('success'=>0, 'result'=>'Error', 'error'=>1);

        } catch (Exception $e) {
        	$returnData = json_encode(array('result'=>$e->getMessage(), 'error'=>1));
        }

		return $returnData;
	}



	public function update()
	{
		$params = $this->app->params();

        try {

        	$params['status'] = isset($params['status']) ? $params['status'] : null;
        	$params['homepage'] = isset($params['homepage']) ? $params['homepage'] : null;

            if ($this->repo->update($params))
            {
                return array('success'=>1, 'result'=>translate('Updated'), 'reload'=>1);
            }
        

        } catch (\Exception $e) {
        	throw new \Exception("Error Processing Request", 1);
        	
        }
	}
    


	public function delete() 
	{
		$params = $this->app->params();

        try {

        	$check = $this->repo->find($params['page_id']);

            if ($this->repo->delete($params['page_id']))
            {
                return json_encode(array('success'=>1, 'result'=>translate('Deleted'), 'reload'=>1));
            }

        } catch (Exception $e) {
        	throw new \Exception("Error Processing Request", 1);
        }

	}

	public function validate($params) 
	{
		if (empty($params['content']['en']['title']))
		{
        	throw new \Exception(json_encode(array('result'=>translate('NAME_EMPTY'), 'error'=>1)), 1);
		}
	}
	

	public function handleLangs($params) 
	{
		$langsRepo = new \Medians\Languages\Infrastructure\LanguageRepository();
		$langs = $langsRepo->getActive();
		$fields = [];
		foreach ($langs as $row) 
		{
			$fields[$row->language_code] = ["title"=> $params['title']];
		}
		return $fields;	
	}



    
    
    /**
     * Homepage for frontend
     */
    public function homepage()
    {
		
        $page = $this->repo->homepage();

		$categoryRepo = new \Medians\Products\Infrastructure\CategoryRepository;

		$settings = $this->app->SystemSetting();

		try {
			
            return render('views/front/'.($settings['template'] ?? 'default').'/page.html.twig', [
                'title' => translate('Homepage'),
                'page' => $page,
                'app' => $this->app,
				'categories' => $categoryRepo->getGrouped(),
            ]);
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
			
		}
    }



    /**
     * Sub-pages for frontend
     */
    public function page($prefix)
    {
        $pageContent = $this->contentRepo->find(urldecode($prefix));
		$categoryRepo = new \Medians\Products\Infrastructure\CategoryRepository;
		$settings = $this->app->SystemSetting();

		try {
						
            return render('views/front/'.($settings['template'] ?? 'default').'/page.html.twig', [
                'page' => $this->handlePageObject($pageContent),
                'app' => $this->app,
				'categories' => $categoryRepo->getGrouped(),
            ]);
            
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
    }

	public function handlePageObject($pageContent)
	{
		if (isset($pageContent->item))
		{
			$_SESSION['lang'] = $pageContent->lang;

			switch (get_class($pageContent->item)) {
				case Product::class:
					return (new \Medians\Products\Infrastructure\ProductRepository)->find($pageContent->item_id);
					break;

				case Category::class:
					return (new \Medians\Products\Infrastructure\CategoryRepository)->find($pageContent->item_id);
					break;
				
				case Page::class:
					return $this->repo->find($pageContent->item_id, $pageContent->prefix);
					break;
			}
		}

		return throw new \Exception(translate('Page not found'), 1);
		
	}
    
}