<?php

namespace Shared\Plugins\Media;

use Medians\Hooks\Infrastructure\HookRepository;
use Medians\CustomFields\Domain\CustomField;
use Medians\Hooks\Domain\Hook;


class AudioGrid 
{

	
    private $genreRepo;
    private $mediaRepo;
    private $hookRepo;
    public $name = "Audio grid";
    public $description = "";
    public $version = "1.0";
    public $shortcode = "";
	

	function __construct()
	{
		$this->genreRepo = new \Medians\Categories\Infrastructure\CategoryRepository;
		$this->mediaRepo = new \Medians\Media\Infrastructure\MediaItemRepository;
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
				[ 'key'=> "subtitle", 'title'=> translate('Subtitle') , 'help_text'=> translate('This text appear below the Hook title'), 'fillable'=> true,  'column_type'=>'text' ],
				[ 'key'=> "media_limit", 'title'=> translate('Max number') , 'help_text'=> translate('Max number of loaded media'), 'fillable'=> true, 'required'=> true, 'column_type'=>'number' ],
				[ 'key'=> "categories", 'title'=> translate('Categories'), 'help_text'=> translate('Select categories to display media from'),
					'sortable'=> true, 'fillable'=> true, 'column_type'=>'select','text_key'=>'name', 'column_key'=>'category_id', 'multiple' => true,
					'data' => $this->genreRepo->getGenres()  
				],	
			],	
            
			'responsive'=> [	
				[ 'key'=> "mobile_view_limit", 'title'=> translate('Mobile view items limit') , 'help_text'=> translate('Max number of media to view at the slider wrapper for Mobile view'), 'fillable'=> true, 'required'=> true, 'column_type'=>'number' ],
				[ 'key'=> "tablet_view_limit", 'title'=> translate('Tablet view items limit') , 'help_text'=> translate('Max number of media to view at the slider wrapper for Tablet view'), 'fillable'=> true, 'required'=> true, 'column_type'=>'number' ],
				[ 'key'=> "desktop_view_limit", 'title'=> translate('Desktop view items limit') , 'help_text'=> translate('Max number of media to view at the slider wrapper for desktop view'), 'fillable'=> true, 'required'=> true, 'column_type'=>'number' ],
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
			$params['limit'] = json_decode($hook->field['media_limit'] ?? '');

			$list = $this->mediaRepo->getWithFilter($params);

			return renderPlugin('Shared/Plugins/views/audio_grid.html.twig', [
		        'list' => $list,
				'hook' => $hook
		    ]);

		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
	}
	
}
