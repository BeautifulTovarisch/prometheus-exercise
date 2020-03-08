'use strict';

import React, { Fragment } from 'react';

import { Route } from 'react-router-dom';

import Regions from '../Country/country';
import Continents from '../Continent/continent';

export const Routes = () => {
    return (
        <Fragment>
          <Route exact path='/' component={ Continents }/>
          <Route exact path='/countries/:region' component={ Regions } />
        </Fragment>
    );
};

export default Routes;
