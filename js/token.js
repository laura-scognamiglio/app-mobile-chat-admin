const Token = {
    set: (token) => {
      localStorage.setItem("access_token", token);
    },
    get: () => {
      return localStorage.getItem("access_token");
    },
    remove: () => {
      localStorage.removeItem("access_token");
    }
  };
  
  export default Token;
  