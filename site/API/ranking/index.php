<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header('Content-Type: application/json');

include_once __DIR__.'/../oauth.class.php';

$compID   = ( isset($_GET['comp_id']) ? $_GET['comp_id'] : '' );
// Create the oauth handler to use below.
$oauth = new IMMAuth\OauthHandler();

$haveToken = $oauth->loadTokenFromCookie();

header('Content-Type: application/json');
$token_parsed = json_decode($oauth->getTokenRaw(),true);

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => $oauth->getAPIBase()."/user_rankings?comp_id=".$compID,
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

echo $response;
