const intialState = {
  authValues: {},
};

export const authReducer = (state = intialState, action) => {
  switch (action.type) {
    case "LOGIN":
      // login logic here
      return {
        ...state,
        authValues: action.payload,
      };
    case "LOGOUT":
      // login logic here
      return {
        ...state,
        authValues: {},
      };
    default:
      return state;
  }
};
