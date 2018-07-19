export const getAuthToken = () => {
  return `Bearer ${localStorage.getItem("token")}`
}