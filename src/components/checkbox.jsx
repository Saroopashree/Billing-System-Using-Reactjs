import React, { Component } from "react";
class Checkbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      weight: this.props.weight,
      rate: this.props.rate
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
        <div className="d-flex flex-row justify-content-between align-items-center m-md-3 pl-md-5 w-50">
          <div className="d-flex flex-row mx-md-4">
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
          <div className="d-flex flex-row mx-md-4">
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
        </div>
      );
    } else return null;
  };

  render() {
    const { label } = this.props;

    return (
      <div>
        <label className="font-weight-bold">
          <input
            className="mx-md-3"
            type="checkbox"
            checked={this.state.isChecked}
            onChange={this.handleCheckboxChange}
          />
          {label}
        </label>
        {this.renderWeightAndRate()}
      </div>
    );
  }
}

export default Checkbox;
