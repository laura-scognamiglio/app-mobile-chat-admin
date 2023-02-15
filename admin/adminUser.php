<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="../js/token.js"></script>
    <script src="../js/api.js"></script>
    <script src="../js/users.js"></script>
    <script src="../js/logout.js"></script>
    <link rel="stylesheet" href="../css/user.css">
    <title>User</title>
</head>
<body>

    <button id="logout-button">logout</button>
    <div class="container" id="container">

        <div id="form-container"></div>

    </div>
    <div id="links"></div>

    <div class="data"></div>

    <button class="prev" id="prev"><</button>
    <div class="page-numbers" id="page-numbers"></div>
    <div class="current-page" id="current-page"></div>
    <button class="next" id="next">></button>


</body>
</html>