<?php
    require_once('../../config.php');
    require_once('../../util.php');

    $result = $mysqli->query("SELECT c_name FROM category WHERE c_active = 1");
    $list = array();
    while($row = $result->fetch_assoc()){
        array_push($list, $row);
    }
    
    echo json_encode($list);
?>
