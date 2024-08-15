<?php

namespace Medians\Transactions\Application;
use \Shared\dbaser\CustomController;

use Medians\Packages\Infrastructure\PackageSubscriptionRepository;
use Medians\Payments\Infrastructure\PaymentRepository;
use Medians\Transactions\Infrastructure\TransactionRepository;
use Medians\Customers\Domain\Customer;

class PaystackService
{

	
	public $app;
	

	public function verify($params)
	{
        $this->app = new \config\APP;
        $settings = $this->app->SystemSetting();

        $curl = curl_init();
        
        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.paystack.co/transaction/verify/".$params['reference'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "Authorization: Bearer ".$settings['paystack_secret_key'],
                "Cache-Control: no-cache",
            ),
        ));
        
        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);
        
        if ($err) {
            throw new \Exception($err, 1);
        } else {
            return json_decode($response);
        }
    }


	public function getAmountCurrency($response)
    {
        return ['status' => $response->data->status, 'amount'=>$response->data->amount, 'currency'=> $response->data->currency];
    }

}
