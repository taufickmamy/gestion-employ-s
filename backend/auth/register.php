<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

include_once '../config/database.php';

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->nom) && !empty($data->prenom) && !empty($data->email) && !empty($data->telephone) && !empty($data->password)) {
    try {
        $query = "INSERT INTO utilisateurs (nom, prenom, email, telephone, password) VALUES (:nom, :prenom, :email, :telephone, :password)";
        $stmt = $conn->prepare($query);
        
        $nom = htmlspecialchars(strip_tags($data->nom));
        $prenom = htmlspecialchars(strip_tags($data->prenom));
        $email = htmlspecialchars(strip_tags($data->email));
        $telephone = htmlspecialchars(strip_tags($data->telephone));
        $password = htmlspecialchars(strip_tags($data->password));

        $stmt->bindParam(":nom", $nom);
        $stmt->bindParam(":prenom", $prenom);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":telephone", $telephone);
        $stmt->bindParam(":password", $password);

        if($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Compte créé avec succès !"]);
        } else {
            echo json_encode(["success" => false, "message" => "Échec de l'inscription."]);
        }
    } catch(Exception $e) {
        echo json_encode(["success" => false, "message" => "Email déja existe!"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Veuillez remplir les informations manquantes!"]);
}
?>