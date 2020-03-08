'use strict';

import React, { Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useParams, useHistory } from 'react-router-dom';

import { getCities, getCountry, getCountriesByRegion } from './country.api';

const InfoCard = styled.div`
border: 0;
background-color transparent;
`;

const Stat = styled.li`
font-size: 1.20em;
font-weight: 500;
`;

const CountryMenuItem = styled(Link)`
border: 0;
font-size: 1.35em;
background: transparent;
`;

const officialLanguage = language =>
      language.isofficial && <span className='badge badge-primary'>Official</span>;


const NoData = () => {
    const history = useHistory();
    return (
        <div className='row'>
          <div className='col'>
            <button
              onClick={ () => history.goBack() }
              className='btn btn-outline-primary mb-3'>
              Back
            </button>
            <h3 className='text-center'>No Data available for this country.</h3>
          </div>
        </div>
    );
};

const Cities = ({ cities }) =>
      cities.length && (
          <table className='table table-borderless'>
            <thead>
              <tr>
                <th className='text-left'>City</th>
                <th className='text-left'>District</th>
                <th className='text-right'>Population</th>
              </tr>
            </thead>
            <tbody>
              {
                  cities.map(({name, district, population}, i) => (
                      <tr key={i}>
                        <td className='text-left'>{name}</td>
                        <td className='text-left'>{district}</td>
                        <td className='text-right'>{population.toLocaleString()}</td>
                      </tr>
                  ))
              }
            </tbody>
          </table>
      ) || <p className='card-text'>No city data available.</p>;

const Languages = ({ languages }) =>
      languages.length && (
          <table className='table table-borderless'>
            <thead>
              <tr>
                <th className='text-left'>Language</th>
                <th className='text-right'>Spoken By</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                  languages.map((language, i) => (
                      <tr key={i}>
                        <td className='text-left'>{language.language}</td>
                        <td className='text-right'>
                          {language.percentage.toFixed(2)}%
                        </td>
                        <th scop='row'>{officialLanguage(language)}</th>
                      </tr>
                  ))
              }
            </tbody>
          </table>
      ) || <p className='card-text'>No language data available.</p>;

const CountryData = ({ country }) =>
      <ul className='list-unstyled mb-3 list-group list-group-flush d-flex flex-row flex-wrap'>
        <Stat className='w-50'>{country.gnp.toLocaleString()}</Stat>
        <Stat className='w-50'>Gross National Product</Stat>

        <Stat className='w-50'>{country.gnpold.toLocaleString()}</Stat>
        <Stat className='w-50'>Gross National Product (old)</Stat>

        <Stat className='w-50'>{country.governmentform}</Stat>
        <Stat className='w-50'>Government</Stat>

        <Stat className='w-50'>{country.headofstate}</Stat>
        <Stat className='w-50'>Head of State</Stat>

        <Stat className='w-50'>{country.indepyear}</Stat>
        <Stat className='w-50'>Independence Year</Stat>
      </ul>;

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

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                const { data } = await getCities(code);
                setCities(data);

                setLoading(false);

            } catch(err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [code]);


    return isEmpty(country)
        ? <NoData></NoData>
        : ( <Fragment>
              <Link
                to={`/countries/${country.region}`}
                className='btn btn-outline-primary'>Back</Link>
              <div className='row'>
                <div className='col-md-8 col-sm-12 offset-md-2'>
                  <InfoCard className='card'>
                    <div className='card-body'>
                      <h2 className='card-title'>{country.name}</h2>
                      <h4 className='card-subtitle mb-3 text-muted'>{country.code}</h4>
                      <h4 className='card-subtitle text-muted mb-3'>
                        {country.region}
                      </h4>
                      <CountryData country={country} />
                    </div>
                  </InfoCard>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-4 col-sm-12 offset-md-2'>
                  <Cities cities={cities} />
                </div>
                <div className='col-md-4 col-sm-12 offset-sm-2'>
                  <Languages languages={country.languages} />
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
