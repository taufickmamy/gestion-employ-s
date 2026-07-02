<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->numemp)) {
    $numemp = $data->numemp;

    $query = "DELETE FROM employe WHERE numemp = :numemp";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':numemp', $numemp);

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "L'employé a été supprimé avec succès !"
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Impossible de supprimer l'employé de la base de données."
        ]);
    }
} else {
    echo json_encode([
        "success" => false,
        "message" => "Données incomplètes, numéro employé manquant."
    ]);
}
?>