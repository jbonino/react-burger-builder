import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'
import classes from './Burger.css'

const burger = (props) =>{
    //passed a json data structure of ingredients
    let ingArray = Object.keys(props.ingredients)
        .map((key)=>{
            return [...Array(props.ingredients[key])]
                .map((_,i)=>{
                    return <BurgerIngredient key={key+i} type={key}/>;
            })
        })
        .reduce((prev,current)=>{
            return prev.concat(current);
        }, [])//<-- inital value here

        if(ingArray.length === 0){
            ingArray = <p>Please start adding ingredients!</p>;
        }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {ingArray}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
}

export default burger;