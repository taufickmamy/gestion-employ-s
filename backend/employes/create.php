<?php
include_once '../config/database.php';
$data = json_decode(file_get_contents("php://input"));

if(!empty($data->numemp) && !empty($data->nom) && !empty($data->salaire)) {
    try {
        $query = "INSERT INTO employe (numemp, nom, salaire) VALUES (:numemp, :nom, :salaire)";
        $stmt = $conn->prepare($query);

        $numemp_clean = htmlspecialchars(strip_tags($data->numemp));
        $nom_clean = htmlspecialchars(strip_tags($data->nom));
        $salaire_clean = htmlspecialchars(strip_tags($data->salaire));

        $stmt->bindParam(":numemp", $numemp_clean);
        $stmt->bindParam(":nom", $nom_clean);
        $stmt->bindParam(":salaire", $salaire_clean);
        if($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "Insertion réussie"]);
        } 
        else {
            echo json_encode(["success" => false, "message" => "Insertion échouée"]);
        }
    } 
    catch(Exception $e) {
        echo json_encode(["success" => false, "message" => "Insertion échouée : Misy mpias"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Données incomplètes"]);
}
?>