import React, { Component } from "react";
import { Link } from "react-router-dom";
import Checkbox from "./checkbox";
import Header from "./header";

import ITEMS from "../utils/constants";

class NewInvoice extends Component {

  createCheckboxes = () => {
    const { states, handleCheckboxChange, handleTextInputChange } = this.props;
    return ITEMS.map(item => {
      return (
        <Checkbox
          key={item}
          label={item}
          isSelected={states.checkboxes[item]}
          weight={states.textInputs.weight[item]}
          rate={states.textInputs.rate[item]}
          price={states.price[item]}
          handleCheckboxChange={handleCheckboxChange}
          handleTextChange={handleTextInputChange}
        />
      );
    });
  };

  render() {
    const {
      states,
      handleKeyChange,
      handleTextInputChange,
    } = this.props;

    return (
      <div>
        <Header newInvoice={"nav-item active"} viewParty={"nav-item"} />
        <div className="m-md-4">
          <form>
            <fieldset>
              <legend>Billing</legend>
              <div className="d-flex flex-column justify-items-around">
                <div className="d-flex flex-row justify-content-between align-items-center m-md-3">
                  <div className="d-flex flex-row" style={{ width: "24%" }}>
                    <label className="text-nowrap font-weight-bold">
                      பில் நம்பர்
                    </label>
                    <input
                      type="number"
                      className="form-control ml-md-4"
                      style={{ width: "11rem" }}
                      value={states.textInputs.billNumber}
                      onChange={event =>
                        handleTextInputChange(event, "billNumber")
                      }
                      name="billNumber"
                      placeholder="Enter Bill Number"
                    />
                  </div>
                  <div
                    className="d-flex flex-row px-md-5"
                    style={{ width: "36%" }}
                  >
                    <label className="text-nowrap font-weight-bold">
                      பில் தேதி
                    </label>
                    <input
                      type="date"
                      className="form-control ml-md-4"
                      style={{ width: "11rem" }}
                      data-date=""
                      data-date-format="DD MM YYYY"
                      value={states.textInputs.billDate}
                      onChange={event =>
                        handleTextInputChange(event, "billDate")
                      }
                      name="billDate"
                      placeholder="Enter Bill Date"
                    />
                  </div>
                  <div
                    className="d-flex flex-row px-md-4"
                    style={{ width: "30%" }}
                  >
                    <label className="text-nowrap font-weight-bold">
                      வண்டி நம்பர்
                    </label>
                    <input
                      type="text"
                      className="form-control ml-md-4"
                      style={{ width: "11rem" }}
                      value={states.textInputs.vehicleNumber}
                      onChange={event =>
                        handleTextInputChange(event, "vehicleNumber")
                      }
                      name="vehicleNumber"
                      placeholder="Enter Vehicle Number"
                    />
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-center m-md-3">
                  <div className="d-flex flex-row" style={{ width: "24%" }}>
                    <label className="text-nowrap font-weight-bold pl-4 mr-md-3">
                      Key
                    </label>
                    <input
                      type="number"
                      className="form-control ml-md-4"
                      style={{ width: "7rem" }}
                      value={states.key}
                      onChange={event => handleKeyChange(event)}
                      name="Key"
                      placeholder="Enter Key"
                    />
                  </div>
                  <div className="d-flex flex-row" style={{ width: "36%" }}>
                    <label className="text-nowrap font-weight-bold px-md-2">
                      பார்ட்டி முகவரி
                    </label>
                    <input
                      type="text"
                      className="form-control ml-md-4"
                      value={states.textInputs.partyAddress}
                      onChange={event =>
                        handleTextInputChange(event, "partyAddress")
                      }
                      name="partyAddress"
                      placeholder="Enter Party Address"
                    />
                  </div>
                  <div className="d-flex flex-row" style={{ width: "30%" }}>
                    <label className="text-nowrap font-weight-bold px-2">
                      பார்ட்டி GSTIN
                    </label>
                    <input
                      type="text"
                      className="form-control ml-md-4"
                      style={{ width: "50%" }}
                      value={states.textInputs.partyGSTIN}
                      onChange={event =>
                        handleTextInputChange(event, "partyGSTIN")
                      }
                      name="partyGSTIN"
                      placeholder="Enter Party GSTIN"
                    />
                  </div>
                </div>
                <div className="pt-md-3">{this.createCheckboxes()}</div>
                <div className="d-flex flex-row justify-content-around align-items-center m-md-3">
                  <div className="d-flex flex-row">
                    <label className="text-nowrap font-weight-bold">CGST</label>
                    <input
                      type="number"
                      className="form-control ml-md-4"
                      value={states.textInputs.cgst}
                      onChange={event => handleTextInputChange(event, "cgst")}
                      name="cgst"
                      placeholder="Enter CSGT Rate"
                    />
                  </div>
                  <div className="d-flex flex-row">
                    <label className="text-nowrap font-weight-bold">SGST</label>
                    <input
                      type="number"
                      className="form-control ml-md-4"
                      value={states.textInputs.sgst}
                      onChange={event => handleTextInputChange(event, "sgst")}
                      name="sgst"
                      placeholder="Enter SGST Rate"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-center">
                <button
                  className="form-control btn btn-primary text-light mt-md-3"
                  style={{ width: "20%" }}
                  // type="submit"
                  // value="Next"
                  // onClick={onSubmit}
                >
                  <Link className="text-light" style={{textDecoration: "none"}} to={"/previewInvoice"}>See Preview Of Invoice</Link>
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default NewInvoice;
