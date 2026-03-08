import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import './Pages.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export default function Customers() {
    const navigate = useNavigate()
    const [customers, setCustomers] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [editing, setEditing] = useState(null)
    const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' })
    const token = localStorage.getItem('salesshop_token')
    const user = JSON.parse(localStorage.getItem('salesshop_user') || '{}')

    useEffect(() => {
        if (!token) { navigate('/login'); return }
        fetchCustomers()
    }, [])

    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }

    const fetchCustomers = () => {
        fetch(`${API}/customers`, { headers }).then(r => r.json()).then(setCustomers).catch(() => { })
    }

    const openAdd = () => { setEditing(null); setForm({ name: '', email: '', phone: '', company: '' }); setShowModal(true) }
    const openEdit = (c) => { setEditing(c); setForm({ name: c.name, email: c.email || '', phone: c.phone || '', company: c.company || '' }); setShowModal(true) }

    const handleSave = () => {
        const url = editing ? `${API}/customers/${editing.id}` : `${API}/customers`
        const method = editing ? 'PUT' : 'POST'
        fetch(url, { method, headers, body: JSON.stringify(form) })
            .then(async r => {
                let data = {}
                try { data = await r.json() } catch (e) { }
                if (!r.ok) throw new Error(data.error || `Error ${r.status}: ${r.statusText}`)
                fetchCustomers()
                setShowModal(false)
            })
            .catch(err => alert(err.message))
    }

    const handleDelete = (id) => {
        if (!confirm('Delete this customer?')) return
        fetch(`${API}/customers/${id}`, { method: 'DELETE', headers })
            .then(async r => {
                if (!r.ok) {
                    let data = {}
                    try { data = await r.json() } catch (e) { }
                    throw new Error(data.error || `Error ${r.status}: ${r.statusText}`)
                }
                fetchCustomers()
            })
            .catch(err => alert(err.message))
    }

    return (
        <DashboardLayout user={user}>
            <div className="pg-header">
                <div><h1>Customers</h1><p>Manage your customer list</p></div>
                <button className="pg-btn" onClick={openAdd}>+ Add Customer</button>
            </div>

            {customers.length === 0 ? (
                <div className="pg-table-wrap">
                    <div className="pg-empty">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="4" y="4" width="40" height="40" rx="10" fill="#F3F4F6" /><circle cx="24" cy="18" r="6" fill="#D1D5DB" /><path d="M12 38c0-6.627 5.373-12 12-12s12 5.373 12 12" fill="#D1D5DB" /></svg>
                        <h3>No customers yet</h3>
                        <p>Add your first customer to get started</p>
                        <button className="pg-btn" onClick={openAdd}>+ Add Customer</button>
                    </div>
                </div>
            ) : (
                <div className="pg-table-wrap">
                    <table className="pg-table">
                        <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Company</th><th>Actions</th></tr></thead>
                        <tbody>
                            {customers.map(c => (
                                <tr key={c.id}>
                                    <td><strong>{c.name}</strong></td>
                                    <td>{c.email}</td>
                                    <td>{c.phone}</td>
                                    <td>{c.company}</td>
                                    <td>
                                        <div className="pg-actions">
                                            <button className="pg-btn pg-btn-outline pg-btn-sm" onClick={() => openEdit(c)}>Edit</button>
                                            <button className="pg-btn pg-btn-danger pg-btn-sm" onClick={() => handleDelete(c.id)}>Delete</button>
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
                        <h2>{editing ? 'Edit Customer' : 'Add Customer'}</h2>
                        <div className="pg-field"><label>Name</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                        <div className="pg-field"><label>Email</label><input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                        <div className="pg-field"><label>Phone</label><input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
                        <div className="pg-field"><label>Company</label><input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} /></div>
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
