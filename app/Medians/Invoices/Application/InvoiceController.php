<?php

namespace Medians\Invoices\Application;
use \Shared\dbaser\CustomController;

use Medians\Users\Application\GetStartedController;

use Medians\Invoices\Infrastructure\InvoiceRepository;

class InvoiceController extends CustomController
{

	/**
	* @var Object
	*/
	protected $repo;
	protected $app;



	function __construct()
	{
        $this->app = new \config\APP;
		
		$user = $this->app->auth();
		$this->repo = new InvoiceRepository();

	}



	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function columns( ) 
	{

		return [
            [ 'value'=> "invoice_id", 'text'=> "#"],
            [ 'value'=> "model", 'text'=> translate('User'), 'sortable'=> false ],
            [ 'value'=> "subtotal", 'text'=> translate('Subtotal'), 'sortable'=> true ],
            [ 'value'=> "total_amount", 'text'=> translate('Total Amount'), 'sortable'=> true ],
            [ 'value'=> "payment_method", 'text'=> translate('Gateway'), 'sortable'=> true ],
            [ 'value'=> "date", 'text'=> translate('Date'), 'sortable'=> true ],
            [ 'value'=> "status", 'text'=> translate('status'), 'sortable'=> false ],
            [ 'value'=> "notes", 'text'=> translate('Notes'), 'sortable'=> true ],
			['value'=>'edit', 'text'=>translate('View')],
			// ['value'=>'delete', 'text'=>translate('Delete')],
        ];
	}


	/**
	 * Admin index items
	 * Loads in vue 
	 */ 
	public function index() 
	{
		$params = sanitizeInput($this->app->request()->query->all());

		return render('invoices', [
			'load_vue'=> true,
	        'title' => translate('Invoices list'),
	        'items' => $this->repo->getByDate($params),
	        'columns' => $this->columns(),
	    ]);
	}



	/**
	 * Store item to database
	 * 
	 * @return [] 
	*/
	public function store() 
	{	
        
		$params = $this->app->params();

        try {
        	
            return ($this->repo->store($params))
            ? array('success'=>1, 'result'=>translate('Added'), 'reload'=>1)
            : array('error'=>translate('Err'));


        } catch (Exception $e) {
            return array('error'=>$e->getMessage());
        }
	
	}



	/**
	 * Update item to database
	 * 
	 * @return [] 
	*/
	public function update() 
	{
		$params = $this->app->params();

        try {

           	$returnData =  ($this->repo->update($params))
           	? array('success'=>1, 'result'=>translate('Updated'), 'reload'=>1)
           	: array('error'=>translate('Not allowed'));

        } catch (Exception $e) {
            $returnData = array('error'=>$e->getMessage());
        }

        return $returnData;

	}


	/**
	 * Delete item from database
	 * 
	 * @return [] 
	*/
	public function delete() 
	{

		$params = $this->app->params();

        try {

           	$returnData =  $this->repo->delete($params['invoice_id'])
           	? array('success'=>1, 'result'=>translate('Deleted'), 'reload'=>1)
           	: array('error'=>translate('Not allowed'));


        } catch (Exception $e) {
            $returnData = array('error'=>$e->getMessage());
        }

        return response($returnData);

	}


	public function addInvoice()
	{
		
		$params = (array) $this->app->params();

		try {
			
			$saveInvoice = $this->repo->store($params); 

			return (isset($saveInvoice['success']))
			? array('success'=>1, 'result'=>$saveInvoice['result'], 'reload'=>1)
			: array('error'=>$saveInvoice['error']);

		} catch (Exception $e) {
			return array('error'=>$e->getMessage());
		}
		
		
	}


}
