<?php
    require_once('../../config.php');
    require_once('../../util.php');

    $target = filter_escape($_POST['target']);
    
    debug_to_console($target);
    debug_to_console('123');
    
    $result = $mysqli->query("UPDATE account SET
        a_active=0 
        WHERE
        account.num = '$target'
        ");
    echo 1;
?>
