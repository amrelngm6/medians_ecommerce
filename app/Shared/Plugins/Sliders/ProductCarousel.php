<?php

namespace Shared\Plugins\Sliders;

use Medians\Products\Infrastructure\CategoryRepository;
use Medians\CustomFields\Domain\CustomField;
use Medians\Hooks\Domain\Hook;


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
				[ 'key'=> "sitename", 'title'=> translate('Max number') , 'help_text'=> translate('Max number of loaded products'), 'fillable'=> true, 'required'=> true, 'column_type'=>'number' ],
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


    /**
     * Update Lead
     */
    public function update($data, $Object)
    {
		
		$clear = CustomField::where('model_id', $Object->id)->where('model_type', Hook::class)->delete();

		if ($data) {
			
			foreach ($data as $key => $value)
			{
				$value = (array) $value;
				if (isset($value['title'])) {
					$fields = [];
					$fields['model_id'] = $Object->product_id;	
					$fields['model_type'] = Product::class;	
					$fields['code'] = 'variants';
					$fields['title'] = $value['title'];
					$fields['value'] = $value['value'];

					$Model = CustomField::create($fields);
				}
			}
	
			return $Model ?? '';		
		}

        $Object->hookPlugin()->update($data);

    	return $Object;

    } 

}
