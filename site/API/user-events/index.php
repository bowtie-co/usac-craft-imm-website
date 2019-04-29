<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header('Content-Type: application/json');

include_once __DIR__.'/../oauth.class.php';

// Create the oauth handler to use below.
$oauth = new IMMAuth\OauthHandler();
$haveToken = $oauth->loadTokenFromCookie();

header('Content-Type: application/json');
$token_parsed = json_decode($oauth->getTokenRaw(),true);

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => $oauth->getAPIBase()."/myevents",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
  CURLOPT_HTTPHEADER => array(
    "Authorization: Bearer ".$token_parsed["access_token"]
  ),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

$temp = json_decode($response);

foreach($temp as $rep) {
  
  $time = strtotime($rep->date_start);
  $datestart = date('Y-m-d',$time);

    
  $time2 = strtotime($rep->date_end. "+1 days");
  $dateend = date('Y-m-d',$time2);

  $time3 = strtotime($rep->date_race);
  $dateRace = date('Y-m-d',$time3);

  $rep->location = $rep->address->city.', '.$rep->address->state.' '.$rep->address->zip;
  $rep->start = $dateRace;
  $rep->end = $dateRace;
  $rep->flyer = $rep->flyer_url;
}

echo json_encode($temp);
