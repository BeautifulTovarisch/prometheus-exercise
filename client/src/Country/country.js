'use strict';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

import { getCountriesByRegion } from './country.api';

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
        <div>
          <Link to='/'>Back</Link>
          {
              countries.map((country, i) => (
                  <span key={i}>{country.name}</span>
              ))
          }
        </div>
    );
};

export default Countries;
