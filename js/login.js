document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        // get the username and password from the form
        const login = document.getElementById("login").value;
        const password = document.getElementById("password").value
    
        // create a JSON object with the username and password
        const data = {login: login, password: password};
    
        // send a post request to the API with the data
        const response = await fetch(`http://10.10.63.108:3000/users/auth`, {
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
        if(json.token) {
            // store the token in local storage
            localStorage.setItem('token', json.token);
            window.location.href = "http://localhost/app-mobile-chat-admin/admin/adminIndex.php";
        }
    });

})