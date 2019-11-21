import React, { Component } from "react";
import Checkbox from "./checkbox";

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

const itemsState = {
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

class NewInvoice extends Component {
  constructor() {
    super();
    this.state = {
      checkboxes: itemsState
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
          handleChange={this.handleCheckboxChange}
        />
      );
    });
  };

  render() {
    return (
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
                    name="vehicleNumber"
                    placeholder="Enter Vehicle Number"
                  />
                </div>
              </div>
              <div className="d-flex flex-row justify-content-around align-items-center m-md-3">
                <div className="d-flex flex-row">
                  <label className="text-nowrap font-weight-bold px-2">
                    பார்ட்டி முகவரி
                  </label>
                  <input
                    type="text"
                    className="form-control ml-md-4"
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
                    name="partyGSTIN"
                    placeholder="Enter Party GSTIN"
                  />
                </div>
              </div>
              <div>{this.createCheckboxes()}</div>
              {/* <div className="d-flex flex-row justify-content-around align-items-center m-md-3">
                <div className="d-flex flex-row">
                  <label className="text-nowrap font-weight-bold">எடை</label>
                  <input
                    type="number"
                    className="form-control ml-md-4"
                    name="weight"
                    placeholder="Enter Weight"
                  />
                </div>
                <div className="d-flex flex-row">
                  <label className="text-nowrap font-weight-bold">விலை</label>
                  <input
                    type="number"
                    className="form-control ml-md-4"
                    name="rate"
                    placeholder="Enter Rate"
                  />
                </div>
              </div> */}
              <div className="d-flex flex-row justify-content-around align-items-center m-md-3">
                <div className="d-flex flex-row">
                  <label className="text-nowrap font-weight-bold">CGST</label>
                  <input
                    type="number"
                    className="form-control ml-md-4"
                    name="cgst"
                    placeholder="Enter CSGT Rate"
                  />
                </div>
                <div className="d-flex flex-row">
                  <label className="text-nowrap font-weight-bold">SGST</label>
                  <input
                    type="number"
                    className="form-control ml-md-4"
                    name="sgst"
                    placeholder="Enter SGST Rate"
                  />
                </div>
              </div>
            </div>
            <div className="d-flex flex-row justify-content-center">
              <input
                className="form-control w-25 bg-success text-primary"
                type="submit"
                value="Next"
                onClick={this.mySubmitHandler}
              />
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default NewInvoice;
