<?php
include_once '../config/database.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->email) && !empty($data->ancienMdp) && !empty($data->nouveauMdp)) {
    try {
        // 1. Récupérer le mot de passe actuel de l'utilisateur en BDD
        $query = "SELECT password FROM utilisateurs WHERE email = :email";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":email", $data->email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            // 2. Vérification de l'ancien mot de passe (adapte si tu utilises password_verify)
            if ($user['password'] === $data->ancienMdp) {
                
                // 3. Mise à jour avec le nouveau mot de passe
                $updateQuery = "UPDATE utilisateurs SET password = :nouveauMdp WHERE email = :email";
                $updateStmt = $conn->prepare($updateQuery);
                $updateStmt->bindParam(":nouveauMdp", $data->nouveauMdp);
                $updateStmt->bindParam(":email", $data->email);

                if ($updateStmt->execute()) {
                    echo json_encode(["success" => true, "message" => "Mot de passe modifié avec succès !"]);
                } else {
                    echo json_encode(["success" => false, "message" => "Impossible de modifier le mot de passe."]);
                }
            } else {
                echo json_encode(["success" => false, "message" => "L'ancien mot de passe est incorrect."]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Utilisateur introuvable."]);
        }
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Erreur: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Données incomplètes."]);
}
?>