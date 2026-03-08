import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import './Navbar.css'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <Link to="/" className="nav-brand">
                <Logo size={34} />
                <span className="brand-name">Sales<span className="brand-accent">Shop</span></span>
            </Link>

            <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                <li><a href="#features" onClick={() => setMenuOpen(false)}>Features</a></li>
                <li><a href="#stats" onClick={() => setMenuOpen(false)}>Results</a></li>
                <li><a href="#cta" onClick={() => setMenuOpen(false)}>Pricing</a></li>
            </ul>

            <div className="nav-actions">
                <Link to="/login" className="btn-signin">Sign in</Link>
                <Link to="/signup" className="btn-cta-nav">Start for free</Link>
            </div>

            <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
                {menuOpen ? '✕' : '☰'}
            </button>
        </nav>
    )
}
