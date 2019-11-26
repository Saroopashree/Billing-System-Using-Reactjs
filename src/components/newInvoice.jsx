import React, { Component } from "react";
import Checkbox from "./checkbox";
import Header from "./header";
import data from "../assets/partyData";

const ITEMS = [
  "புதிய அலுமினிய பாத்திரங்கள்",
  "பழைய வேஸ்ட் அலுமினிய பாத்திரங்கள்",
  "பழைய வேஸ்ட் அலுமினிய பாத்திரங்கள் மெட்டல்",
  "பழைய வேஸ்ட் பித்தளை பொருட்கள்",
  "பழைய வேஸ்ட் செம்பு பொருட்கள்",
  "பழைய வேஸ்ட் பிளாஸ்டிக் பொருட்கள்",
  "பழைய வேஸ்ட் இரும்பு பொருட்கள்",
  "அலுமினியம் தகடு (உருமாற்றம் செய்ய)",
  "வடிதட்டம்",
  "பிளாஸ்டிக் குடம்",
  "பிளாஸ்டிக் டப்பு",
  "பிளாஸ்டிக் வாட்டர் கேன்",
  "பிளாஸ்டிக் ஸ்டூல்",
  "SS பாத்திரங்கள்"
];

const checkboxState = {
  "புதிய அலுமினிய பாத்திரங்கள்": false,
  "பழைய வேஸ்ட் அலுமினிய பாத்திரங்கள்": false,
  "பழைய வேஸ்ட் அலுமினிய பாத்திரங்கள் மெட்டல்": false,
  "பழைய வேஸ்ட் பித்தளை பொருட்கள்": false,
  "பழைய வேஸ்ட் செம்பு பொருட்கள்": false,
  "பழைய வேஸ்ட் பிளாஸ்டிக் பொருட்கள்": false,
  "பழைய வேஸ்ட் இரும்பு பொருட்கள்": false,
  "அலுமினியம் தகடு (உருமாற்றம் செய்ய)": false,
  வடிதட்டம்: false,
  "பிளாஸ்டிக் குடம்": false,
  "பிளாஸ்டிக் டப்பு": false,
  "பிளாஸ்டிக் வாட்டர் கேன்": false,
  "பிளாஸ்டிக் ஸ்டூல்": false,
  "SS பாத்திரங்கள்": false
};
const textInputState = {
  "புதிய அலுமினிய பாத்திரங்கள்": "",
  "பழைய வேஸ்ட் அலுமினிய பாத்திரங்கள்": "",
  "பழைய வேஸ்ட் அலுமினிய பாத்திரங்கள் மெட்டல்": "",
  "பழைய வேஸ்ட் பித்தளை பொருட்கள்": "",
  "பழைய வேஸ்ட் செம்பு பொருட்கள்": "",
  "பழைய வேஸ்ட் பிளாஸ்டிக் பொருட்கள்": "",
  "பழைய வேஸ்ட் இரும்பு பொருட்கள்": "",
  "அலுமினியம் தகடு (உருமாற்றம் செய்ய)": "",
  வடிதட்டம்: "",
  "பிளாஸ்டிக் குடம்": "",
  "பிளாஸ்டிக் டப்பு": "",
  "பிளாஸ்டிக் வாட்டர் கேன்": "",
  "பிளாஸ்டிக் ஸ்டூல்": "",
  "SS பாத்திரங்கள்": ""
};

class NewInvoice extends Component {
  constructor() {
    super();
    this.state = {
      checkboxes: checkboxState,
      key: null,
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
      }
    };
  }

  /* componentDidUpdate = (prevProps, prevState) => {
    console.log("Component Updated");
    console.log(this.state.textInputs);
  }; */

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
    console.log(name, ": ", value);

    if (name === "weight" || name === "rate") {
      this.setState(prevState => ({
        textInputs: {
          ...prevState.textInputs,
          [name]: {
            [label]: value
          }
        }
      }));
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
    const val = data[value.toString()];
    this.setState({ key: value });
    console.log(Object.keys(data).length);
    if (value && value <= Object.keys(data).length) {
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

  mySubmitHandler = event => {
    event.preventDefault();
    alert("You are submitting ");
  };

  createCheckboxes = () => {
    return ITEMS.map(item => {
      return (
        <Checkbox
          key={item}
          label={item}
          isSelected={this.state.checkboxes[item]}
          weight={this.state.textInputs.weight[item]}
          rate={this.state.textInputs.rate[item]}
          handleCheckboxChange={this.handleCheckboxChange}
          handleTextChange={this.handleTextInputChange}
        />
      );
    });
  };

  render() {
    return (
      <div>
        <Header newInvoice={"nav-item active"} viewParty={"nav-item"}/>
        <div className="m-md-4">
          <form>
            <fieldset>
              <legend>Billing</legend>
              <div className="d-flex flex-column justify-items-around">
                <div className="d-flex flex-row justify-content-between align-items-center m-md-3">
                  <div className="d-flex flex-row">
                    <label className="text-nowrap font-weight-bold">
                      பில் நம்பர்
                    </label>
                    <input
                      type="number"
                      className="form-control ml-md-4"
                      value={this.state.textInputs.billNumber}
                      onChange={event =>
                        this.handleTextInputChange(event, "billNumber")
                      }
                      name="billNumber"
                      placeholder="Enter Bill Number"
                    />
                  </div>
                  <div className="d-flex flex-row">
                    <label className="text-nowrap font-weight-bold">
                      பில் தேதி
                    </label>
                    <input
                      type="date"
                      className="form-control ml-md-4"
                      value={this.state.textInputs.billDate}
                      onChange={event =>
                        this.handleTextInputChange(event, "billDate")
                      }
                      name="billDate"
                      placeholder="Enter Bill Date"
                    />
                  </div>
                  <div className="d-flex flex-row">
                    <label className="text-nowrap font-weight-bold">
                      வண்டி நம்பர்
                    </label>
                    <input
                      type="text"
                      className="form-control ml-md-4"
                      value={this.state.textInputs.vehicleNumber}
                      onChange={event =>
                        this.handleTextInputChange(event, "vehicleNumber")
                      }
                      name="vehicleNumber"
                      placeholder="Enter Vehicle Number"
                    />
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-between align-items-center m-md-3">
                  <div className="d-flex flex-row">
                    <label className="text-nowrap font-weight-bold pl-4 pr-1">
                      Key
                    </label>
                    <input
                      type="number"
                      className="form-control ml-md-4"
                      value={this.state.key}
                      onChange={event => this.handleKeyChange(event)}
                      name="Key"
                      placeholder="Enter Key"
                    />
                  </div>
                  <div className="d-flex flex-row">
                    <label className="text-nowrap font-weight-bold px-2">
                      பார்ட்டி முகவரி
                    </label>
                    <input
                      type="text"
                      className="form-control ml-md-4"
                      value={this.state.textInputs.partyAddress}
                      onChange={event =>
                        this.handleTextInputChange(event, "partyAddress")
                      }
                      name="partyAddress"
                      placeholder="Enter Party Address"
                    />
                  </div>
                  <div className="d-flex flex-row">
                    <label className="text-nowrap font-weight-bold px-2">
                      பார்ட்டி GSTIN
                    </label>
                    <input
                      type="text"
                      className="form-control ml-md-4"
                      value={this.state.textInputs.partyGSTIN}
                      onChange={event =>
                        this.handleTextInputChange(event, "partyGSTIN")
                      }
                      name="partyGSTIN"
                      placeholder="Enter Party GSTIN"
                    />
                  </div>
                </div>
                <div>{this.createCheckboxes()}</div>
                <div className="d-flex flex-row justify-content-around align-items-center m-md-3">
                  <div className="d-flex flex-row">
                    <label className="text-nowrap font-weight-bold">CGST</label>
                    <input
                      type="number"
                      className="form-control ml-md-4"
                      value={this.state.textInputs.cgst}
                      onChange={event =>
                        this.handleTextInputChange(event, "cgst")
                      }
                      name="cgst"
                      placeholder="Enter CSGT Rate"
                    />
                  </div>
                  <div className="d-flex flex-row">
                    <label className="text-nowrap font-weight-bold">SGST</label>
                    <input
                      type="number"
                      className="form-control ml-md-4"
                      value={this.state.textInputs.sgst}
                      onChange={event =>
                        this.handleTextInputChange(event, "sgst")
                      }
                      name="sgst"
                      placeholder="Enter SGST Rate"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex flex-row justify-content-center">
                <input
                  className="form-control btn btn-outline-success w-25 text-primary"
                  type="submit"
                  value="Next"
                  onClick={this.mySubmitHandler}
                />
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default NewInvoice;
