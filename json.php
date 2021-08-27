<?php

//include 'index.php';
//include 'questions.js';json_decode($studentAnswerJSON, true)
    
// Save the User's answer JSON
$file = $_REQUEST['answerJsonFile'];
$studentAnswerJSON =  $_REQUEST['studentAnswerJson'];

error_reporting(0);
    

 //convert json object to php associative array
 $data = json_decode($studentAnswerJSON, true);

 $conn = mysqli_connect("localhost","root","","score")or die("ERROR : Unable yto connect $conn".mysqli_connect_error());

/// for demo purpose 
 //get the json details
 
 /*
 $id = $data['empid'];
 $name = $data['personal']['name'];
 $gender = $data['personal']['gender'];
 $age = $data['personal']['age'];
 $streetaddress = $data['personal']['address']['streetaddress'];
 $city = $data['personal']['address']['city'];
 $state = $data['personal']['address']['state'];
 $postalcode = $data['personal']['address']['postalcode'];
 $designation = $data['profile']['designation'];
 $department = $data['profile']['department'];
 */
?>