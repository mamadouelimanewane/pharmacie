import React, { useState } from 'react';
import { Package, Search, Filter, ArrowUpRight, AlertTriangle, RefreshCcw, Download, Calendar, Truck } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockData';

export default function Inventory() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showOrderModal, setShowOrderModal] = useState(false);

    const filteredProducts = MOCK_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code.includes(searchTerm)
    );

    const productsToOrder = MOCK_PRODUCTS.filter(p => p.stock <= p.minStock);
    const totalOrderValue = productsToOrder.reduce((acc, p) => acc + (p.minStock * 2 - p.stock) * p.costPrice, 0);

    const totalValue = MOCK_PRODUCTS.reduce((acc, p) => acc + (p.stock * p.price), 0);

    const getExpiryColor = (expiryStr) => {
        const expiry = new Date(expiryStr);
        const now = new Date();
        const diffMonths = (expiry.getFullYear() - now.getFullYear()) * 12 + (expiry.getMonth() - now.getMonth());

        if (diffMonths < 3) return '#fee2e2'; // Red
        if (diffMonths < 6) return '#fef3c7'; // Orange
        return '#f1f5f9'; // Grey
    };

    return (
        <div className="inventory fade-in">
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontStyle: 'italic', marginBottom: '0.5rem' }}>Gestion des Stocks & Approvisionnement</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Contrôlez vos références, dates de péremption et commandes grossistes.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="glass" style={{ padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Download size={18} /> Exporter
                    </button>
                    <button
                        onClick={() => setShowOrderModal(true)}
                        style={{ padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: 'none', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                        <Truck size={18} /> Commande Automatique ({productsToOrder.length})
                    </button>
                </div>
            </header>

            {/* Modal de Commande Wholesaler */}
            {showOrderModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '24px', width: '600px', boxShadow: 'var(--shadow-lg)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><Truck size={24} /> Commande Grossiste Suggérée</h2>
                            <button onClick={() => setShowOrderModal(false)} style={{ border: 'none', background: 'none' }}><X size={24} /></button>
                        </div>
                        <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                                        <th style={{ padding: '8px' }}>Produit</th>
                                        <th style={{ padding: '8px' }}>Stock Actuel</th>
                                        <th style={{ padding: '8px' }}>À commander</th>
                                        <th style={{ padding: '8px' }}>Coût Est.</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productsToOrder.map(p => (
                                        <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '8px' }}>{p.name}</td>
                                            <td style={{ padding: '8px' }}>{p.stock}</td>
                                            <td style={{ padding: '8px', fontWeight: '700', color: 'var(--primary)' }}>{p.minStock * 2 - p.stock}</td>
                                            <td style={{ padding: '8px' }}>{((p.minStock * 2 - p.stock) * p.costPrice).toLocaleString()} F</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <span style={{ fontWeight: '600' }}>TOTAL ESTIMÉ</span>
                            <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--primary)' }}>{totalOrderValue.toLocaleString()} FCFA</span>
                        </div>
                        <button
                            onClick={() => { alert('Commande envoyée au grossiste !'); setShowOrderModal(false); }}
                            style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer' }}
                        >
                            ENVOYER LA COMMANDE (EDI)
                        </button>
                    </div>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ padding: '12px', backgroundColor: 'var(--primary-light)', borderRadius: '10px', color: 'var(--primary)' }}>
                        <Package size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>RÉFÉRENCES</p>
                        <p style={{ fontSize: '1.25rem', fontWeight: '700' }}>{MOCK_PRODUCTS.length}</p>
                    </div>
                </div>
                <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ padding: '12px', backgroundColor: '#fee2e2', borderRadius: '10px', color: 'var(--error)' }}>
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>RUPTURES / CRITIQUE</p>
                        <p style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--error)' }}>{productsToOrder.length}</p>
                    </div>
                </div>
                <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ padding: '12px', backgroundColor: '#e0f2fe', borderRadius: '10px', color: '#0ea5e9' }}>
                        <Truck size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>COMMANDES EN COURS</p>
                        <p style={{ fontSize: '1.25rem', fontWeight: '700' }}>2</p>
                    </div>
                </div>
                <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ padding: '12px', backgroundColor: '#fef3c7', borderRadius: '10px', color: '#f59e0b' }}>
                        <Calendar size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>PÉREMPTION &lt; 6 MOIS</p>
                        <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#f59e0b' }}>{MOCK_PRODUCTS.filter(p => {
                            const diff = (new Date(p.expiry).getFullYear() - new Date().getFullYear()) * 12 + (new Date(p.expiry).getMonth() - new Date().getMonth());
                            return diff < 6;
                        }).length}</p>
                    </div>
                </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '300px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Rechercher (Nom, CIP, Catégorie)..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.6rem 0.6rem 0.6rem 2.2rem',
                                borderRadius: 'var(--radius-sm)',
                                border: '1px solid var(--border)',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Produit</th>
                            <th>Stock / Min</th>
                            <th>Prix (Vente)</th>
                            <th>Péremption</th>
                            <th>Statut</th>
                            <th>Emplacement</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <div style={{ fontWeight: '600' }}>{product.name}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>CIP: {product.code} - {product.labs}</div>
                                </td>
                                <td>
                                    <span style={{ fontWeight: '700', color: product.stock <= product.minStock ? 'var(--error)' : 'inherit' }}>{product.stock}</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}> / {product.minStock}</span>
                                </td>
                                <td>{product.price.toLocaleString()} F</td>
                                <td>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '6px',
                                        fontSize: '0.8rem',
                                        backgroundColor: getExpiryColor(product.expiry),
                                        fontWeight: '600'
                                    }}>
                                        {new Date(product.expiry).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}
                                    </span>
                                </td>
                                <td>
                                    <span style={{
                                        padding: '4px 8px',
                                        borderRadius: '12px',
                                        fontSize: '0.7rem',
                                        fontWeight: '700',
                                        backgroundColor: product.status === 'Normal' ? 'var(--primary-light)' : '#fee2e2',
                                        color: product.status === 'Normal' ? 'var(--primary)' : 'var(--error)'
                                    }}>
                                        {product.status}
                                    </span>
                                </td>
                                <td>
                                    <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem' }}>{product.location}</code>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Helper components that might be missing
const X = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
