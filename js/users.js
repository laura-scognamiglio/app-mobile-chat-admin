import { API , front } from "./constant.js";
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

	fetch(API + `/users/all`)
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
					div.innerHTML += `<input class="update-login" type="text" id="update-login" data-index="${item.id}" value='${item.login}' />`;
					div.innerHTML += `<button type="submit" class="update-button-login btn btn-primary mb-3" id="update-button-login" value="${item.id}">Update login</button>`;
					div.innerHTML += ` <label for="update-role" class="form-label">Role user / admin</label>`
					div.innerHTML += `<input class="update-role" type="text" id="update-role" data-index="${item.id}" value='${item.id_role}' />`;
					div.innerHTML += `<button type="submit" class="update-button-role btn btn-primary mb-3" id="update-button-role" value="${item.id}">Update role</button>`;
					container.appendChild(div);

					var inputUpdate = document.getElementsByClassName("update-button-login")
					var loginS;
					for (let i = 0; i < inputUpdate.length; i++) {
						//Boucle les boutons avec l'id de l'utilisateurs en value
						const element = inputUpdate[i];
						console.log(element)
						element.addEventListener("click", () => {
							//Event update login users
							let loginUpdate = document.getElementsByClassName("update-login")
							loginUpdate = [...loginUpdate]
							const idUser = element.value
							loginUpdate.forEach(element => {
								if(element.dataset.index === idUser) {
									loginS = element.value
								}
							});

							const data = {
								id_role_admin: id_admin.get(),
								login: loginS,
								id: idUser
							};

							const bodyData = JSON.stringify(data)
							const token = Token.get();
							const refresh = refreshToken.get()

							fetch(API + `/admin/users/${idUser}/update`, {
									method: 'PATCH',
									mode: 'cors',
									body: bodyData,
									headers: {
										'token1': token,
										'refreshtoken': refresh,
										'Content-Type': 'application/json',
										'Access-Control-Allow-Origin': '*',
										'Access-Control-Allow-Credentials': 'true'
									},
								})
								.then(response => response.json())
								.then(data => console.log(data))
								.catch(error => console.error(error));
						})
					}

					var inputeUpdateRole = document.getElementsByClassName("update-button-role");
					// console.log('tt', inputeUpdateRole)
					var id_role;
					for (let x = 0; x < inputeUpdateRole.length; x++) {
						const elementRole = inputeUpdateRole[x];
						let newRole = document.getElementsByClassName("update-role")
						newRole = [...newRole];
						elementRole.addEventListener("click", () => {
							const idUser = elementRole.value
							newRole.forEach(roleNew => {
								if(roleNew.dataset.index === idUser) {
									id_role = roleNew.value
								}
							})
							const data = {
								id_role_admin: id_admin.get(),
								id_role: id_role,
								id: idUser
							};

							const bodyData = JSON.stringify(data)
							const token = Token.get();
							const refresh = refreshToken.get()

							///users/:id/update/role
							fetch(`http://localhost:3000/admin/users/${idUser}/update/role`, {
									method: 'PATCH',
									mode: 'cors',
									body: bodyData,
									headers: {
										'token1': token,
										'refreshtoken': refresh,
										'Content-Type': 'application/json',
										'Access-Control-Allow-Origin': '*',
										'Access-Control-Allow-Credentials': 'true'
									},
								})
								.then(response => response.json())
								.then(data => console.log(data))
								.catch(error => console.error(error));

						})

					}
				});
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
		});
})