'use strict';

import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams, useHistory } from 'react-router-dom';

import { getCountry, getCountriesByRegion } from './country.api';

const InfoCard = styled.div`
border: 0;
background-color transparent;
`;

const CountryMenuItem = styled(Link)`
border: 0;
font-size: 1.35em;
background: transparent;
`;

const NoData = () => {
    const history = useHistory();
    return (
        <div className='row'>
          <div className='col'>
            <button
              onClick={ () => history.goBack() }
              className='btn btn-outline-primary'>
              Back
            </button>
            <h3 className='text-center'>No Data available for this country.</h3>
          </div>
        </div>
    );
};

export const Country = () => {
    const { code } = useParams();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [cities, setCities] = useState([]);
    const [country, setCountry] = useState(null);

    const isEmpty = data =>
          !data || !Object.keys(data).length;

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                const { data } = await getCountry(code);
                setCountry(data);

                setLoading(false);

            } catch(err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [code]);

    const officialLanguage = language =>
          language.isofficial && <span className='badge badge-primary'>Official</span>;

    return isEmpty(country)
        ? <NoData></NoData>
        : ( <Fragment>
              <Link
                to={`/countries/${country.region}`}
                className='btn btn-outline-primary'>Back</Link>
              <div className='row'>
                <div className='col-6 offset-md-3'>
                  <InfoCard className='card'>
                    <div className='card-body'>
                      <h2 className='card-title'>{country.name}</h2>
                      <h4 className='card-subtitle mb-3 text-muted'>{country.code}</h4>
                      <h4 className='card-subtitle text-muted'>
                        {country.region}
                      </h4>
                      <p className='card-text'></p>

                      <table className='table table-borderless'>
                        <thead>
                          <tr>
                            <th></th>
                            <th className='text-left'>Language</th>
                            <th className='text-right'>Spoken By</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                              country.languages.map((language, i) => (
                                  <tr key={i}>
                                    <th scop='row'>{officialLanguage(language)}</th>
                                    <td className='text-left'>{language.language}</td>
                                    <td className='text-right'>
                                      {language.percentage.toFixed(2)}%
                                    </td>
                                  </tr>
                              ))
                          }
                        </tbody>
                      </table>
                    </div>
                  </InfoCard>
                </div>
              </div>
            </Fragment>
    );
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
                      to={`/country/${country.code}`}
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
