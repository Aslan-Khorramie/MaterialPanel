const intialState = {
  isOpen: false,
  menuTitleFa: "داشبورد",
  menuTitleEn: "Dashboard",
};

export const sideMenuReducer = (state = intialState, action) => {
  switch (action.type) {
    case "CHOOSE_TITLE":
      // login logic here
      return {
        ...state,
        menuTitleFa: action.menuTitleFa,
        menuTitleEn: action.menuTitleEn,
      };
    case "COLLAPSE":
      return {
        ...state,
        isOpen: action.payload,
      };
    default:
      return state;
  }
};
