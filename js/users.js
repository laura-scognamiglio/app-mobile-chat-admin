import { Api } from "./api.js";
import { Token, refreshToken } from './tokens.js';


document.addEventListener("DOMContentLoaded", () => {
    const api = new Api();

    api.get({
        route: '/users/signin',
        success: data => {
            console.log(data.data.user.login);
        }

    })

    fetch(`http://localhost:3000/users/all`)
        .then(response => response.json())
        .then(data => {

            const itemsPerPage = 5;
            let currentPage = 1;
            const pages = Math.ceil(data.length / itemsPerPage);

            const paginationData = (page) => {


                document.querySelector(".container").innerHTML = "";
                let start = (page - 1) * itemsPerPage;
                let end = start + itemsPerPage;
                let paginatedData = data.slice(start, end);

                paginatedData.forEach(item => {


                    const div = document.createElement('div');
                    div.setAttribute('class', 'item-class');
                    div.innerHTML += ` <label for="update-login" class="form-label">Login user</label>`
                    div.innerHTML += `<input class="update-login" type="text" id="update-login" value='${item.login}' />`;
                    div.innerHTML += `<button type="submit" class="update-button-login btn btn-primary mb-3" id="update-button-login" value="${item.id}">Update login</button>`;
                    div.innerHTML += ` <label for="update-role" class="form-label">Role user / admin</label>`
                    div.innerHTML += `<input class="update-role" type="text" id="update-role" value='${item.id_role}' />`;
                    div.innerHTML += `<button type="submit" class="update-button-role btn btn-primary mb-3" id="update-button-role" value="${item.id}">Update role</button>`;
                    container.appendChild(div);

                    var inputUpdate = document.getElementsByClassName("update-button-login")
                    for (let i = 0; i < inputUpdate.length; i++) {
                        //Boucle les boutons avec l'id de l'utilisateurs en value
                        const element = inputUpdate[i];

                        element.addEventListener("click", () => {
                            //Event update login users
                            const loginUpdate = document.getElementById("update-login").value
                            const idUser = element.value
                            const data = {
                                login: loginUpdate,
                                id: idUser
                            };
                            
                            
                            fetch(`http://localhost:3000/admin/users/${idUser}/update`, {

                                    method: 'PATCH',
                                    mode: 'cors',
                                    body: JSON.stringify(data),
                                    headers: {
                                        'token': Token.get(),
                                        'refreshToken': refreshToken.get(),
                                        'Content-Type': 'application/json',
                                        'Access-Control-Allow-Origin': '*',
                                        'Access-Control-Allow-Credentials': 'true',
                                        
                                    },
                                })
                                .then(response => response.json())
                                .then(data => console.log(data))
                                .then(userInfo => console.log(userInfo))
                                .catch(error => console.error(error));
                        })
                    }

                    var inputeUpdateRole = document.getElementsByClassName("update-button-role");
                   
                    for (let x = 0; x < inputeUpdateRole.length; x++) {
                        const elementRole = inputeUpdateRole[x];

                        elementRole.addEventListener("click", () => {
                            //Event update role
                            const newRole = document.getElementById("update-role").value
                            console.log('new role', newRole)
                            const idUser = elementRole.value
                            console.log(idUser)
                            const data = {
                                id_role: newRole,
                                id: idUser
                            };
                            debugger
                            console.log(Token.get(),"sensé etre le tok")
                            ///users/:id/update/role
                            fetch(`http://localhost:3000/admin/users/${idUser}/update/role`, {

                                    method: 'PATCH',
                                    mode: 'cors',
                                    body: JSON.stringify(data),
                                    headers: {
                                        'token': Token.get(),
                                        'refreshToken': refreshToken.get(),
                                        'Content-Type': 'application/json',
                                        'Access-Control-Allow-Origin': '*',
                                        'Access-Control-Allow-Credentials': 'true',
                                        'Authorization': 'Bearer ' + Token.get(),
                                    },
                                })
                                .then(response => response.json())
                                .then(data => console.log(data,"data???user.js"))
                                .catch(error => console.error(error,"error???user.js"));

                        })

                    }
                });
            }

            paginationData(currentPage);

            document.querySelector("#next").addEventListener("click", () => {

                currentPage += 1;
                if (currentPage > pages) {
                    currentPage = pages;
                }
                paginationData(currentPage);
            });

            document.querySelector("#prev").addEventListener("click", () => {
                currentPage -= 1;
                if (currentPage < 1) {
                    currentPage = 1;
                }
                paginationData(currentPage);
            });

            const pageNumbers = document.querySelector('.page-numbers');


            for (let i = 1; i <= pages; i++) {

                if (i < currentPage + 3 && i > currentPage - 3) {


                    let pageNumber = document.createElement('button');
                    pageNumber.innerText = i;
                    pageNumber.addEventListener('click', () => {
                        currentPage = i;
                        paginationData(currentPage);
                    });
                    pageNumbers.appendChild(pageNumber);

                }
            }
        });
})