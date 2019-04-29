<?php

/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/general.php
 */

return array(

	'*' => array(
		'defaultWeekStartDay' => 0,
		'enableCsrfProtection' => true,
		'omitScriptNameInUrls' => 'auto',
		'cpTrigger' => 'usac-admin',
		'devMode' => false,
		'environmentVariables' => array(
			'siteUrl' => '//www.usacycling.org',
			'maxUploadFileSize' => 33554432,
		)
	),

	'.org' => array(
		'defaultWeekStartDay' => 0,
		'enableCsrfProtection' => true,
		'omitScriptNameInUrls' => 'auto',
		'cpTrigger' => 'usac-admin',
		'devMode' => false,
		'environmentVariables' => array(
			'siteUrl' => '//www.usacycling.org',
		)
	),

	'staging.immdemo' => array(
		'defaultWeekStartDay' => 0,
		'enableCsrfProtection' => true,
		'omitScriptNameInUrls' => 'auto',
		'cpTrigger' => 'usac-admin',
		'devMode' => false,
		'environmentVariables' => array(
			'siteUrl' => '//usac.staging.immdemo.com',
		)
	),

	'.localhost' => array(
		'defaultWeekStartDay' => 0,
		'enableCsrfProtection' => true,
		'omitScriptNameInUrls' => true,
		'cpTrigger' => 'usac-admin',
		'devMode' => true,
		'environmentVariables' => array(
			'siteUrl' => '//usac.localhost',
		)
	),
);
