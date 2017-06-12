<?php
    require_once('../../config.php');
    require_once('../../util.php');

    $by = filter_escape($_POST['by']);

    if($by=='0')//byTime
        $result = $mysqli->query("SELECT * FROM account JOIN category ON category=c_id JOIN project ON a_proj=p_id JOIN user ON a_user=u_id JOIN dep ON a_dep=d_id WHERE a_active = 1 ORDER BY account.date DESC");
    else if($by=='1')//byAmount
        $result = $mysqli->query("SELECT * FROM account JOIN category ON category=c_id JOIN project ON a_proj=p_id JOIN user ON a_user=u_id JOIN dep ON a_dep=d_id WHERE  a_active = 1 ORDER BY account.amount DESC");
    else if($by=='2')//byCate
        $result = $mysqli->query("SELECT * FROM account JOIN category ON category=c_id JOIN project ON a_proj=p_id JOIN user ON a_user=u_id JOIN dep ON a_dep=d_id WHERE a_active = 1 ORDER BY account.category DESC");
    else if($by=='3')
        $result = $mysqli->query("SELECT * FROM account JOIN category ON category=c_id JOIN project ON a_proj=p_id JOIN user ON a_user=u_id JOIN dep ON a_dep=d_id WHERE a_active = 1 ORDER BY account.a_dep ASC");
    else if($by=='4')//byProj
        $result = $mysqli->query("SELECT * FROM account JOIN category ON category=c_id JOIN project ON a_proj=p_id JOIN user ON a_user=u_id JOIN dep ON a_dep=d_id WHERE a_active = 1 ORDER BY account.a_proj DESC");
    else
        $result = $mysqli->query("SELECT * FROM account JOIN category ON category=c_id JOIN project ON a_proj=p_id JOIN user ON a_user=u_id JOIN dep ON a_dep=d_id WHERE a_active = 1");
        
    //$tmp = $result->fetch_assoc();
    
    //print($tmp['a_proj']);
    
    $list = array();
    while($row = $result->fetch_assoc()){
        array_push($list, $row);
    }
    
    echo json_encode($list);
?>
