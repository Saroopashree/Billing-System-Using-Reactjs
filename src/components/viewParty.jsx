import React, { Component } from "react";
import Header from "./header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import "../App.css";

class ViewParty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNewPartyClicked: false,
      key: "",
      partyAddress: "",
      GSTIN: "",
      partyName: "",
      clickedKey: null,
      clickedField: "",
      fieldValue: "",
    };
    this.data = require("../assets/data.json");
  }

  modifyField = () => {
    const fs = require("fs");
    const path = require("path");
    if (this.state.fieldValue !== "") {
      this.data["parties"][this.state.clickedKey][
        this.state.clickedField
      ] = this.state.fieldValue;
    } else {
      this.data["parties"][this.state.clickedKey][this.state.clickedField] =
        "-";
    }

    this.setState({ clickedKey: null, clickedField: "", fieldValue: "" });

    fs.writeFileSync(
      path.join(__dirname + "/../assets/data.json"),
      JSON.stringify(this.data, null, 2)
    );
  };

  buildRows = () => {
    // var data = require("../assets/data.json");
    var rowValues = [];
    for (var key in this.data["parties"]) {
      var val = this.data["parties"][key];
      rowValues = rowValues.concat([
        [val["Key"], val["Address"], val["GSTIN"], val["Party Name"]],
      ]);
    }

    return rowValues.map((i) => {
      return (
        <tr key={i[0]}>
          <th scope="row">{i[0]}</th>
          <td name="Address">
            {this.state.clickedKey === i[0] &&
            this.state.clickedField === "Address" ? (
              <>
                <input
                  value={this.state.fieldValue}
                  onChange={(e) => {
                    this.setState({ fieldValue: e.target.value });
                  }}
                />
                <button
                  className="btn btn-outline-success mx-md-2"
                  style={{ fontSize: "0.7rem" }}
                  onClick={this.modifyField}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button
                  className="btn btn-outline-danger mx-md-2"
                  style={{ fontSize: "0.7rem" }}
                  onClick={() => {
                    this.setState({
                      clickedKey: null,
                      clickedField: "",
                      fieldValue: "",
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </>
            ) : (
              <span
                className="editable-text"
                id={`${i[0]}-Address`}
                onClick={() => {
                  this.setState({
                    clickedKey: i[0],
                    clickedField: "Address",
                    fieldValue: document.getElementById(`${i[0]}-Address`)
                      .innerText,
                  });
                }}
              >
                {i[1]}
              </span>
            )}
          </td>
          <td name="GSTIN">
            {this.state.clickedKey === i[0] &&
            this.state.clickedField === "GSTIN" ? (
              <>
                <input
                  value={this.state.fieldValue}
                  onChange={(e) => {
                    this.setState({ fieldValue: e.target.value });
                  }}
                />
                <button
                  className="btn btn-outline-success mx-md-2"
                  style={{ fontSize: "0.7rem" }}
                  onClick={this.modifyField}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button
                  className="btn btn-outline-danger mx-md-2"
                  style={{ fontSize: "0.7rem" }}
                  onClick={() => {
                    this.setState({
                      clickedKey: null,
                      clickedField: "",
                      fieldValue: "",
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </>
            ) : (
              <span
                className="editable-text"
                id={`${i[0]}-GSTIN`}
                onClick={() => {
                  this.setState({
                    clickedKey: i[0],
                    clickedField: "GSTIN",
                    fieldValue: document.getElementById(`${i[0]}-GSTIN`)
                      .innerText,
                  });
                }}
              >
                {i[2]}
              </span>
            )}
          </td>
          <td name="Party Name">
            {this.state.clickedKey === i[0] &&
            this.state.clickedField === "Party Name" ? (
              <>
                <input
                  value={this.state.fieldValue}
                  onChange={(e) => {
                    this.setState({ fieldValue: e.target.value });
                    console.log(e.target.value);
                  }}
                />
                <button
                  className="btn btn-outline-success mx-md-2"
                  style={{ fontSize: "0.7rem" }}
                  onClick={this.modifyField}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button
                  className="btn btn-outline-danger mx-md-2"
                  style={{ fontSize: "0.7rem" }}
                  onClick={() => {
                    this.setState({
                      clickedKey: null,
                      clickedField: "",
                      fieldValue: "",
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </>
            ) : (
              <span
                className="editable-text"
                id={`${i[0]}-Party Name`}
                onClick={() => {
                  this.setState({
                    clickedKey: i[0],
                    clickedField: "Party Name",
                    fieldValue: document.getElementById(`${i[0]}-Party Name`)
                      .innerText,
                  });
                }}
              >
                {i[3]}
              </span>
            )}
          </td>
        </tr>
      );
    });
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
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
            onChange={(event) => this.handleChange(event)}
          />
          <input
            className="form-control mr-md-2 flex-shrink-1"
            style={{ width: "36%" }}
            value={this.state.partyAddress}
            placeholder={"Enter Party Address"}
            name="partyAddress"
            onChange={(event) => this.handleChange(event)}
          />
          <input
            className="form-control mx-md-2 flex-shrink-1"
            style={{ width: "20%" }}
            value={this.state.GSTIN}
            placeholder={"Enter Party GSTIN"}
            name="GSTIN"
            onChange={(event) => this.handleChange(event)}
          />
          <input
            className="form-control ml-md-2 flex-shrink-1"
            style={{ width: "38%" }}
            value={this.state.partyName}
            placeholder={"Enter Party Name"}
            name="partyName"
            onChange={(event) => this.handleChange(event)}
          />
          <button
            className="btn btn-outline-success mx-md-2"
            style={{ fontSize: "1rem" }}
            onClick={this.handleSubmit}
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button
            className="btn btn-outline-danger mx-md-2"
            style={{ fontSize: "1rem" }}
            onClick={() => {
              this.setState({ isNewPartyClicked: false });
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
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
      "Party Name": partyName,
    };
    console.log(data);
    fs.writeFileSync(
      path.join(__dirname + "/../assets/data.json"),
      JSON.stringify(data, null, 2)
    );

    this.setState({
      isNewPartyClicked: false,
      key: "",
      partyAddress: "",
      GSTIN: "",
      partyName: "",
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
