<?php
    require_once('../../config.php');
    require_once('../../util.php');

    $user = filter_escape($_POST['id']);

    $result = $mysqli->query("SELECT a.p_name AS proj1, b.p_name AS proj2, d.d_name AS department, u.* FROM user u 
            JOIN dep d ON d.d_id=u.u_dep
            JOIN project a ON a.p_id=u.u_proj1
            JOIN project b ON b.p_id=u.u_proj2            
            WHERE 
                u_id='$user'
            AND
                u_active=1");
    
    $list = array();
    while($row = $result->fetch_assoc()){
        array_push($list, $row);
    }
    
    echo json_encode($list);
?>
