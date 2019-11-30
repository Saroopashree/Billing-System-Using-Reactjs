import React, { Component } from "react";
class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
  }

  handleCheckboxChange = event => {
    this.setState({ isChecked: !this.state.isChecked });
    this.props.handleCheckboxChange(event);
  };

  renderWeightAndRate = () => {
    const { label } = this.props;
    if (this.state.isChecked) {
      return (
        <div className="d-flex flex-row justify-content-between align-contents-center mx-md-3">
          <div className="d-flex flex-row align-items-center mx-md-4">
            <label className="text-nowrap font-weight-normal">எடை</label>
            <input
              type="number"
              className="form-control ml-md-3"
              value={this.props.weight}
              onChange={event => this.props.handleTextChange(event, label)}
              name="weight"
              placeholder="Enter Weight"
            />
          </div>
          <div className="d-flex flex-row align-items-center mx-md-4">
            <label className="text-nowrap font-weight-normal">விலை</label>
            <input
              type="number"
              className="form-control ml-md-3"
              value={this.props.rate}
              onChange={event => this.props.handleTextChange(event, label)}
              name="rate"
              placeholder="Enter Rate"
            />
          </div>
          <div
            className="d-flex flex-row align-items-center align-content-center mx-md-4 position-static"
            style={{ width: "35%" }}
          >
            <label
              className="text-nowrap text-primary font-weight-normal mx-md-3"
              style={{ fontSize: "1.2rem" }}
            >
              Price
            </label>
            <div className="text-danger flex-grow-1 justify-content-end" style={{ fontSize: "1.2rem" }}>
              {this.props.price.toString()}
            </div>
          </div>
        </div>
      );
    } else return null;
  };

  render() {
    const { label } = this.props;

    return (
      <div
        className="d-flex flex-row align-items-center"
        style={{ height: "3rem" }}
      >
        <div style={{ width: "40%" }}>
          <label className="font-weight-bold">
            <input
              className="mx-md-3"
              type="checkbox"
              checked={this.state.isChecked}
              onChange={this.handleCheckboxChange}
            />
            {label}
          </label>
        </div>
        <div>{this.renderWeightAndRate()}</div>
      </div>
    );
  }
}

export default Checkbox;
