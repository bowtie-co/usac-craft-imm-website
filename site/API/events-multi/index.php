<?php

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header('Content-Type: application/json');

include_once __DIR__.'/../oauth.class.php';

$page_start = 0;
$page_increment = 20;
$page_end = 420;

$rnot = [];
$lastIn = [
    "null" => null
];

$eid   = ( isset($_GET['eid']) ? $_GET['eid'] : '' );
$name   = ( isset($_GET['name']) ? $_GET['name'] : '' );
$state   = ( isset($_GET['state']) ? $_GET['state'] : '' );
$zip   = ( isset($_GET['zip']) ? $_GET['zip'] : '' );
$category   = ( isset($_GET['type']) ? $_GET['type'] : '' );
$state   = ( isset($_GET['state']) ? $_GET['state'] : '' );
$from   = ( isset($_GET['starts_from']) ? $_GET['starts_from'] : '' );
$radius   = ( isset($_GET['radius']) ? $_GET['radius'] : '' );
$zip   = ( isset($_GET['zip']) ? $_GET['zip'] : '' );
$to   = ( isset($_GET['starts_to']) ? $_GET['starts_to'] : '' );
$page_start   = ( isset($_GET['page_start']) ? $_GET['page_start'] : '0' );
$page_limit   = ( isset($_GET['page_limit']) ? $_GET['page_limit'] : '20' );
// $radius   = ( isset($_GET['radius']) ? $_GET['radius'] : '30' );

$source = ( isset($_GET['source']) ? $_GET['source'] : '' );

while($page_start <= $page_end) {
    $queryS = "";

    if (strlen($name) > 0) {
    $name =  str_replace(" ", '%20', $name);
    $name = strtoupper($name);
    $queryS = $queryS."&name=".$name;
    }
    if (strlen($source) > 0) {
        if($source == "initial") {
            $today = date("Y-m-d");
            $effectiveDate = "";
            $effectiveDate = date('Y-m-d', strtotime("+3 months", strtotime($today)));
            $queryS = $queryS."&from=".$today;
        }
        
    }
    if (strlen($eid) > 0) {
    $queryS = $queryS."&id=".$eid;
    }
    if (strlen($state) > 0) {
    $queryS = $queryS."&state=".$state;
    }
    if (strlen($zip) > 0) {
    $queryS = $queryS."&zip=".$zip;
    }
    if (strlen($category) > 0) {
    $queryS = $queryS."&type=".$category;
    }
    if (strlen($from) > 0) {
    $queryS = $queryS."&from=".$from;
    }
    if (strlen($to) > 0) {
    $queryS = $queryS."&to=".$to;
    }

    if (strlen($radius) > 0) {
    $queryS = $queryS."&radius=".$radius;
    }
    if (strlen($zip) > 0) {
    $queryS = $queryS."&zip=".$zip;
    }

    if (strlen($page_start) > 0) {
    $queryS = $queryS."&page_start=".$page_start;
    }

    $queryS = $queryS."&page_limit=20";
    

    // Create the oauth handler to use below.
    $oauth = new IMMAuth\OauthHandler();


    header('Content-Type: application/json');

    $curl = curl_init();
    curl_setopt_array($curl, array(
    CURLOPT_URL => $oauth->getAPIBase()."/events?".$queryS,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "GET",
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);

    $tmpResponse = json_decode($response);

    if(is_null($tmpResponse)) {
        echo "";
        break;
    }
    if(array_key_exists('error', $tmpResponse)) {
        echo "";
        break;
    }
    // if($response == "null") {
    //     $page_start = $page_end;
    // }

    $rnot = array_merge($rnot,json_decode($response));
    
    

    if($lastIn == $response) {
        $page_start = $page_end;
    }
    
    $lastIn = $response;

    $page_start = $page_start + $page_increment;

} 


echo json_encode($rnot);
