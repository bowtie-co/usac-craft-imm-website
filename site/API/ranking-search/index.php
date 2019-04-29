<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header('Content-Type: application/json');

include_once __DIR__.'/../oauth.class.php';

$rank_org   = ( isset($_GET['rank_org']) ? $_GET['rank_org'] : 'Mountain' );
$rank_discipline   = ( isset($_GET['rank_disc']) ? $_GET['rank_disc'] : 'DH' );
$gender   = ( isset($_GET['gender']) ? $_GET['gender'] : 'M' );
$category   = ( isset($_GET['category']) ? $_GET['category'] : '' );
$state   = ( isset($_GET['state']) ? $_GET['state'] : '' );
$age_min   = ( isset($_GET['age_min']) ? $_GET['age_min'] : '' );
$age_max   = ( isset($_GET['age_max']) ? $_GET['age_max'] : '' );
$page_start   = ( isset($_GET['page_start']) ? $_GET['page_start'] : '0' );
$page_limit   = ( isset($_GET['page_limit']) ? $_GET['page_limit'] : '500' );


// Create the oauth handler to use below.
$oauth = new IMMAuth\OauthHandler();

$haveToken = $oauth->loadTokenFromCookie();

header('Content-Type: application/json');
// $token_parsed = json_decode($oauth->getTokenRaw(),true);

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => $oauth->getAPIBase()."/ranking_report?rank_org=".$rank_org."&rank_discipline=".$rank_discipline."&gender=".$gender."&category=".$category."&state=".$state."&age_min=".$age_min."&age_max=".$age_max."&page_start=".$page_start."&page_limit=".$page_limit,
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
//echo $oauth->getAPIBase()."/ranking_report?rank_org=".$rank_org."&rank_discipline=".$rank_discipline."&gender=".$gender."&category=".$category."&state=".$state."&age_min=".$age_min."&age_max=".$age_max."&page_start=".$page_start."&page_limit=".$page_limit;
