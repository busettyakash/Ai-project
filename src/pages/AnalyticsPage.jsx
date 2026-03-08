import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import './Pages.css'

const API = 'http://localhost:8080/api'

export default function AnalyticsPage() {
    const navigate = useNavigate()
    const [stats, setStats] = useState(null)
    const token = localStorage.getItem('salesshop_token')
    const user = JSON.parse(localStorage.getItem('salesshop_user') || '{}')

    useEffect(() => {
        if (!token) { navigate('/login'); return }
        fetch(`${API}/dashboard/stats`, { headers: { Authorization: `Bearer ${token}` } })
            .then(r => r.json()).then(setStats).catch(() => { })
    }, [])

    return (
        <DashboardLayout user={user}>
            <div className="pg-header">
                <div><h1>Analytics</h1><p>Overview of your business performance</p></div>
            </div>

            <div className="pg-stats">
                <div className="pg-stat-card">
                    <h3>Total Customers</h3>
                    <div className="val">{stats?.totalCustomers || 0}</div>
                </div>
                <div className="pg-stat-card">
                    <h3>Active Deals</h3>
                    <div className="val">{stats?.totalDeals || 0}</div>
                </div>
                <div className="pg-stat-card">
                    <h3>Products</h3>
                    <div className="val">{stats?.totalProducts || 0}</div>
                </div>
                <div className="pg-stat-card">
                    <h3>Activities</h3>
                    <div className="val">{stats?.totalActivities || 0}</div>
                </div>
            </div>

            <div className="pg-table-wrap" style={{ padding: 40, textAlign: 'center' }}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <rect x="6" y="6" width="52" height="52" rx="12" fill="#F3F4F6" />
                    <rect x="14" y="38" width="8" height="16" rx="2" fill="#6366F1" opacity=".3" />
                    <rect x="26" y="28" width="8" height="26" rx="2" fill="#6366F1" opacity=".5" />
                    <rect x="38" y="18" width="8" height="36" rx="2" fill="#6366F1" opacity=".7" />
                </svg>
                <h3 style={{ marginTop: 12, fontSize: 15, fontWeight: 600, color: '#374151' }}>Detailed analytics coming soon</h3>
                <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 4 }}>Charts and trend analysis will appear here as you add more data</p>
            </div>
        </DashboardLayout>
    )
}
