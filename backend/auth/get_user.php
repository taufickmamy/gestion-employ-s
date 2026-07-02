<?php
include_once '../config/database.php';
$email = isset($_GET['email']) ? htmlspecialchars(strip_tags($_GET['email'])) : null;

if ($email) {
    try {
        $query = "SELECT nom, prenom, email, telephone FROM utilisateurs WHERE email = :email LIMIT 1";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(":email", $email);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            echo json_encode(["success" => true, "data" => $user]);
        } else {
            echo json_encode(["success" => false, "message" => "Utilisateur introuvable."]);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Erreur: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Email manan-danja no ilaina."]);
}
?>