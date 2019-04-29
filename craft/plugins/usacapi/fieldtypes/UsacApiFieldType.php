<?php
/**
 * usac api plugin for Craft CMS
 *
 * UsacApi FieldType
 *
 * @author    IMM
 * @copyright Copyright (c) 2018 IMM
 * @link      https://imm.com
 * @package   UsacApi
 * @since     1.0.0
 */

namespace Craft;

class UsacApiFieldType extends BaseFieldType
{
    /**
     * @return mixed
     */
    public function getName()
    {
        return Craft::t('UsacApi');
    }

    /**
     * @return mixed
     */
    public function defineContentAttribute()
    {
        return AttributeType::Mixed;
    }

    /**
     * @param string $name
     * @param mixed  $value
     * @return string
     */
    public function getInputHtml($name, $value)
    {
        if (!$value)
            $value = new UsacApiModel();

        $id = craft()->templates->formatInputId($name);
        $namespacedId = craft()->templates->namespaceInputId($id);

/* -- Include our Javascript & CSS */

        craft()->templates->includeCssResource('usacapi/css/fields/UsacApiFieldType.css');
        craft()->templates->includeJsResource('usacapi/js/fields/UsacApiFieldType.js');

/* -- Variables to pass down to our field.js */

        $jsonVars = array(
            'id' => $id,
            'name' => $name,
            'namespace' => $namespacedId,
            'prefix' => craft()->templates->namespaceInputId(""),
            );

        $jsonVars = json_encode($jsonVars);
        craft()->templates->includeJs("$('#{$namespacedId}-field').UsacApiFieldType(" . $jsonVars . ");");

/* -- Variables to pass down to our rendered template */

        $variables = array(
            'id' => $id,
            'name' => $name,
            'namespaceId' => $namespacedId,
            'values' => $value
            );

        return craft()->templates->render('usacapi/fields/UsacApiFieldType.twig', $variables);
    }

    /**
     * @param mixed $value
     * @return mixed
     */
    public function prepValueFromPost($value)
    {
        return $value;
    }

    /**
     * @param mixed $value
     * @return mixed
     */
    public function prepValue($value)
    {
        return $value;
    }
}