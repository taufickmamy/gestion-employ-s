<?php
// Antsoina ny configuration miaraka amin'ny Headers CORS rehetra
include_once '../config/database.php';

try {
    // Alaina ny numemp ambony indrindra ao amin'ny table
    $query = "SELECT MAX(numemp) AS max_id FROM employe";
    $stmt = $conn->prepare($query);
    $stmt->execute();
    
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $next_id = 1; // Raha mbola banga ny table dia 1 no atomboka

    if ($row['max_id'] !== null) {
        $next_id = intval($row['max_id']) + 1;
    }

    // Averina amin'i React ilay laharana manaraka
    echo json_encode(["success" => true, "next_id" => $next_id]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}
?>