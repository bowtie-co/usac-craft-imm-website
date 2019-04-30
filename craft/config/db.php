<?php
/**
 * Database Configuration
 *
 * All of your system's database configuration settings go in here.
 * You can see a list of the default settings in craft/app/etc/config/defaults/db.php
 */
return array(
	"*" => array(
		'tablePrefix' => 'craft',
	),
	".org" => array(
		'server' => 'usac-craft-dev-dbcluster-arnu1g5z1sa6.cluster-clj0ec3twiv7.us-east-1.rds.amazonaws.com',
		'database' => 'usa_cycling_uat',
		'user' => 'usac_user',
		'password' => 'KjYzK4N4b5iJaJactD',
		'tablePrefix' => 'craft',
	),
	"staging.immdemo" => array(
		'server' => 'db01.staging.immdemo.com',
		'database' => 'usa_cycling_uat',
		'user' => 'usac_user',
		'password' => 'KjYzK4N4b5iJaJactD',
		'tablePrefix' => 'craft',
	),
	".localhost" => array(
        'server' => 'mysql',
        'database' => 'usa_cycling_uat',
        'user' => 'usac_user',
        'password' => 'KjYzK4N4b5iJaJactD',
        'tablePrefix' => 'craft',
	),
);
