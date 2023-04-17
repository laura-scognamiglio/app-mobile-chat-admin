class Api{

    constructor() {
        this.route = 'http://localhost:3000';
        this.call = this.call.bind(this);
    }

    get = async function(params) {
        let url = this.route + params.route;
        this.call('get', url, params);
    }
    post = async function(params) {
        let url = this.route + params.route;
        this.call('post', url, params);
    }
    put = async function(params) {
        let url = this.route + params.route;
        this.call('put', url, params);
    }
    delete = async function(params) {
        let url = this.route + params.route;
        this.call('delete', url, params);
    }

    call = async function(method, url, params) {
        axios({
            url: url,
            method: method,
            headers: {
                token: Token.get(),
                refreshToken: refreshToken.get(),
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(params.data),
            params: params.params
        })
        .then(resp => { params.success(resp); })
        .catch(error => {
            if (error.response.status == 417) {
                refreshToken.set(error.response.data)
                this.call(method, url, params);
            }
        })
    }
}