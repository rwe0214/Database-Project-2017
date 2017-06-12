<?php
    require_once('../../config.php');
    require_once('../../util.php');

    $result = $mysqli->query("SELECT SUM(amount) total FROM account JOIN category ON category=c_id JOIN project ON a_proj=p_id JOIN user ON a_user=u_id JOIN dep ON a_dep=d_id WHERE a_active = 1");
    
    $list = array();
    while($row = $result->fetch_assoc()){
        array_push($list, $row);
    }
    
    echo json_encode($list);
?>
