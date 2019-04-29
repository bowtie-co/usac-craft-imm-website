<?php
/**
 * USAC OAuth 2 plugin for Craft CMS
 *
 * USAC OAuth 2 Variable
 *
 * --snip--
 * Craft allows plugins to provide their own template variables, accessible from the {{ craft }} global variable
 * (e.g. {{ craft.pluginName }}).
 *
 * https://craftcms.com/docs/plugins/variables
 * --snip--
 *
 * @author    Aaron Copeland
 * @copyright Copyright (c) 2017 Aaron Copeland
 * @link      http://www.imm.com
 * @package   UsacOauth2
 * @since     1.0.0
 */

namespace Craft;

include_once __DIR__.'/oauth.class.php';



class UsacOauth2Variable
{
  public function checkLoginStatus()
  {
      // $oauth = new OauthHandler();
      // $haveToken = $oauth->loadTokenFromCookie();
      // 
      // if(!$haveToken) {
      //   header('Location: ' . '/user-login', true, (false === true) ? 301 : 302);
      // }
      // else {
      //   $oauth->saveTokenCookie();
      //   return $oauth->getTokenRaw();
      // }

  }
}
