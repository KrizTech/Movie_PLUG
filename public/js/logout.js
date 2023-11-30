$(document).ready(function() {
    $('.logout-button').on('click', function(e) {
        e.preventDefault();

        // Send an AJAX request to the server for logout
        $.get('/auth/logout', function(data) {
            localStorage.removeItem('userToken');
            history.replaceState(null, '', '/login');
            // Redirect to the login page after successful logout
            window.location.href = '/login.html';
        });
    });
});
