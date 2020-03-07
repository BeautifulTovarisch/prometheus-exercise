'use strict';

import React, { useState, useEffect, Component } from 'react';
import styled from 'styled-components';
import ReactDom from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import "regenerator-runtime/runtime";

import Routes from './Routes/routes';

import css from './index.css';

const Title = styled.h1`
font-size: 2.5em;
`;

const Header = styled.div`
display: block;
padding: 3em 1.5em;
text-align: center;
font-family: 'Arvo', sans-serif;
`;

const TagLine = styled.p`
font-size: 1.25em;
`;

const App = () => {
    return (
        <main role='main' id="wrapper" className="h-100">
          <Router>
            <div className="container">
              <Header className='row'>
                <Title>World Data Viewer</Title>
                <hr/>
                <TagLine>Select a continent to browse countries and cities</TagLine>
                <TagLine>in that region of the world.</TagLine>
               </Header>
              <div className="row">
                <Routes />
              </div>
            </div>
          </Router>
        </main>
    );
};

ReactDom.render(<App />, document.getElementById('react-mount-point'));
