import { NavLink, useNavigate } from 'react-router-dom'
import './DashboardLayout.css'

function getInitials(name) {
    if (!name) return '?'
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

export default function DashboardLayout({ children, user }) {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('salesshop_token')
        localStorage.removeItem('salesshop_user')
        navigate('/login')
    }

    return (
        <div className="db">
            <aside className="db-side">
                <div className="db-side-top">
                    <div className="db-logo-row">
                        <div className="db-logo-mark">S</div>
                        <span className="db-logo-text">SalesShop</span>
                    </div>
                </div>
                <nav className="db-nav">
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink to="/customers" className={({ isActive }) => isActive ? 'active' : ''}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
                        <span>Customers</span>
                    </NavLink>
                    <NavLink to="/deals" className={({ isActive }) => isActive ? 'active' : ''}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                        <span>Deals</span>
                    </NavLink>
                    <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : ''}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /></svg>
                        <span>Products</span>
                    </NavLink>
                    <NavLink to="/analytics" className={({ isActive }) => isActive ? 'active' : ''}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 20V10M12 20V4M6 20v-6" /></svg>
                        <span>Analytics</span>
                    </NavLink>
                    <NavLink to="/documents" className={({ isActive }) => isActive ? 'active' : ''}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></svg>
                        <span>Documents</span>
                    </NavLink>
                </nav>
                <div className="db-side-bot">
                    <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>
                        <span>Settings</span>
                    </NavLink>
                    <a className="db-nav-logout" onClick={handleLogout}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                        <span>Logout</span>
                    </a>
                </div>
            </aside>
            <main className="db-main">
                <header className="db-topbar">
                    <div></div>
                    <div className="db-topbar-right">
                        <div className="db-search">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                            <input placeholder="Search..." />
                        </div>
                        <div className="db-user-chip">
                            <div className="db-user-av">{getInitials(user?.name)}</div>
                            <span>{user?.name}</span>
                        </div>
                    </div>
                </header>
                <div className="db-page">
                    {children}
                </div>
            </main>
        </div>
    )
}
