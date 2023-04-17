document.addEventListener("DOMContentLoaded", () => {
    const api = new Api();

    api.get({
        route: '/users/signin',
        success: data => {
            console.log(data.data.user.login);
        }

    })

})