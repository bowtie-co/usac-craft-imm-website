<?php
/**
 * usac api plugin for Craft CMS
 *
 * UsacApi Widget
 *
 * @author    IMM
 * @copyright Copyright (c) 2018 IMM
 * @link      https://imm.com
 * @package   UsacApi
 * @since     1.0.0
 */
namespace Craft;
class UsacApiWidget extends BaseWidget
{
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
    public function getBodyHtml()
    {
        // Include our Javascript & CSS
        craft()->templates->includeCssResource('usacapi/css/widgets/UsacApiWidget.css');
        craft()->templates->includeJsResource('usacapi/js/widgets/UsacApiWidget.js');
        /* -- Variables to pass down to our rendered template */
        $variables = array();
        $variables['settings'] = $this->getSettings();
        return craft()->templates->render('usacapi/widgets/UsacApiWidget_Body', $variables);
    }
    /**
     * @return int
     */
    public function getColspan()
    {
        return 1;
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

/* -- Variables to pass down to our rendered template */

        $variables = array();
        $variables['settings'] = $this->getSettings();
        return craft()->templates->render('usacapi/widgets/UsacApiWidget_Settings',$variables);
    }

    /**
     * @param mixed $settings  The Widget's settings
     *
     * @return mixed
     */
    public function prepSettings($settings)
    {

/* -- Modify $settings here... */

        return $settings;
    }
}