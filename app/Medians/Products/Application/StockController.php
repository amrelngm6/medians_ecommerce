<?php
namespace Medians\Products\Application;

use Shared\dbaser\CustomController;

use Medians\Products\Infrastructure\ProductRepository;
use Medians\Products\Infrastructure\CategoryRepository;
use Medians\Brands\Infrastructure\BrandRepository;
use Medians\Shipping\Infrastructure\ShippingRepository;
use Medians\Orders\Infrastructure\OrderRepository;

class StockController extends CustomController 
{

	/**
	* @var Object
	*/
	protected $repo;
	
	protected $productRepo;

	protected $app;


	function __construct()
	{

		$this->app = new \config\APP;

		$this->productRepo = new ProductRepository();
		$this->repo = new ProductStockRepository();
	}




	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function columns( ) 
	{
		return [
            [ 'value'=> "product_id", 'text'=> "#"],
            [ 'value'=> "product.lang_content.title", 'text'=> translate('product_name'), 'sortable'=> true ],
            [ 'value'=> "type", 'text'=> translate('type'), 'sortable'=> true ],
            [ 'value'=> "qty", 'text'=> translate('Quantity'), 'sortable'=> true ],
            [ 'value'=> "delete", 'text'=> translate('Delete') ],
        ];
	}

	

	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function fillable( ) 
	{
	}

	


	/**
	 * Admin index items
	 * 
	 */ 
	public function index( ) 
	{
		try {

			return render('data_table', [
		        'load_vue' => true,
		        'title' => translate('Stock'),
		        'columns' => $this->columns(),
		        'fillable' => $this->fillable(),
		        'items' => $this->repo->get(),
		        'products' => $this->productRepo->getActive(1000),
		    ]);
		} catch (\Exception $e) {
			throw new \Exception($e->getMessage(), 1);
			
		}
	}
	
	

	public function store() 
	{	

		$params = $this->app->params();

        try {	
			
			$user = $this->app->auth();

			// Administrator user id
        	$params['created_by'] = $user->id;

			$returnData = (!empty($this->repo->store($params))) 
			? array('success'=>1, 'result'=>translate('Added'), 'reload'=>1)
			: array('success'=>0, 'result'=>'Error', 'error'=>1);


        } catch (Exception $e) {
        	return array('error'=>$e->getMessage());
        }

		return $returnData;
	}



	public function update()
	{
		$params = $this->app->params();

        try {


        } catch (\Exception $e) {
        	return array('error'=>$e->getMessage());
        	
        }

	}


	public function delete() 
	{

		$params = $this->app->params();

        try {

        	

        } catch (Exception $e) {
        	throw new \Exception("Error Processing Request", 1);
        	
        }

	}


}