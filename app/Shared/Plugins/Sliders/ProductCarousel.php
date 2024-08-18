<?php

namespace Shared\Plugins\Sliders;

use Medians\Products\Infrastructure\CategoryRepository;


class ProductCarousel 
{

	
    private $categoryRepo;
    public static $name = "";
    public static $description = "";
    public static $version = "1.0";
	

	function __construct()
	{
		$this->categoryRepo = new CategoryRepository;
	}


	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function fillable( ) 
	{

		return [
            
			'basic'=> [	
	            [ 'key'=> "logo", 'title'=> translate('logo'), 'fillable'=>true, 'column_type'=>'file' ],
				[ 'key'=> "sitename", 'title'=> translate('sitename'), 'fillable'=> true, 'required'=> true, 'column_type'=>'text' ],
				[ 'key'=> "categories", 'title'=> translate('Categories'), 'help_text'=> translate('Select categories to display products from'),
					'sortable'=> true, 'fillable'=> true, 'column_type'=>'select','text_key'=>'name', 'column_key'=>'category_id', 'multiple' => true,
					'data' => $this->categoryRepo->getActive()  
				],	
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


}
