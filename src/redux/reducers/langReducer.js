const intialState = {
  lang: "fa",
};

export const LangReducer = (state = intialState, action) => {
  switch (action.type) {
    case "CHANGE_LANG":
      // login logic here
      return {
        ...state,
        lang: action.payload,
      };
    default:
      return state;
  }
};
