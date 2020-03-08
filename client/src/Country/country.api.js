'use strict';

import { get } from 'axios';

export const getCountry = code =>
    get(`/api/country/code/${code}`);

export const getCountriesByRegion = region =>
    get(`/api/country/regions/${region}`);
