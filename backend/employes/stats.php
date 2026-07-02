<?php
include_once '../config/database.php';

$qG = $conn->query("SELECT SUM(salaire) as total, MIN(salaire) as minimal, MAX(salaire) as maximal FROM employe");
$bilan = $qG->fetch(PDO::FETCH_ASSOC);

$qA = $conn->query("SELECT salaire FROM employe");
$cats = ["médiocre" => 0, "moyen" => 0, "grand" => 0];
while($r = $qA->fetch()) {
    $s = (float)$r['salaire'];
    if($s < 1000) $cats["médiocre"]++;
    elseif($s <= 5000) $cats["moyen"]++;
    else $cats["grand"]++;
}

echo json_encode([
    "total" => $bilan['total'] ?? 0,
    "minimal" => $bilan['minimal'] ?? 0,
    "maximal" => $bilan['maximal'] ?? 0,
    "chartData" => array_values($cats),
    "labels" => array_keys($cats)
]);
?>