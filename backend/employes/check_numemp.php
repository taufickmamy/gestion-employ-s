<?php
include_once '../config/database.php';
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->numemp)) {
    try {
        $query = "SELECT COUNT(*) AS count FROM employe WHERE numemp = :numemp";
        $stmt = $conn->prepare($query);
        $numemp_clean = htmlspecialchars(strip_tags($data->numemp));
        $stmt->bindParam(":numemp", $numemp_clean);
        $stmt->execute();
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row['count'] > 0) {
            echo json_encode(["success" => true, "exists" => true]);
        } else {
            echo json_encode(["success" => true, "exists" => false]);
        }
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Numero employe requis"]);
}
?>
