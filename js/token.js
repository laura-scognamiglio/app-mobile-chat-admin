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

export const id_admin = {
  set: (id_role) => {
    sessionStorage.setItem("id_admin", id_role);
  },
  get: () => {
    return sessionStorage.getItem("id_admin");
  },
  remove: () => {
    sessionStorage.removeItem("id_admin");
  }
};