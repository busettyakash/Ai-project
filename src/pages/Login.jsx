import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import './Auth.css'

const quotes = [
    { text: 'SalesShop completely transformed how we manage our pipeline. We closed 40% more deals in Q1.', name: 'Sarah Chen', role: 'VP of Sales, TechCorp', initials: 'SC' },
    { text: 'The AI insights are game-changing. It prioritizes exactly which leads to call and when.', name: 'Marcus Johnson', role: 'Sales Director, GrowthLab', initials: 'MJ' },
    { text: 'We onboarded 50 reps in a single day. The UX is that intuitive and easy to learn.', name: 'Priya Sharma', role: 'Head of Revenue, ScaleUp', initials: 'PS' },
    { text: 'Revenue is up 35% since switching to SalesShop. Best investment we made this year.', name: 'David Park', role: 'CEO, CloudBase', initials: 'DP' },
    { text: 'Our team saves 10+ hours per week with the workflow automation. Absolute game changer.', name: 'Emily Torres', role: 'Sales Manager, Nextera', initials: 'ET' },
]

const API = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(null)
    const [quoteIdx, setQuoteIdx] = useState(0)
    const [fade, setFade] = useState(true)

    useEffect(() => {
        const timer = setInterval(() => {
            setFade(false)
            setTimeout(() => {
                setQuoteIdx((i) => (i + 1) % quotes.length)
                setFade(true)
            }, 400)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const q = quotes[quoteIdx]

    const validate = () => {
        const errs = {}
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Please enter a valid email address'
        if (!password) errs.password = 'Please enter your password'
        return errs
    }

    const showToast = (msg, type) => {
        setToast({ msg, type })
        setTimeout(() => setToast(null), 3500)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errs = validate()
        setErrors(errs)
        if (Object.keys(errs).length > 0) return

        setLoading(true)
        try {
            const res = await fetch(`${API}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            const data = await res.json()
            setLoading(false)
            if (!res.ok) {
                showToast(data.error || 'Login failed', 'error')
                setErrors({ email: 'Invalid credentials' })
                return
            }
            localStorage.setItem('salesshop_token', data.token)
            localStorage.setItem('salesshop_user', JSON.stringify(data.user))
            showToast(data.message, 'success')
            setTimeout(() => navigate('/dashboard'), 800)
        } catch (err) {
            setLoading(false)
            showToast('Server unavailable. Please try again.', 'error')
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-left">
                <div className="auth-left-content">
                    <Link to="/" className="auth-brand">
                        <Logo size={36} />
                        <span>Sales<span className="brand-accent">Shop</span></span>
                    </Link>
                    <h1>Welcome back</h1>
                    <p className="auth-subtitle">Sign in to continue to your dashboard</p>

                    <form className="auth-form" onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="you@company.com"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })) }}
                                className={errors.email ? 'error' : ''}
                            />
                            {errors.email && <span className="field-error">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="pass-wrapper">
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })) }}
                                    className={errors.password ? 'error' : ''}
                                />
                                <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>
                                    {showPass ? '🙈' : '👁'}
                                </button>
                            </div>
                            {errors.password && <span className="field-error">{errors.password}</span>}
                        </div>

                        <div className="form-extras">
                            <label className="check-label">
                                <input type="checkbox" /> Remember me
                            </label>
                            <a href="#" className="forgot">Forgot password?</a>
                        </div>

                        <button type="submit" className={`btn-submit ${loading ? 'loading' : ''}`} disabled={loading}>
                            <span>Sign In →</span>
                        </button>
                    </form>

                    <p className="auth-footer-text">
                        Don't have an account? <Link to="/signup">Create one</Link>
                    </p>
                </div>
            </div>

            <div className="auth-right">
                <div className={`auth-right-content ${fade ? 'fade-in' : 'fade-out'}`}>
                    <blockquote>"{q.text}"</blockquote>
                    <div className="testimonial-author">
                        <div className="avatar">{q.initials}</div>
                        <div>
                            <strong>{q.name}</strong>
                            <span>{q.role}</span>
                        </div>
                    </div>
                    <div className="quote-dots">
                        {quotes.map((_, i) => (
                            <span key={i} className={`qdot ${i === quoteIdx ? 'active' : ''}`} />
                        ))}
                    </div>
                </div>
            </div>

            {toast && (
                <div className={`toast ${toast.type}`}>
                    <span>{toast.type === 'success' ? '✓' : '✕'}</span>
                    <span>{toast.msg}</span>
                </div>
            )}
        </div>
    )
}
