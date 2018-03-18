import * as actionTypes from "../actions/actionTypes";

const initState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return { ...state, error: null, loading: true };
    case actionTypes.AUTH_SUCCESS:
      return{...state, token: action.token, userId: action.userId, error: null, loading:false}
    case actionTypes.AUTH_FAIL:
      console.log(action.error);
      return{...state, loading: false, error: action.error}
    default:
      return state;
  }
};

export default reducer;
