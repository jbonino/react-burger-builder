import React from "react";
import classes from "./Order.css";

const order = props => {
  console.log(props);
  //[{name: salad, amount:1},{name: meat, amount:1}...etc]
  let ingredients = [];
  for (let ingName in props.ingredients) {
    ingredients.push({
      name: ingName,
      amount: props.ingredients[ingName]
    });
  }

  const ingOutput = ingredients.map(ing => {
    return (
      <span 
        style={{
          textTransform: 'capitalize',
          display: 'inline-block' ,
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px'
        }}
        key={ing.name}>
        {ing.name} ({ing.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingOutput}</p>
      <p>
        Total Price: <strong>USD {(+props.price).toFixed(2)}</strong>
      </p>
      <small style={{ color: "#ddd" }}>
        (dining fee + parking fee + hungry fee = subtotal*10)
      </small>
    </div>
  );
};

export default order;
