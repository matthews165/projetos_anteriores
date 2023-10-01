<?php

//conect to data base
    $conn = mysqli_connect('localhost','shaun','test1234','auto_peças');
    
    //check connection

    if(!$conn){
        echo 'Connection error: ' .mysqli_connect_error();
    }

?>
