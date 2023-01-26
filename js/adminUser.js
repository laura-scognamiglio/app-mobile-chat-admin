import { API } from "./constan";
document.addEventListener("DOMContentLoaded", () => {

    fetch(`${API}`)
    .then(response => response.json())
    .then(data => {
    const inputField = document.getElementById("exampleInput");
    inputField.value = data.example;
    });

})