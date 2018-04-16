<?php

$host="localhost";
$username="root";
$password="";
$db_name="games";

$link = mysqli_connect("$host", "$username", "$password")or die("cannot connect"); 
mysqli_select_db($link, "$db_name")or die("cannot select DB");

$sql="SELECT count(distinct(name)) amount from games;";
$result = mysqli_query($link, $sql);
$row = mysqli_fetch_array($result);
$id = $row['amount'];

echo $id;

mysqli_close($link);
?>