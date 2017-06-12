<?php
    require_once('../../config.php');
    require_once('../../util.php');

    $name = filter_escape($_POST['name']);
    $mail = filter_escape($_POST['mail']);
    $user = filter_escape($_POST['user']);
    $pass = filter_escape($_POST['pass']);
    
    //check re-signup
    $result = $mysqli->query("SELECT * FROM user WHERE
        u_user='$user' AND u_active=1 
        OR 
        u_mail='$mail' AND u_active=1
        ");
        
    if($result->num_rows===0){
        $result = $mysqli->query("INSERT INTO user SET
            num=0,
            u_name = '$name',
            u_mail = '$mail',
            u_user = '$user',
            u_pass = '$pass',
            create_time = now(),
            u_active = 1"
        );
        $result = $mysqli->query("SELECT * FROM user WHERE
            u_name = '$name' AND
            u_mail = '$mail' AND
            u_user = '$user' AND
            u_pass = '$pass'
        ");
        $row = $result->fetch_assoc();      
        $result = $mysqli->query("UPDATE user SET u_id={$row['num']} WHERE num={$row['num']}");
        echo 1;
    }
    else
        echo 0;
?>
