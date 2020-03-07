'use strict';

import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

import { getRegionsByContinent } from './continent.api';

const continents = [
    'Asia',
    'Africa',
    'Europe',
    'Antartica',
    'Australia',
    'North America',
    'South America'
];

const ListHeader = styled.h2`

`;

export const Continents = () => {
    const [regions, setRegions] = useState([ 1, 2, 3 ]);

    // Currently selected continent
    const [selected, setSelected] = useState(0);

    return (
        <Fragment>
          <div className='col'>
            <h2>Continents</h2>
            <ul>
              {
                  continents.map((continent, i) => (
                      <li key={i}>{ continent }</li>
                  ))
              }            
            </ul>
          </div>
          <div className='col'>
            <h2>Regions</h2>
            <ul>
              {
                  regions.map((continent, i) =>
                              <li key={i}>{ continent }</li>
                             )
              }
            </ul>
          </div>
        </Fragment>
    );
};

export const Continent = () => {
    const { continent } = useParams();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const result = await getRegionsByContinent(continent);
                setCountries(result);
            } catch(error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <span>
          {
              countries.map((country, i) => (
                  <span key={i}>{country}</span>
              ))
          }
        </span>
    );
};

export default Continents;
