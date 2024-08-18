<?php

namespace Shared\Plugins\Sliders;

class HeroSlider 
{

    public static $name = "";
    public static $description = "";
    public static $version = "1.0";



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
				[ 'key'=> "lang", 'title'=> translate('Languange'), 'help_text'=> translate('The default language for new sessions'),
					'sortable'=> true, 'fillable'=> true, 'column_type'=>'select','text_key'=>'name', 'column_key'=>'language_code',
					'data' => $this->languageRepo->getActive()  
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
