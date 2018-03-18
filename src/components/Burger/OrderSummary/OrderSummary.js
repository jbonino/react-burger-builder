import React, {Component} from 'react';
import Auxx from '../../../hoc/Auxx';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    render(){
        const ingSummary= Object.keys(this.props.ingredients)
        .map((key)=>{
            return (
                <li key={key}>
                    <span style={{textTransform: 'capitalize'}}>{key}</span>
                    :{this.props.ingredients[key]}
                </li>
            )
        });
        return <div>
            <Auxx>
                <h3>Your Order</h3>
                <p>burger with dis shit...</p>
                <ul>
                    {ingSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button clicked={this.props.canceled} btnType="Danger">CANCEL</Button>
                <Button clicked={this.props.continued} btnType="Success">CONTINUE</Button>
            </Auxx>
        </div>
    }
}

export default OrderSummary;