import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    const { newInvoice, viewParty } = this.props;
    return (
      <div className="border border-dark">
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
          <span className="navbar-brand">Parimala Metal Works</span>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav">
              <li className={newInvoice}>
                <Link className="nav-link" to={"/"}>
                  New Invoice <span className="sr-only">(current)</span>
                </Link>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="#">
                  New Party
                </a>
              </li> */}
              <li className={viewParty}>
                <Link className="nav-link" to={"/viewParty"}>
                  Parties registered
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;