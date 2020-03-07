'use strict';

import { get } from 'axios';

export const getRegionsByContinent = continent =>
    get(`/v0/api/region/${continent}`);
