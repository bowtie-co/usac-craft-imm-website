<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

    include_once __DIR__.'/oauth.class.php';

    // Create the oauth handler to use below.
    $oauth = new IMMAuth\OauthHandler();
    $haveToken = $oauth->loadTokenFromCookie();
    echo $haveToken ? "You are signed in." : "You are not signed in.";
    echo $oauth->getTokenString();
    echo "<br />";
    echo $oauth->getTokenRaw();
