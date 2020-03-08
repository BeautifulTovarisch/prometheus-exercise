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

const RegionMenuItem = styled(Link)`
font-size: 1.15em;
border: none;
background-color: transparent;
`;

const ContinentMenuItem = styled.li`
font-size: 1.50em;
border-bottom: ${props => props.active ? '1px solid palevioletred': 0};
background-color: transparent;
&:hover {
  cursor: pointer;
}
`;

export const Continents = () => {
    const [regions, setRegions] = useState([]);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Currently selected continent
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        (async () => {
            try {
                const { data } = await getRegionsByContinent(continents[selected]);
                setRegions(data);
            } catch(error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        })();
    }, [selected]);

    return (
        <div className='row justify-content-around'>
          <div className='col-md-4 col-sm-12 mb-3 mb-sm-0'>
            <h2>Continents</h2>
            <ul className='list-group list-group-flush'>
              {
                  continents.map((continent, i) => (
                      <ContinentMenuItem
                        key={i}
                        active={ selected === i }
                        onClick={() => setSelected(i)}
                        className='list-group-item'>
                        { continent }
                      </ContinentMenuItem>
                  ))
              }
            </ul>
          </div>
          <div className='col-md-4 col-sm-12'>
            <h2>Regions</h2>
            <ul className='list-group list-group-flush'>
              {
                  regions.map((region, i) =>(
                      <RegionMenuItem
                        key={i}
                        to={`/countries/${region}`}
                        className='list-group-item'>
                        { region }
                      </RegionMenuItem>
                  ))
              }
            </ul>
          </div>
        </div>
    );
};

export default Continents;
