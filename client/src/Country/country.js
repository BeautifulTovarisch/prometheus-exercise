'use strict';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

import { getCountriesByRegion } from './country.api';

const CountryMenuItem = styled(Link)`
border: 0;
font-size: 1.35em;
background: transparent;
`;

export const Country = () => {
    const { country } = useParams();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);


            } catch(err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        })();
    });
};

export const Countries = () => {
    const { region } = useParams();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                const { data } = await getCountriesByRegion(region);

                setCountries(data);
                setError(null);

            } catch(err) {
                setError(error);

            } finally {
                setLoading(false);
            }
        })();
    }, [region]);

    return (
        <div className='col'>
          <button className='btn btn-outline-primary'><Link to='/'>Back</Link></button>
          <ul className='list-group list-group-flush text-center'>
          {
              countries.map((country, i) => (
                  <CountryMenuItem
                    key={i}
                    className='list-group-item'>
                    {country.name}
                  </CountryMenuItem>
              ))
          }
          </ul>
        </div>
    );
};

export default Countries;
