import { API, front } from "./constant.js";
import Api from "./api.js"
import { Token, refreshToken, id_admin } from "./token.js";

document.addEventListener("DOMContentLoaded", () => {
    const api = new Api();

    api.get({
        route: '/users/signin',
        success: data => {
            console.log(data.data.user.login);
        }

    })
    // recuperer les params 
    const queryString = window.location.search;
    console.log(queryString);

})