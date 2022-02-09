export function getAccessToken(): string | null {
  return sessionStorage.getItem('accessToken');
}

export function setAccessToken(token: string): void {
  sessionStorage.setItem('accessToken', token);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem('refreshToken');
}
export function setRefreshToken(token: string): void {
  localStorage.setItem('refreshToken', token);
}
