import React, { Component } from "react";
import Auxx from "../../hoc/Auxx";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredient();
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };
  purchaseContinuedHandler = () => {
    //will display spinner
    this.props.initPurchase();
    this.props.history.push("/checkout");
  };

  updatePurchaseState() {
    //convert object to array
    const sum = Object.keys(this.props.ings)
      .map(key => {
        //get values of key and return as array
        return this.props.ings[key];
      })
      //add everything in array and return that number
      .reduce((sum, current) => {
        return sum + current;
      }, 0);
    return sum > 0 
  }

  render() {
    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Cannot retreive ingredients from serverx</p>
    ) : (
      <Spinner />
    );
    //fetching ingredients from firebase, cant display until this is done
    if (this.props.ings) {
      const disabledInfo = { ...this.props.ings };
      for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }
      console.log(this.props.ings);
      burger = (
        <Auxx>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            purchasing={this.purchaseHandler}
            purchasable={this.updatePurchaseState()}
            price={this.props.totalPrice}
            removedIngredient={this.props.onIngredientRemoved}
            addedIngredient={this.props.onIngredientAdded}
            disabled={disabledInfo}
          />
        </Auxx>
      );
      orderSummary = (
        <OrderSummary
          price={this.props.totalPrice}
          canceled={this.purchaseCancelHandler}
          continued={this.purchaseContinuedHandler}
          ingredients={this.props.ings}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Auxx>
        <Modal
          modalClosed={this.purchaseCancelHandler}
          show={this.state.purchasing}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxx>
    );
  }
}

const mapStateToProps = (state) =>{
  return{
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    onIngredientAdded: (ingName)=>dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName)=>dispatch(actions.removeIngredient(ingName)),
    onInitIngredient: ()=>dispatch(actions.initIngredients()),
    initPurchase: () => dispatch({ type: "PURCHASE_BURGER_INIT" })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
