require('dotenv/config');

const database = {
  development: "find-my-rep",
  production: null,
  test: 'test-fmr'
}


module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'emasys',
  password: 'root',
  seeds: ['seeds/*.ts'],
  factories: ['factories/**/*.factory.ts'],
  database: database[process.env.NODE_ENV],
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  migrationsTableName: 'migration',
  migrations: ['migration/*.js'],
  cli: {
    migrationsDir: 'migration',
  },
};
