<?php
include_once '../config/database.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->nom)) {
    try {
        
        $query = "UPDATE utilisateurs SET nom = :nom, prenom = :prenom, telephone = :telephone WHERE email = :email";
        $stmt = $conn->prepare($query);

        $nom = htmlspecialchars(strip_tags($data->nom));
        $prenom = isset($data->prenom) ? htmlspecialchars(strip_tags($data->prenom)) : "";
        $telephone = isset($data->telephone) ? htmlspecialchars(strip_tags($data->telephone)) : "";
        $email = htmlspecialchars(strip_tags($data->email));

        
        $stmt->bindParam(":nom", $nom);
        $stmt->bindParam(":prenom", $prenom);
        $stmt->bindParam(":telephone", $telephone);
        $stmt->bindParam(":email", $email);

        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Profil mis à jour avec succès !"]);
        } else {
            echo json_encode(["success" => false, "message" => "Impossible de modifier le profil ao amin'ny MySQL."]);
        }
    } catch (Exception $e) {
        
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Erreur SQL: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Données incomplètes. Ny email sy ny nom no tsy maintsy tonga."]);
}
?>