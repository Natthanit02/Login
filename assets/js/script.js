$(document).ready(function() {
    $('#registerForm').on('submit', function(e){
        e.preventDefault();

        $('#message-area').html('');

        let username = $('#username').val().trim();
        let email = $('#email').val().trim();
        let mobile = $('#mobile').val().trim();
        let password = $('#password').val();
        let confirm_password = $('#confirm_password').val();

        if (!username || !email || !mobile || !password || !confirm_password) {
            displayMessage('Please enter all the input fields','danger');
            return;
        }

        if (password !== confirm_password) {
            displayMessage('Password and Confirm password do not match', 'danger');
            return;
        }

        if (password.length < 8) {
            displayMessage('Password must be at least 8 characters long', 'danger');
            return;
        }

        let formData = {
            username,
            email,
            mobile,
            password,
            confirm_password
        }

        console.log(formData);

        $.ajax({
            type: 'POST',
            url: 'api/register.php',
            data: formData,
            dataType: 'json',
            success(response) {
                if (response.status === 'success') {
                    displayMessage(response.message, 'success');
                    $('#registerForm')[0].reset();
                } else {
                    displayMessage(response.message, 'danger');
                }
            },
            error(xhr, status, error) {
                console.error('AJAX Error:', status, error, xhr.responseText);
                displayMessage('An error occurred while sending data: '+ error + ' please check your console', 'danger');
            }
        })
    })

    // login handler
    $('#loginForm').on('submit', function(e){
        e.preventDefault();

        $('#login-message-area').html('');

        let username = $('#username').val().trim();
        let password = $('#password').val();

        if (!username || !password) {
            displayLoginMessage('Please enter you username and password','danger');
            return;
        }

        let formData = {
            username,
            password
        }

        $.ajax({
            type: 'POST',
            url: 'api/login.php',
            data: formData,
            dataType: 'json',
            success(response){
                if (response.status === 'success') {
                    displayLoginMessage(response.message, 'success');
                    if (response.redirect_url) {
                        setTimeout(function(){
                            window.location.href = response.redirect_url
                        }, 1500)
                    }
                } else {
                    displayLoginMessage(response.message, 'danger');
                }
            },
            error(xhr, status, error) {
                console.error('AJAX error: ', status, error, xhr.responseText);
                displayLoginMessage('An error occurred while sending dara', 'danger');
            }
        })
    })

    // logout Hanler
    $('#logoutButton').on('click', function(e){
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: 'api/logout.php',
            dataType: 'json',
            success(response) {
                if(response.status == 'success') {
                    window.location.href = 'login.html'
                }
            },
            error (xhr, status, error) {
                console.error('AJAX logout error', status, error, xhr.responseText);
            }
        })
    })


    // Function to display message in the message-area
    function displayMessage(message, type){
        $('#message-area').html(
            `<div class='alert alert-${type} alert-dismissible fade show' role='alert'>
                ${message}
                <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
            </div>`
        )
    }

    // Function to disply messages in the login message-area
    function displayLoginMessage(message, type){
        $('#login-message-area').html(
            `<div class='alert alert-${type} alert-dismissible fade show' role='alert'>
                ${message}
                <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
            </div>`
        )
    }
})