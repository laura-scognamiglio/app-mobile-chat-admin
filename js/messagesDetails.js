import { API, front } from "./constant.js";
import Api from "./api.js"
import { Token, refreshToken, id_admin } from "./token.js";
document.addEventListener("DOMContentLoaded", () => {

    console.log("window location", window.location)
    const urlParams = new URLSearchParams(window.location.search);
    const idRoom = urlParams.get('id')

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
            console.log('messages list  by rooms,', data);

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
                    div.setAttribute('class', 'box-info');
                    div.innerHTML += `<p>${item.login}</p>`;
                    div.innerHTML += `<p>${item.created_at}</p>`;
                    div.innerHTML += `<p>${item.content}</p>`;
                    container.appendChild(div);

                    const div2 = document.createElement('div');
                    div.setAttribute('class', 'box-button');
                    div2.innerHTML += `<button class="button" type="submit" id="roomName" value="${item.id}"/>Delete</button>`;
                    container.appendChild(div2);

                //     var button = document.getElementsByClassName("roomName")
                //     for (let i = 0; i < button.length; i++) {
                //         //Boucle les boutons avec l'id de la room en value
                //         const element = button[i];

                        // element.addEventListener("click", () => {
                        //     //Event update login users
                        //     const idRoom = element.value
                        //     console.log(idRoom);

                        //     window.location.href = front + `/app-mobile-chat-admin/admin/adminMessagesDetails.php?id=${idRoom}`;

                        // })

                    // }
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

// 			const itemsPerPage = 5;
// 			let currentPage = 1;
// 			const pages = Math.ceil(data.length / itemsPerPage);

// 			const paginationData = (page) => {

// 				document.querySelector(".container").innerHTML = "";
// 				let start = (page - 1) * itemsPerPage;
// 				let end = start + itemsPerPage;
// 				let paginatedData = data.slice(start, end);

// 				paginatedData.forEach(item => {
// 					const div = document.createElement('div');
// 					div.setAttribute('class', 'item-class');
// 					// voir comment get l'id et non le name de la room avec un button ? 
// 					div.innerHTML += `<input class="roomName" type="submit" id="roomName" value='${item.name}'  />`;
// 					container.appendChild(div);

// 					var button = document.getElementsByClassName("roomName")
// 					for (let i = 0; i < button.length; i++) {
// 						//Boucle les boutons avec l'id de l'utilisateurs en value
// 						const element = button[i];

// 						element.addEventListener("click", () => {
// 							//Event update login users
// 							const UpdateRoomName = document.getElementById("roomName").value
// 							const idRoom = element.value
// 							console.log(idRoom);

// 							window.location.href = front + `/app-mobile-chat-admin/admin/adminMessagesDetails.php?${idRoom}`;
// 							// 
// 							// '/player_detail?username=' + name
// 							// const data = {
// 							// 	name: UpdateRoomName,
// 							// };

// 							// fetch(API + `/admin/rooms/${idRoom}/update`, {

// 							//     method: 'PATCH',
// 							//     mode: 'cors',
// 							//     body: JSON.stringify(data),
// 							//     headers: {
// 							//         'token': Token.get(),	
// 							//         'refreshToken': refreshToken.get(),
// 							//         'Content-Type': 'application/json',
// 							//         'Access-Control-Allow-Origin': '*',
// 							//         'Access-Control-Allow-Credentials': 'true'
// 							//     },
// 							// })
// 							// .then(response => response.json())
// 							// .then(data => console.log(data))
// 							// .catch(error => console.error(error));

// 						})

// 					}
// 				})
// 			}
// 			//pagination
// 			paginationData(currentPage);

// 			document.querySelector("#next").addEventListener("click", () => {

// 				currentPage += 1;
// 				if (currentPage > pages) {
// 					currentPage = pages;
// 				}
// 				paginationData(currentPage);
// 			});

// 			document.querySelector("#prev").addEventListener("click", () => {
// 				currentPage -= 1;
// 				if (currentPage < 1) {
// 					currentPage = 1;
// 				}
// 				paginationData(currentPage);
// 			});

// 			const pageNumbers = document.querySelector('.page-numbers');


// 			for (let i = 1; i <= pages; i++) {

// 				if (i < currentPage + 3 && i > currentPage - 3) {


// 					let pageNumber = document.createElement('button');
// 					pageNumber.innerText = i;
// 					pageNumber.addEventListener('click', () => {
// 						currentPage = i;
// 						paginationData(currentPage);
// 					});
// 					pageNumbers.appendChild(pageNumber);

// 				}
// 			}




// 		})


