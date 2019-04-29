<?php
namespace Craft;

class UsacApi_EventsController extends BaseController {
protected $allowAnonymous = true;

/**
 * @var array Basic response template
 */
private $arrResponse = [
    'success' => false,
    'errors' => []
];

public function actionGet() {
  $curl = curl_init();

  curl_setopt_array($curl, array(
    // CURLOPT_URL => "https://api.usacycling.org/events?name=".$name."&state=".$state."&zip=".$zip."&category=".$category."&state=".$state."&from=".$from."&to=".$to."&page_start=".$page_start."&page_limit=".$page_limit,
    CURLOPT_URL => "https://stage-api.usacycling.org/events?name=race",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    // CURLOPT_HTTPHEADER => array(
    //   "Authorization: Bearer ".$token_parsed["access_token"]
    // ),
  ));

  $response = curl_exec($curl);
  $err = curl_error($curl);

  curl_close($curl);

  $this->arrResponse["data"] = $response;
  $this->respond();
}

  private function respond() {
      echo $this->returnJson($this->arrResponse);
  }
}
