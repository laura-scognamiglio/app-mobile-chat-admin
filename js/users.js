document.addEventListener("DOMContentLoaded", () => {
    const api = new Api();
    
    api.get({
        route: '/users/signin',
        success: data => {
            console.log(data.data.user.login);
        } 

    })

    // require(['../js/token.js'], function(token) {
    //     console.log(token)
    // })
    // const toto = Token.get();
    // console.log(toto)
    // const token = localStorage.getItem('token', json.token)
    // console.log(token)
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
            div.setAttribute('form', 'item-class');
            div.innerHTML += `<input class="update-login" id="update-login" value='${item.login}' />`;
            div.innerHTML += `<input class="update-role" id="update-role" value='${item.id_role}' />`;
            div.innerHTML += `<button type="submit" class="update-button-login" id="update-button-login" value="${item.id}">Update login</button>`;
            div.innerHTML += `<button type="submit" class="update-button" id="update-button-role" value="${item.id}">Update role</button>`;
            container.appendChild(div); 

            var inputUpdate = document.getElementsByClassName("update-button-login")
            
            for (let i = 0; i < inputUpdate.length; i++) {
                const element = inputUpdate[i];

                element.addEventListener("click", () => {

                    const loginUpdate = document.getElementById("update-login").value
                    console.log('login to update', loginUpdate)

                    // let roleUpdate = document.getElementById("update-role").value

                    // console.log('role to update', roleUpdate)
                    console.log('id to update',element.value)
                    const idUser = element.value
                    console.log(idUser)
                    // /rooms/:id/update'
                    // const endpoint 
                    // const url = `http://10.10.23.120:3000/users/${idUser}/update`;
                    // const queryParams = new URLSearchParams(loginUpdate);
                    // const endpoint = `${url}?${queryParams}`;
                    const data = {
                        login: loginUpdate,
                        id: idUser
                    };

                    

                    

                    // fetch(`http://localhost:3000/admin/users/${idUser}/update`, {
                    //     method: 'PATCH',
                    //     // credentials: 'include',
                    //     mode: 'cors',
                    //     body: JSON.stringify(data),
                    //     headers: { 
                    //         'token1': `${jwt}`,
                    //         'refreshToken': refreshToken.get(),
                    //         'Content-Type': 'application/json',
                    //         'Access-Control-Allow-Origin': '*',
                    //         'Access-Control-Allow-Credentials': 'true'
                    //     },
                    // })
                    // .then(response => response.json())
                    // .then(data => console.log(data))
                    // .catch(error => console.error(error));

                })

                // element.addEventListener("click", () => {
                    
                // })
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