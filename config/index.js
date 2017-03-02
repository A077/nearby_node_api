import dotenv from 'dotenv';

dotenv.config({ silent: true });

const config = {
  db: 'mongodb://localhost:27017/mydb',
  port: process.env.PORT || 3000,
};

export default config;
