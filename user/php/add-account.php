<?php
    require_once('../../config.php');
    require_once('../../util.php');

    $date = filter_escape($_POST['date']);
    $category = filter_escape($_POST['category']);
    $amount = filter_escape($_POST['amount']);
    $user = filter_escape($_POST['user']);
    $commit = filter_escape($_POST['commit']);
    
    $proj = $mysqli->query("SELECT u_proj1, u_dep FROM user WHERE u_id='$user'");
    $row = $proj->fetch_assoc();
    
    
    $result = $mysqli->query("INSERT INTO account SET
        num=0,
        a_active=1,
        date='$date',
        amount='$amount',
        category='$category',
        commit='$commit',
        a_user='$user',
        a_proj={$row['u_proj1']},
        a_dep={$row['u_dep']}
        ");
    echo 1;
?>
