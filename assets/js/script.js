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

    function displayMessage(message, type){
        $('#message-area').html(
            `<div class='alert alert-${type} alert-dismissible fade show' role='alert'>
                ${message}
                <button type='button' class='btn-close' data-bs-dismiss='alert' aria-label='Close'></button>
            </div>`
        )
    }
})