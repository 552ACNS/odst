
  export function getAccessToken() {
    return sessionStorage.getItem('accessToken');
  }

  export function setAccessToken(token) {
    sessionStorage.setItem('accessToken', token);
  }

  // TODO switch storing refreshtoken in localStorage so that session persists across sessions (if that is wanted)
  export function getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  export function setRefreshToken(token) {
    localStorage.setItem('refreshToken', token);
  }
