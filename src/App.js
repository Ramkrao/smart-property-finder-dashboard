import React, {Fragment} from 'react';
import Header from '@anz/header'
import HomeComponent from './LandingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter basename='/renganr1/smart-property'>
      <Fragment>
        <div className="App">
          <Header />
          <div className="Content">
            <Routes>
              <Route exact path="/" element={<HomeComponent />} />
            </Routes>
          </div>
        </div>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
