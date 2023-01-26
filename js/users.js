document.addEventListener("DOMContentLoaded", () => {

    fetch(`http://10.10.63.108:3000/users/all`)
    .then(response => response.json())
    .then(data => {

        const mainContainer = document.getElementById("container");

        var links = document.getElementById("links");
        var formContainer = document.getElementById("form-container");
        
        data.forEach(item => {

            // Créez un nouvel élément div
            const div = document.createElement('div');
            div.setAttribute("id","formUser")
            div.setAttribute("class", "formUser")
            // Créer des éléments li multiples

            const nameLi = document.createElement('li');
            nameLi.textContent = "Name : " + item.login;
            div.appendChild(nameLi);

            const dateLi = document.createElement('li');
            dateLi.textContent = "Email : " + item.email;
            div.appendChild(dateLi);

            const idRole = document.createElement('li');
            idRole.textContent = "id_role : " + item.id_role;
            div.appendChild(idRole);

            const idLi = document.createElement('button');
            idLi.textContent = "Modifier l'utilisateur";
            // idLi.setAttribute('href', "adminUser.php?id="+item.id+"")
            idLi.setAttribute('value', +item.id);
            idLi.setAttribute("id",'userUpdate')
            div.appendChild(idLi);

            idLi.addEventListener("click", function(event) {
                event.preventDefault();
                createForm(item.id);
            });

            function createForm(id) {
                var form = `<form>
                              <label>Name: <input type="text" name="name"></label>
                              <label>Email: <input type="email" name="email"></label>
                              <input type="hidden" name="id" value="${id}">
                              <input type="submit" value="Update">
                            </form>`;
                formContainer.innerHTML = form;
            }


            // Ajouter le div à la page
            // document.body.appendChild(div);
            mainContainer.appendChild(div)

            idLi.addEventListener("click", e =>{
                console.log(idLi.value)
            })

        });
    });
    

})