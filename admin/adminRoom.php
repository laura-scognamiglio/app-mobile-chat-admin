<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script type="module" src="../js/rooms.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script type="module" src="../js/token.js"></script>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/navbar.css">
    <script type="module" src="../js/logout.js"></script>
    <script type="module" src="../js/api.js"></script>
    <title>Room</title>
</head>

<body>
<?php include('../navbar.php'); ?>
<div class="create-block item-class">
        <label for="create-room" class="form-label">Create Room</label>
        <input class="create-room" type="text" id="create-room-name" placeholder="Room's name">
        <button type="submit" class="create-button" id="create-button">Create room</button>
    </div>
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