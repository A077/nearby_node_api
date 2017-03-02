import app from './lib/express';
import config from './config';

app.listen(config.port,
  () => console.log('Express is listening on', config.port) // eslint-disable-line no-console
);
