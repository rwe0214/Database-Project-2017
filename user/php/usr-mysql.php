<?php
    require_once('../../config.php');
    require_once('../../util.php');
    
    $sql = $_POST['sql'];
    
    
    
    $result = $mysqli->query("$sql");
   
    
    $list = array();
    while($row = $result->fetch_assoc()){
        array_push($list, $row);
    }
    
    
    echo json_encode($list);
?>
