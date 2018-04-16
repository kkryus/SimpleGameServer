<?php

$host="localhost";
$username="root";
$password="";
$db_name="games";

$link = mysqli_connect("$host", "$username", "$password")or die("cannot connect"); 
mysqli_select_db($link, "$db_name")or die("cannot select DB");


$sql="SELECT distinct(name) from games;";
$result = mysqli_query($link, $sql);

$username_array = array();

while($row = mysqli_fetch_array($result)){
  $username_array[] = $row['name'];
}

$username_string = implode(",", $username_array);

echo $username_string; 

mysqli_close($link);
?>