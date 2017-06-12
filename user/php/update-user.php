<?php
    require_once('../../config.php');
    require_once('../../util.php');

    $id = filter_escape($_POST['id']);
    $name = filter_escape($_POST['uname']);
    $mail = filter_escape($_POST['mail']);
    $dep = filter_escape($_POST['dep']);
    $proj1 = filter_escape($_POST['proj1']);
    $proj2 = filter_escape($_POST['proj2']);
    
    $result = $mysqli->query("UPDATE user SET 
        u_name = '$name', 
        u_mail='$mail',
        u_dep='$dep',
        u_proj1='$proj1',
        u_proj2='$proj2'
        WHERE user.u_id = '$id'");

    echo 1;
?>
