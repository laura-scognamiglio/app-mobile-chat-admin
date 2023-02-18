<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="js/login.js"></script>
    <link rel="stylesheet" href="./css/user.css">
    <link rel="stylesheet" href="./css/login.css">
    <link rel="stylesheet" href="../css/navbar.css">
    <title>Connexion</title>
</head>

<body>
    <?php require_once('./navbar.php'); ?>
    <div class="login">

        <form id="loginForm">
            <label for="login">Login:</label>
            <input type="login" id="login-input" name="login">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password">
            <button type="submit" id="submit-login">Submit</button>
        </form>
    </div>

</body>

</html>