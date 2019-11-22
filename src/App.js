import React from 'react';
import './App.css';

import Root from "./components/root";
import NewInvoice from "./components/newInvoice";
import ViewParty from "./components/viewParty";

function App() {
  return (
    <div className="App">
      <Root>
        <ViewParty />
        {/* <NewInvoice /> */}
      </Root>
    </div>
  );
}

export default App;
