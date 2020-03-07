'use strict';

import React, { Fragment } from 'react';

import { Route } from 'react-router-dom';

import Continents, { Continent } from '../Continent/continent';

export const Routes = () => {
    return (
        <Fragment>
          <Route exact path='/' component={ Continents } />
          <Route exact path='/:continent' component={ Continent }/>
          <Route exact path='/city/:id' component={ ({match}) => JSON.stringify(match.params)  }></Route>
        </Fragment>
    );
};

export default Routes;
