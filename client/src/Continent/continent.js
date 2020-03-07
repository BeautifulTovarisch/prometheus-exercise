'use strict';

import React, { useState, useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';

import { getCountriesByContinent } from './continent.api';

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
                const result = await getCountriesByContinent(continent);
                setCountries(result);
            } catch(erro) {
                setError(error);
            } finally {
                setLoading(false);
            }    
        })();
    }, []);

    return (
        <span>{ continent }</span>
    );
};

export default Continents;
