$(function() {
    if (Cookie.get('jwt_token')) {

    } else {
        window.location.href = '../login.html';
    }
})