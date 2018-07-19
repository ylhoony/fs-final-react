// export function getAuthToken() {
//   return `Bearer ${localStorage.getItem("token")}`
// }

export const getAuthToken = () => {
  return `Bearer ${localStorage.getItem("token")}`
}