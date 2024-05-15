<?php
//host para docker
$host = "daw-db";
//host para local
//$host = "localhost";
$dbname = "cycle";
$username = "root";
//contraseña local
//$password = "";
//contraseña para el servidor
$password = "root";


$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_errno) {
    die("Connection error: " . $conn->connect_error);
}

return $conn;