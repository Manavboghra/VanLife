export function getCurrentUser() {
  const userJson = localStorage.getItem("currentUser");
  if (!userJson) {
    return null;
  }
  return JSON.parse(userJson);
}