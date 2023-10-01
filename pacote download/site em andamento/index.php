<?php  

    include('config/db.connect.php');


    // write query fro all 

    $sql = 'SELECT title, valor, id  FROM peças ORDER BY creat_at';

    // make query & get result
    $result = mysqli_query($conn, $sql);

    // fetch the resulting rows as an array
    $peças = mysqli_fetch_all($result, MYSQLI_ASSOC);

    //free result grom memori
    mysqli_free_result($result);

    //close connection
    mysqli_close($conn);

    

?>

<!DOCTYPE html>
<html lang="en">

    <?php include('templates/header.php'); ?>

    <h4 class="center grey-text">Lista de Peças!</h4>

    <div class="container">
        <div class="row">
            <?php foreach($peças as $peça): ?>

                <div class="col s6 md3">
                    <div class="card z-depth-0">
                        <img src="img/carro.png" class="Peças">
                        <div class="card-content center">
                            <h6><?php echo htmlspecialchars($peça['title']); ?></h6>
                            <ul>
                                <?php foreach(explode(',', $peça['valor']) as $ingred): ?>
                                    <li><?php echo htmlspecialchars($ingred); ?>R$</li>
                                <?php  endforeach; ?>
                            </ul>
                        </div>
                        <div class="card-action right-align">
                            <a class="brand-text" href="details.php?id=<?php echo $peça['id']?>">Mais informações</a>
                        </div>
                    </div>
                </div>

            <?php endforeach; ?>
        </div>
    </div>

    <?php include('templates/footer.php'); ?>
   
    

</html>
