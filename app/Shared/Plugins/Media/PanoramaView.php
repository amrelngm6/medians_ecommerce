<?php

namespace Shared\Plugins\Media;

use Medians\Hooks\Infrastructure\HookRepository;
use Medians\CustomFields\Domain\CustomField;
use Medians\Hooks\Domain\Hook;


class PanoramaView 
{

	
    private $hookRepo;
    public $name = "Products tabs";
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
				[ 'key'=> "media", 'title'=> translate('Media file') , 'help_text'=> translate('Panorama Image'), 'fillable'=> true, 'required'=> true, 'column_type'=>'file' ],
			],	
            
			'styles'=> [	
				[ 'key'=> "height", 'title'=> translate('Viewport height') , 'help_text'=> translate('Height of the panorama view'), 'fillable'=> true, 'required'=> true, 'column_type'=>'text' ],
				
				[ 'key'=> "container_style", 'title'=> translate('Container style'), 'help_text'=> translate('Select style of the Container'),
					'sortable'=> true, 'fillable'=> true, 'column_type'=>'select','text_key'=>'name', 'column_key'=>'container_style', 
					'data' => [["name"=> "Boxed", "container_style"=>"container"], ["name"=>"Full width", "container_style"=> "w-full"]]  
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

			return render('Shared/Plugins/views/panorama_viwe.html.twig', [
				'hook' => $hook,
		    ],'output');

		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
	}
	
}
