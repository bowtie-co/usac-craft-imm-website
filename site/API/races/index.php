<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header('Content-Type: application/json');

include_once __DIR__.'/../oauth.class.php';

$race_id   = ( isset($_GET['race_id']) ? $_GET['race_id'] : '' );
$event_name = ( isset($_GET['event_name']) ? $_GET['event_name'] : '' );
$event_year = ( isset($_GET['event_year']) ? $_GET['event_year'] : '' );
$event_id = ( isset($_GET['event_id']) ? $_GET['event_id'] : '' );

$queryS = "";

if (strlen($race_id) > 0) {
  $queryS = $queryS."&race_id=".$race_id;
}
if (strlen($event_name) > 0) {
  $event_name =  str_replace(" ", '%20', $event_name);
  $queryS = $queryS."&event_name=".$event_name;
}
if (strlen($event_year) > 0) {
  $queryS = $queryS."&event_year=".$event_year;
}
if (strlen($event_id) > 0) {
  $queryS = $queryS."&event_id=".$event_id;
}
$queryS = $queryS."&page_limit=100".$event_id;
$oauth = new IMMAuth\OauthHandler();

// $haveToken = $oauth->loadTokenFromCookie();

header('Content-Type: application/json');
// $token_parsed = json_decode($oauth->getTokenRaw(),true);

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => $oauth->getAPIBase()."/races?".$queryS,
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

echo $response;
//echo $oauth->getAPIBase()."/races?".$queryS;
