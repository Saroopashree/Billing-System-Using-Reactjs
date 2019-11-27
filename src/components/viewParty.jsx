import React, { Component } from "react";
import Header from "./header";
import data from "../assets/partyData";

class ViewParty extends Component {
  buildRows = () => {
    var rowValues = [];
    for (var key in data) {
      var val = data[key];
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

  clicked = () => {
    const fs = require("electron").remote.require("fs");
    var data = JSON.parse(fs.readFileSync("./src/assets/data.json"));
    console.log(data);
  }

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
          <button onClick={this.clicked}>Fetch Data</button>
        </div>
      </div>
    );
  }
}

export default ViewParty;
