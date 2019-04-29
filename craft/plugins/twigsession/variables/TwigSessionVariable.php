<?php
/**
 * Twig Session plugin for Craft CMS
 *
 * Twig Session Variable
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
 * @package   TwigSession
 * @since     1.0.0
 */

namespace craft;

class TwigSessionVariable
{
  public function add($key, $value)
  {
    craft()->httpSession->add($key,$value);
  }
  public function get($key)
  {
      return craft()->httpSession->get($key);
  }

  public function isWaiverSigned() {
    // $url = 'http://local.usacycling.org/API/waiver/';
    // $ch = curl_init($url);
    // curl_setopt($ch, CURLOPT_HEADER, true);    // we want headers
    // curl_setopt($ch, CURLOPT_NOBODY, true);    // we don't need body
    // curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
    // curl_setopt($ch, CURLOPT_TIMEOUT,10);
    // $output = curl_exec($ch);
    // $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    // curl_close($ch);
    // if(!$output || strlen(trim($output)) == 0)
    // {
    //     return true;
    // }
    // return false;
  }
}
