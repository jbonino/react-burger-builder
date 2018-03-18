import * as actionTypes from "../actions/actionTypes";

const initState = {
  ingredients: null,
  totalPrice: 2,
  error: false
};

const INGREDIENT_PRICES = {
  salad: 0.1,
  cheese: 0.75,
  meat: 1.5,
  bacon: 0.9
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          //deeper copy so no reference
          ...state.ingredients,
          //new es6 syntax [...] will replace key with new value. salad: oldAmount +1
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          //deeper copy so no reference
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
      };
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        totalPrice: 2 
      };
    case actionTypes.INIT_INGREDIENTS_FAILED:
      return{
        ...state,
        error: true
      }
    default:
      return state;
  }
};

export default reducer;
