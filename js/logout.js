document.addEventListener("DOMContentLoaded", () => {

    const logoutButton = document.querySelector('#logout-button');

    logoutButton.addEventListener('click', () => {
    // Remove the access token from local storage
    localStorage.removeItem('access_token');
    // Redirect the user to the login page or some other appropriate page
    window.location.href = "http://localhost/app-mobile-chat-admin/admin/adminIndex.php";
    });
    
})