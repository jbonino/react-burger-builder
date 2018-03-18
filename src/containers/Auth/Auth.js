import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.css";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
  state = {
    form: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: ""
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    isSignUp: true,
  };

  inputChangedHandler = (event, controlName) => {
    const toUpdateForm = {
      ...this.state.form,
      [controlName]: {
        ...this.state.form[controlName],
        value: event.target.value,
        valid: this.checkValueValidity(event.target.value, this.state.form[controlName].validation),
        touched: true,
      }
    }
    this.setState({form: toUpdateForm, formIsValid: this.checkFormValidity(toUpdateForm)})
  };

  checkValueValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  };

  checkFormValidity = form => {
    //check if all inputs are valid then set valid true for form
    let formIsValid = true;
    //sexy code right herrr
    for (let key in form) {
      //check each formElement and see if all are valid. If there is no validation for formElement, then !...validation is true
      formIsValid = form[key].valid && formIsValid;
    }
    return formIsValid;
  };

  switchAuthMode = () =>{
    this.setState(prevState =>{return {isSignUp: !prevState.isSignUp}})
  }

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(this.state.form.email.value,this.state.form.password.value, this.state.isSignUp);
  };

  render() {
    const formElArray = [];
    for (let key in this.state.form) {
      formElArray.push({
        id: key,
        config: this.state.form[key]
      });
    }
    let form = <div>
        {formElArray.map(formElement => {
          return (
            <Input
              touched={formElement.config.touched}
              isValid={formElement.config.valid}
              changed={event => this.inputChangedHandler(event, formElement.id)}
              key={formElement.id}
              value={formElement.config.value}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
            />
          );
        })}
        </div>;
    if(this.props.loading){ form = <Spinner />;}
    let errorMessage = null;
    if(this.props.error){
      errorMessage = this.props.error;
    }
    return <div className={classes.Auth}>
      {errorMessage}
      <form onSubmit={this.submitHandler}>
        {form}
        <Button disabled={!this.state.formIsValid} clicked={this.orderHandler} btnType="Success">
          Submit
        </Button>
      </form>
      <Button clicked={()=>this.switchAuthMode()}btnType='Danger'>{this.state.isSignUp ? 'Switch to Sign In':'Switch to Sign Up' } </Button>
      </div>;
  }
}


const mapStateToProps = state =>{
  return{
    loading: state.auth.loading,
    error: state.auth.error
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
