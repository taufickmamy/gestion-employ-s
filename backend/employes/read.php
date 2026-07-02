<?php
include_once '../config/database.php';

try {
    $query = "SELECT numemp, nom, salaire FROM employe ORDER BY numemp ASC";
    $stmt = $conn->prepare($query);
    $stmt->execute();

    $employes = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $salaire = (float)$row['salaire'];
        $obs = "";

        
        if ($salaire < 1000) $obs = "médiocre";
        elseif ($salaire <= 5000) $obs = "moyen";
        else $obs = "grand";

        $employes[] = [
            "numemp" => $row['numemp'],
            "nom" => $row['nom'],
            "salaire" => $salaire,
            "obs" => $obs
        ];
    }
    echo json_encode($employes);
} catch (Exception $e) {
    echo json_encode([]);
}
?>