const Token = {
    set: (token) => {
      sessionStorage.setItem("access_token", token);
    },
    get: () => {
      return sessionStorage.getItem("access_token");
    },
    remove: () => {
      sessionStorage.removeItem("access_token");
    }
};

const refreshToken = {
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