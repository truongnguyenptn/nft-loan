export function getUserRole() {
  return localStorage.getItem('role');
}
export function setUserRole(role: string) {
  localStorage.setItem('role', role);
}
