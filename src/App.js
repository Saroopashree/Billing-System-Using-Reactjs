import React from 'react';
import './App.css';
import {
  HashRouter
} from "react-router-dom";
import { Route } from "react-router";

import Root from "./components/root";
import NewInvoice from "./components/newInvoice";
import ViewParty from "./components/viewParty";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Route path="/" exact component={NewInvoice} />
        <Route path="/viewParty" component={ViewParty} />
      </HashRouter>
    </div>
  );
}

export default App;
