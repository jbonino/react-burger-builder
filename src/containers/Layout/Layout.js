import React, { Component } from "react";
import Auxx from "../../hoc/Auxx";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerToggle = () => {
    this.setState((prevState, props) => ({
      showSideDrawer: !prevState.showSideDrawer
    }));
  };
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  sideDrawerOpenedHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  render() {
    return (
      <Auxx>
        <SideDrawer
          show={this.state.showSideDrawer}
          open={this.sideDrawerOpenedHandler}
          closed={this.sideDrawerClosedHandler}
        />
        <Toolbar toggle={this.sideDrawerToggle} />
        <main className={classes.Content}>{this.props.children}</main>
      </Auxx>
    );
  }
}

export default Layout;
