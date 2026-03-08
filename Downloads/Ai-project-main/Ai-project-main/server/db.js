import pg from 'pg'
const { Pool } = pg
import 'dotenv/config'

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5433'),
    user: process.env.DB_USER || 'akash',
    password: process.env.DB_PASSWORD || 'A2003189',
    database: process.env.DB_NAME || 'appdb',
    max: 20,
    idleTimeoutMillis: 30000,
})

pool.on('connect', () => {
    console.log('✓ Connected to PostgreSQL')
})

pool.on('error', (err) => {
    console.error('PostgreSQL pool error:', err)
})

export default pool
