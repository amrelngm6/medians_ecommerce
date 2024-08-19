<?php

namespace Shared\Plugins\Sliders;

use Medians\Gallery\Infrastructure\GalleryRepository;

class HeroSlider 
{

    protected $galleryRepo;

    public $name = "Hero Slider";
    public $description = "";
    public $version = "1.0";
    public $shortcode = "";


	function __construct()
	{
		$this->galleryRepo = new GalleryRepository;
	}

	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function fillable( ) 
	{

		return [
            
			'basic'=> [	
				// [ 'key'=> "products_limit", 'title'=> translate('Max number') , 'help_text'=> translate('Max number of loaded products'), 'fillable'=> true, 'required'=> true, 'column_type'=>'number' ],
				[ 'key'=> "gallery_id", 'title'=> translate('Gallery'), 'help_text'=> translate('Select gallery to display slides from'),
					'sortable'=> true, 'fillable'=> true, 'column_type'=>'select','text_key'=>'name', 'column_key'=>'gallery_id', 
					'data' => $this->galleryRepo->get()  
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


}
