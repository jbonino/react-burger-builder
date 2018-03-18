import React from "react";
import classes from "./NavigationItems.css";
import NavItem from "./NavigationItem/NavigationItem";

const navItem = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavItem link="/" exact>
        Burger Builder
      </NavItem>
      <NavItem exact link="/orders">
        Orders
      </NavItem>
      <NavItem exact link="/signin">
        Sign In
      </NavItem>
    </ul>
  );
};

export default navItem;
