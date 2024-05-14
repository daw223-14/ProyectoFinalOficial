<?php
// Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Origin: *");
// Permitir solicitudes con los métodos GET, POST, PUT, DELETE y OPTIONS
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
// Permitir que las solicitudes incluyan las siguientes cabeceras
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");