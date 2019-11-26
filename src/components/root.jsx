import React, { Component } from 'react';
import Header from "../components/header";

class Root extends Component {
  render() {
    return (
      <div>
        <Header />
        <div style={{height: "500px"}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Root;