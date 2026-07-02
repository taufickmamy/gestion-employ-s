<?php
include_once '../config/database.php';

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->numemp) && !empty($data->nom) && !empty($data->salaire)) {
    try {
        
        $query = "UPDATE employe SET nom = :nom, salaire = :salaire WHERE numemp = :numemp";
        $stmt = $conn->prepare($query);
        
        // securité
        $nom = htmlspecialchars(strip_tags($data->nom));
        $salaire = htmlspecialchars(strip_tags($data->salaire));
        $numemp = htmlspecialchars(strip_tags($data->numemp));

        // Lier les paramètres
        $stmt->bindParam(":nom", $nom);
        $stmt->bindParam(":salaire", $salaire);
        $stmt->bindParam(":numemp", $numemp);

        if($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["success" => true, "message" => "Modification réussie"]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Modification échouée"]);
        }
    } catch(Exception $e) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Erreur : " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Données incomplètes"]);
}
?>