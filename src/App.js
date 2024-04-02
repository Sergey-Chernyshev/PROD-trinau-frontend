import './App.css';
import Navbar from './components/navBar/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Outlet} from 'react-router-dom';
// import { showNotification } from './service-worker';
import {FIRST_TOUR_CONF, VIEW_PROJECT_TOUR_CONF} from './data/onboarding/configs'
import {Display_onboarding_if_needed} from "./utils/Display_onboarding_if_needed"
import React from "react";


function App() {

    // const
  return (
    // <div>{display_onboarding_if_needed(FIRST_TOUR_CONF)}
    <div className="container-fluid overflow-hidden">
      <div className='row vh-100 overflow-auto'>

        <Navbar />
        <div className='col-sm-9 p-3 min-vh-100' id='content'>
          <Outlet />
        </div>
      </div>

    <Display_onboarding_if_needed
        data={FIRST_TOUR_CONF}/>
    </div>
  );
}

export default App;
