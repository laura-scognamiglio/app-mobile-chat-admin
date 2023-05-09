<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script type="module" src="../js/token.js"></script>
    <script type="module" src="../js/api.js"></script>
    <script type="module" src="../js/users.js"></script>
    <script type="module" src="../js/logout.js"></script>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/navbar.css">
    <title>User</title>
</head>

<body>
    <?php include('../navbar.php'); ?>
    <div class="container" id="container">

        <div id="form-container"></div>

    </div>
    <div id="links"></div>

    <div class="data"></div>

        <div class="pagination">

            <button class="prev" id="prev"><</button>
            <button class="page-numbers" id="page-numbers"></button>

            <button class="next" id="next">></button>
        </div>

</body>

</html>