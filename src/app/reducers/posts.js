const initialState = {
  // initial State
  posts: [],
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL": {
      return {
        ...state,
        posts: action.payload,
      };
    }
    case "CREATE_POST": {
      return {
        ...state,
        //posts: action.payload,
      };
    }
    case "UPDATE_POST": {
      return {
        ...state,
        //posts: action.payload,
      };
    }
    default:
      return state;
  }
};

export default postsReducer;
