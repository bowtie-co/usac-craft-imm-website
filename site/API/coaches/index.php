<?php

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header('Content-Type: application/json');

include_once __DIR__.'/../oauth.class.php';

// Create the oauth handler to use below.
$oauth = new IMMAuth\OauthHandler();

//$haveToken = $oauth->loadTokenFromCookie();

//$token_parsed = json_decode($oauth->getTokenRaw(),true);

// if($token_parsed == NULL) {
//     header('Location: ' . '/user-login', true, (false === true) ? 301 : 302);
// }

$curl = curl_init();

$arrParams = [];
$strParams = "";

if(isset($_GET) && count($_GET) > 0) {
    foreach($_GET as $key => $value) {
        $arrParams[] = $key."=".urlencode($value);
    }
    $strParams = "?".implode("&",$arrParams);
}
//    var_dump($oauth->getAPIBase()."/coach".$strParams);

curl_setopt_array($curl, array(
    CURLOPT_URL => $oauth->getAPIBase()."/coach".$strParams,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    // CURLOPT_HTTPHEADER => array(
    //     "Authorization: Bearer ".$token_parsed["access_token"]
    //),
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

echo $response;
