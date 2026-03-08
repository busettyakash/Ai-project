import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import './Dashboard.css'

const API = process.env.VITE_API_URL || 'http://localhost:8080/api'

export default function Dashboard() {
    const navigate = useNavigate()
    const [stats, setStats] = useState(null)
    const [activities, setActivities] = useState([])
    const [deals, setDeals] = useState([])
    const [loading, setLoading] = useState(true)

    const token = localStorage.getItem('salesshop_token')
    const storedUser = JSON.parse(localStorage.getItem('salesshop_user') || '{}')

    useEffect(() => {
        if (!token) { navigate('/login'); return }
        const h = { Authorization: `Bearer ${token}` }
        Promise.all([
            fetch(`${API}/dashboard/stats`, { headers: h }).then(r => r.ok ? r.json() : null),
            fetch(`${API}/dashboard/recent-activity`, { headers: h }).then(r => r.ok ? r.json() : null),
            fetch(`${API}/deals`, { headers: h }).then(r => r.ok ? r.json() : []),
        ]).then(([s, a, d]) => {
            if (s) setStats(s)
            if (a) setActivities(a)
            if (d) setDeals(d.slice(0, 5))
            setLoading(false)
        }).catch(() => setLoading(false))
    }, [token, navigate])

    const user = stats?.user || storedUser
    const hour = new Date().getHours()
    const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

    const totalCustomers = stats?.totalCustomers || 0
    const totalDeals = stats?.totalDeals || 0
    const totalProducts = stats?.totalProducts || 0
    const totalActivities = stats?.totalActivities || 0

    function timeAgo(dateStr) {
        if (!dateStr) return ''
        const diff = Date.now() - new Date(dateStr).getTime()
        const mins = Math.floor(diff / 60000)
        if (mins < 1) return 'Just now'
        if (mins < 60) return `${mins}m ago`
        const hrs = Math.floor(mins / 60)
        if (hrs < 24) return `${hrs}h ago`
        return `${Math.floor(hrs / 24)}d ago`
    }

    if (loading) return (
        <div className="db-loading"><div className="db-spinner" /><span>Loading...</span></div>
    )

    return (
        <DashboardLayout user={user}>
            <h1 className="db-page-title">{greeting}, <span>{user.name || 'User'}</span></h1>
            <p className="db-page-sub">{user.shopName} &middot; GST: {user.gstNumber}</p>

            {/* Three-column panel */}
            <div className="db-panels">
                {/* Stats */}
                <div className="db-panel db-stats-panel">
                    <div className="db-kpi">
                        <div className="db-kpi-icon purple">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
                        </div>
                        <div><div className="db-kpi-val">{totalCustomers}</div><div className="db-kpi-label">Customers</div></div>
                    </div>
                    <div className="db-kpi-divider" />
                    <div className="db-kpi">
                        <div className="db-kpi-icon blue">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                        </div>
                        <div><div className="db-kpi-val">{totalDeals}</div><div className="db-kpi-label">Total Deals</div></div>
                    </div>
                    <div className="db-kpi-divider" />
                    <div className="db-kpi">
                        <div className="db-kpi-icon amber">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /></svg>
                        </div>
                        <div><div className="db-kpi-val">{totalProducts}</div><div className="db-kpi-label">Products</div></div>
                    </div>
                    <div className="db-kpi-divider" />
                    <div className="db-kpi">
                        <div className="db-kpi-icon green">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                        </div>
                        <div><div className="db-kpi-val">{totalActivities}</div><div className="db-kpi-label">Activities</div></div>
                    </div>
                </div>

                {/* Revenue */}
                <div className="db-panel db-chart-panel">
                    <div className="db-panel-header">
                        <h2>Revenue</h2>
                        <span className="db-panel-link" onClick={() => navigate('/deals')}>View deals →</span>
                    </div>
                    {totalDeals === 0 ? (
                        <div className="db-chart-empty">
                            <div className="db-donut-placeholder">
                                <svg width="120" height="120" viewBox="0 0 120 120">
                                    <circle cx="60" cy="60" r="48" fill="none" stroke="#E5E7EB" strokeWidth="12" />
                                    <circle cx="60" cy="60" r="48" fill="none" stroke="#6366F1" strokeWidth="12" strokeDasharray="75 226" strokeLinecap="round" style={{ opacity: .3 }} />
                                </svg>
                                <span className="db-donut-center">₹0</span>
                            </div>
                            <p className="db-chart-hint">No deals yet — revenue will show here</p>
                        </div>
                    ) : (
                        <div className="db-chart-area">
                            <svg viewBox="0 0 300 120" className="db-chart-svg">
                                <defs><linearGradient id="rcg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6366F1" stopOpacity="0.12" /><stop offset="100%" stopColor="#6366F1" stopOpacity="0" /></linearGradient></defs>
                                <path d="M0,100 C50,90 100,60 150,40 C200,25 250,15 300,10 L300,120 L0,120Z" fill="url(#rcg)" />
                                <path d="M0,100 C50,90 100,60 150,40 C200,25 250,15 300,10" fill="none" stroke="#6366F1" strokeWidth="2" />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Activity */}
                <div className="db-panel db-activity-panel">
                    <div className="db-panel-header">
                        <h2>Activity</h2>
                        <span className="db-panel-sub">Recent</span>
                    </div>
                    {activities.length === 0 ? (
                        <div className="db-act-empty">
                            <div className="db-act-empty-row"><div className="db-skel s1" /><div className="db-skel-text"><div className="db-skel s2" /><div className="db-skel s3" /></div></div>
                            <div className="db-act-empty-row"><div className="db-skel s1" /><div className="db-skel-text"><div className="db-skel s2" /><div className="db-skel s3" /></div></div>
                            <div className="db-act-empty-row"><div className="db-skel s1" /><div className="db-skel-text"><div className="db-skel s2" /><div className="db-skel s3" /></div></div>
                            <p className="db-act-empty-hint">No activity yet</p>
                        </div>
                    ) : (
                        <div className="db-act-feed">
                            {activities.map(a => (
                                <div className="db-act-row" key={a.id}>
                                    <div className="db-act-avatar">{a.type?.charAt(0)}</div>
                                    <div className="db-act-info">
                                        <span className="db-act-title">{a.description}</span>
                                        <span className="db-act-meta">{a.type} &middot; {timeAgo(a.createdAt)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <h3 className="db-section-title">Quick Actions</h3>
            <div className="db-quick-grid">
                <div className="db-quick-card" onClick={() => navigate('/customers')}>
                    <div className="db-quick-icon blue">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="16" y1="11" x2="22" y2="11" /></svg>
                    </div>
                    <div className="db-quick-info"><h4>Add Customer</h4><p>New client</p></div>
                </div>
                <div className="db-quick-card" onClick={() => navigate('/products')}>
                    <div className="db-quick-icon green">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><line x1="12" y1="22" x2="12" y2="12" /></svg>
                    </div>
                    <div className="db-quick-info"><h4>Add Product</h4><p>Inventory item</p></div>
                </div>
                <div className="db-quick-card" onClick={() => navigate('/deals')}>
                    <div className="db-quick-icon purple">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                    </div>
                    <div className="db-quick-info"><h4>Create Deal</h4><p>Sales event</p></div>
                </div>
                <div className="db-quick-card" onClick={() => navigate('/documents')}>
                    <div className="db-quick-icon pink">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                    </div>
                    <div className="db-quick-info"><h4>Create Invoice</h4><p>Coming soon</p></div>
                </div>
            </div>

            {/* Recent Deals Table */}
            <h3 className="db-section-title">Recent Deals</h3>
            <div className="db-table-panel">
                {deals.length === 0 ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>
                        <p style={{ fontSize: '13px' }}>No deals yet. Tap "Create Deal" to start tracking.</p>
                    </div>
                ) : (
                    <table className="db-table">
                        <thead><tr><th>Deal Name</th><th>Value</th><th>Stage</th><th>Customer</th><th>Date</th></tr></thead>
                        <tbody>
                            {deals.map(d => (
                                <tr key={d.id}>
                                    <td><strong>{d.title}</strong></td>
                                    <td>₹{Number(d.value).toLocaleString()}</td>
                                    <td><span className={`db-badge ${d.stage?.toLowerCase()}`}>{d.stage}</span></td>
                                    <td>{d.customer?.name}</td>
                                    <td>{new Date(d.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </DashboardLayout>
    )
}
