import React, { Component } from "react";
import { Link } from "react-router-dom";
import PdfContainer from "./pdfContainer";
import Doc from "../services/docService";

class PreviewInvoice extends Component {
  constructor(props) {
    super(props);
    this.numbersToWords();
  }

  buildRows = () => {
    var rows = [];
    var count = 1;
    for (var i in this.props.price) {
      if (this.props.price[i] !== 0) {
        rows.push([
          count++,
          i,
          "",
          this.props.weight[i],
          this.props.rate[i],
          this.props.price[i]
        ]);
      }
    }
    console.log(rows);
    return rows.map(item => {
      return (
        <tr key={item[0]}>
          {item.map(element => (
            <td className="pl-2" key={element}>
              {element}
            </td>
          ))}
        </tr>
      );
    });
  };

  createPdf = html => Doc.createPdf(html, this.props.billNumber);

  priceBeforeTax = () => {
    var sum = 0;
    for (var i in this.props.price) {
      sum += Number(this.props.price[i]);
    }
    return sum;
  };

  calculateCgst = () => {
    return Number((this.priceBeforeTax() * this.props.cgst) / 100);
  };

  calculateSgst = () => {
    return Number((this.priceBeforeTax() * this.props.sgst) / 100);
  };

  priceAfterTax = () => {
    return this.priceBeforeTax() + this.calculateCgst() + this.calculateSgst();
  };

  numbersToWords = () => {
    var convertRupeesIntoWords = require("convert-rupees-into-words");

    if (this.priceAfterTax() > 0) {
      return convertRupeesIntoWords(this.priceAfterTax());
    } else {
      return "Zero Rupees";
    }
  };

  render() {
    const {
      billNumber,
      billDate,
      vehicleNumber,
      partyAddress,
      partyGSTIN,
      cgst,
      sgst
    } = this.props;

    return (
      <div>
        <div className="d-flex justify-content-center">
          <div style={{ width: "60%" }}>
            <div style={{ height: "20px" }}></div>
            <PdfContainer createPdf={this.createPdf} billNumber={billNumber}>
              <div
                className="d-flex flex-column"
                style={{
                  border: "0.5px solid black"
                }}
              >
                <div
                  className="d-flex flex-row"
                  style={{ border: "0.5px solid black" }}
                >
                  <div
                    className="d-flex flex-column"
                    style={{ border: "0.5px solid black", flex: 13 }}
                  >
                    <span
                      style={{
                        fontSize: 26,
                        fontWeight: "bold",
                        textAlign: "center",
                        paddingTop: 4,
                        paddingBottom: 2
                      }}
                    >
                      PARIMALA METAL WORKS
                    </span>
                    <span
                      style={{
                        textAlign: "center",
                        paddingTop: 2,
                        paddingBottom: 4
                      }}
                    >
                      {
                        "#84, Sathy Main Road, Karattadipalayam, Gobichettipalayam, Erode (Dt), Tamilnadu - 638453"
                      }
                    </span>
                  </div>
                  <div
                    className="d-flex flex-column"
                    style={{ border: "0.5px solid black", flex: 7 }}
                  >
                    <span style={{ fontSize: 16, textAlign: "center" }}>
                      Ph: 04285 240015
                    </span>
                    <div
                      style={{ height: 0, border: "0.5px solid black" }}
                    ></div>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: 22,
                        textAlign: "center"
                      }}
                    >
                      {"GSTIN: \n" + partyGSTIN}
                    </span>
                  </div>
                </div>
                <div
                  className="d-flex flex-row"
                  style={{ border: "0.5px solid black" }}
                >
                  <div
                    className="d-flex flex-column"
                    style={{
                      flex: 13,
                      border: "0.5px solid black"
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        paddingLeft: "4px"
                      }}
                    >
                      To:
                    </span>
                    <span
                      style={{
                        fontSize: 18,
                        textAlign: "center"
                      }}
                    >
                      {partyAddress}
                    </span>
                  </div>
                  <div
                    className="d-flex flex-column"
                    style={{ flex: 7, border: "0.5px solid black" }}
                  >
                    <div
                      className="d-flex flex-row"
                      style={{
                        flex: 1,
                        fontSize: 18
                      }}
                    >
                      <span style={{ flex: 1, paddingLeft: "4px" }}>
                        Invoice No.:{" "}
                      </span>
                      <span style={{ flex: 1, textAlign: "center" }}>
                        {billNumber}
                      </span>
                    </div>
                    <div style={{ border: "1px solid black" }}></div>
                    <div
                      className="d-flex flex-row"
                      style={{
                        flex: 1,
                        fontSize: 18
                      }}
                    >
                      <span style={{ flex: 1, paddingLeft: "4px" }}>
                        Date:{" "}
                      </span>
                      <span style={{ flex: 1, textAlign: "center" }}>
                        {billDate}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="d-flex flex-row"
                  style={{ border: "0.5px solid black" }}
                >
                  <div
                    className="d-flex flex-row"
                    style={{
                      flex: 1,
                      fontSize: 16,
                      paddingLeft: "4px",
                      border: "0.5px solid black"
                    }}
                  >
                    <span style={{ flex: 1 }}>Consignee's GSTIN:</span>
                    <span
                      className="ml-2"
                      style={{ flex: 1, justifySelf: "center" }}
                    >
                      {partyGSTIN}
                    </span>
                  </div>
                  <div
                    className="d-flex flex-row"
                    style={{
                      flex: 1,
                      fontSize: 16,
                      paddingLeft: "4px",
                      border: "0.5px solid black"
                    }}
                  >
                    <span style={{ flex: 1 }}>Documents Through:</span>
                    <span
                      className="ml-2"
                      style={{ flex: 1, justifySelf: "center" }}
                    >
                      {vehicleNumber}
                    </span>
                  </div>
                </div>
                <div style={{ border: "0.5px solid black" }}>
                  <table
                    className="table-bordered"
                    style={{
                      width: "100%",
                      fontSize: 16
                    }}
                  >
                    <thead className="thead-dark">
                      <tr>
                        <th className="pl-2">Sl.No</th>
                        <th className="pl-2">Description</th>
                        <th className="pl-2">HSN Code</th>
                        <th className="pl-2">Weight</th>
                        <th className="pl-2">Rate</th>
                        <th className="pl-2">Amount Rs.</th>
                      </tr>
                    </thead>
                    <tbody>{this.buildRows()}</tbody>
                  </table>
                </div>
                <div
                  className="d-flex flex-row"
                  style={{ border: "0.5px solid black" }}
                >
                  <div style={{ flex: 1 }}></div>
                  <div
                    className="d-flex flex-row pl-md-2"
                    style={{ flex: 1, fontSize: 18 }}
                  >
                    <span style={{ flex: 3 }}>Total Amount Before Tax:</span>
                    <span style={{ flex: 2 }}>{this.priceBeforeTax()}</span>
                  </div>
                </div>
                <div className="d-flex flex-row">
                  <div
                    className="d-flex"
                    style={{
                      flex: 1,
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "0.5px solid black"
                    }}
                  >
                    <span style={{ fontSize: 23 }}>
                      {this.numbersToWords() + " Only"}
                    </span>
                  </div>
                  <div
                    className="d-flex flex-column"
                    style={{
                      flex: 1,
                      fontSize: 16,
                      border: "0.5px solid black"
                    }}
                  >
                    <div className="d-flex flex-row pl-2" style={{ flex: 1 }}>
                      <span style={{ flex: 3 }}>Add CGST</span>
                      <span style={{ flex: 3 }}>{cgst + " %"}</span>
                      <div
                        className="justify-content-center"
                        style={{ flex: 4 }}
                      >
                        <span>{this.calculateCgst()}</span>
                      </div>
                    </div>
                    <div
                      style={{ height: 0, border: "0.5px solid black" }}
                    ></div>
                    <div
                      className="d-flex flex-row pl-md-2"
                      style={{ flex: 1 }}
                    >
                      <span style={{ flex: 3 }}>Add SGST</span>
                      <span style={{ flex: 3 }}>{sgst + " %"}</span>
                      <div
                        className="justify-content-center"
                        style={{ flex: 4 }}
                      >
                        <span>{this.calculateSgst()}</span>
                      </div>
                    </div>
                    <div
                      style={{ height: 0, border: "0.5px solid black" }}
                    ></div>
                    <div
                      className="d-flex flex-row pl-md-2"
                      style={{ flex: 1 }}
                    >
                      <span style={{ flex: 3 }}>Add IGST</span>
                      <span style={{ flex: 3 }}>0 %</span>
                      <div
                        className="justify-content-center"
                        style={{ flex: 4 }}
                      >
                        <span>-</span>
                      </div>
                    </div>
                    <div
                      style={{ height: 0, border: "0.5px solid black" }}
                    ></div>
                    <div
                      className="d-flex flex-row pl-md-2"
                      style={{ flex: 1, fontSize: 18 }}
                    >
                      <span style={{ flex: 3, fontWeight: "bold" }}>
                        Total Amount After Tax:{" "}
                      </span>
                      <div
                        className="justify-content-center"
                        style={{ flex: 2 }}
                      >
                        <span>{"Rs. " + this.priceAfterTax()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="d-flex align-items-center justify-content-end"
                  style={{ height: "30px", border: "0.5px solid black" }}
                >
                  <span className="m-1">For</span>
                  <span className="mr-3" style={{ fontWeight: "bold" }}>
                    PARIMALA METAL WORKS
                  </span>
                </div>
              </div>
            </PdfContainer>
          </div>
        </div>
        <div className="m-5">
          <Link style={{ fontSize: 20 }} to={"/"}>
            Back
          </Link>
        </div>
      </div>
    );
  }
}

export default PreviewInvoice;
