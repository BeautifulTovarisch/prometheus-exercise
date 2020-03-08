'use strict';

import { get } from 'axios';

export const getCities = country =>
    get(`/v0/api/city/${country}`);
