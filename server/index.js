import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import pool from './db.js'

const app = express()
const PORT = process.env.PORT || 3001
const JWT_SECRET = process.env.JWT_SECRET || 'salesshop_jwt_secret_key_2026'

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())

// ── Health Check ──
app.get('/api/health', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()')
        res.json({ status: 'ok', time: result.rows[0].now })
    } catch (err) {
        res.status(500).json({ status: 'error', message: err.message })
    }
})

// ── Signup ──
app.post('/api/signup', async (req, res) => {
    try {
        const { name, email, shopName, gstNumber, password } = req.body

        // Validate
        if (!name || !email || !shopName || !gstNumber || !password) {
            return res.status(400).json({ error: 'All fields are required' })
        }

        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters' })
        }

        // Check if email exists
        const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email])
        if (existing.rows.length > 0) {
            return res.status(409).json({ error: 'An account with this email already exists' })
        }

        // Hash password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        // Insert user
        const result = await pool.query(
            `INSERT INTO users (full_name, email, shop_name, gst_number, password_hash)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, full_name, email, shop_name, gst_number, created_at`,
            [name.trim(), email.trim().toLowerCase(), shopName.trim(), gstNumber.trim().toUpperCase(), passwordHash]
        )

        const user = result.rows[0]

        // Generate JWT
        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' })

        // Store session
        await pool.query(
            `INSERT INTO sessions (user_id, token, expires_at) VALUES ($1, $2, NOW() + INTERVAL '7 days')`,
            [user.id, token]
        )

        res.status(201).json({
            message: 'Account created successfully!',
            user: {
                id: user.id,
                name: user.full_name,
                email: user.email,
                shopName: user.shop_name,
                gstNumber: user.gst_number,
            },
            token,
        })
    } catch (err) {
        console.error('Signup error:', err)
        res.status(500).json({ error: 'Something went wrong. Please try again.' })
    }
})

// ── Login ──
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' })
        }

        // Find user
        const result = await pool.query(
            'SELECT id, full_name, email, shop_name, gst_number, password_hash FROM users WHERE email = $1',
            [email.trim().toLowerCase()]
        )

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' })
        }

        const user = result.rows[0]

        // Verify password
        const valid = await bcrypt.compare(password, user.password_hash)
        if (!valid) {
            return res.status(401).json({ error: 'Invalid email or password' })
        }

        // Generate JWT
        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' })

        // Store session
        await pool.query(
            `INSERT INTO sessions (user_id, token, expires_at) VALUES ($1, $2, NOW() + INTERVAL '7 days')`,
            [user.id, token]
        )

        res.json({
            message: `Welcome back, ${user.full_name}!`,
            user: {
                id: user.id,
                name: user.full_name,
                email: user.email,
                shopName: user.shop_name,
                gstNumber: user.gst_number,
            },
            token,
        })
    } catch (err) {
        console.error('Login error:', err)
        res.status(500).json({ error: 'Something went wrong. Please try again.' })
    }
})

// ── Start ──
app.listen(PORT, () => {
    console.log(`\n🚀 SalesShop API running on http://localhost:${PORT}`)
    console.log(`   POST /api/signup`)
    console.log(`   POST /api/login`)
    console.log(`   GET  /api/health\n`)
})
