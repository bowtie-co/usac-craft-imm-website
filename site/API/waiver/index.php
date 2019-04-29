<?php
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include_once __DIR__.'/../oauth.class.php';

// Create the oauth handler to use below.
$oauth = new IMMAuth\OauthHandler();
$haveToken = $oauth->loadTokenFromCookie();

$srv = $_SERVER['SERVER_NAME'];
$baseAPIUrl = "";

switch ( $srv )
{
  case 'usacycling.org':
  case 'legacy.usacycling.org':
  case 'www.usacycling.org':
  case 'register.usacycling.org':
  case 'local.usacycling.org':
    $baseAPIUrl = "https://register.usacycling.org";
    break;
  default:
    $baseAPIUrl = "https://stage1.usacycling.org";
    break;
}


$url = $baseAPIUrl."/rest/usac/v2/waiver-signature-requests/?identity_id=".$oauth->parseRawToken($oauth->getTokenRaw())->cidid;

$username='ccn';
$password='whammoblammo';


$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERPWD, "$username:$password");
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
curl_setopt($ch, CURLOPT_COOKIE, "USACTOKEN=".$oauth->getTokenRaw());
$output = curl_exec($ch);
$info = curl_getinfo($ch);
curl_close($ch);
echo $output;
