import React, { Component } from "react";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";

import * as actions from "../../../store/actions/index";
import { connect } from "react-redux";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your area code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your email"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        validation: {},
        value: "",
        valid: true
      }
    },
    formIsValid: false
  };

  orderHandler = event => {
    //form submit defaults to sending request
    event.preventDefault();
    //only want name and value
    const formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      orderData: formData
    };

    this.props.onOrderBurger(order);
  };

  inputChangedHandler = (event, inputId) => {
    //need to deep copy. spread operator does not do this for us. still has references
    const toUpdateForm = { ...this.state.orderForm };
    //get next level copy. contains the key 'value' which we want to update
    const toUpdateElement = { ...toUpdateForm[inputId] };
    //change copy of value to new value
    toUpdateElement.value = event.target.value;
    toUpdateElement.valid = this.checkValueValidity(
      toUpdateElement.value,
      toUpdateElement.validation
    );
    //for displaying validation css
    toUpdateElement.touched = true;
    //change copyies key to new element. perhaps key 'name' changes its value to 'Joe'
    toUpdateForm[inputId] = toUpdateElement;

    //check if all inputs are valid then set valid true for form
    let validForm = this.checkFormValidity(toUpdateForm);

    //update!
    this.setState({ orderForm: toUpdateForm, formIsValid: validForm });
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

  render() {
    const formElArray = [];
    for (let key in this.state.orderForm) {
      formElArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
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
        <Button
          disabled={!this.state.formIsValid}
          clicked={this.orderHandler}
          btnType="Success"
        >
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Whos giving me money?</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: orderData => dispatch(actions.purchaseBurger(orderData)),
    initPurchase: () => dispatch({type: 'PURCHASE_BURGER_INIT'})
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
