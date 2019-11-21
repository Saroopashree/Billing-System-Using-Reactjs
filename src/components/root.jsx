import React, { Component } from 'react'

class Root extends Component {
  render() {
    return (
      <div>
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
                <li className="nav-item active">
                  <a className="nav-link" href="#">
                    New Invoice <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    New Party
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    Parties registered
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div style={{height: "500px"}}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Root;