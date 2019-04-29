<?php
/**
 * usac api plugin for Craft CMS
 *
 * usac api Twig Extension
 *
 * @author    IMM
 * @copyright Copyright (c) 2018 IMM
 * @link      https://imm.com
 * @package   UsacApi
 * @since     1.0.0
 */

namespace Craft;

use Twig_Extension;
use Twig_Filter_Method;

class UsacApiTwigExtension extends \Twig_Extension
{
    /**
     * @return string The extension name
     */
    public function getName()
    {
        return 'UsacApi';
    }

    /**
     * @return array
     */
    public function getFilters()
    {
        return array(
            'someFilter' => new \Twig_Filter_Method($this, 'someInternalFunction'),
        );
    }

    /**
    * @return array
     */
    public function getFunctions()
    {
        return array(
            'someFunction' => new \Twig_Function_Method($this, 'someInternalFunction'),
        );
    }

    /**
     * @return string
     */
    public function someInternalFunction($text = null)
    {
        $result = $text . " in the way";

        return $result;
    }
}