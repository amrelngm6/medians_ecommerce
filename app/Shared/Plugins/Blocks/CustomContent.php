<?php

namespace Shared\Plugins\Blocks;

use Medians\Hooks\Infrastructure\HookRepository;
use Medians\CustomFields\Domain\CustomField;
use Medians\Hooks\Domain\Hook;


class CustomContent 
{

	
    private $hookRepo;
    public $name = "Custom Content";
    public $description = "";
    public $version = "1.0";
    public $shortcode = "";
	

	function __construct()
	{
		$this->hookRepo = new HookRepository;
	}


	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function fillable( ) 
	{

		return [
            
			'basic'=> [	
				[ 'key'=> "content", 'title'=> translate('Content') , 'help_text'=> translate('This content will be replaced with the Shortcode'), 'fillable'=> true,  'column_type'=>'editor' ],
			],	
			
        ];
	}

	/**
	 * Index settings page
	 * 
	 */
	public function index()
	{
		return render('', [
		        'load_vue' => true,
		        'fillable' => $this->fillable(),
	    ]);
	} 


    /**
     * Update Lead
     */
    public function update($data, $Object)
    {
		
		$app = new \config\APP;

		$params = $app->request()->get('params');

		$Object->content = $params['options']['content'];
		$Object->save();

    	return $Object;

    } 

	/**
	 * Customers index page
	 * 
	 */ 
	public function view($params ) 
	{

		try {
			
			$hook = $this->hookRepo->find($params['id']);

			return $hook->content;

		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
	}
	
}
