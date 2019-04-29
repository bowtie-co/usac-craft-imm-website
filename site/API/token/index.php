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
echo $token_parsed["access_token"];
