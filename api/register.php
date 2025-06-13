<?php

header('Content-Type: application/json');

require_once '../config/db.php';

$response = ['status' => 'error', 'message' => 'An unexpected error occurred.'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username']??'');
    $email = trim($_POST['email']??'');
    $mobile = trim($_POST['mobile']??'');
    $password = $_POST['password']??'';
    $confirm_password = $_POST['confirm_password']??'';

    if(empty($username) || empty($email) || empty($mobile) || empty($password) || empty($confirm_password)) {
        $response['message'] = 'Please fill in all fields';
        echo json_encode($resonpse);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['message'] = 'Email format is invalid';
        echo  json_encode($resonpse);
        exit;
    }

    if (strlen($mobile) !== 10) {
        $response['message'] = 'Mobile must be 10 digits long';
        echo json_encode($resonpse);
        exit;
    }

    if (strlen($password) < 8) {
        $response['message'] = 'Password must be least 8 chracters long';
        echo json_encode($resonpse);
        exit;
    }

    if ($password !== $confirm_password) {
        $response['message'] = 'Password and Confirm password do not match';
        echo json_encode($resonpse);
        exit;
    }

    try {

        //Check for existing username
        $stmt = $pdo->prepare("SELECT id FROM users WHERE username = :username");
        $stmt->bindParam(":username", $username);
        $stmt->execute();
        
        if ($stmt->fetch()) {
            $response['message'] = 'This username is already in use';
            echo json_encode($response);
            exit;
        }

        //check for existing email
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = :email");
        $stmt->bindParam(":email", $email);
        $stmt->execute();
        
        if ($stmt->fetch()) {
            $response['message'] = 'This email is already in use';
            echo json_encode($response);
            exit;
        }

        // Hash the password 
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        $sql = "INSERT INTO users (username, email, mobile, password) VALUES (:username, :email, :mobile, :password)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(":username", $username);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":mobile", $mobile);
        $stmt->bindParam(":password", $hashed_password);

        if ($stmt->execute()) {
            $response['status'] = 'success';
            $response['message'] = 'Registration is successful! You can now log in';
        } else {
            $response['message'] = 'An error occured while saving data to the database';
         }

    } catch(PDOException $e) {
        $response['message'] = 'A server error occrred' .$e->getMessage();
    }
} else {
    $response['message'] = "Invlid request method.";
}

echo json_encode($response);
exit;

?>