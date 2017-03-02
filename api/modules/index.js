import glob from 'glob';
import path from 'path';

export function init(api) {
  const routes = glob.sync(path.join(process.cwd(), '/**/*.routes.js'));
  const models = glob.sync(path.join(process.cwd(), '/**/*.model.js'));

  models.forEach(model => require(model)); // eslint-disable-line

  routes.forEach(route => require(route).init(api)); // eslint-disable-line

  return api;
}

