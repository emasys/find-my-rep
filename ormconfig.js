require('dotenv/config');

const database = {
  development: "find-my-rep",
  production: null,
  test: process.env.TEST_DB || 'test-fmr',
}

const entities = {
  development: 'dist/**/*.entity{.ts,.js}',
  production: null,
  test: __dirname + '/**/*.entity.{ts,js}',
}

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: process.env.PORT || 5432,
  username: process.env.USERNAME || 'emasys',
  password: process.env.PASSWORD || 'root',
  seeds: ['seeds/*.ts'],
  factories: ['factories/**/*.factory.ts'],
  database: database[process.env.NODE_ENV],
  entities: [entities[process.env.NODE_ENV]],
  synchronize: true,
  migrationsTableName: 'migration',
  migrations: ['migration/*.js'],
  cli: {
    migrationsDir: 'migration',
  },
};
