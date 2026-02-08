import React, { useState, useEffect, useRef } from 'react';
import {
    Package, Search, Filter, ArrowUpRight, AlertTriangle,
    RefreshCcw, Download, Calendar, Truck, Barcode,
    X, CheckCircle2, Plus, Trash2, FileText,
    AlertCircle, CheckCircle, ArrowRight
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockData';

export default function Inventory() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [showReceiveModal, setShowReceiveModal] = useState(false);

    // Delivery Reception & Invoice Reconciliation State
    const [receivedItems, setReceivedItems] = useState([]);
    const [scanFeedback, setScanFeedback] = useState(null);
    const [invoiceMode, setInvoiceMode] = useState(false);
    const [invoiceData, setInvoiceData] = useState(null);

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
    }, [showReceiveModal, receivedItems, invoiceMode]);

    const handleProductScanned = (product) => {
        setReceivedItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, receivedQty: item.receivedQty + 1 } : item);
            }
            return [...prev, { ...product, receivedQty: 1 }];
        });
        setScanFeedback({ type: 'success', message: `${product.name} scanné` });
        setTimeout(() => setScanFeedback(null), 1000);
    };

    // Simulate loading an invoice from wholesaler
    const loadWholesalerInvoice = () => {
        setInvoiceMode(true);
        // Dummy invoice data
        setInvoiceData([
            { id: 1, name: 'Doliprane 1000mg', expectedQty: 10, code: '3400930001' },
            { id: 2, name: 'Amoxicilline 1g', expectedQty: 25, code: '3400930002' },
            { id: 7, name: 'Ventoline Inhalateur', expectedQty: 5, code: '3400930007' }
        ]);
    };

    const getReconciliationStatus = (item) => {
        if (!invoiceMode) return null;
        const invoiceItem = invoiceData?.find(i => i.id === item.id);
        if (!invoiceItem) return { type: 'extra', label: 'Hors Facture' };
        if (item.receivedQty === invoiceItem.expectedQty) return { type: 'ok', label: 'Conforme' };
        if (item.receivedQty < invoiceItem.expectedQty) return { type: 'missing', label: `Manque ${invoiceItem.expectedQty - item.receivedQty}` };
        return { type: 'over', label: `Trop de ${item.receivedQty - invoiceItem.expectedQty}` };
    };

    const validateReception = () => {
        alert(`Stock mis à jour ! ${receivedItems.length} références réceptionnées.`);
        setReceivedItems([]);
        setShowReceiveModal(false);
        setInvoiceMode(false);
    };

    return (
        <div className="inventory fade-in">
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--secondary)' }}>Gestion Logistique</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Réceptionnez vos colis, contrôlez les factures et optimisez vos stocks.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                        onClick={() => setShowReceiveModal(true)}
                        style={{ padding: '0.85rem 1.5rem', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)' }}
                    >
                        <Barcode size={20} /> Réception Livraison
                    </button>
                    <button
                        onClick={() => setShowOrderModal(true)}
                        className="glass"
                        style={{ padding: '0.85rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)', color: 'var(--secondary)', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <Truck size={20} /> Commande Express
                    </button>
                </div>
            </header>

            {/* Modal de Réception Ultra-Moderne avec Pointage Facture */}
            {showReceiveModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.9)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                    <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '32px', width: '900px', maxHeight: '92vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', overflow: 'hidden' }}>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Package size={28} color="var(--primary)" />
                                    Réception de Colis Grossiste
                                </h2>
                                <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                                    <span style={{ fontSize: '0.85rem', color: invoiceMode ? 'var(--primary)' : 'var(--text-muted)', fontWeight: invoiceMode ? '700' : '400', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        {invoiceMode ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                                        Pointage Facture {invoiceMode ? 'Actif' : 'Désactivé'}
                                    </span>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Scan automatique activé</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                {!invoiceMode && (
                                    <button
                                        onClick={loadWholesalerInvoice}
                                        style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--primary)', background: '#f0fdf4', color: 'var(--primary)', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem' }}
                                    >
                                        Charger Facture Laborex/COPHASE
                                    </button>
                                )}
                                <button onClick={() => { setShowReceiveModal(false); setInvoiceMode(false); }} style={{ padding: '8px', borderRadius: '50%', border: 'none', background: '#f1f5f9', cursor: 'pointer' }}><X size={24} /></button>
                            </div>
                        </div>

                        {/* Feedback Zone */}
                        <div style={{
                            padding: '24px',
                            backgroundColor: scanFeedback?.type === 'error' ? '#fef2f2' : '#f0f9ff',
                            borderRadius: '20px',
                            textAlign: 'center',
                            marginBottom: '24px',
                            border: `2px dashed ${scanFeedback ? (scanFeedback.type === 'error' ? '#ef4444' : '#0ea5e9') : '#cbd5e1'}`,
                            transition: 'all 0.2s'
                        }}>
                            <span style={{ fontSize: '1.25rem', fontWeight: '800', color: scanFeedback?.type === 'error' ? '#ef4444' : '#0369a1' }}>
                                {scanFeedback ? scanFeedback.message : 'DÉPOSEZ LE CURSEUR ICI ET SCANNEZ...'}
                            </span>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '24px', border: '1px solid #f1f5f9', borderRadius: '16px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead style={{ backgroundColor: '#f8fafc', position: 'sticky', top: 0, zIndex: 10 }}>
                                    <tr style={{ textAlign: 'left', borderBottom: '2px solid #e2e8f0' }}>
                                        <th style={{ padding: '16px' }}>Article</th>
                                        <th style={{ padding: '16px', width: '100px' }}>Reçu</th>
                                        {invoiceMode && <th style={{ padding: '16px', width: '100px' }}>Facturé</th>}
                                        <th style={{ padding: '16px' }}>Pointage</th>
                                        <th style={{ padding: '16px' }}>Nouveau Stock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {receivedItems.map(item => {
                                        const status = getReconciliationStatus(item);
                                        return (
                                            <tr key={item.id} style={{ borderBottom: '1px solid #f8fafc', animation: 'fadeIn 0.3s' }}>
                                                <td style={{ padding: '16px' }}>
                                                    <div style={{ fontWeight: '700', fontSize: '0.95rem' }}>{item.name}</div>
                                                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>CIP: {item.code}</div>
                                                </td>
                                                <td style={{ padding: '16px' }}>
                                                    <input
                                                        type="number"
                                                        value={item.receivedQty}
                                                        onChange={(e) => setReceivedItems(prev => prev.map(i => i.id === item.id ? { ...i, receivedQty: parseInt(e.target.value) || 0 } : i))}
                                                        style={{ width: '70px', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '8px', textAlign: 'center', fontWeight: '700' }}
                                                    />
                                                </td>
                                                {invoiceMode && (
                                                    <td style={{ padding: '16px', fontWeight: '600' }}>
                                                        {invoiceData.find(i => i.id === item.id)?.expectedQty || 0}
                                                    </td>
                                                )}
                                                <td style={{ padding: '16px' }}>
                                                    {status && (
                                                        <span style={{
                                                            padding: '4px 10px',
                                                            borderRadius: '6px',
                                                            fontSize: '0.75rem',
                                                            fontWeight: '700',
                                                            backgroundColor: status.type === 'ok' ? '#dcfce7' : status.type === 'missing' ? '#fee2e2' : '#fef3c7',
                                                            color: status.type === 'ok' ? '#166534' : status.type === 'missing' ? '#991b1b' : '#92400e'
                                                        }}>
                                                            {status.label}
                                                        </span>
                                                    )}
                                                </td>
                                                <td style={{ padding: '16px', fontWeight: '800', color: 'var(--primary)' }}>
                                                    {item.stock} <ArrowRight size={14} style={{ margin: '0 4px' }} /> {item.stock + item.receivedQty}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            {receivedItems.length === 0 && (
                                <div style={{ padding: '60px', textAlign: 'center', color: '#94a3b8' }}>
                                    <Barcode size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
                                    <p>Prêt pour le pointage. Veuillez scanner le premier produit.</p>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '16px' }}>
                            <button onClick={() => setShowReceiveModal(false)} style={{ flex: 1, padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0', background: 'white', fontWeight: '700', cursor: 'pointer' }}>ANNULER</button>
                            <button
                                onClick={validateReception}
                                disabled={receivedItems.length === 0}
                                style={{ flex: 2, padding: '18px', borderRadius: '16px', border: 'none', backgroundColor: receivedItems.length === 0 ? '#cbd5e1' : 'var(--primary)', color: 'white', fontWeight: '800', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3)' }}
                            >
                                <CheckCircle2 size={24} /> VALIDER ET INTÉGRER AU STOCK
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Inventaire Display (Simplified list for context) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                {[
                    { label: 'RÉFÉRENCES', val: MOCK_PRODUCTS.length, icon: Package, color: 'var(--primary)' },
                    { label: 'ALERTES RUPTURE', val: productsToOrder.length, icon: AlertTriangle, color: 'var(--error)' },
                    { label: 'VALEUR STOCK', val: '4.8M F', icon: RefreshCcw, color: '#0ea5e9' },
                    { label: 'LIVRAISONS JOUR', val: '2', icon: Truck, color: '#f59e0b' }
                ].map((stat, i) => (
                    <div key={i} className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '24px', borderRadius: '24px' }}>
                        <div style={{ padding: '16px', backgroundColor: `${stat.color}15`, borderRadius: '16px', color: stat.color }}>
                            <stat.icon size={28} />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', letterSpacing: '0.05em' }}>{stat.label}</p>
                            <p style={{ fontSize: '1.5rem', fontWeight: '900' }}>{stat.val}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card" style={{ padding: 0, borderRadius: '24px', overflow: 'hidden' }}>
                <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '350px' }}>
                        <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input type="text" placeholder="Rechercher une référence..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '14px 14px 14px 48px', borderRadius: '14px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '1rem' }} />
                    </div>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th style={{ padding: '20px' }}>Produit / Labo</th>
                            <th>Stock / Min</th>
                            <th>Prix Vente</th>
                            <th>Péremption</th>
                            <th>Emplacement</th>
                            <th>Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(p => (
                            <tr key={p.id}>
                                <td style={{ padding: '18px 20px' }}><div style={{ fontWeight: '700' }}>{p.name}</div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.labs} - {p.code}</div></td>
                                <td><span style={{ fontWeight: '800', color: p.stock <= p.minStock ? 'var(--error)' : 'inherit' }}>{p.stock}</span> <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>/ {p.minStock}</span></td>
                                <td style={{ fontWeight: '700' }}>{p.price.toLocaleString()} F</td>
                                <td><span style={{ padding: '6px 10px', borderRadius: '8px', backgroundColor: getExpiryColor(p.expiry), fontWeight: '700', fontSize: '0.8rem' }}>{new Date(p.expiry).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}</span></td>
                                <td><code style={{ background: '#f8fafc', padding: '4px 8px', borderRadius: '6px', fontSize: '0.8rem', border: '1px solid #f1f5f9' }}>{p.location}</code></td>
                                <td><span style={{ padding: '6px 12px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '800', backgroundColor: p.status === 'Normal' ? '#f0fdf4' : '#fef2f2', color: p.status === 'Normal' ? '#15803d' : '#b91c1c' }}>{p.status.toUpperCase()}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
