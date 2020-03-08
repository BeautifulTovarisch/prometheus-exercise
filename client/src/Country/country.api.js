'use strict';

import { get } from 'axios';

export const getCountriesByRegion = region =>
    get(`/api/country/regions/${region}`);
