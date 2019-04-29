<?php
/**
 * usac api plugin for Craft CMS
 *
 * usac api
 *
 * @author    IMM
 * @copyright Copyright (c) 2018 IMM
 * @link      https://imm.com
 * @package   UsacApi
 * @since     1.0.0
 */

namespace Craft;

class UsacApiPlugin extends BasePlugin
{
    /**
     * @return mixed
     */
    public function init()
    {
        parent::init();
    }

    /**
     * @return mixed
     */
    public function getName()
    {
         return Craft::t('usac api');
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return Craft::t('usac api');
    }

    /**
     * @return string
     */
    public function getDocumentationUrl()
    {
        return 'https://github.com/cgiordan-IMM/usacapi/blob/master/README.md';
    }

    /**
     * @return string
     */
    public function getReleaseFeedUrl()
    {
        return 'https://raw.githubusercontent.com/cgiordan-IMM/usacapi/master/releases.json';
    }

    /**
     * @return string
     */
    public function getVersion()
    {
        return '1.0.0';
    }

    /**
     * @return string
     */
    public function getSchemaVersion()
    {
        return '1.0.0';
    }

    /**
     * @return string
     */
    public function getDeveloper()
    {
        return 'IMM';
    }

    /**
     * @return string
     */
    public function getDeveloperUrl()
    {
        return 'https://imm.com';
    }

    /**
     * @return bool
     */
    public function hasCpSection()
    {
        return false;
    }

    /**
     * @return mixed
     */
    public function addTwigExtension()
    {
        Craft::import('plugins.usacapi.twigextensions.UsacApiTwigExtension');

        return new UsacApiTwigExtension();
    }

    /**
     */
    public function onBeforeInstall()
    {
    }

    /**
     */
    public function onAfterInstall()
    {
    }

    /**
     */
    public function onBeforeUninstall()
    {
    }

    /**
     */
    public function onAfterUninstall()
    {
    }

    /**
     * @return array
     */
    protected function defineSettings()
    {
        return array(
            'someSetting' => array(AttributeType::String, 'label' => 'Some Setting', 'default' => ''),
        );
    }

    /**
     * @return mixed
     */
    public function getSettingsHtml()
    {
       return craft()->templates->render('usacapi/UsacApi_Settings', array(
           'settings' => $this->getSettings()
       ));
    }

    /**
     * @return mixed
     */
    public function prepSettings($settings)
    {
        // Modify $settings here...

        return $settings;
    }
}