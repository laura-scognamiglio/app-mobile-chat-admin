import { API, front } from "./constant.js";
import Api from "./api.js"
import { Token, refreshToken, id_admin } from "./token.js";
document.addEventListener("DOMContentLoaded", () => {

    console.log("window location", window.location)
    const urlParams = new URLSearchParams(window.location.search);
    const idRoom = urlParams.get('id')
    const nameRoom = urlParams.get('name')

    const token = Token.get();
    const refresh = refreshToken.get()

    fetch(API + `/chat/get/${idRoom}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'token1': token,
            'refreshToken': refresh,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
        },
    })

        .then(response => response.json())
        .then(data => {

            console.log(idRoom);
            const itemsPerPage = 5;
            let currentPage = 1;
            const pages = Math.ceil(data.length / itemsPerPage);

            const paginationData = (page) => {
                document.querySelector(".title").innerHTML = nameRoom
                document.querySelector(".container").innerHTML = "";
                let start = (page - 1) * itemsPerPage;
                let end = start + itemsPerPage;
                let paginatedData = data.slice(start, end);

                paginatedData.forEach(item => {

                    const parentDiv = document.createElement('div');
                    parentDiv.setAttribute('class', 'parent-box');

                    const div = document.createElement('div');
                    div.setAttribute('class', 'box-info');
                    div.setAttribute('id', "box-info")

                    div.innerHTML += `<p>${item.login}</p>`;
                    div.innerHTML += `<p>${item.created_at}</p>`;
                    div.innerHTML += `<p>${item.content}</p>`;
                    parentDiv.appendChild(div);

                    const div2 = document.createElement('div');
                    div.setAttribute('class', 'boxButton');
                    div2.innerHTML += `<button class="actionDelete" type="submit" id="actionDelete" value="${item.id_message}"/>Delete</button>`;
                    parentDiv.appendChild(div2);
                    container.appendChild(parentDiv);
                })


                var button = document.getElementsByClassName("actionDelete")
                for (let i = 0; i < button.length; i++) {
                    const element = button[i];
                    element.addEventListener("click", () => {

                        console.log("element", element)
                        const id_message = element.value
                        console.log(id_message);
                        const data = JSON.stringify({ id_role_admin: id_admin.get() })

                        fetch(API + `/admin/chat/${idRoom}/${id_message}`, {
                            method: 'DELETE',
                            mode: 'cors',
                            body: data,
                            headers: {
                                'token1': token,
                                'refreshToken': refresh,
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Credentials': 'true'
                            },
                        })
                            .then(response => response.json())
                            .then(data => {

                                console.log(data)
                                console.log("element into then", element)
                                element.parentNode.parentNode.remove()
                                alert(data.message)
                            })
                    })
                }
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
        })
})

