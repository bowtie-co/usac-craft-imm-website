<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header('Content-Type: application/json');

include_once __DIR__.'/../oauth.class.php';

$name   = ( isset($_GET['name']) ? $_GET['name'] : '' );
$comp_id   = ( isset($_GET['comp_id']) ? $_GET['comp_id'] : '' );
$page_start   = ( isset($_GET['page_start']) ? $_GET['page_start'] : '' );
$page_limit   = ( isset($_GET['page_limit']) ? $_GET['page_limit'] : '' );


$queryS = "";

if (strlen($name) > 0) {
  $name =  str_replace(" ", '%20', $name);
  $name = strtoupper($name);
  $queryS = $queryS."&name=".$name;
}
if (strlen($comp_id) > 0) {
  $queryS = $queryS."&comp_id=".$comp_id;
}

if (strlen($page_start) > 0) {
  $queryS = $queryS."&page_start=".$page_start;
}

//$queryS = $queryS."&page_limit=20";

// Create the oauth handler to use below.
$oauth = new IMMAuth\OauthHandler();


header('Content-Type: application/json');

$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_URL => $oauth->getAPIBase()."/rider_lookup?page_limit=20".$queryS,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT => 30,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => "GET",
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

echo $response;
