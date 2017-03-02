import express from 'express';

import { init } from './modules';

const api = express();

init(api);

export default api;
