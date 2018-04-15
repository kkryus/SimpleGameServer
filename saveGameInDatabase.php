<?php

$firstName = $_POST['firstNameAuthor'];
$firstLastName = $_POST['firstLastNameAuthor'];
$gameName = $_POST['gameName'];
$secondName = $_POST['secondNameAuthor'];
$secondLastName = $_POST['secondLastNameAuthor'];

$host="localhost";
$username="root";
$password="";
$db_name="games";

$link = mysqli_connect("$host", "$username", "$password")or die("cannot connect"); 
mysqli_select_db($link, "$db_name")or die("cannot select DB");

$sql="INSERT into authors (name, lastName) values ('" . $firstName ."', '" . $firstLastName . "')";
$result = mysqli_query($link, $sql);

$sql="SELECT id from authors where name = '" . $firstName . "' and lastName = '" . $firstLastName . "'";
$result = mysqli_query($link, $sql);

$row = mysqli_fetch_array($result);
$id = $row['id'];

$sql="INSERT into games (name, id_author) values ('" . $gameName ."', '" . $id . "')";
$result = mysqli_query($link, $sql);


if(!empty($secondName) && !empty($secondLastName))
{
	$sql="INSERT into authors (name, lastName) values ('" . $secondName ."', '" . $secondLastName . "')";
	$result = mysqli_query($link, $sql);
	
	$sql="SELECT id from authors where name = '" . $secondName . "' and lastName = '" . $secondLastName . "'";
	$result = mysqli_query($link, $sql);

	$row = mysqli_fetch_array($result);
	$id = $row['id'];

	$sql="INSERT into games (name, id_author) values ('" . $gameName ."', '" . $id . "')";
	$result = mysqli_query($link, $sql);
}
mysqli_close($link);
?>