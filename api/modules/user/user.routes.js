import { Router } from 'express';
import * as userHandlers from './user.handlers';

export function init(api) {
  const router = new Router();

  router.get('/', userHandlers.handleGet);
  router.post('/', userHandlers.handlePost);

  api.use('/users', router);
}
