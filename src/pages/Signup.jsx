import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import './Auth.css'

const quotes = [
    { text: 'Revenue is up 35% since switching to SalesShop. Best investment we made this year.', name: 'David Park', role: 'CEO, CloudBase', initials: 'DP' },
    { text: 'We onboarded our entire team in a single day. The UX is that intuitive.', name: 'Priya Sharma', role: 'Head of Revenue, ScaleUp', initials: 'PS' },
    { text: 'The AI insights are a game-changer. Our reps know exactly who to call and when.', name: 'Marcus Johnson', role: 'Sales Director, GrowthLab', initials: 'MJ' },
    { text: 'SalesShop transformed our pipeline. We closed 40% more deals in Q1 alone.', name: 'Sarah Chen', role: 'VP of Sales, TechCorp', initials: 'SC' },
    { text: 'Our team saves 10+ hours per week with workflow automation. Absolute game changer.', name: 'Emily Torres', role: 'Sales Manager, Nextera', initials: 'ET' },
]

const API = process.env.VITE_API_URL || 'http://localhost:8080/api'

export default function Signup() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ name: '', email: '', shopName: '', gstNumber: '', password: '', confirm: '' })
    const [showPass, setShowPass] = useState(false)
    const [agreed, setAgreed] = useState(false)
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(null)
    const [strength, setStrength] = useState(0)
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

    const evalStrength = (pw) => {
        let s = 0
        if (pw.length >= 8) s++
        if (pw.length >= 12) s++
        if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++
        if (/\d/.test(pw)) s++
        if (/[^A-Za-z0-9]/.test(pw)) s++
        return Math.min(s, 4)
    }

    const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong']
    const strengthColor = ['', '#EF4444', '#F59E0B', '#4F46E5', '#10B981']

    const set = (field, value) => {
        setForm((p) => ({ ...p, [field]: value }))
        setErrors((p) => ({ ...p, [field]: '' }))
        if (field === 'password') setStrength(evalStrength(value))
    }

    const validate = () => {
        const e = {}
        if (!form.name.trim()) e.name = 'Please enter your full name'
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email'
        if (!form.shopName.trim()) e.shopName = 'Please enter your shop name'
        if (!form.gstNumber.trim()) e.gstNumber = 'Please enter your GST number'
        if (form.password.length < 8) e.password = 'Password must be at least 8 characters'
        if (form.confirm !== form.password) e.confirm = 'Passwords do not match'
        if (!agreed) e.terms = 'Accept terms to continue'
        return e
    }

    const showToast = (msg, type) => {
        setToast({ msg, type })
        setTimeout(() => setToast(null), 3500)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errs = validate()
        setErrors(errs)
        if (errs.terms) showToast(errs.terms, 'error')
        if (Object.keys(errs).length > 0) return

        setLoading(true)
        try {
            const res = await fetch(`${API}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    shopName: form.shopName,
                    gstNumber: form.gstNumber,
                    password: form.password,
                }),
            })
            const data = await res.json()
            setLoading(false)
            if (!res.ok) {
                showToast(data.error || 'Signup failed', 'error')
                return
            }
            localStorage.setItem('salesshop_token', data.token)
            localStorage.setItem('salesshop_user', JSON.stringify(data.user))
            showToast('Account created successfully!', 'success')
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
                    <h1>Create your account</h1>
                    <p className="auth-subtitle">Join SalesShop and supercharge your sales</p>

                    <form className="auth-form" onSubmit={handleSubmit} noValidate>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Your full name"
                                    value={form.name}
                                    onChange={(e) => set('name', e.target.value)}
                                    className={errors.name ? 'error' : ''}
                                />
                                {errors.name && <span className="field-error">{errors.name}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="you@company.com"
                                    value={form.email}
                                    onChange={(e) => set('email', e.target.value)}
                                    className={errors.email ? 'error' : ''}
                                />
                                {errors.email && <span className="field-error">{errors.email}</span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="shopName">Shop Name</label>
                                <input
                                    type="text"
                                    id="shopName"
                                    placeholder="Your shop name"
                                    value={form.shopName}
                                    onChange={(e) => set('shopName', e.target.value)}
                                    className={errors.shopName ? 'error' : ''}
                                />
                                {errors.shopName && <span className="field-error">{errors.shopName}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="gstNumber">GST Number</label>
                                <input
                                    type="text"
                                    id="gstNumber"
                                    placeholder="e.g. 22AAAAA0000A1Z5"
                                    value={form.gstNumber}
                                    onChange={(e) => set('gstNumber', e.target.value)}
                                    className={errors.gstNumber ? 'error' : ''}
                                />
                                {errors.gstNumber && <span className="field-error">{errors.gstNumber}</span>}
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className="pass-wrapper">
                                    <input
                                        type={showPass ? 'text' : 'password'}
                                        id="password"
                                        placeholder="Min 8 characters"
                                        value={form.password}
                                        onChange={(e) => set('password', e.target.value)}
                                        className={errors.password ? 'error' : ''}
                                    />
                                    <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>
                                        {showPass ? '🙈' : '👁'}
                                    </button>
                                </div>
                                {form.password && (
                                    <div className="strength-row">
                                        <div className="strength-bars">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div key={i} className="str-bar" style={{ background: i <= strength ? strengthColor[strength] : '#E2E8F0' }} />
                                            ))}
                                        </div>
                                        <span style={{ color: strengthColor[strength], fontSize: 12 }}>{strengthLabel[strength]}</span>
                                    </div>
                                )}
                                {errors.password && <span className="field-error">{errors.password}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirm">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirm"
                                    placeholder="Confirm password"
                                    value={form.confirm}
                                    onChange={(e) => set('confirm', e.target.value)}
                                    className={errors.confirm ? 'error' : ''}
                                />
                                {errors.confirm && <span className="field-error">{errors.confirm}</span>}
                            </div>
                        </div>

                        <label className="check-label">
                            <input type="checkbox" checked={agreed} onChange={() => setAgreed(!agreed)} />
                            I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                        </label>

                        <button type="submit" className={`btn-submit ${loading ? 'loading' : ''}`} disabled={loading}>
                            <span>Create Account →</span>
                        </button>
                    </form>

                    <p className="auth-footer-text">
                        Already have an account? <Link to="/login">Sign in</Link>
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
