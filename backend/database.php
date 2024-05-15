<?php
$host = "mysql_database:3306";
$dbname = "cycle";
$username = "root";
$password = "";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_errno) {
    die("Connection error: " . $conn->connect_error);
}

return $conn;