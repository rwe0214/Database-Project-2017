<?php
    require_once('../../config.php');
    require_once('../../util.php');
    
    $type = filter_escape($_POST['type']);
    $user = filter_escape($_POST['u_id']);
    $proj = filter_escape($_POST['p_id']);
    $dep = filter_escape($_POST['d_id']);
    
    if($type=='1')
        $result = $mysqli->query("SELECT a.p_name AS proj1, b.p_name AS proj2, d.d_name AS department, u.* FROM user u 
            JOIN dep d ON d.d_id=u.u_dep
            JOIN project a ON a.p_id=u.u_proj1
            JOIN project b ON b.p_id=u.u_proj2            
            WHERE 
                u_id='$user'
            AND
                u_active=1
            ");
    else if($type=='2')
        $result = $mysqli->query("SELECT a.p_name AS proj1, b.p_name AS proj2, d.d_name AS department, u.* FROM user u 
            JOIN dep d ON d.d_id=u.u_dep
            JOIN project a ON a.p_id=u.u_proj1
            JOIN project b ON b.p_id=u.u_proj2            
            WHERE 
                u_proj1='$proj'
            OR
                u_proj2='$proj'
            ");
    else
        $result = $mysqli->query("SELECT a.p_name AS proj1, b.p_name AS proj2, d.d_name AS department, u.* FROM user u 
            JOIN dep d ON d.d_id=u.u_dep
            JOIN project a ON a.p_id=u.u_proj1
            JOIN project b ON b.p_id=u.u_proj2            
            WHERE 
                u_dep='$dep'
            AND
                u_active=1
            ");
    
    $list = array();
    while($row = $result->fetch_assoc()){
        array_push($list, $row);
    }
    
    
    echo json_encode($list);
?>
