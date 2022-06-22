export function getAccessToken(): string | null {
  return sessionStorage.getItem('accessToken');
}

export function setAccessToken(token: string): void {
  sessionStorage.setItem('accessToken', token);
}

export function removeAccessToken(): void {
  sessionStorage.removeItem('accessToken');
}

export function getRefreshToken(): string | null {
  return localStorage.getItem('refreshToken');
}

export function setRefreshToken(token: string): void {
  localStorage.setItem('refreshToken', token);
}

export function removeRefreshToken(): void {
  localStorage.removeItem('refreshToken');
}

export function removeTokens(): void {
  removeAccessToken();
  removeRefreshToken();
}

//TODO [ODST-311]: reconsider this when we figure out pushing user login
export function isLoggedIn(): boolean {
  return !!getRefreshToken();
}
