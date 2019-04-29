<?php
namespace Craft;

class UsacApi_EventsService extends BaseApplicationComponent {

 public function GetEvents($from) {
   $curl = curl_init();

   curl_setopt_array($curl, array(
     // CURLOPT_URL => "https://api.usacycling.org/events?name=".$name."&state=".$state."&zip=".$zip."&category=".$category."&state=".$state."&from=".$from."&to=".$to."&page_start=".$page_start."&page_limit=".$page_limit,
     CURLOPT_URL => "https://stage-api.usacycling.org/events?from=".$from."&page_limit=10",
     CURLOPT_RETURNTRANSFER => true,
     CURLOPT_TIMEOUT => 30,
     CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
     CURLOPT_CUSTOMREQUEST => "GET",
     // CURLOPT_HTTPHEADER => array(
     //   "Authorization: Bearer ".$token_parsed["access_token"]
     // ),
   ));

   $response = curl_exec($curl);
   $err = curl_error($curl);

   curl_close($curl);

   return json_decode($response);
 }

 public function GetPastEvents($start, $end) {
   $curl = curl_init();

   curl_setopt_array($curl, array(
     // CURLOPT_URL => "https://api.usacycling.org/events?name=".$name."&state=".$state."&zip=".$zip."&category=".$category."&state=".$state."&from=".$from."&to=".$to."&page_start=".$page_start."&page_limit=".$page_limit,
     CURLOPT_URL => "https://stage-api.usacycling.org/events?from=".$start."&to=".$end."&page_limit=10",
     CURLOPT_RETURNTRANSFER => true,
     CURLOPT_TIMEOUT => 30,
     CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
     CURLOPT_CUSTOMREQUEST => "GET",
     // CURLOPT_HTTPHEADER => array(
     //   "Authorization: Bearer ".$token_parsed["access_token"]
     // ),
   ));

   $response = curl_exec($curl);
   $err = curl_error($curl);

   curl_close($curl);

   return json_decode($response);
 }

}
