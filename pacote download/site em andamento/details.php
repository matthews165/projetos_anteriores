<?php 

    
    include('config/db.connect.php');

    if(isset($_POST['delete'])){
        $id_to_delete = mysqli_real_escape_string($conn, $_POST['id_to_delete']);

        $sql = "DELETE FROM peças WHERE id = $id_to_delete";

        if(mysqli_query($conn,$sql)){
            header('Location: index.php');
        } {
            echo 'query error: ' . mysqli_error($conn);
        }

    }

    //check GET request id param
    if(isset($_GET['id'])){

        $id = mysqli_real_escape_string($conn, $_GET['id']);

        //make sql
        $sql = "SELECT * FROM peças WHERE id = $id";

        //get the query result
        $result = mysqli_query($conn, $sql);

        //fetch result in array format
        $peças = mysqli_fetch_assoc($result);

        mysqli_free_result($result);
        mysqli_close($conn);

    }


?>

<!DOCTYPE html>
<html>

<?php include('templates/header.php'); ?>

    <div class="container center grey-text">
        <?php if($peças): ?>
        
            <h4><?php echo htmlspecialchars($peças['title']); ?></h4>
            <p>Anúnciado por: <?php echo htmlspecialchars($peças['email']); ?></p>
            <p><?php echo date($peças['creat_at']); ?></p>
            <h5>Valor :</h5>
            <p><?php echo htmlspecialchars($peças['valor']); ?>R$</p>

            <!-- delete form -->

            <form action="details.php" method="POST">
                <input type="hidden" name="id_to_delete" value="<?php echo $peças['id'] ?>">
                <input type="submit" name="delete" value="delete" class="btn brand z-depth-0">
            </form>
            
        <?php else: ?>

            <h5>pagina invalida </h5>

        <?php endif; ?>
    </div>

<?php include('templates/footer.php'); ?>

</html>