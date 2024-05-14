<?php
require_once './database.php';
require './cors.php';
$response = array();
$response['mensaje'] = '';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Consulta para obtener productos
    $stmtProductos = $conn->prepare("SELECT * FROM `productos`");
    if (!$stmtProductos) {
        $response['mensaje'] = 'Hubo un error al preparar la consulta para obtener productos';
    } else {
        if ($stmtProductos->execute()) {
            $resultProductos = $stmtProductos->get_result();
            $response['productos'] = $resultProductos->fetch_all(MYSQLI_ASSOC);
            $response['mensaje'] = 'Productos mostrados';
        } else {
            $response['mensaje'] = 'Hubo un error al ejecutar la consulta para obtener productos';
        }
        $stmtProductos->close();
    }

    // Consulta para obtener tallas
    $stmtTallas = $conn->prepare("SELECT * FROM `tallas`");
    if (!$stmtTallas) {
        $response['mensaje'] = 'Hubo un error al preparar la consulta para obtener tallas';
    } else {
        if ($stmtTallas->execute()) {
            $resultTallas = $stmtTallas->get_result();
            $response['tallas'] = $resultTallas->fetch_all(MYSQLI_ASSOC);
            $response['mensaje'] = 'Tallas mostradas';
        } else {
            $response['mensaje'] = 'Hubo un error al ejecutar la consulta para obtener tallas';
        }
        $stmtTallas->close();
    }

    // Consulta para obtener infoProductos
    $stmtInfoPro = $conn->prepare("SELECT * FROM `infoProductos`");
    if (!$stmtInfoPro) {
        $response['mensaje'] = 'Hubo un error al preparar la consulta para obtener infoProductos';
    } else {
        if ($stmtInfoPro->execute()) {
            $resultInfoPro = $stmtInfoPro->get_result();
            $response['infoProductos'] = $resultInfoPro->fetch_all(MYSQLI_ASSOC);
            $response['mensaje'] = 'InfoProductos mostrados';
        } else {
            $response['mensaje'] = 'Hubo un error al ejecutar la consulta para obtener infoProductos';
        }
        $stmtInfoPro->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Manejar la inserción de datos en la tabla infoProductos
    $productoID = $_POST['productoID'];
    $tallaID = $_POST['tallaID'];

    $stmtInsert = $conn->prepare("INSERT INTO `infoProductos` (productoID, tallaID) VALUES (?, ?)");
    if (!$stmtInsert) {
        $response['mensaje'] = 'Hubo un error al preparar la consulta para insertar';
    } else {
        $stmtInsert->bind_param("ii", $productoID, $tallaID);
        if ($stmtInsert->execute()) {
            $response['mensaje'] = 'Talla insertada correctamente';
        } else {
            $response['mensaje'] = 'Hubo un error al insertar los datos';
        }
        $stmtInsert->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE'){
    $data = json_decode(file_get_contents('php://input'), true);

    $productoID = $data['productoID'];
    $tallaID = $data['tallaID'];

    $sql = "DELETE FROM `infoProductos` WHERE productoID = $productoID AND tallaID = $tallaID";

    if ($conn->query($sql) === TRUE) {
        $response['mensaje'] = "Talla eliminada correctamente";
    } else {
        $response['mensaje'] = "Error al eliminar el producto: ";
    }

}

$conn->close();
echo json_encode($response);
