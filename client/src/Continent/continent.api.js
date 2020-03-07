'use strict';

import { get } from 'axios';

export const getCountriesByContinent = continent =>
    get(`/v0/api/countries/${continent}`);
