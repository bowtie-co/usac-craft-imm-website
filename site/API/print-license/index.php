<?php
require_once 'dompdf/autoload.inc.php';

use Dompdf\Dompdf;

$licenseDetails   = (isset($_POST['print-license-details']) ? $_POST['print-license-details'] : '' );
$licenseTitle   = (isset($_POST['print-license-title']) ? $_POST['print-license-title'] : '' );
$licenseExp   = (isset($_POST['print-license-expiry']) ? $_POST['print-license-expiry'] : '' );
$licenseProfile   = (isset($_POST['license-details-profile']) ? $_POST['license-details-profile'] : '' );
$pendDetails = (isset($_POST['print-pend-details']) ? $_POST['print-pend-details'] : '' ); 

$profileOutput = json_decode($licenseProfile);
$output = str_replace("<h5>License Details</h5>","",$licenseDetails);

$birthDate = $profileOutput->dob;

$birthDate = explode("-", $birthDate);

$age = (date("md", date("U", mktime(0, 0, 0, $birthDate[2], $birthDate[1], $birthDate[0]))) > date("md") ? ((date("Y")-$birthDate[0])-1):(date("Y")-$birthDate[0]));

$dompdf = new Dompdf();
$dompdf->loadHTML('<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>title</title>
    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
        }
        h1 {
            font-size: 24px;
        }
        h2 {
            text-decoration: underline;
            font-size: 18px;
        }
        h3 {
            margin-bottom: 5px;
            margin-top: 5px;
            padding: 0px;
            font-size: 16px;
        }
        h5 {
            margin: 0px;
            padding: 0px;
            font-size: 14px;
        }
    </style>
  </head>
  <body>
    <table style="width: 94%;">
        <tr>
            <td>
                <img src="../../images/USACycling_Logo.png" />
            </td>
            <td>
                <h1>USA Cycling Authorization to Race Receipt</h1>
            </td>
        </tr>
    </table>
    <h2>Account Information</h2>
    <table cellpadding=3 cellspacing=5>
        <tr>
            <td>
                <strong>Name:</strong>&nbsp;'.$profileOutput->first_name.'&nbsp;'.$profileOutput->last_name.'
            </td>
            <td>
            </td>
        </tr>
        <tr>
            <td><strong>USA Cycling #:</strong>&nbsp;'.$profileOutput->comp_id.'</td>
            <td><strong>Preferred Phone:</strong>&nbsp;'.$profileOutput->work_phone.'</td>
        </tr>
        <tr>
            <td>
                <strong>Date of Birth:</strong>&nbsp;'.$profileOutput->dob.'
            </td>
            <td>
                <strong>Primary Email Address:</strong>&nbsp;'.$profileOutput->email.'
            </td>
        </tr>
        <tr>
            <td>
                <strong>UCI ID:</strong>&nbsp;N/A
            </td>
            <td>
                <strong>Username:</strong>&nbsp;'.$profileOutput->user_id.'
            </td>
        </tr>
        <tr>
            <td>
                <strong>Citizen:</strong>&nbsp;N/A
            </td>
            <td>
                <strong>Emergency Contact:</strong>&nbsp;'.$profileOutput->emergency_name.'
            </td>
        </tr>
        <tr>
            <td><strong>Racing Age:</strong>&nbsp;'.$age.'</td>
            <td>
                <strong>Emergency Contact Phone:</strong>&nbsp;'.$profileOutput->emergency_phone.'
            </td>
        </tr>
        <tr>
            <td>
                <strong>Member Since:</strong>&nbsp;N/A
            </td>
            <td></td>
        </tr>
        <tr>
            <td>
                <strong>Gender:</strong>&nbsp;'.$profileOutput->gender.'
            </td>
            <td></td>
        </tr>
        <tr>
            <td>
                <strong>Address:</strong><br />'
                .$profileOutput->address.'<br />'
                .$profileOutput->city.', '.$profileOutput->state.' '.$profileOutput->zip.
                '</td>
            <td></td>
        </tr>
    </table>
    <h2>License</h2>
    <h3>'.$licenseTitle.'</h3>
    '
    .$output.
    '
    <p style="font-size:14px;"><br /><strong>License Expires:</strong>&nbsp;'.$licenseExp.'</p>
    <p>'.$pendDetails.'</p>
    </body>
</html>');

$dompdf->setPaper('A4', 'portrait');

$dompdf->render();

$dompdf->stream();