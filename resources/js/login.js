$(document).ready(function() {
    $('#loginForm').submit(function(event) {
        event.preventDefault();

        var email = $('#email').val();
        var password = $('#password').val();

        var jsonData = {
            "email": email,
            "password": password
        };

        $.ajax({
            type: 'POST',
            url: 'api/login',
            contentType: 'application/json',
            data: JSON.stringify(jsonData),
            success: function(response) {
                $('.error-sesion').text('');
                localStorage.setItem('userData', JSON.stringify(response));
                if (response.user) {
                    window.location.assign(response.redirect_url);
                } else {
                    $('.error-sesion').text('* '+response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error(error);
                localStorage.setItem('userData','');
            }
        });
        
    });
});
