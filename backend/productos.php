<?php
require_once './database.php';

$response = array();
$response['mensaje'] = '';
$response['productos'] = array(); 

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->prepare("SELECT * FROM `productos`");
    if (!$stmt) {
        die("Sentencia fallo: " . $conn->error);
    }
    if ($stmt->execute()){
        $result = $stmt->get_result();

        while ($row = $result->fetch_assoc()) {
            $response['productos'][] = $row;
        }
        $response['mensaje'] = 'Productos mostrados';
    } else{
        $response['mensaje'] = 'Hubo un error';
    }
    $stmt->close();

}
echo json_encode($response);