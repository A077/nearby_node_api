import mongoose from 'mongoose';
import config from '../config';

mongoose.Promise = global.Promise;

export function init() {
  console.log('Connecting to MongoDb at', config.db); // eslint-disable-line no-console
  mongoose.set('debug', true);
  mongoose.connect(config.db);
}
