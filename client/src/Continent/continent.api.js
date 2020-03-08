'use strict';

import { get } from 'axios';

export const getRegionsByContinent = continent =>
    get(`/api/country/${continent}`);
