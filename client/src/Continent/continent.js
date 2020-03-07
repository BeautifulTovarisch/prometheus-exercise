'use strict';

import React, { useState, useEffect } from 'react';

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

export const Continents = () => {

    return (
        <div className="h-100">
          <div className="form-group">
            <ul>
              {
                  continents.map((continent, i) => (
                      <li key={i}>
                        <Link to={ `/${continent.toLowerCase()}` }>{ continent }</Link>
                      </li>
                  ))
              }
            </ul>
          </div>
        </div>
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
