export const authReducer = (state = {
  token: null
}, action) => {
  console.log(action);
  switch(action.type) {
    // case 'CREATE_SESSION':
    //   return state;

    default:
      return state;
  }
}

export default authReducer;