import { API , front } from "./constant.js";
import { Api } from "./api.js";


document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        // get the username and password from the form
        const login = document.getElementById("login-input").value;
        const password = document.getElementById("password").value
    
        // create a JSON object with the username and password
        const data = {login: login, password: password};
    
        // send a post request to the API with the data
        const response = await fetch(API + `/users/auth`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data),
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true'
            }
        });
        const json = await response.json();
        console.log(json);
        if(json.token) {
            // console.log('first')
            console.log(json.token, 'le token de admin?');
            // store the token in local storage
            sessionStorage.setItem('token', json.token);
            window.location.href = front + "/app-mobile-chat-admin/admin/adminIndex.php";
        }
    });

})
