<?php

namespace Shared\Plugins\Sliders;

use Medians\Products\Infrastructure\CategoryRepository;
use Medians\Products\Infrastructure\ProductRepository;
use Medians\Hooks\Infrastructure\HookRepository;
use Medians\CustomFields\Domain\CustomField;
use Medians\Hooks\Domain\Hook;


class CategoryCarousel 
{

	
    private $categoryRepo;
    private $productRepo;
    private $hookRepo;
    public $name = "Category carousel";
    public $description = "";
    public $version = "1.0";
    public $shortcode = "";
	

	function __construct()
	{
		$this->categoryRepo = new CategoryRepository;
		$this->hookRepo = new HookRepository;
		$this->productRepo = new ProductRepository;
	}


	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function fillable( ) 
	{

		return [
            
			'basic'=> [	
				[ 'key'=> "img_style", 'title'=> translate('Mobile view items limit') , 'help_text'=> translate('Max number of products to view at the slider wrapper for Mobile view'), 'fillable'=> true, 'required'=> true, 'column_type'=>'number' ],
				[ 'key'=> "categories", 'title'=> translate('Categories'), 'help_text'=> translate('Select categories to display'),
					'sortable'=> true, 'fillable'=> true, 'column_type'=>'select','text_key'=>'name', 'column_key'=>'category_id', 'multiple' => true,
					'data' => $this->categoryRepo->getActive()  
				],	
				[ 'key'=> "img_style", 'title'=> translate('Image style'), 'help_text'=> translate('Select style of the category image to display'),
					'sortable'=> true, 'fillable'=> true, 'column_type'=>'select','text_key'=>'name', 'column_key'=>'style', 
					'data' => [["name"=> "Squared", "style"=>""], ["name"=>"Circle", "style"=> "rounded-full"], ["name"=>"Rounded", "style"=>"rounded-lg"]]  
				],	
			],	
            
			'styles'=> [	
				[ 'key'=> "mobile_view_limit", 'title'=> translate('Mobile view items limit') , 'help_text'=> translate('Max number of products to view at the slider wrapper for Mobile view'), 'fillable'=> true, 'required'=> true, 'column_type'=>'number' ],
				[ 'key'=> "tablet_view_limit", 'title'=> translate('Tablet view items limit') , 'help_text'=> translate('Max number of products to view at the slider wrapper for Tablet view'), 'fillable'=> true, 'required'=> true, 'column_type'=>'number' ],
				[ 'key'=> "desktop_view_limit", 'title'=> translate('Desktop view items limit') , 'help_text'=> translate('Max number of products to view at the slider wrapper for desktop view'), 'fillable'=> true, 'required'=> true, 'column_type'=>'number' ],
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
		
		$clear = CustomField::where('model_id', $Object->id)->where('model_type', Hook::class)->delete();

		if ($data) {
			
			foreach ($data as $key => $value)
			{
				$fields = [];
				$fields['model_id'] = $Object->id;	
				$fields['model_type'] = Hook::class;	
				$fields['code'] = $key;
				$fields['title'] = '';
				$fields['value'] = (is_array($value) || is_object($value)) ? json_encode($value) : $value;

				$Model = CustomField::firstOrCreate($fields);
			}
	
			return $Model ?? '';		
		}

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

			$params['categories_ids'] = json_decode($hook->field['categories']);

			$items = $this->categoryRepo->getByIds($params['categories_ids']);

            return render('Shared/Plugins/views/category_carousel.html.twig', [
		        'items' => $items,
				'hook' => $hook
		    ],'output');

		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
	}
	
}
