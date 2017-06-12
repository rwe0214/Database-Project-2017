<?php

//Turn off all error reporting
    error_reporting(0);
    
    $mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name) or die('Error with My SQL connection');
    $mysqli->query("SET NAMES 'utf8'") or die('Error encoding');
    
    date_default_timezone_set("Asia/Taipei");

    function filter_escape($str){
        $link = mysqli_connect("localhost", 'root', "", '105_project') or die($link);
        $str = htmlspecialchars($str);
        return mysqli_real_escape_string($link, $str);
    }
    function debug_to_console( $data ) {
        $output = $data;
        if ( is_array( $output ) )
            $output = implode( ',', $output);

        echo "<script>console.log( 'Debug Objects: " . $output . "' );</script>";
    }
?>
