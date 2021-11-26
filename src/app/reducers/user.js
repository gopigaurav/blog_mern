const initialState = {
  // initial State
  loggedIn: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LOGIN_STATE": {
      return {
        ...state,
        loggedIn: action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
