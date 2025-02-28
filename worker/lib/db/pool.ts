import pg from 'pg'


export let pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 5_000,
  idleTimeoutMillis: 10_000,
  max: 5
})
