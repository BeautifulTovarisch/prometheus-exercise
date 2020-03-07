
'use strict';

import React, { useState, useEffect, Component } from 'react';
import ReactDom from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import "regenerator-runtime/runtime";

import Routes from './Routes/routes';

const App = () => {
    return (
        <div id="wrapper" className="h-100">
          <Router>
            <div className="container">
              <div className="row">
                <Routes />
              </div>
            </div>
          </Router>
        </div>
    );
};

ReactDom.render(<App />, document.getElementById('react-mount-point'));
