export function getAccessToken() {
  return sessionStorage.getItem('accessToken');
}

export function setAccessToken(token: string) {
  return sessionStorage.setItem('accessToken', token);
}

export function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}
export function setRefreshToken(token: string) {
  return localStorage.setItem('refreshToken', token);
}
