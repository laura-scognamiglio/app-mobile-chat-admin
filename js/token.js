export const Token = {
    set: (token) => {
      console.log(token)
      sessionStorage.setItem("token", token);
    },
    get: () => {
      console.log('sesh', sessionStorage)
      return sessionStorage.getItem("token");
    },
    remove: () => {
      sessionStorage.removeItem("token");
    }
};

export const refreshToken = {
  set: (token) => {
    sessionStorage.setItem("refresh_token", token);
  },
  get: () => {
    return sessionStorage.getItem("refresh_token");
  },
  remove: () => {
    sessionStorage.removeItem("refresh_token");
  }
};
  // export default Token;
  console.log(Token)