<?php
include_once '../config/database.php';

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->email) && !empty($data->password)) {
    $query = "SELECT * FROM utilisateurs WHERE email = :email AND password = :password";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(":email", $data->email);
    $stmt->bindParam(":password", $data->password);
    $stmt->execute();

    if($stmt->rowCount() > 0) {
        echo json_encode(["success" => true, "token" => "token-fotsiny", "message" => "Connexion réussie"]);
    } else {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Email ou Password incorrecte!"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Veuillez remplir les informations manquantes!"]);
}
?>