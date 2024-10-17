<?php

namespace Shared\Plugins\Blocks;

use Medians\Customers\Infrastructure\CustomerRepository;
use Medians\Hooks\Infrastructure\HookRepository;
use Medians\CustomFields\Domain\CustomField;
use Medians\Hooks\Domain\Hook;


class ContactForm 
{

	
    private $artistRepo;
    private $hookRepo;
    public $name = "Contact Form";
    public $description = "";
    public $version = "1.0";
    public $shortcode = "";
	

	function __construct()
	{
		$this->artistRepo = new CustomerRepository;
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
				[ 'key'=> "show_name", 'title'=> translate('Show Name field') , 'help_text'=> translate('Show / hide Name field at the form'), 'fillable'=> true, 'column_type'=>'checkbox' ],
				[ 'key'=> "show_email", 'title'=> translate('Show Email field') , 'help_text'=> translate('Show / hide Email field at the form'), 'fillable'=> true, 'column_type'=>'checkbox' ],
				[ 'key'=> "show_phone", 'title'=> translate('Show Phone field') , 'help_text'=> translate('Show / hide Phone field at the form'), 'fillable'=> true, 'column_type'=>'checkbox' ],
				[ 'key'=> "show_message", 'title'=> translate('Show Message field') , 'help_text'=> translate('Show / hide Message field at the form'), 'fillable'=> true, 'column_type'=>'checkbox' ],
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

            return renderPlugin('Shared/Plugins/views/contact-form.html.twig', [
				'hook' => $hook
		    ],'output');

		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
		}
	}
	
}
