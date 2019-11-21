import React from 'react';
import './App.css';

import Root from "./components/root";
import NewInvoice from "./components/newInvoice";

function App() {
  return (
    <div className="App">
      <Root>
        <NewInvoice />
      </Root>
    </div>
  );
}

export default App;
