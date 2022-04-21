let token = '';

export const setToken = (newToken: string) => {
  token = newToken;
}

export const checkToken = () => !!token;

export const removeToken = () => {
  token = ''
}

export const getToken = () => token;