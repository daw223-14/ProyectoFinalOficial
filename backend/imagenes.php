<?php
require_once './database.php';

$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
  $sql = "SELECT * FROM imagenes";
  $result = $conn->query($sql);
  
  if ($result->num_rows > 0) {
    $images = array();
    while($row = $result->fetch_assoc()) {
      $images[] = $row;
    }
    $response['success'] = true;
    $response['data'] = $images;
  } else {
    $response['success'] = false;
    $response['message'] = "No se encontraron imágenes";
  }
  header('Content-Type: application/json');
  echo json_encode($response);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  if (isset($_FILES['image'])) {
    $target_dir = "src/assets/";
    $target_file = $target_dir . basename($_FILES["image"]["name"]);
    
    if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
      $sql = "INSERT INTO imagenes (foto) VALUES ('$target_file')";
      
      if ($conn->query($sql) === TRUE) {
        $response['success'] = true;
        $response['message'] = "Imagen agregada correctamente";
      } else {
        $response['success'] = false;
        $response['message'] = "Error al agregar la imagen: " . $conn->error;
      }
    } else {
      $response['success'] = false;
      $response['message'] = "Error al subir la imagen";
    }
  }
  header('Content-Type: application/json');
  echo json_encode($response);
}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
  parse_str(file_get_contents("php://input"), $delete_vars);
  $imagenID = $delete_vars['imagenID'];
  
  $sql = "DELETE FROM imagenes WHERE imagenID = $imagenID";
  
  if ($conn->query($sql) === TRUE) {
    $response['success'] = true;
    $response['message'] = "Imagen eliminada correctamente";
  } else {
    $response['success'] = false;
    $response['message'] = "Error al eliminar la imagen: " . $conn->error;
  }
  header('Content-Type: application/json');
  echo json_encode($response);
}

$conn->close();
?>
