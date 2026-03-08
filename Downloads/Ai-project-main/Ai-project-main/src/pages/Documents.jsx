import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import './Pages.css'

export default function Documents() {
    const navigate = useNavigate()
    const token = localStorage.getItem('salesshop_token')
    const user = JSON.parse(localStorage.getItem('salesshop_user') || '{}')

    if (!token) { navigate('/login'); return null }

    return (
        <DashboardLayout user={user}>
            <div className="pg-header">
                <div><h1>Documents</h1><p>Manage invoices, quotes, and files</p></div>
            </div>

            <div className="pg-table-wrap">
                <div className="pg-empty">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                        <rect x="4" y="4" width="40" height="40" rx="10" fill="#F3F4F6" />
                        <path d="M28 12H16a2 2 0 00-2 2v20a2 2 0 002 2h16a2 2 0 002-2V18l-6-6z" fill="#D1D5DB" />
                        <path d="M28 12v6h6" fill="#E5E7EB" />
                        <rect x="18" y="22" width="12" height="2" rx="1" fill="#9CA3AF" />
                        <rect x="18" y="27" width="8" height="2" rx="1" fill="#9CA3AF" />
                    </svg>
                    <h3>No documents yet</h3>
                    <p>Invoices, quotes, and files will appear here</p>
                </div>
            </div>
        </DashboardLayout>
    )
}
