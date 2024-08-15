<?php
namespace Medians\Help\Application;

use Shared\dbaser\CustomController;

use Medians\Help\Infrastructure\HelpMessageRepository;

class HelpMessageController extends CustomController 
{

	/**
	* @var Object
	*/
	protected $repo;

	protected $app;

	

	function __construct()
	{

		$this->app = new \config\APP;

		$this->repo = new HelpMessageRepository	();
	}




	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function columns( ) 
	{

		return [
            [ 'key'=> "message_id", 'title'=> "#"],
            [ 'key'=> "subject", 'title'=> translate('subject'), 'sortable'=> true ],
            [ 'key'=> "message", 'title'=> translate('message'), 'sortable'=> true ],
        ];
	}

	

	/**
	 * Columns list to view at DataTable 
	 *  
	 */ 
	public function fillable( ) 
	{

		return [
            [ 'key'=> "message_id", 'title'=> "#", 'column_type'=>'hidden'],
            [ 'key'=> "subject", 'title'=> translate('subject'),  'fillable'=> true, 'column_type'=>'text' ],
            [ 'key'=> "message", 'title'=> translate('message'),  'fillable'=>true, 'column_type'=>'text' ],
            [ 'key'=> "user_name", 'title'=> translate('user_name'),  ],
        ];
	}

	

	/**
	 * Admin index items
	 * 
	 * @param Silex\Application $app
	 * @param \Twig\Environment $twig
	 * 
	 */ 
	public function index( ) 
	{
		
		try {
			
		    return render('help_messages', [
		        'load_vue' => true,
		        'title' => translate('Help Messages'),
		        'columns' => $this->columns(),
		        'fillable' => $this->fillable(),
		        'items' => $this->repo->get(),
		    ]);
		} catch (\Exception $e) {
        	return array('error'=>$e->getMessage());
		}
	}

	

	public function store() 
	{

		$params = $this->app->params();

        try {	

			$user = $this->app->auth();

            $returnData = (!empty($this->repo->store($params))) 
            ? array('success'=>1, 'result'=>translate('Added'), 'reload'=>1)
            : array('success'=>0, 'result'=>'Error', 'error'=>1);

        } catch (Exception $e) {
        	return array('error'=>$e->getMessage());
        }

		return $returnData;
	}

	public function storeComment() 
	{
		$params = $this->app->params();

        try {	

        	$params['user_id'] = $this->app->auth()->id;        	

            $returnData = (!empty($this->repo->storeUserComment($params))) 
            ? array('success'=>1, 'result'=>translate('Added'))
            : array('success'=>0, 'result'=>'Error', 'error'=>1);

        } catch (Exception $e) {
        	return array('error'=>$e->getMessage());
        }

		return $returnData;
	}

	
	/**
	 * Load latest notifications at mobile
	 * 
	 */
	public function loadHelpMessages()
	{
		$this->app = new \config\APP;

	}  

	
	/**
	 * Load HelpMessage at mobile
	 * 
	 */
	public function loadHelpMessage()
	{
		$this->app = new \config\APP;
		$messageId = $this->app->request()->get('message_id');
		return $this->repo->find($messageId);
	}  

	

	/**
	 * Close / End ticket
	 */
	public function close() 
	{
		$params = $this->app->params();

        try {	

            $returnData = (!empty($this->repo->update($params))) 
            ? array('success'=>1, 'result'=>translate('Done'))
            : array('success'=>0, 'result'=>'Error', 'error'=>1);

        } catch (Exception $e) {
        	return array('error'=>$e->getMessage());
        }

		echo json_encode($returnData);
	}

	public function storeMobile() 
	{

		$params = $this->app->params();

        try 
		{	
			$user = $this->app->auth();

            $returnData = (!empty($this->repo->store($params))) 
            ? array('success'=>1, 'result'=>translate('THNKS_MSG'), 'reload'=>1)
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

        	$params['status'] = !empty($params['status']) ? $params['status'] : null;

            if ($this->repo->update($params))
            {
                return array('success'=>1, 'result'=>translate('Updated'), 'reload'=>1);
            }
        

        } catch (\Exception $e) {
        	throw new \Exception("Error Processing Request", 1);
        	
        }

	}


	public function delete() 
	{

		$params = $this->app->params();

        try {

        	$check = $this->repo->find($params['message_id']);


            if ($this->repo->delete($params['message_id']))
            {
                return json_encode(array('success'=>1, 'result'=>translate('Deleted'), 'reload'=>1));
            }
            

        } catch (Exception $e) {
        	throw new \Exception("Error Processing Request", 1);
        	
        }

	}

}