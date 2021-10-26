const intialState = {
  direction: "rtl",
};

export const directionReducer = (state = intialState, action) => {
  switch (action.type) {
    case "CHANGE_DIR":
      // login logic here
      return {
        ...state,
        direction: action.payload,
      };
    default:
      return state;
  }
};
