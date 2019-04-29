<?php

include_once __DIR__.'/../oauth.class.php';

$wid = $_GET["wid"];
$sig = $_GET["sig"];

// Create the oauth handler to use below.
$oauth = new IMMAuth\OauthHandler();
$haveToken = $oauth->loadTokenFromCookie();
$srv = $_SERVER['SERVER_NAME'];
$baseAPIUrl = "";

switch ( $srv )
{
  case 'usacycling.org':
  case 'www.usacycling.org':
  case 'register.usacycling.org':
  case 'local.usacycling.org':
    $baseAPIUrl = "https://register.usacycling.org";
    break;
  default:
    $baseAPIUrl = "https://stage1.usacycling.org";
    break;
}

//$url = "https://stage1.usacycling.org/rest/usac/v2/waiver-signature-requests/?identity_id=5212";
$url = $baseAPIUrl."/rest/usac/v2/waiver-signature-requests/".$wid."/accept//";
//1953588
$username='ccn';
$password='whammoblammo';

$data = array("identity_id" => (int)$oauth->parseRawToken($oauth->getTokenRaw())->cidid, "signature" => $sig);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
curl_setopt($ch, CURLOPT_POSTFIELDS, '{"identity_id":'.$oauth->parseRawToken($oauth->getTokenRaw())->cidid.',"signature":"'.$sig.'"}');
curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
curl_setopt($ch, CURLOPT_COOKIE, "USACTOKEN=".$oauth->getTokenRaw());
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLINFO_HEADER_OUT, true);
$output = curl_exec($ch);
$headers = curl_getinfo($ch, CURLINFO_HEADER_OUT);
$info = curl_getinfo($ch);
curl_close($ch);
echo $output;
//echo json_encode($data);
