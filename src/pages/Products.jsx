import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import './Pages.css'

const API = 'http://localhost:8080/api'

/* ── Code128 barcode SVG generator (client-side, no deps) ── */
const CODE128 = {
    START_B: 104,
    patterns: [
        "11011001100", "11001101100", "11001100110", "10010011000", "10010001100",
        "10001001100", "10011001000", "10011000100", "10001100100", "11001001000",
        "11001000100", "11000100100", "10110011100", "10011011100", "10011001110",
        "10111001100", "10011101100", "10011100110", "11001110010", "11001011100",
        "11001001110", "11011100100", "11001110100", "11100101100", "11100100110",
        "11101100100", "11100110100", "11100110010", "11011011000", "11011000110",
        "11000110110", "10100011000", "10001011000", "10001000110", "10110001000",
        "10001101000", "10001100010", "11010001000", "11000101000", "11000100010",
        "10110111000", "10110001110", "10001101110", "10111011000", "10111000110",
        "10001110110", "11101110110", "11010001110", "11000101110", "11011101000",
        "11011100010", "11011101110", "11101011000", "11101000110", "11100010110",
        "11101101000", "11101100010", "11100011010", "11101111010", "11001000010",
        "11110001010", "10100110000", "10100001100", "10010110000", "10010000110",
        "10000101100", "10000100110", "10110010000", "10110000100", "10011010000",
        "10011000010", "10000110100", "10000110010", "11000010010", "11001010000",
        "11110111010", "11000010100", "10001111010", "10100111100", "10010111100",
        "10010011110", "10111100100", "10011110100", "10011110010", "11110100100",
        "11110010100", "11110010010", "11011011110", "11011110110", "11110110110",
        "10101111000", "10100011110", "10001011110", "10111101000", "10111100010",
        "11110101000", "11110100010", "10111011110", "10111101110", "11101011110",
        "11110101110", "11010000100", "11010010000", "11010011100", "1100011101011"
    ]
}

function generateBarcodeSVG(text, w = 1.5, h = 50) {
    if (!text) return null
    let codes = [CODE128.START_B]
    let checksum = CODE128.START_B
    for (let i = 0; i < text.length; i++) {
        const val = text.charCodeAt(i) - 32
        codes.push(val)
        checksum += val * (i + 1)
    }
    codes.push(checksum % 103)
    codes.push(106) // STOP

    let bits = ''
    codes.forEach(c => bits += CODE128.patterns[c])

    const barWidth = bits.length * w
    const svgBars = []
    let x = 0
    for (let i = 0; i < bits.length; i++) {
        if (bits[i] === '1') {
            svgBars.push(`<rect x="${x}" y="0" width="${w}" height="${h}" fill="#000"/>`)
        }
        x += w
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${barWidth}" height="${h}" viewBox="0 0 ${barWidth} ${h}">${svgBars.join('')}</svg>`
}

export default function Products() {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [editing, setEditing] = useState(null)
    const [barcodeProduct, setBarcodeProduct] = useState(null)
    const [form, setForm] = useState({ name: '', description: '', price: '', sku: '', stockQuantity: '' })
    const token = localStorage.getItem('salesshop_token')
    const user = JSON.parse(localStorage.getItem('salesshop_user') || '{}')

    useEffect(() => { if (!token) { navigate('/login'); return } fetchProducts() }, [])

    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }

    const fetchProducts = () => {
        fetch(`${API}/products`, { headers }).then(r => r.json()).then(setProducts).catch(() => { })
    }

    const openAdd = () => { setEditing(null); setForm({ name: '', description: '', price: '', sku: '', stockQuantity: '' }); setShowModal(true) }
    const openEdit = (p) => { setEditing(p); setForm({ name: p.name, description: p.description || '', price: String(p.price), sku: p.sku || '', stockQuantity: String(p.stockQuantity) }); setShowModal(true) }

    const handleSave = () => {
        const url = editing ? `${API}/products/${editing.id}` : `${API}/products`
        const method = editing ? 'PUT' : 'POST'
        fetch(url, { method, headers, body: JSON.stringify(form) })
            .then(async r => {
                let data = {}
                try { data = await r.json() } catch (e) { }
                if (!r.ok) throw new Error(data.error || `Error ${r.status}: ${r.statusText}`)
                fetchProducts()
                setShowModal(false)
            })
            .catch(err => alert(err.message))
    }

    const handleDelete = (id) => {
        if (!confirm('Delete this product?')) return
        fetch(`${API}/products/${id}`, { method: 'DELETE', headers })
            .then(async r => {
                if (!r.ok) {
                    let data = {}
                    try { data = await r.json() } catch (e) { }
                    throw new Error(data.error || `Error ${r.status}: ${r.statusText}`)
                }
                fetchProducts()
            })
            .catch(err => alert(err.message))
    }

    const printBarcode = (sku) => {
        const svg = generateBarcodeSVG(sku)
        const win = window.open('', '_blank', 'width=400,height=300')
        win.document.write(`<html><body style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-family:monospace">${svg}<p style="margin-top:8px;font-size:14px;letter-spacing:2px">${sku}</p></body></html>`)
        win.document.close()
        setTimeout(() => win.print(), 300)
    }

    return (
        <DashboardLayout user={user}>
            <div className="pg-header">
                <div><h1>Products</h1><p>Manage your product catalog</p></div>
                <button className="pg-btn" onClick={openAdd}>+ Add Product</button>
            </div>

            {products.length === 0 ? (
                <div className="pg-table-wrap">
                    <div className="pg-empty">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect x="4" y="4" width="40" height="40" rx="10" fill="#F3F4F6" /><path d="M24 12L14 18v12l10 6 10-6V18l-10-6z" fill="#D1D5DB" /></svg>
                        <h3>No products yet</h3>
                        <p>Add your first product to start selling</p>
                        <button className="pg-btn" onClick={openAdd}>+ Add Product</button>
                    </div>
                </div>
            ) : (
                <div className="pg-table-wrap">
                    <table className="pg-table">
                        <thead><tr><th>Product</th><th>SKU</th><th>Price</th><th>Stock</th><th>Barcode</th><th>Actions</th></tr></thead>
                        <tbody>
                            {products.map(p => (
                                <tr key={p.id}>
                                    <td><strong>{p.name}</strong><br /><span style={{ fontSize: 11, color: '#9CA3AF' }}>{p.description}</span></td>
                                    <td><code style={{ fontSize: 12, background: '#F3F4F6', padding: '2px 6px', borderRadius: 4 }}>{p.sku}</code></td>
                                    <td>₹{Number(p.price).toLocaleString()}</td>
                                    <td>{p.stockQuantity}</td>
                                    <td>
                                        <button className="pg-btn pg-btn-outline pg-btn-sm" onClick={() => setBarcodeProduct(barcodeProduct?.id === p.id ? null : p)}>
                                            {barcodeProduct?.id === p.id ? 'Hide' : 'View'}
                                        </button>
                                    </td>
                                    <td>
                                        <div className="pg-actions">
                                            <button className="pg-btn pg-btn-outline pg-btn-sm" onClick={() => openEdit(p)}>Edit</button>
                                            <button className="pg-btn pg-btn-danger pg-btn-sm" onClick={() => handleDelete(p.id)}>Del</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {barcodeProduct && (
                        <div className="pg-barcode">
                            <div dangerouslySetInnerHTML={{ __html: generateBarcodeSVG(barcodeProduct.sku) }} />
                            <div className="pg-barcode-sku">{barcodeProduct.sku}</div>
                            <button className="pg-btn pg-btn-sm" style={{ marginTop: 8 }} onClick={() => printBarcode(barcodeProduct.sku)}>🖨 Print Barcode</button>
                        </div>
                    )}
                </div>
            )}

            {showModal && (
                <div className="pg-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="pg-modal" onClick={e => e.stopPropagation()}>
                        <h2>{editing ? 'Edit Product' : 'Add Product'}</h2>
                        <div className="pg-field"><label>Product Name</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
                        <div className="pg-field"><label>Description</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
                        <div className="pg-field"><label>Price (₹)</label><input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} /></div>
                        <div className="pg-field"><label>SKU (auto-generated if empty)</label><input value={form.sku} onChange={e => setForm({ ...form, sku: e.target.value })} placeholder="Leave empty to auto-generate" /></div>
                        <div className="pg-field"><label>Stock Quantity</label><input type="number" value={form.stockQuantity} onChange={e => setForm({ ...form, stockQuantity: e.target.value })} /></div>
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
