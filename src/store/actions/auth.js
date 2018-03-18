import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = authData => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: authData.idToken,
    userId: authData.localId
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAcgY9cRC2y110Og76IYIggbGpKh5OkwOs';
    if(!isSignup) url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAcgY9cRC2y110Og76IYIggbGpKh5OkwOs'
    axios.post(url, authData)
      .then(res=>{
        dispatch(authSuccess(res.data));
      })
      .catch(err=>{
        dispatch(authFail(err.response.data.error.errors[0].message))
      })
  };
};
