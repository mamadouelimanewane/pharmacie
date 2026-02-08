import React, { useState, useEffect, useRef } from 'react';
import { Package, Search, Filter, ArrowUpRight, AlertTriangle, RefreshCcw, Download, Calendar, Truck, Barcode, X, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockData';

export default function Inventory() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [showReceiveModal, setShowReceiveModal] = useState(false);

    // Delivery Reception State
    const [receivedItems, setReceivedItems] = useState([]);
    const [scanFeedback, setScanFeedback] = useState(null);
    const barcodeBuffer = useRef('');
    const lastKeyTime = useRef(0);

    const filteredProducts = MOCK_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code.includes(searchTerm)
    );

    const productsToOrder = MOCK_PRODUCTS.filter(p => p.stock <= p.minStock);
    const totalOrderValue = productsToOrder.reduce((acc, p) => acc + (p.minStock * 2 - p.stock) * p.costPrice, 0);

    const getExpiryColor = (expiryStr) => {
        const expiry = new Date(expiryStr);
        const now = new Date();
        const diffMonths = (expiry.getFullYear() - now.getFullYear()) * 12 + (expiry.getMonth() - now.getMonth());
        if (diffMonths < 3) return '#fee2e2';
        if (diffMonths < 6) return '#fef3c7';
        return '#f1f5f9';
    };

    // Global Key Listener for Reception Scanner
    useEffect(() => {
        if (!showReceiveModal) return;

        const handleKeyDown = (e) => {
            const now = Date.now();
            if (now - lastKeyTime.current > 100) barcodeBuffer.current = '';
            lastKeyTime.current = now;

            if (e.key === 'Enter') {
                if (barcodeBuffer.current.length > 2) {
                    const product = MOCK_PRODUCTS.find(p => p.code === barcodeBuffer.current);
                    if (product) {
                        handleProductScanned(product);
                        barcodeBuffer.current = '';
                    } else {
                        setScanFeedback({ type: 'error', message: 'Produit inconnu' });
                        setTimeout(() => setScanFeedback(null), 2000);
                        barcodeBuffer.current = '';
                    }
                }
            } else if (e.key.length === 1) {
                barcodeBuffer.current += e.key;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showReceiveModal, receivedItems]);

    const handleProductScanned = (product) => {
        setReceivedItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, receivedQty: item.receivedQty + 1 } : item);
            }
            return [...prev, { ...product, receivedQty: 1 }];
        });
        setScanFeedback({ type: 'success', message: `${product.name} ajouté` });
        setTimeout(() => setScanFeedback(null), 1500);
    };

    const updateReceivedQty = (id, val) => {
        setReceivedItems(prev => prev.map(item =>
            item.id === id ? { ...item, receivedQty: Math.max(0, parseInt(val) || 0) } : item
        ));
    };

    const validateReception = () => {
        alert(`Stock mis à jour ! ${receivedItems.length} références réceptionnées.`);
        // Logic to update MOCK_PRODUCTS would go here (or via a central state/API)
        setReceivedItems([]);
        setShowReceiveModal(false);
    };

    return (
        <div className="inventory fade-in">
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontStyle: 'italic', marginBottom: '0.5rem' }}>Gestion des Stocks & Logistique</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Contrôlez vos références et réceptionnez vos livraisons.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                        onClick={() => setShowReceiveModal(true)}
                        className="glass"
                        style={{ padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary)', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700' }}
                    >
                        <Barcode size={18} /> Réception Livraison
                    </button>
                    <button
                        onClick={() => setShowOrderModal(true)}
                        style={{ padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: 'none', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <Truck size={18} /> Commande Automatique
                    </button>
                </div>
            </header>

            {/* Modal de Réception de Livraison (SCAN) */}
            {showReceiveModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.8)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '24px', width: '800px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-lg)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <div>
                                <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Barcode size={28} color="var(--primary)" /> Réception Colis Grossiste</h2>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Scannez les produits l'un après l'autre. Le stock sera incrémenté.</p>
                            </div>
                            <button onClick={() => setShowReceiveModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={32} /></button>
                        </div>

                        {/* Zone Scan Feedback */}
                        <div style={{
                            padding: '20px',
                            backgroundColor: scanFeedback?.type === 'error' ? '#fee2e2' : '#f0f9ff',
                            borderRadius: '16px',
                            textAlign: 'center',
                            marginBottom: '20px',
                            border: scanFeedback ? `2px solid ${scanFeedback.type === 'error' ? 'var(--error)' : 'var(--primary)'}` : '2px dashed #cbd5e1',
                            transition: 'all 0.3s'
                        }}>
                            {scanFeedback ? (
                                <p style={{ fontSize: '1.2rem', fontWeight: '700', color: scanFeedback.type === 'error' ? 'var(--error)' : 'var(--primary)' }}>
                                    {scanFeedback.message}
                                </p>
                            ) : (
                                <p style={{ color: '#64748b' }}>PRÊT POUR SCAN... (Visez le code-barres)</p>
                            )}
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 10 }}>
                                    <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)' }}>
                                        <th style={{ padding: '12px' }}>Produit</th>
                                        <th style={{ padding: '12px' }}>Stock Actuel</th>
                                        <th style={{ padding: '12px', width: '120px' }}>Qté Reçue</th>
                                        <th style={{ padding: '12px' }}>Nouveau Stock</th>
                                        <th style={{ padding: '12px' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {receivedItems.map(item => (
                                        <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '12px' }}>
                                                <div style={{ fontWeight: '600' }}>{item.name}</div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.code}</div>
                                            </td>
                                            <td style={{ padding: '12px' }}>{item.stock}</td>
                                            <td style={{ padding: '12px' }}>
                                                <input
                                                    type="number"
                                                    value={item.receivedQty}
                                                    onChange={(e) => updateReceivedQty(item.id, e.target.value)}
                                                    style={{ width: '80px', padding: '8px', borderRadius: '8px', border: '1px solid var(--border)', fontWeight: '700', textAlign: 'center' }}
                                                />
                                            </td>
                                            <td style={{ padding: '12px', fontWeight: '700', color: 'var(--primary)' }}>{item.stock + item.receivedQty}</td>
                                            <td style={{ padding: '12px' }}>
                                                <button onClick={() => setReceivedItems(prev => prev.filter(i => i.id !== item.id))} style={{ border: 'none', background: 'none', color: 'var(--error)', cursor: 'pointer' }}><Trash2 size={18} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                    {receivedItems.length === 0 && (
                                        <tr>
                                            <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>Aucun produit scanné pour le moment.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button onClick={() => setShowReceiveModal(false)} style={{ flex: 1, padding: '16px', borderRadius: '12px', border: '1px solid var(--border)', background: 'white', cursor: 'pointer', fontWeight: '600' }}>ANNULER</button>
                            <button
                                onClick={validateReception}
                                disabled={receivedItems.length === 0}
                                style={{ flex: 2, padding: '16px', borderRadius: '12px', border: 'none', backgroundColor: receivedItems.length === 0 ? '#cbd5e1' : 'var(--primary)', color: 'white', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                            >
                                <CheckCircle2 size={20} /> VALIDER LA RÉCEPTION ET MAJ STOCK
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Commande Wholesaler */}
            {showOrderModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '24px', width: '600px', boxShadow: 'var(--shadow-lg)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Truck size={24} color="var(--primary)" /> Commande Grossiste</h2>
                            <button onClick={() => setShowOrderModal(false)} style={{ border: 'none', background: 'none' }}><X size={24} /></button>
                        </div>
                        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                                        <th style={{ padding: '8px' }}>Produit</th>
                                        <th style={{ padding: '8px' }}>Quantité</th>
                                        <th style={{ padding: '8px' }}>Coût</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productsToOrder.map(p => (
                                        <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '8px' }}>{p.name}</td>
                                            <td style={{ padding: '8px', fontWeight: '700' }}>{p.minStock * 2 - p.stock}</td>
                                            <td style={{ padding: '8px' }}>{((p.minStock * 2 - p.stock) * p.costPrice).toLocaleString()} F</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div style={{ margin: '20px 0', padding: '15px', backgroundColor: '#f0f9ff', borderRadius: '10px', display: 'flex', justifyContent: 'space-between' }}>
                            <strong>TOTAL ESTIMÉ :</strong>
                            <strong style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>{totalOrderValue.toLocaleString()} FCFA</strong>
                        </div>
                        <button onClick={() => { alert('Commande envoyée !'); setShowOrderModal(false); }} style={{ width: '100%', padding: '16px', borderRadius: '12px', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: '700', cursor: 'pointer' }}>VALIDER LA COMMANDE GROSSISTE</button>
                    </div>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ padding: '12px', backgroundColor: 'var(--primary-light)', borderRadius: '10px', color: 'var(--primary)' }}><Package size={24} /></div>
                    <div><p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>RÉFÉRENCES</p><p style={{ fontSize: '1.25rem', fontWeight: '700' }}>{MOCK_PRODUCTS.length}</p></div>
                </div>
                <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ padding: '12px', backgroundColor: '#fee2e2', borderRadius: '10px', color: 'var(--error)' }}><AlertTriangle size={24} /></div>
                    <div><p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>RUPTURES</p><p style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--error)' }}>{productsToOrder.length}</p></div>
                </div>
                <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ padding: '12px', backgroundColor: '#e0f2fe', borderRadius: '10px', color: '#0ea5e9' }}><Truck size={24} /></div>
                    <div><p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>LIVRAISONS</p><p style={{ fontSize: '1.25rem', fontWeight: '700' }}>3</p></div>
                </div>
                <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ padding: '12px', backgroundColor: '#fef3c7', borderRadius: '10px', color: '#f59e0b' }}><Calendar size={24} /></div>
                    <div><p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>PÉREMPTION &lt; 6M</p><p style={{ fontSize: '1.25rem', fontWeight: '700' }}>12</p></div>
                </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '300px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input type="text" placeholder="Rechercher produit..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '0.6rem 0.6rem 0.6rem 2.2rem', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none' }} />
                    </div>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Produit</th>
                            <th>Stock / Min</th>
                            <th>Prix</th>
                            <th>Péremption</th>
                            <th>Statut</th>
                            <th>Zone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(p => (
                            <tr key={p.id}>
                                <td><div style={{ fontWeight: '600' }}>{p.name}</div><div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>CIP: {p.code}</div></td>
                                <td><span style={{ fontWeight: '700', color: p.stock <= p.minStock ? 'var(--error)' : 'inherit' }}>{p.stock}</span> / {p.minStock}</td>
                                <td>{p.price.toLocaleString()} F</td>
                                <td><span style={{ padding: '4px 8px', borderRadius: '4px', backgroundColor: getExpiryColor(p.expiry), fontWeight: '600', fontSize: '0.75rem' }}>{new Date(p.expiry).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}</span></td>
                                <td><span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: '700', backgroundColor: p.status === 'Normal' ? '#e0f2fe' : '#fee2e2', color: p.status === 'Normal' ? '#0ea5e9' : 'var(--error)' }}>{p.status}</span></td>
                                <td><code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem' }}>{p.location}</code></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
