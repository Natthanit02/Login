<?php

if (session_start() == PHP_SESSION_NONE) {
    session_start();
}

if (@isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header("location: login.html");
    exit;
}

$username = htmlspecialchars($_SESSION['username']);

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div class="container d-flex">
            <a class="btn btn-danger ms-auto" id="logoutButton">Logout</a>
            </div>     
        </div>
    </nav>

    <div class="container mt-5">
        <div class="card bg-secondary-subtle" role="alert">
            <div class="card-body">
                <h4 class="alert-heading">Welcome, <?php echo $username; ?></h4>
                <p>This is your dashboard</p>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.js"></script>
    <script src="assets/js/script.js"></script>

</body>
</html>