import React from "react";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";
import convertRupeesIntoWords from "convert-rupees-into-words";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import PDFGenerator from "./PDFGenerator";

const useStyles = createUseStyles({
  root: { padding: "15px", paddingTop: 0 },
  invoice: {
    margin: "15px",
    width: "600px",
    border: "0.5px solid #000",
    fontSize: "15px",
    "& .grid": {
      display: "grid",
      gridTemplateColumns: "repeat(16, 1fr)",
      gridAutoRows: "20px",
      "& .grid-item": {
        border: "0.5px solid #000",
        padding: "8px",
        "& .inline-block": {
          display: "inline-block",
        },
        "& .flex-box": {
          display: "flex",
          alignItems: "center",
          height: "100%",
          width: "100%",
          "& .atom": { margin: "auto" },
        },
        "& .block": { display: "block" },
        "& .flex-col": { flexDirection: "column" },
        "& .justify-between": {
          justifyContent: "space-between",
          width: "100%",
        },
      },
      "& .self-name": {
        gridRow: "1/6",
        gridColumn: "1/11",
        "& .company-name": {
          fontWeight: 600,
          textTransform: "uppercase",
          marginBottom: "12px",
        },
        "& .company-address": {},
      },
      "& .ph-no": {
        gridRow: "1/3",
        gridColumn: "11/17",
        fontWeight: 600,
        fontSize: "16px",
      },
      "& .self-gstin": {
        gridRow: "3/6",
        gridColumn: "11/17",
        fontWeight: 600,
        fontSize: "16px",
      },
      "& .to-name": {
        gridRow: "6/10",
        gridColumn: "1/11",
        "& .to": {
          fontSize: "18px",
          marginBottom: "5px",
        },
        "& .name": {
          fontSize: "19px",
          fontWeight: "600",
          width: "fit-content",
          margin: "auto",
        },
      },
      "& .invoice-no": {
        gridRow: "6/8",
        gridColumn: "11/17",
        backgroundColor: "rgba(100, 100, 100, 0.2)",
      },
      "& .date": {
        gridRow: "8/10",
        gridColumn: "11/17",
      },
      "& .consignee-gstin": {
        gridRow: "10/13",
        gridColumn: "1/11",
      },
      "& .documents-through": {
        gridRow: "10/13",
        gridColumn: "11/17",
      },
      "& .empty-space": {
        gridRow: "1/3",
        gridColumn: "1/8",
      },
      "& .amnt-before-tax": {
        gridRow: "1/3",
        gridColumn: "8/17",
      },
      "& .amount-words": {
        gridRow: "3/11",
        gridColumn: "1/8",
        fontSize: "20px",
        fontWeight: 600,
        textAlign: "center",
      },
      "& .cgst": {
        gridRow: "3/5",
        gridColumn: "8/17",
      },
      "& .sgst": {
        gridRow: "5/7",
        gridColumn: "8/17",
      },
      "& .igst": {
        gridRow: "7/9",
        gridColumn: "8/17",
      },
      "& .amount-after-tax": {
        gridRow: "9/11",
        gridColumn: "8/17",
      },
      "& .signature": {
        gridRow: "11/16",
        gridColumn: "1/17",
        fontSize: "17px",
        "& .stick-right": {
          textAlign: "right",
          "& .text-uppercase": {
            textTransform: "uppercase",
            fontWeight: 600,
          },
        },
      },
    },
    "& .table-container": {
      border: "0.5px solid #000",
      fontSize: "12px",
      "& .table": {
        width: "100%",
        marginBottom: 0,
        "& .table-cell": {
          padding: "5px",
        },
        "& .align-right": {
          textAlign: "right",
        },
      },
    },
  },
});

const selfDetails = {
  name: "Parimala Metal Works",
  phone: "04285 240015",
  address:
    "#84, Sathy Main Road, Karattadipalayam, Gobichettipalayam, Erode (Dt), Tamilnadu - 638453",
  gstin: "33AAHPE3116E1ZG",
};

function PreviewInvoice(props) {
  const priceWithoutTax = props.price
    ? Object.values(props.price).reduce((a, b) => parseFloat(a) + parseFloat(b))
    : 0;
  const calculatedCgst = props.cgst
    ? Number((priceWithoutTax * props.cgst) / 100)
    : 0;
  const calculatedSgst = props.sgst
    ? Number((priceWithoutTax * props.sgst) / 100)
    : 0;
  const priceWithTax = Number(
    Number(priceWithoutTax + calculatedCgst + calculatedSgst).toFixed(0)
  );

  const numbersToWords = () => {
    const price = priceWithTax;
    if (price > 0) {
      return convertRupeesIntoWords(price);
    } else {
      return "Zero Rupees";
    }
  };

  const buildRows = () => {
    let count = 1;
    let rows = props.price
      ? Object.keys(props.price)
          .map((key) =>
            props.price[key]
              ? [
                  count++ + ".",
                  key,
                  "",
                  props.weight[key],
                  props.rate[key],
                  props.price[key],
                ]
              : null
          )
          .filter((el) => el)
      : [];

    return rows.map((item, idx) => {
      return (
        <tr key={idx}>
          {item.map((el) => (
            <td
              className={`table-cell ${
                Boolean(Number(el)) ? "align-right" : ""
              }`}
              key={el}
            >
              {el}
            </td>
          ))}
        </tr>
      );
    });
  };

  const classes = useStyles();
  const {
    billNumber,
    billDate,
    vehicleNumber,
    partyAddress,
    partyGSTIN,
    cgst,
    sgst,
  } = props;

  const dateObject = Boolean(billDate) ? new Date(billDate) : new Date();
  const formatedBillDate =
    ("0" + dateObject.getDate().toString()).slice(-2) +
    "-" +
    ("0" + (dateObject.getMonth() + 1)).toString().slice(-2) +
    "-" +
    dateObject.getFullYear();

  const invoice = (
    <div className={classes.invoice}>
      <div className="grid">
        <div className="grid-item self-name">
          <div className="flex-box flex-col">
            <h4 className="block atom company-name">{selfDetails.name}</h4>
            <h6 className="block atom company-address">
              {selfDetails.address}
            </h6>
          </div>
        </div>
        <div className="grid-item ph-no">
          <div className="flex-box">
            <span className="atom">Ph: {selfDetails.phone}</span>
          </div>
        </div>
        <div className="grid-item self-gstin">
          <div className="flex-box">
            <span className="atom">GSTIN: {selfDetails.gstin}</span>
          </div>
        </div>
        <div className="grid-item to-name">
          <div className="to">To</div>
          <div className="name">{partyAddress}</div>
        </div>
        <div className="grid-item invoice-no">
          <div className="flex-box">
            <span className="atom">Invoice No.: {billNumber}</span>
          </div>
        </div>
        <div className="grid-item date">
          <div className="flex-box">
            <span className="atom">Date: {formatedBillDate}</span>
          </div>
        </div>
        <div className="grid-item consignee-gstin">
          <div className="flex-box">
            <span className="atom">Consignee's GSTIN: {partyGSTIN}</span>
          </div>
        </div>
        <div className="grid-item documents-through">
          <div className="flex-box">
            <span className="atom">Documents through: {vehicleNumber}</span>
          </div>
        </div>
      </div>
      <div className="table-container">
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th className="table-cell">Sl.No</th>
              <th className="table-cell">Description</th>
              <th className="table-cell">HSN Code</th>
              <th className="table-cell">Weight</th>
              <th className="table-cell">Rate</th>
              <th className="table-cell">Amount Rs.</th>
            </tr>
          </thead>
          <tbody>{buildRows()}</tbody>
        </table>
      </div>
      <div className="grid">
        <div className="grid-item empty-space" />
        <div className="grid-item amnt-before-tax">
          <div className="flex-box justify-between">
            <span>Total Amount Before Tax:</span>
            <span>{priceWithoutTax.toFixed(2)}</span>
          </div>
        </div>
        <div className="grid-item amount-words">
          <div className="flex-box">
            <span>{numbersToWords(priceWithTax) + " Only"}</span>
          </div>
        </div>
        <div className="grid-item cgst">
          <div className="flex-box justify-between">
            <span>Add CSGT</span>
            <span>{cgst} %</span>
            <span>{calculatedCgst.toFixed(2)}</span>
          </div>
        </div>
        <div className="grid-item sgst">
          <div className="flex-box justify-between">
            <span>Add SSGT</span>
            <span>{sgst} %</span>
            <span>{calculatedSgst.toFixed(2)}</span>
          </div>
        </div>
        <div className="grid-item igst">
          <div className="flex-box justify-between">
            <span>Add ISGT</span>
            <span>0 %</span>
            <span>0</span>
          </div>
        </div>
        <div className="grid-item amount-after-tax">
          <div className="flex-box justify-between">
            <span>Total Amount After Tax: </span>
            <span>{priceWithTax.toFixed(0)}</span>
          </div>
        </div>
        <div className="grid-item signature">
          <div className="stick-right">
            <span>
              For <span className="text-uppercase">Parimala Metal Works</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={classes.root}>
      <div style={{ marginLeft: "1rem", marginTop: "1rem" }}>
        <Link style={{ fontSize: 25 }} to="/app/">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {invoice}
        <PDFGenerator billNumber={billNumber}>{invoice}</PDFGenerator>
      </div>
    </div>
  );
}

export default PreviewInvoice;
