import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import './Pages.css'

const API = process.env.VITE_API_URL || 'http://localhost:8080/api'

const STAGES = ['PROSPECT', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST']
const stageBadge = (s) => {
    if (s === 'WON') return 'pg-badge pg-badge-green'
    if (s === 'LOST') return 'pg-badge pg-badge-red'
    if (s === 'NEGOTIATION' || s === 'PROPOSAL') return 'pg-badge pg-badge-amber'
    return 'pg-badge pg-badge-blue'
}

export default function Deals() {
    const navigate = useNavigate()
    const [deals, setDeals] = useState([])
    const [customers, setCustomers] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState({ title: '', value: '', stage: 'PROSPECT', customerId: '' })
    const token = localStorage.getItem('salesshop_token')
    const user = JSON.parse(localStorage.getItem('salesshop_user') || '{}')

    useEffect(() => {
        if (!token) { navigate('/login'); return }
        fetchDeals()
        fetch(`${API}/customers`, { headers: { Authorization: `Bearer ${token}`, 'ngrok-skip-browser-warning': 'true' } }).then(r => r.json()).then(setCustomers).catch(() => { })
    }, [])

    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' }

    const fetchDeals = () => {
        fetch(`${API}/deals`, { headers }).then(r => r.json()).then(setDeals).catch(() => { })
    }

    const openAdd = () => { setEditing(null); setForm({ title: '', value: '', stage: 'PROSPECT', customerId: customers[0]?.id || '' }); setShowModal(true) }
    const openEdit = (d) => { setEditing(d); setForm({ title: d.title, value: String(d.value), stage: d.stage, customerId: d.customer?.id || '' }); setShowModal(true) }

    const handleSave = () => {
        const url = editing ? `${API}/deals/${editing.id}` : `${API}/deals`
        const method = editing ? 'PUT' : 'POST'
        fetch(url, { method, headers, body: JSON.stringify(form) })
            .then(async r => {
                const data = await r.json()
                if (!r.ok) throw new Error(data.error || 'Failed to save deal')
                fetchDeals()
                setShowModal(false)
            })
            .catch(err => alert(err.message))
    }

    const handleDelete = (id) => {
        if (!confirm('Delete this deal?')) return
        fetch(`${API}/deals/${id}`, { method: 'DELETE', headers })
            .then(r => {
                if (!r.ok) throw new Error('Failed to delete deal')
                fetchDeals()
            })
            .catch(err => alert(err.message))
    }

    return (
        <DashboardLayout user={user}>
            <div className="pg-header">
                <div><h1>Deals</h1><p>Track your sales pipeline</p></div>
                <button className="pg-btn" onClick={openAdd}>+ New Deal</button>
            </div>

            {deals.length === 0 ? (
                <div className="pg-table-wrap">
                    <div className="pg-empty">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="4" y="4" width="40" height="40" rx="10" fill="#F3F4F6" /><path d="M24 12L14 18v12l10 6 10-6V18l-10-6zM14 18l10 5 10-5M24 37V23" stroke="#D1D5DB" strokeWidth="2" /></svg>
                        <h3>No deals yet</h3>
                        <p>{customers.length === 0 ? 'Add a customer first, then create deals' : 'Create your first deal to track sales'}</p>
                        {customers.length > 0 && <button className="pg-btn" onClick={openAdd}>+ New Deal</button>}
                    </div>
                </div>
            ) : (
                <div className="pg-table-wrap">
                    <table className="pg-table">
                        <thead><tr><th>Deal</th><th>Value</th><th>Stage</th><th>Customer</th><th>Actions</th></tr></thead>
                        <tbody>
                            {deals.map(d => (
                                <tr key={d.id}>
                                    <td><strong>{d.title}</strong></td>
                                    <td>₹{Number(d.value).toLocaleString()}</td>
                                    <td><span className={stageBadge(d.stage)}>{d.stage}</span></td>
                                    <td>{d.customer?.name || '—'}</td>
                                    <td>
                                        <div className="pg-actions">
                                            <button className="pg-btn pg-btn-outline pg-btn-sm" onClick={() => openEdit(d)}>Edit</button>
                                            <button className="pg-btn pg-btn-danger pg-btn-sm" onClick={() => handleDelete(d.id)}>Del</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showModal && (
                <div className="pg-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="pg-modal" onClick={e => e.stopPropagation()}>
                        <h2>{editing ? 'Edit Deal' : 'New Deal'}</h2>
                        <div className="pg-field"><label>Title</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></div>
                        <div className="pg-field"><label>Value (₹)</label><input type="number" value={form.value} onChange={e => setForm({ ...form, value: e.target.value })} /></div>
                        <div className="pg-field">
                            <label>Stage</label>
                            <select value={form.stage} onChange={e => setForm({ ...form, stage: e.target.value })}>
                                {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        {!editing && (
                            <div className="pg-field">
                                <label>Customer</label>
                                <select value={form.customerId} onChange={e => setForm({ ...form, customerId: e.target.value })}>
                                    {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                        )}
                        <div className="pg-modal-actions">
                            <button className="pg-btn pg-btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="pg-btn" onClick={handleSave}>{editing ? 'Update' : 'Create'}</button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    )
}
