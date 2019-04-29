<?php
  header("Access-Control-Allow-Origin: *");
  header('Content-Type: application/json');
// header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
// header("Cache-Control: post-check=0, pre-check=0", false);
// header("Pragma: no-cache");
// header('Content-Type: application/json');
// $headers = apache_request_headers();
//
// foreach ($headers as $header => $value) {
//     echo "$header: $value <br />\n";
// }

    include_once __DIR__.'/../oauth.class.php';

    // Create the oauth handler to use below.
    $oauth = new IMMAuth\OauthHandler();

    // Note - the API does sanitizing of user/pass.
    $isPost = ( $_SERVER['REQUEST_METHOD'] == 'POST' ? true : false );
    $user   = ( $isPost && isset($_POST['username']) ? $_POST['username'] : '' );
    $pass   = ( $isPost && isset($_POST['password']) ? $_POST['password'] : '' );
    $logout = ( isset($_GET['logout']) ? true : false );

    // Is this a logout?
    if ( $logout ) {
        $oauth->clearTokenCookie();
        echo 'You are logged out';
        user_logout();
    }
    // Else if this is a POST, then create a curl request to send to our auth service
    elseif ( $isPost ) {

        $haveToken = $oauth->loginViaOauth( $user, $pass );

        //echo $haveToken ? "Login Succeeded" : "Invalid Username or Password";
    }
    // Else see if we can load the token from a cookie
    else {
        $haveToken = $oauth->loadTokenFromCookie();
        echo $haveToken ? "You are signed in." : "You are not signed in.";
    }


    if ( $haveToken ) {
        $_SESSION["isLoggedIn"] = true;
        $tokenParsed = $oauth->getTokenParsed();
        //echo $oauth->getTokenRaw();
        echo json_encode($oauth->getTokenRaw());
    }
    else {
      $_SESSION["isLoggedIn"] = false;
    }

?>
