<?php

namespace Medians\Transactions\Application;

use Medians\Packages\Domain\PackageSubscription;
use Medians\Trips\Domain\TaxiTrip;
use Medians\CustomFields\Domain\CustomField;

class PagaditoService
{

	
	public function validatePagaditoPaymentWebhook()
	{
		$app = new \config\APP;
		$setting = $app->SystemSetting();

		// Pagadito sandbox credentials
		$merchant_id = $setting['pagadito_uid'];
		$api_key = $setting['pagadito_wsk'];
		
		// Transaction details (typically, you'd get these from a POST request)
		$payload = file_get_contents('php://input');
		$data = json_decode($payload, true);
		$token = $data['resource']['token'] ?? null;
		$url_product = $data['resource']['items_list'][0]['url_product'] ?? null;
		error_log($payload);


		try {
			
			// Decode JSON response
			$pagadito = new \Shared\Pagadito($setting['pagadito_uid'], $setting['pagadito_wsk']);
			$pagadito->mode_sandbox_on();
			
			try {
				// Connect to Pagadito
				if ($pagadito->connect()) {
					// Create transaction
					if ($response = $pagadito->get_status($token)) {
						$status = $pagadito->get_rs_status();
						$response_data = [
							'url' => $status,
						];
						
						if ($status == 'COMPLETED' && $url_product)
						{
							$item = explode( '_', $url_product);

							switch ($item[0]) {
								case 'trip':
									$data = ['code' => 'pagadito_token','value' => $token, 'model_type' => TaxiTrip::class, 'model_id'=> end($item)];
									$code = CustomField::firstOrCreate($data);
									break;
									
								case 'subscription':
									$data = ['code' => 'pagadito_token','value' => $token, 'model_type' => PackageSubscription::class, 'model_id'=> end($item)];
									$code = CustomField::firstOrCreate($data);
									break;
							}
						}
					} else {
						$response_data = [
							'error' => 'Transaction execution failed: ' . $pagadito->get_rs_code() . ' - ' . $pagadito->get_rs_message(),
						];
					}
				} else {
					$response_data = [
						'error' => 'Connection failed: ' . $pagadito->get_rs_code() . ' - ' . $pagadito->get_rs_message(),
					];
				}
			} catch (Exception $e) {
				$response_data = [
					'error' => 'Exception: ' . $e->getMessage(),
				];
			}

			// Return response as JSON
			error_log(json_encode($response_data));
			// return response(json_encode($response_data));

		} catch (\Throwable $th) {
			error_log($th->getMessage());
			echo json_encode(['error' => $th->getMessage()]);
		}
	}
	
	public function initiatePagaditoPayment()
	{
		$app = new \config\APP;
		$setting = $app->SystemSetting();

		// Pagadito sandbox credentials
		$merchant_id = $setting['pagadito_uid'];
		$api_key = $setting['pagadito_wsk'];

		// Transaction details (typically, you'd get these from a POST request)
		$params = $app->params();
		$url_product = $params['item_type'].'_'.$params['item_id'];
		$amount = $params['amount'];
		$currency = $params['currency'];
		$description = $params['description'];
		$url_ok = $params['url_ok'];
		$url_cancel = $params['url_cancel'];

		try {
			
			// Decode JSON response
			$pagadito = new \Shared\Pagadito($setting['pagadito_uid'], $setting['pagadito_wsk']);
			$pagadito->mode_sandbox_on();
			
			try {
				// Connect to Pagadito
				if ($pagadito->connect()) {
					// Create transaction

					$pagadito->add_detail(1, $description, $amount, $url_product);
					
					if ($response = $pagadito->exec_trans($amount, $description, $currency, $url_ok, $url_cancel)) {
						$response_data = [
							'url' => $response,
						];
					} else {
						$response_data = [
							'error' => 'Transaction execution failed: ' . $pagadito->get_rs_code() . ' - ' . $pagadito->get_rs_message(),
						];
					}
				} else {
					$response_data = [
						'error' => 'Connection failed: ' . $pagadito->get_rs_code() . ' - ' . $pagadito->get_rs_message(),
					];
				}
			} catch (Exception $e) {
				$response_data = [
					'error' => 'Exception: ' . $e->getMessage(),
				];
			}

			// Return response as JSON
			echo json_encode($response_data);

			return;

		} catch (\Throwable $th) {
			error_log($th->getMessage());
			echo json_encode(['error' => $th->getMessage()]);
		}
	}


}
