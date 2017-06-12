<?php
    require_once('../../config.php');
    require_once('../../util.php');
    
    $user = filter_escape($_POST['user']);
    $pass = filter_escape($_POST['pass']);
    
    
    $result = $mysqli->query("SELECT * FROM user WHERE
        u_user = '$user'
        AND
        u_active = 1
    ");
      
    //user not found
    if($result->num_rows === 0){
        echo 0;
    }
    else{     
        $row = $result->fetch_assoc();
        if($pass === $row['u_pass'])
            echo 1;
        else
            echo 0;
    }
?>
