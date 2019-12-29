import React, { Component } from 'react';
import './App.css';
import { HashRouter } from "react-router-dom";
import { Route } from "react-router";

import {
  checkboxState,
  textInputState,
  priceState
} from "./utils/constants";

import NewInvoice from "./components/newInvoice";
import ViewParty from "./components/viewParty";
import PreviewInvoice from "./components/previewInvoice";

class App extends Component {
  constructor() {
    super();
    this.state = {
      checkboxes: checkboxState,
      key: "",
      textInputs: {
        billNumber: "",
        billDate: "",
        vehicleNumber: "",
        weight: { ...textInputState },
        rate: { ...textInputState },
        partyAddress: "",
        partyGSTIN: "",
        cgst: "",
        sgst: ""
      },
      price: { ...priceState }
    };
  }

  handleCheckboxChange = event => {
    const { name } = event.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  handleTextInputChange = (event, label) => {
    const { name, value } = event.target;

    if (name === "weight") {
      this.setState(
        prevState => ({
          ...prevState,
          textInputs: {
            ...prevState.textInputs,
            ["weight"]: {
              ...prevState.textInputs["weight"],
              [label]: value
            }
          },
          price: {
            ...prevState.price,
            [label]: (
              Number(value) * Number(this.state.textInputs.rate[label])
            ).toFixed(2)
          }
        })
        // () => console.log("new price: ", this.state.price)
      );
    } else if (name === "rate") {
      this.setState(
        prevState => ({
          ...prevState,
          textInputs: {
            ...prevState.textInputs,
            ["rate"]: {
              ...prevState.textInputs["rate"],
              [label]: value
            }
          },
          price: {
            ...prevState.price,
            [label]: (
              Number(this.state.textInputs.weight[label]) * Number(value)
            ).toFixed(2)
          }
        })
        // () => console.log("new price: ", this.state.price)
      );
    } else {
      this.setState(prevState => ({
        textInputs: {
          ...prevState.textInputs,
          [name]: value
        }
      }));
    }
  };

  handleKeyChange = event => {
    const { value } = event.target;
    const data = require("./assets/data.json");

    const val = data["parties"][value.toString()];
    this.setState({ key: value });

    if (value && value <= Object.keys(data["parties"]).length) {
      this.setState(prevState => ({
        textInputs: {
          ...prevState.textInputs,
          partyAddress: val["Address"],
          partyGSTIN: val["GSTIN"]
        }
      }));
    } else {
      this.setState(prevState => ({
        textInputs: {
          ...prevState.textInputs,
          partyAddress: "",
          partyGSTIN: ""
        }
      }));
    }
  };

  render() {
    return (
      <div className="App">
        <HashRouter>
          <Route
            path="/"
            exact
            render={
              (props) => <NewInvoice
                {...props}
                states={this.state}
                handleKeyChange={this.handleKeyChange}
                handleTextInputChange={this.handleTextInputChange}
                handleCheckboxChange={this.handleCheckboxChange}
                onSubmit={this.handleSubmit}
              />}
          />
          <Route path="/viewParty" component={ViewParty} />
          <Route path="/previewInvoice" render={
            (props) => <PreviewInvoice
              {...props}
              billNumber={this.state.textInputs.billNumber}
              billDate={this.state.textInputs.billDate}
              vehicleNumber={this.state.textInputs.vehicleNumber}
              weight={this.state.textInputs.weight}
              rate={this.state.textInputs.rate}
              partyAddress={this.state.textInputs.partyAddress}
              partyGSTIN={this.state.textInputs.partyGSTIN}
              cgst={this.state.textInputs.cgst}
              sgst={this.state.textInputs.sgst}
              checkboxes={this.state.checkboxes}
              price={this.state.price}
            />}
          />
        </HashRouter>
      </div>
    );
  }
}

export default App;
