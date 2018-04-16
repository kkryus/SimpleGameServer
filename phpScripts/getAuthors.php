<?php

$host="localhost";
$username="root";
$password="";
$db_name="games";

$gameName = $_POST['value'];

$link = mysqli_connect("$host", "$username", "$password")or die("cannot connect"); 
mysqli_select_db($link, "$db_name")or die("cannot select DB");

$sql="select concat(authors.name,\" \", authors.lastName) nazwa from authors, games where id = id_author and games.name = \"". $gameName . "\";";

$result = mysqli_query($link, $sql);

$username_array = array(); 

while($row = mysqli_fetch_array($result)){ 
  $username_array[] = $row['nazwa'];
}

$username_string = implode(",", $username_array);

echo $username_string; 

mysqli_close($link);
?>