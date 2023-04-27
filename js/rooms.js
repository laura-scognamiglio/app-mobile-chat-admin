import { API , front } from "./constant.js";
import Api from "./api.js"
import { Token, refreshToken } from "./token.js";

document.addEventListener("DOMContentLoaded", () => {


    console.log("rooms");
    const api = new Api();

    api.get({
        route: '/users/signin',
        success: data => {
            console.log('data.data.user.login',data.data.user.login);
        }

    })


    fetch(API + `/rooms/`)
        .then(response => response.json())
        .then(data => {console.log("data response json",data)})
        .catch(error => console.log(error))

})