import * as actionTypes from "./actionTypes";

export const addIngredient = payload => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: payload
  };
};

export const removeIngredient = payload => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: payload
  };
};

export const initIngredients = () => {
  return (dispatch, getState, axios) => {
    axios
      .get("/ingredients.json")
      .then(res => {
        dispatch(setIngredients(res.data));
      })
      .catch(err => {
        dispatch(initIngredientsFailed());
      });
  };
};

export const setIngredients = ingredients => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: {
      salad: ingredients.salad,
      bacon: ingredients.bacon,
      cheese: ingredients.cheese,
      meat: ingredients.meat
    }
  };
};

export const initIngredientsFailed = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS_FAILED
  };
};
