<?php

// Class to wrap handling of OAUTH2 login via USAC API.
// On success, stores JWT returned from server.
//
// Bearer token storage:
// http://self-issued.info/docs/draft-ietf-oauth-v2-bearer.html
// Created By:   Warren Ryd (wryd@usacycling.org)
// August 2017

//include_once __DIR__.'/../../../vendor/autoload.php';

namespace IMMAuth;

// Lib for JWT handling.  See:  https://github.com/firebase/php-jwt
include_once __DIR__.'/php-jwt-master/src/JWT.php';
include_once __DIR__.'/php-jwt-master/src/BeforeValidException.php';
include_once __DIR__.'/php-jwt-master/src/ExpiredException.php';
include_once __DIR__.'/php-jwt-master/src/SignatureInvalidException.php';

use \Firebase\JWT\JWT;

class OauthHandler
{
    /**
     * @var array
     */
    protected $debug_messages = array();

    /**
     * The token we get back from the oauth server in its raw form.
     * This contains both an access JWT and refresh JWT.
     *
     * @var string
     */
    protected $oauth_token_raw = false;

    /**
     * From the oauth token, we'll extract and parse the access JWT.
     * This is what gives us access to stuff.
     *
     * @var stdClass
     */
    protected $access_token_parsed = false;

    /**
     * When we parse the oauth token, we'll save the refresh token for later.
     *
     * @var string
     */
    protected $refresh_token_raw = false;

    protected $client_id         = 'USACWEBSITE';

    // SECRETS!! Do NOT share!!
    // Access secret is needed to decode JWT.
    protected $client_secret     = 'hjVKhk27mp026hjdnjBe5uEt3SwQXB4JOzQ2CSpjZD8S3BOcFRXdS2LNPg0FQ06u';
    protected $access_secret     = 'f83hw9eefhcuiewjkcn2839jioewrjskdfnwioekjsd324';

    // Base name of cookie.  We'll append environment name to this if not on prod.
    protected $token_cookie_name = 'USACTOKEN';

    /**
     * Init stuff.
     */
    protected function init()
    {
        $this->oauth_token_raw = false;
        $this->access_token_parsed = false;
        $this->refresh_token_raw = false;
    }

    /**
     * @return string
     */
    public function getDebugMessages( $sep = '<br/>' )
    {
        return implode($sep,$this->debug_messages);
    }
    public function getAPIBase(){
      $srv = $_SERVER['SERVER_NAME'];
      $base_url = "";
      switch ( $srv )
      {
          case 'usacycling.org':
          case 'www.usacycling.org':
          case 'register.usacycling.org':
          case 'local.usacycling.org':
          case 'craftprod.usacycling.org':
              $base_url = "https://api.usacycling.org";
              break;
          case 'imm.usacycling.org':
          case 'usac.immdemo.com':
          case 'usacycling.dev':
          case 'usac.localhost':
          case 'craftstage.usacycling.org':

              $base_url = "https://stage-api.usacycling.org";
              break;
          default:
              $base_url = "https://stage-api.usacycling.org";
              break;
      }

        return $base_url;
    }

    protected function isProtectedEnvironment() {
      $srv = $_SERVER['SERVER_NAME'];
      $protectedEnvironment = false;

      switch ( $srv )
      {
          case 'usacycling.org':
          case 'www.usacycling.org':
          case 'register.usacycling.org':
          case 'imm.usacycling.org':
          case 'local.usacycling.org':
          case 'craftstage.usacycling.org':
          case 'craftprod.usacycling.org':
              $protectedEnvironment = true;
              break;

          case 'usac.immdemo.com':
          case 'usacycling.dev':
              $protectedEnvironment = false;
              break;
          default:
              // Assume some sort of dev.
              $protectedEnvironment = false;
              break;
      }

        return $protectedEnvironment;
    }

    /**
     * @return bool|string
     */
    public function getTokenRaw()
    {
        return $this->oauth_token_raw;
    }

    /**
     * @return bool|stdClass
     */
    public function getTokenParsed()
    {
        return $this->access_token_parsed;
    }

    /**
     * Call this with username/password to make the login attempt via the oauth server.
     * If successful, returns the parsed token.
     * Else returns false.
     *
     * @var string $username
     * @var string $password
     * @return bool|stdClass
     */
    public function loginViaOauth( $username, $password )
    {
        // Minimal sanity check.  Api does actual sanitizing
        if ( !$username || !$password ) return false;

        // URL:  https://api.usacycling.org/oauth/v2/token
        // Post Parameters
        //      grant_type	    password
        //      client_id	    <Client ID>
        //      client_secret	<Client Secret>
        //      scope	        comp
        //      username	    <Comp ID, Email or Username>
        //      password	    <Plaintext Password>
        //
        // Return will be an authorization_token that contains both an access token and refresh token as JWT's.

        // Init for now.  If we get a valid response, we'll save it here.
        $this->init();

        // Get our post message ready
        $postParams   = array(
                            "grant_type"    => 'password',
                            "client_id"     => $this->client_id,
                            "client_secret" => $this->client_secret,
                            "scope"         => 'comp',
                            "username"      => $username,
                            "password"      => $password
                            );

        // Do the curly thing
        $rval = $this->curlRequestForToken($postParams);

        $this->debug_messages[] = $rval ? "Login Succeeded (Via Post)." : "Login Failed (Via Post).";

        // Return whatever we got.  False means login failed.
        return $rval;
    }

    /**
     * Use our current refresh token to request a new access token.
     * If successful, returns the parsed token.
     * Else returns false.
     *
     * @return bool|stdClass
     */
    public function refreshAccessToken()
    {
        // Gotta have one to use it.
        if ( !$this->refresh_token_raw ) return false;

        // URL:  https://api.usacycling.org/oauth/v2/token
        // Post Parameters
        //      grant_type	    refresh_token
        //      client_id	    <Client ID>
        //      client_secret	<Client Secret>
        //      scope	        comp
        //      refresh_token	<Refresh Token>
        //
        // Return will be a new authorization_token that contains both an access token and refresh token as JWT's.

        // Get our post message ready
        $postParams   = implode ( '&', array(
                            "grant_type="    . 'refresh_token',
                            "client_id="     . $this->client_id,
                            "client_secret=" . $this->client_secret,
                            "scope="         . 'comp',
                            "refresh_token=" . $this->refresh_token_raw
                            ) );

        // Do the curly thing
        $rval = $this->curlRequestForToken($postParams);

        $this->debug_messages[] = $rval ? "Login Succeeded (Via Refresh)." : "Login Failed (Via Refresh).";

        // Return whatever we got.  False means login failed.
        return $rval;
    }

    /**
     * Make the curl request to the auth server.
     * We expect a complete access token in response.
     *
     * @var string $postParams
     * @return bool|stdClass
     */
    protected function curlRequestForToken($postParams)
    {
        $s = curl_init();

        //curl_setopt( $s, CURLOPT_URL, 'https://stage-api.usacycling.org/oauth/v2/token' );
        curl_setopt( $s, CURLOPT_URL, $this->getAPIBase().'/oauth/v2/token' );
        curl_setopt( $s, CURLOPT_POST, true );
        curl_setopt( $s, CURLOPT_POSTFIELDS, $postParams );

        curl_setopt( $s, CURLOPT_FRESH_CONNECT, 1 );
        curl_setopt( $s, CURLOPT_FORBID_REUSE, 1 );
        curl_setopt( $s, CURLOPT_RETURNTRANSFER, 1 );

        // Execute the command and check the result
        $result = curl_exec($s);
        $stat = curl_getinfo( $s, CURLINFO_HTTP_CODE );
        curl_close($s);

        // We must get a 200 status and some kind of result
        $rval = ( $result !== false  && $stat == '200' );

        // If that worked, parse the returned token
        if ( $rval && ($rval = $this->parseRawToken($result)) ) {
            // Save for later
            $this->saveTokenCookie();
        }

        $this->debug_messages[] = "Curl stat: " . $stat;
        $this->debug_messages[] = "Curl result: ".$result;

        // Return whatever we got.  False means login failed.
        return $rval;
    }

    /**
     * Parse the raw token received from the oauth service.
     * If all is valid and happy, we'll return the parsed token.
     * Else we'll return false.
     *
     * @var string $token
     * @return bool|stdClass
     */
    public function parseRawToken($token_raw)
    {
        if ( !$token_raw ) return false;
        $rval = false;

        // Parser throws exceptions if the JWT is not valid.
        try {
            // Decode into an object
            $auth_token = json_decode($token_raw);

            // The token is at least valid json.
            // Save the raw token and the refresh token before trying to parse.
            // (An expired access token will throw an exception when decoding,
            // in which case we'll need the refresh token to renew.)
            $this->oauth_token_raw     = $token_raw;
            $this->refresh_token_raw   = $auth_token->refresh_token;

            // The auth_token object will have the format of:
            //  {
            //      "token_type"    : "Bearer",
            //      "access_token"  : "eyJ...uw4",
            //      "refresh_token" : "tet...2bS",
            //      "expires_in"    : 3600
            //  }
            //
            // The access_token is what we really care about, and grants access to the systems.
            // The refresh_token can be used to request a new access_token without requiring
            // the user to re-login.  (Note - the refresh token is NOT a JWT.)

            // Init JWT parser to allow two minutes of leeway in expiration time,
            // to account for cross-system time drift.
            JWT::$leeway = 120;

            // The access_token is encoded.  Use JWT lib to decode.
            // This does check for expirations, etc.
            $access_token  = JWT::decode( $auth_token->access_token,  $this->access_secret, array('HS256') );

            // If we're here, then we must have parsed everything ok.
            $this->access_token_parsed = $access_token;
            $rval = $access_token;

            // $access_token now has:
            //      $access_token->iat => <time>
            //      $access_token->exp => <time>
            //      $access_token->aud => 'USACWEBSITE'
            //      $access_token->sub => <compid>
            //      $access_token->scope => [ 'comp' ]
            //      $access_token->cauid => <ccn auth id>
            //      $access_token->cidid => <ccn identity id>

        } catch ( \Exception $e ) {
            $this->debug_messages[] = "Login rejected: ".$e->getMessage();
        }

        return $rval;
    }

    /**
     * Return a displayable string of the parsed token (if any).
     *
     * @return string
     */
    public function getTokenString()
    {
        return $this->access_token_parsed ?
                    "CompID: ".$this->access_token_parsed->sub . "<br/>".
                    "Ccn Auth Id: ".$this->access_token_parsed->cauid ."<br/>".
                    "Ccn Iden Id: ".$this->access_token_parsed->cidid ."<br/>".
                    "UserScope: ".implode("+",$this->access_token_parsed->scope) ."<br/>".
                    ""
               :
               '';
    }

    /**
     * Get the name of the cookie.
     * We'll append an environment suffix on non-production domains.
     *
     * @return string
     */
    protected function getTokenCookieName()
    {
        $name = $this->token_cookie_name;
        $srv = $_SERVER['SERVER_NAME'];

        switch ( $srv )
        {
            case 'usacycling.org':
            case 'www.usacycling.org':
            case 'imm.usacycling.org':
            case 'craftprod.usacycling.org':
            case 'craftstage.usacycling.org':
                // Prod. Do nothing.
                break;

            case 'dev1.usacycling.org':
            case 'www-dev1.usacycling.org':
                $name .= "DEV1";
                break;

            case 'dev2.usacycling.org':
            case 'www-dev2.usacycling.org':
                $name .= "DEV2";
                break;

            case 'dev3.usacycling.org':
            case 'www-dev3.usacycling.org':
                $name .= "DEV3";
                break;

            case 'dev4.usacycling.org':
            case 'www-dev4.usacycling.org':
                $name .= "DEV4";
                break;

            default:
                // Assume some sort of dev.
                $name .= "";
                break;
        }

        return $name;
    }
    protected function getCookieDomain()
    {
      $name = "";
      $srv = $_SERVER['SERVER_NAME'];

      switch ( $srv )
      {
          case 'usacycling.org':
          case 'www.usacycling.org':
          case 'imm.usacycling.org':
          case 'local.usacycling.org':
          case 'craftstage.usacycling.org':
          case 'craftprod.usacycling.org':
              $name = ".usacycling.org";
              break;

          default:
              // Assume some sort of dev.
              $name = $srv;
              break;
      }

      return $name;
    }
    /**
     * Save the current raw oauth token in a secure cookie so it can be referenced later.
     */
    public function saveTokenCookie()
    {
        if ( $this->getTokenRaw() ) {
            // Save this cookie as secure
            setcookie (
                $this->getTokenCookieName(),
                $this->getTokenRaw(),
                // strtotime( "+1 day" ),
                0,
                "/",                    // root path
                $this->getCookieDomain(),       // base domain
                $this->isProtectedEnvironment(),                   // secure!
                true                    // http-only
                );
        }
    }

    /**
     * Clear the token cookie, effectively logging out the user
     */
    public function clearTokenCookie()
    {
        setcookie (
            "USACTOKEN",
            0,
            1,                      // expire time
            "/",                    // root path
            $this->getCookieDomain(),       // base domain
            $this->isProtectedEnvironment(),                   // secure!
            true                    // http-only
            );
    }

    /**
     * Try to load the secure cookie and parse the token.
     * Returns the token if it worked.
     * Else false (meaning user must sign in).
     *
     * @return bool|stdClass
     */
    public function loadTokenFromCookie()
    {
        $this->init();

        $rval = false;
        // Look for our cookie and try to parse it.
        if(isset($_COOKIE[$this->getTokenCookieName()])) {
            $rval = $this->parseRawToken( $_COOKIE[$this->getTokenCookieName()] );
        }

        // If that worked, save a message
        if ( $rval ) {
            // Touch the cookie so we update the expire time.
            $this->saveTokenCookie();
            $this->debug_messages[] = "Login Succeeded (Via Cookie)";

        // Else if we have a refresh token, try to refresh.
        } elseif ( $this->refresh_token_raw ) {
            $rval = $this->refreshAccessToken();

        // Else we're hosed
        } else {
            $this->debug_messages[] = "Login Failed (Via Cookie)";
            //$this->debug_messages[] = "Cookie: ".$_COOKIE[$this->getTokenCookieName()];
        }

        // Return whatever
        return $rval;
    }

    /**
     * Check if we are currently on HTTPS.
     * In theory, the caller already should have done that.
     * But for safety, we never should store the cookie if we're not https!
     *
     * @return bool
     */
    public function isHttps()
    {
        $isHttps = ( ($_SERVER['HTTP_CLOUDFRONT_FORWARDED_PROTO'] === 'https') ||
                     ($_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') ||
                     ($_SERVER['HTTPS'] === 'on') ||
                     ($_SERVER['SERVER_PORT'] === 443) ) ? true : false;

        return $isHttps;
    }

}
