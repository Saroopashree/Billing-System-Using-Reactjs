import React, { Component } from "react";
import data from "../assets/partyData";

class ViewParty extends Component {
  buildRows = () => {
    /* let numRows = Array(Object.keys(data).length);
    var rowValues = Array(Object.keys(data));
    return rowValues.forEach(i => {
      console.log(i, ": ", data[i]);
      return (
        <tr>
          <th scope="row">{i}</th>
          <td>{data[i]["Address"]}</td>
          <td>{data[i]["GSTIN"]}</td>
          <td>{data[i]["Party Name"]}</td>
        </tr>
      );
    }); */

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

  render() {
    return (
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
          <tbody>
            {/* <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
          </tr> */}
            {this.buildRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ViewParty;
