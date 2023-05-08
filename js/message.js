import { API, front } from "./constant.js";
import Api from "./api.js"
import { Token, refreshToken, id_admin } from "./token.js";
document.addEventListener("DOMContentLoaded", () => {

	fetch(API + `/rooms/`, {
		method: 'GET',
		mode: 'cors',
	})

		.then(response => response.json())
		.then(data => {
			console.log('message.js -> renvoit les rooms id + name ', data);

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
					// voir comment get l'id et non le name de la room avec un button ? 
					div.innerHTML += `<button class="roomName" type="submit" id="roomName" value="${item.id}"/>${item.name}</button>`;
					
					container.appendChild(div);

					var button = document.getElementsByClassName("roomName")
					for (let i = 0; i < button.length; i++) {
						//Boucle les boutons avec l'id de la room en value
						const element = button[i];
						element.addEventListener("click", () => {
							//Event update login users
							const idRoom = element.value
							const nameRoom = element.innerHTML
								window.location.href = front + `/app-mobile-chat-admin/admin/adminMessagesDetails.php?id=${idRoom}&name=${nameRoom}`;
						})
					}
				})
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


// import { API , front } from "./constant.js";

// document.addEventListener("DOMContentLoaded", () => {
//     const api = new Api();

//     api.get({
//         route: '/users/signin',
//         success: data => {
//             console.log(data.data.user.login);
//         }

//     })

//     const deleteAll = document.getElementById("delete-all")

//     deleteAll.addEventListener("click", () => {

//         if (confirm("Are you sure you want to delete all General Chat messages?")) {
//             fetch(API + `/admin/supress`, {
//                     method: 'GET',
//                     headers: {
//                         'token': Token.get(),
//                         'refreshToken': refreshToken.get(),
//                         'Content-Type': 'application/json',
//                         'Access-Control-Allow-Origin': '*',
//                         'Access-Control-Allow-Credentials': 'true'
//                     },
//                 })
//                 .then(response => response.json())
//                 .then(data => console.log(data))
//         }
//     })

//     fetch(API + `/chat`, {
//             method: 'GET',
//             headers: {
//                 'token': Token.get(),
//                 'refreshToken': refreshToken.get(),
//                 'Content-Type': 'application/json',
//                 'Access-Control-Allow-Origin': '*',
//                 'Access-Control-Allow-Credentials': 'true'
//             },
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('get chat, ', data)

//             const itemsPerPage = 5;
//             let currentPage = 1;
//             const pages = Math.ceil(data.length / itemsPerPage);

//             const paginationData = (page) => {
//                 document.querySelector(".container").innerHTML = "";
//                 let start = (page - 1) * itemsPerPage;
//                 let end = start + itemsPerPage;
//                 let paginatedData = data.slice(start, end);

//                 paginatedData.forEach(item => {

//                     const displayMessageGeneral = document.createElement('div');
//                     displayMessageGeneral.setAttribute('class', 'item-class');
//                     displayMessageGeneral.innerHTML += `<p>${item.content}</p>`
//                     displayMessageGeneral.innerHTML += `<button class="delete-from-general btn btn-primary mb-3" type="submit value="${item.id}">Delete message</button>`
//                     container.appendChild(displayMessageGeneral)

//                 })

//                 const buttonDeleteFromGeneral = document.getElementsByClassName("delete-from-general");

//                 for (let i = 0; i < buttonDeleteFromGeneral.length; i++) {
//                     const deleteButton = buttonDeleteFromGeneral[i];

//                     deleteButton.addEventListener("click", () => {
//                         idMessage = deleteButton.value
//                         idMainRoom = '0';

//                         fetch(API + `/admin/delete/${idMainRoom}/${idMessage}`, {
//                                 method: 'GET',
//                                 mode: 'cors',
//                                 headers: {
//                                     'token': Token.get(),
//                                     'refreshToken': refreshToken.get(),
//                                     'Content-Type': 'application/json',
//                                     'Access-Control-Allow-Origin': '*',
//                                     'Access-Control-Allow-Credentials': 'true'
//                                 },
//                             })
//                             .then(response => response.json())
//                             .then(data => console.log(data))
//                             .catch(error => console.error(error));
//                     })
//                 }
//             }

//             paginationData(currentPage);

//             document.querySelector("#next").addEventListener("click", () => {

//                 currentPage += 1;
//                 if (currentPage > pages) {
//                     currentPage = pages;
//                 }
//                 paginationData(currentPage);
//             });

//             document.querySelector("#prev").addEventListener("click", () => {
//                 currentPage -= 1;
//                 if (currentPage < 1) {
//                     currentPage = 1;
//                 }
//                 paginationData(currentPage);
//             });

//             const pageNumbers = document.querySelector('.page-numbers');


//             for (let i = 1; i <= pages; i++) {

//                 if (i < currentPage + 3 && i > currentPage - 3) {


//                     let pageNumber = document.createElement('button');
//                     pageNumber.innerText = i;
//                     pageNumber.addEventListener('click', () => {
//                         currentPage = i;
//                         paginationData(currentPage);
//                     });
//                     pageNumbers.appendChild(pageNumber);

//                 }
//             }
//         })

// })