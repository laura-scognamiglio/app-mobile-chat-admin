import { API , front } from "./constant.js";
import Api from "./api.js"
import { Token, refreshToken, id_admin } from "./token.js";

document.addEventListener("DOMContentLoaded", () => {

	const  createButton = document.getElementById("create-button")
	createButton.addEventListener("click",() => {
		const newRoomName = document.getElementById("create-room-name").value
		const data = JSON.stringify({
			name: newRoomName,
			id_role_admin: id_admin.get()
		});

		const token1Value = Token.get();
		const refreshTokenValue = refreshToken.get()

		fetch(API + `/admin/add-room`, {

			method: 'POST',
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
		.then(data => {
			alert("Room "+newRoomName+" has been created")
			window.location.href = front + "/app-mobile-chat-admin/admin/adminRoom.php";

		})
		.catch(error => console.error(error));

	})

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
					div.innerHTML += `<button type="submit" class="delete-button" id="delete-button-roomName-${item.id}" value="${item.id}">Delete room</button>`;
					container.appendChild(div);
                })

				//*** EDITION D'UNE ROOM ***
				//boucle sur les elements "button" pour leur ajouter un eventListener "click"
				const updateButtons = document.getElementsByClassName("update-button-roomName")
				for (let i = 0; i < updateButtons.length; i++){

					const element = updateButtons[i];

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

				// *** SUPPRESSION D'UNE ROOM ***
				//boucle sur les elements "button" pour leur ajouter un eventListener "click"
				const deleteButtons = document.getElementsByClassName("delete-button")
				for (let i = 0; i < deleteButtons.length; i++){

					const element = deleteButtons[i];

					element.addEventListener("click", () => {



						const idRoom = element.value
						const deleteRoomName = document.getElementById("update-roomName-"+idRoom).value

						if (confirm("Vous êtes sur le point de supprimer la room '"+deleteRoomName+"'")) {
							const data = JSON.stringify({
								id_role_admin: id_admin.get()
							});

							const token1Value = Token.get();
							const refreshTokenValue = refreshToken.get()

							fetch(API + `/admin/rooms/${idRoom}`, {

								method: 'DELETE',
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
								.then(data => {
									console.log('Remove element :',element.parentNode);
									element.parentNode.remove()
									alert(data.message)
								})
								.catch(error => console.error(error));
						}


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

