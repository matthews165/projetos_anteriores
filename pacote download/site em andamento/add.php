<?php  

    include('config/db.connect.php');

$title = $email = $valor = '';

$errors = array('email'=>'','title'=>'','valor'=>'');

if(isset($_POST['submit'])){

    if(empty($_POST['email'])){
        $errors['email'] = 'email must be a valid email address';
    } else {
        $email = $_POST['email'];
        if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            $errors['email'] = 'email must be a valid email address';
        }
    }

    if(empty($_POST['title'])){
        $errors['title'] = 'title must be letters and spaces only';
    } else {
        $title = $_POST['title'];
        if(!preg_match('/^[a-zA-Z0-9\s]+$/', $title)){
            $errors['title'] = 'title must be letters and spaces only';
        }
    }

    if(empty($_POST['valor'])){
        $errors['valor'] = 'Valor precisa ser com virgula';
    } else {
        $valor = $_POST['valor'];
        if(!preg_match('/^[0-9\s]+$/', $valor)){
            $errors['valor'] = 'ingredients must be a comma separated list';
        }
    }

    if(!array_filter($errors)){   
        
        
        $email = mysqli_real_escape_string($conn, $_POST['email']);
        $title = mysqli_real_escape_string($conn, $_POST['title']);
        $valor = mysqli_real_escape_string($conn, $_POST['valor']);
        
        $sql = "INSERT INTO peças(title,email,valor) VALUES('$title', '$email','$valor')";
        
        //save to database and check
        if(mysqli_query($conn,$sql)){
            //success
            header('location: index.php');
        } else{
            //error
            echo 'query error: ' .mysqli_error($conn);
        }
        
        
    } 

}

?>

<!DOCTYPE html>
<html lang="en">

    <?php include('templates/header.php'); ?>

    <section class="container grey-text">
        <h4 class="center">Criar seu Anúncio</h4>
        <form action="add.php" class="white" method="POST">
            <label>Seu Email:</label>
            <input type="text" name="email" value="<?php echo htmlspecialchars ($email) ?>">
            <div class="red-text"><?php echo $errors['email']; ?></div>
            <label>Nome da Peças:</label>
            <input type="text" name="title" value="<?php echo htmlspecialchars ($title) ?>">
            <div class="red-text"><?php echo $errors['title']; ?></div>
            <label>Valor (separado por virgula):</label>
            <input type="text" name="valor"value="<?php echo htmlspecialchars ($valor) ?>">
            <div class="red-text"><?php echo $errors['valor']; ?></div>
            <div class="center">
                <input type="submit" name="submit" value="submit" class="btn brand z-depth-0">
            </div>
        </form>
    </section>

    <?php include('templates/footer.php'); ?>
   
    

</html>
