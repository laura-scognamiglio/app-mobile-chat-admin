import { API, front } from "./constant.js"
import { Token, refreshToken } from "./token.js";

export default class Api{
    constructor() {
        this.route = API;
        this.call = this.call.bind(this);
    }
  
    get = async function (params) {
      let url = this.route + params.route;
      this.call('get', url, params);
    };
    post = async function (params) {
      let url = this.route + params.route;
      this.call('post', url, params);
    };
    put = async function (params) {
      let url = this.route + params.route;
      this.call('put', url, params);
    };
    delete = async function (params) {
      let url = this.route + params.route;
      this.call('delete', url, params);
    };
  
    call = async function (method, url, params) {
      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            token: Token.get(),
            refreshToken: refreshToken.get(),
            'Content-Type': 'application/json',
          },
          body: method !== 'get' ? JSON.stringify(params.data) : undefined,
        });
  
        if (response.status === 417) {
          const refreshTokenData = await response.json();
          refreshToken.set(refreshTokenData);
          return this.call(method, url, params);
        } else if (response.ok) {
          const responseData = await response.json();
          params.success(responseData);
        } else {
          throw new Error('Request failed with status ' + response.status);
        }
      } catch (error) {
        console.error('Error in Api.call():', error);
        if (params.error) {
          params.error(error);
        }
      }
    };
  }
  