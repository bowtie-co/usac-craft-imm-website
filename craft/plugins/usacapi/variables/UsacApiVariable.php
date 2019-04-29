<?php
/**
 * usac api plugin for Craft CMS
 *
 * usac api Variable
 *
 * @author    IMM
 * @copyright Copyright (c) 2018 IMM
 * @link      https://imm.com
 * @package   UsacApi
 * @since     1.0.0
 */

namespace Craft;

include_once $_SERVER["DOCUMENT_ROOT"]."/API/oauth.class.php";

class UsacApiVariable {
     public function getEvents($from = null) {
        return craft()->usacApi_events->GetEvents($from);
     }

    public function getPastEvents($start = null, $end = null) {
       return craft()->usacApi_events->GetPastEvents($start, $end);
    }

    public function getTokenStatus() {
        $auth = new \IMMAuth\OauthHandler();
        $isLoggedIn = $auth->loadTokenFromCookie() ? true : false;
        return $isLoggedIn;
    }
}
