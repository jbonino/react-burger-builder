import React from 'react';

import NavItems from '../NavigationItems/NavigationItems'
import Logo from '../../Logo/Logo'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Auxx from "../../../hoc/Auxx";

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer];
    if(props.show){
        attachedClasses.push(classes.Open)
    }
    else{
        attachedClasses.push(classes.Close)
    }
    return (
        <Auxx>
            <Backdrop clicked={props.closed} show={props.show}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />    
                </div> 
                <nav>
                    <NavItems />
                </nav>
            </div>
        </Auxx>
    );
};

export default sideDrawer;