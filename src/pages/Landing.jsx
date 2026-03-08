import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'
import DashboardPreview from '../components/DashboardPreview'
import './Landing.css'

export default function Landing() {
    const observerRef = useRef(null)

    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('in-view')),
            { threshold: 0.12 }
        )
        document.querySelectorAll('.anim').forEach((el) => observerRef.current.observe(el))
        return () => observerRef.current?.disconnect()
    }, [])

    return (
        <div className="lp">
            {/* ── Navbar ── */}
            <nav className="lp-nav">
                <Link to="/" className="lp-brand">
                    <Logo size={34} />
                    <span>Sales<em>Shop</em></span>
                </Link>
                <div className="lp-nav-center">
                    <a href="#features">Features</a>
                    <a href="#how">How it works</a>
                    <a href="#stats">Results</a>
                    <a href="#pricing">Pricing</a>
                </div>
                <div className="lp-nav-right">
                    <Link to="/login" className="lp-btn-ghost">Log in</Link>
                    <Link to="/signup" className="lp-btn-filled">Get Started Free →</Link>
                </div>
            </nav>

            {/* ── Hero ── */}
            <section className="lp-hero">
                <div className="hero-glow" />
                <span className="hero-pill anim a1">
                    <span className="pill-dot" />
                    Now with AI-Powered Insights
                </span>
                <h1 className="anim a2">
                    The smarter way<br />to <span className="hero-em">close deals</span>
                </h1>
                <p className="hero-desc anim a3">
                    SalesShop unifies your pipeline, automates busywork, and surfaces<br />
                    real-time insights so your team can focus on selling.
                </p>
                <div className="hero-actions anim a4">
                    <Link to="/signup" className="lp-btn-filled lg">Start Free Trial</Link>
                    <button className="lp-btn-play" type="button">
                        <span className="play-icon">▶</span> Watch Demo
                    </button>
                </div>
                <p className="hero-note anim a5">No credit card required · Free 14-day trial</p>
            </section>

            {/* ── Dashboard Screenshot ── */}
            <section className="lp-screenshot anim a6">
                <div className="ss-window">
                    <div className="ss-topbar">
                        <div className="ss-dots"><i /><i /><i /></div>
                        <div className="ss-url">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l2 2" /></svg>
                            app.salesshop.com/dashboard
                        </div>
                    </div>
                    <DashboardPreview />
                </div>
            </section>

            {/* ── Logos ── */}
            <section className="lp-logos anim">
                <span className="logos-label">Trusted by 10,000+ companies</span>
                <div className="logos-row">
                    {['Shopify', 'Stripe', 'HubSpot', 'Notion', 'Linear', 'Vercel'].map((n) => (
                        <span key={n}>{n}</span>
                    ))}
                </div>
            </section>

            {/* ── Features ── */}
            <section className="lp-features anim" id="features">
                <div className="sec-top">
                    <span className="sec-badge">Features</span>
                    <h2>Everything your sales team needs</h2>
                    <p>Powerful tools designed to help you manage, track, and grow your revenue.</p>
                </div>
                <div className="feat-grid">
                    {[
                        { icon: '📊', color: '#4F46E5', title: 'Real-time Analytics', desc: 'Live dashboards and visual reports. Track every metric from pipeline value to conversion rates.' },
                        { icon: '🤖', color: '#0EA5E9', title: 'AI Lead Scoring', desc: 'Machine learning prioritizes your hottest leads so reps focus on deals most likely to close.' },
                        { icon: '⚡', color: '#F59E0B', title: 'Workflow Automation', desc: 'Automate follow-ups, stage changes, and task assignments. Save 10+ hours per rep weekly.' },
                        { icon: '👥', color: '#10B981', title: 'Team Collaboration', desc: 'Shared notes, @mentions, and real-time activity feeds keep everyone aligned and moving.' },
                        { icon: '🔗', color: '#8B5CF6', title: '100+ Integrations', desc: 'Connect Slack, Gmail, Salesforce, Zapier and more. Sync your entire tech stack effortlessly.' },
                        { icon: '🛡️', color: '#EC4899', title: 'Enterprise Security', desc: 'SOC 2 Type II, SSO, role-based access, and end-to-end encryption. Built for serious teams.' },
                    ].map(({ icon, color, title, desc }) => (
                        <div className="feat-card" key={title}>
                            <div className="feat-icon" style={{ background: `${color}14`, color }}>{icon}</div>
                            <h3>{title}</h3>
                            <p>{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── How It Works ── */}
            <section className="lp-how anim" id="how">
                <div className="sec-top">
                    <span className="sec-badge">How it works</span>
                    <h2>Up and running in minutes</h2>
                    <p>Three simple steps to transform your sales process.</p>
                </div>
                <div className="how-steps">
                    {[
                        { num: '01', title: 'Connect your data', desc: 'Import contacts, deals, and emails with one click. We sync with your CRM, inbox, and calendar.' },
                        { num: '02', title: 'Customize your pipeline', desc: 'Build stages, fields, and automations that match your exact sales process — no code required.' },
                        { num: '03', title: 'Start closing deals', desc: 'Use AI insights and real-time analytics to prioritize, engage, and close deals faster than ever.' },
                    ].map(({ num, title, desc }) => (
                        <div className="how-card" key={num}>
                            <span className="how-num">{num}</span>
                            <h3>{title}</h3>
                            <p>{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Stats ── */}
            <section className="lp-stats anim" id="stats">
                <div className="stats-inner">
                    {[
                        { val: '10K+', label: 'Active Teams' },
                        { val: '2.4M', label: 'Deals Closed' },
                        { val: '98%', label: 'Satisfaction' },
                        { val: '35%', label: 'More Revenue' },
                    ].map(({ val, label }) => (
                        <div className="st" key={label}>
                            <strong>{val}</strong>
                            <span>{label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Testimonials ── */}
            <section className="lp-testimonials anim">
                <div className="sec-top">
                    <span className="sec-badge">Testimonials</span>
                    <h2>Loved by sales teams everywhere</h2>
                </div>
                <div className="test-grid">
                    {[
                        { quote: 'SalesShop transformed our pipeline. We closed 40% more deals in Q1 alone.', name: 'Sarah Chen', role: 'VP of Sales, TechCorp', initials: 'SC' },
                        { quote: 'The AI insights are game-changing. It tells us exactly which leads to call and when.', name: 'Marcus Johnson', role: 'Sales Director, GrowthLab', initials: 'MJ' },
                        { quote: 'We onboarded 50 reps in a single day. The UX is that intuitive.', name: 'Priya Sharma', role: 'Head of Revenue, ScaleUp', initials: 'PS' },
                    ].map(({ quote, name, role, initials }) => (
                        <div className="test-card" key={name}>
                            <div className="test-stars">★★★★★</div>
                            <p>"{quote}"</p>
                            <div className="test-author">
                                <div className="test-avatar">{initials}</div>
                                <div>
                                    <strong>{name}</strong>
                                    <span>{role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="lp-cta anim" id="pricing">
                <div className="cta-inner">
                    <h2>Ready to close more deals?</h2>
                    <p>Join 10,000+ sales teams already using SalesShop. Start free today.</p>
                    <div className="cta-actions">
                        <Link to="/signup" className="lp-btn-filled lg white">Start Free Trial →</Link>
                        <Link to="/login" className="lp-btn-ghost white">Talk to Sales</Link>
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="lp-footer">
                <div className="ft-top">
                    <div className="ft-brand">
                        <Logo size={28} />
                        <span>SalesShop</span>
                        <p>The modern sales platform for high-performing teams.</p>
                    </div>
                    <div className="ft-cols">
                        <div>
                            <h4>Product</h4>
                            <a href="#features">Features</a>
                            <a href="#pricing">Pricing</a>
                            <a href="#how">How it works</a>
                            <a href="#">Integrations</a>
                        </div>
                        <div>
                            <h4>Company</h4>
                            <a href="#">About</a>
                            <a href="#">Careers</a>
                            <a href="#">Blog</a>
                            <a href="#">Contact</a>
                        </div>
                        <div>
                            <h4>Legal</h4>
                            <a href="#">Privacy</a>
                            <a href="#">Terms</a>
                            <a href="#">Security</a>
                        </div>
                    </div>
                </div>
                <div className="ft-bottom">
                    <span>© 2026 SalesShop Inc. All rights reserved.</span>
                </div>
            </footer>
        </div>
    )
}
