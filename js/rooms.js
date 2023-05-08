import { API , front } from "./constant.js";
import Api from "./api.js"
import { Token, refreshToken, id_admin } from "./token.js";

document.addEventListener("DOMContentLoaded", () => {
    
    //console.log("rooms.js");

    fetch(API + `/rooms/`, {
		method: 'GET',
		mode: 'cors',})

        .then(response => response.json())
        .then(data => {
            console.log("rooms : ",data);

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
					div.innerHTML += ` <label for="update-roomName" class="form-label">Room Name</label>`
					div.innerHTML += `<input class="update-roomName" type="text" id="update-roomName-${item.id}" value='${item.name}' />`;
					div.innerHTML += `<button type="submit" class="update-button-roomName btn btn-primary mb-3" id="update-button-roomName-${item.id}" value="${item.id}">Update room name</button>`;
					container.appendChild(div);
                })

				//boucle sur les elements "button" pour leur ajouter un eventListener "click"
				var inputUpdate = document.getElementsByClassName("update-button-roomName")
				for (let i = 0; i < inputUpdate.length; i++){

					const element = inputUpdate[i];

					element.addEventListener("click", () => {

						const idRoom = element.value
						const updateRoomName = document.getElementById("update-roomName-"+idRoom).value

						const data = JSON.stringify({
							name: updateRoomName,
							id_role_admin: id_admin.get()
						});

						const token1Value = Token.get();
						const refreshTokenValue = refreshToken.get()

						fetch(API + `/admin/rooms/${idRoom}/update`, {

							method: 'PATCH',
							mode: 'cors',
							body: data,
							headers: {
								'token1': token1Value,
								'refreshToken': refreshTokenValue,
								'Content-Type': 'application/json',
								'Access-Control-Allow-Origin': '*',
								'Access-Control-Allow-Credentials': 'true'
							},
						})
						.then(response => response.json())
						.then(data => alert(data.message))
						.catch(error => console.error(error));

					})

				}
            }
            //pagination
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

