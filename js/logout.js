import { API , front } from "./constant.js";

document.addEventListener("DOMContentLoaded", () => {

    const logoutButton = document.querySelector('#logout-button');

    logoutButton.addEventListener('click', () => {
    // Remove the access token from local storage
    localStorage.removeItem('access_token');
    // Redirect the user to the login page or some other appropriate page
    window.location.href = front + "/app-mobile-chat-admin/";
    });
    
})