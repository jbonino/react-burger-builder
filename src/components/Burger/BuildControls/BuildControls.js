import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label: 'Salad',type:'salad'},
    {label: 'Bacon',type:'bacon'},
    {label: 'Meat',type:'meat'},
    {label: 'Cheese',type:'cheese'},
]

const buildContols = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map((ctrl)=>(
                <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label}
                    type={ctrl.type}
                    added={()=>props.addedIngredient(ctrl.type)}
                    removed={()=>props.removedIngredient(ctrl.type)}
                    disabled={props.disabled[ctrl.type]}/>))}
            <button 
                disabled={!props.purchasable}
                onClick={props.purchasing}
                className={classes.OrderButton}>ORDER NOW</button>
        </div>
    );
};

export default buildContols;