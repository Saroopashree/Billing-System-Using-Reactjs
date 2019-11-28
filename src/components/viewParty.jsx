import React, { Component } from "react";
import Header from "./header";
// import data from "../assets/partyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faCheck } from "@fortawesome/free-solid-svg-icons";

class ViewParty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNewPartyClicked: false,
      key: "",
      partyAddress: "",
      GSTIN: "",
      partyName: "",
      dummy: 1
    };
  }

  buildRows = () => {
    var data = require("../assets/data.json");
    var rowValues = [];
    for (var key in data["parties"]) {
      var val = data["parties"][key];
      rowValues = rowValues.concat([
        [val["Key"], val["Address"], val["GSTIN"], val["Party Name"]]
      ]);
    }

    return rowValues.map(i => {
      return (
        <tr key={i}>
          <th scope={"row"}>{i[0]}</th>
          <td>{i[1]}</td>
          <td>{i[2]}</td>
          <td>{i[3]}</td>
        </tr>
      );
    });
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  newInputDiv = () => {
    if (!this.state.isNewPartyClicked) {
      return null;
    } else {
      var data = require("../assets/data.json");
      const nextKey = Object.keys(data["parties"]).length + 1;
      this.state.key = nextKey;
      return (
        <div className="d-flex flex-row">
          <input
            type="number"
            className="form-control mr-md-2 flex-shrink-1"
            style={{ width: "6%" }}
            value={this.state.key}
            name="key"
            onChange={event => this.handleChange(event)}
          />
          <input
            className="form-control mr-md-2 flex-shrink-1"
            style={{ width: "36%" }}
            value={this.state.partyAddress}
            placeholder={"Enter Party Address"}
            name="partyAddress"
            onChange={event => this.handleChange(event)}
          />
          <input
            className="form-control mx-md-2 flex-shrink-1"
            style={{ width: "20%" }}
            value={this.state.GSTIN}
            placeholder={"Enter Party GSTIN"}
            name="GSTIN"
            onChange={event => this.handleChange(event)}
          />
          <input
            className="form-control ml-md-2 flex-shrink-1"
            style={{ width: "38%" }}
            value={this.state.partyName}
            placeholder={"Enter Party Name"}
            name="partyName"
            onChange={event => this.handleChange(event)}
          />
          <button
            className="btn btn-outline-success mx-md-2"
            style={{ fontSize: "1rem" }}
            onClick={this.handleSubmit}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
      );
    }
  };

  newPartyButton = () => {
    if (this.state.isNewPartyClicked) {
      return null;
    } else {
      return (
        <div>
          <button
            className="shadow btn btn-outline-danger"
            style={{ height: "3rem", width: "10%", fontSize: "1.3rem" }}
            onClick={this.handleNewPartyInput}
          >
            <FontAwesomeIcon icon={faUserPlus} />
          </button>
        </div>
      );
    }
  };

  handleNewPartyInput = () => {
    this.setState({ isNewPartyClicked: true });
  };

  handleSubmit = () => {
    const fs = require("fs");
    const path = require("path");
    console.log(__dirname);
    let key = this.state.key.toString();
    let partyName = this.state.partyName === "" ? "-" : this.state.partyName;

    var data = JSON.parse(
      fs.readFileSync(path.join(__dirname + "/../assets/data.json"))
    );
    console.log(data);
    data["parties"][key] = {
      Key: key,
      Address: this.state.partyAddress,
      GSTIN: this.state.GSTIN,
      partyName: partyName
    };
    console.log(data);
    fs.writeFileSync(
      path.join(__dirname + "/../assets/data.json"),
      JSON.stringify(data),
      null,
      2
    );

    this.setState({
      isNewPartyClicked: false,
      key: "",
      partyAddress: "",
      GSTIN: "",
      partyName: ""
    });
  };

  render() {
    return (
      <div>
        <Header newInvoice={"nav-item"} viewParty={"nav-item active"} />
        <div className="p-md-5">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Key</th>
                <th scope="col">Party Address</th>
                <th scope="col">Party GSTIN</th>
                <th scope="col">Party Name</th>
              </tr>
            </thead>
            <tbody>{this.buildRows()}</tbody>
          </table>
          {this.newInputDiv()}
          {this.newPartyButton()}
        </div>
      </div>
    );
  }
}

export default ViewParty;
