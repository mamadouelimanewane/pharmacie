import React, { useState } from 'react';
import { Package, Search, Filter, ArrowUpRight, AlertTriangle, RefreshCcw, Download } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockData';

export default function Inventory() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = MOCK_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code.includes(searchTerm)
    );

    const totalValue = MOCK_PRODUCTS.reduce((acc, p) => acc + (p.stock * p.price), 0);

    return (
        <div className="inventory fade-in">
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Gestion des Stocks</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Contrôlez vos références et optimisez vos commandes grossistes.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="glass" style={{ padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Download size={18} /> Exporter
                    </button>
                    <button style={{ padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: 'none', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <RefreshCcw size={18} /> Passer Commande
                    </button>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ padding: '12px', backgroundColor: 'var(--primary-light)', borderRadius: '10px', color: 'var(--primary)' }}>
                        <Package size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>TOTAL RÉFÉRENCES</p>
                        <p style={{ fontSize: '1.25rem', fontWeight: '700' }}>{MOCK_PRODUCTS.length}</p>
                    </div>
                </div>
                <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ padding: '12px', backgroundColor: '#e0f2fe', borderRadius: '10px', color: '#0ea5e9' }}>
                        <RefreshCcw size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>VALEUR DU STOCK</p>
                        <p style={{ fontSize: '1.25rem', fontWeight: '700' }}>{totalValue.toLocaleString('fr-FR')} €</p>
                    </div>
                </div>
                <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ padding: '12px', backgroundColor: '#fee2e2', borderRadius: '10px', color: 'var(--error)' }}>
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>ALERTES STOCK</p>
                        <p style={{ fontSize: '1.25rem', fontWeight: '700' }}>{MOCK_PRODUCTS.filter(p => p.status !== 'Normal').length}</p>
                    </div>
                </div>
                <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ padding: '12px', backgroundColor: '#fef3c7', borderRadius: '10px', color: '#f59e0b' }}>
                        <Download size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>ROTATIONS</p>
                        <p style={{ fontSize: '1.25rem', fontWeight: '700' }}>12.4 / an</p>
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
                    <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <Filter size={18} /> Filtrer
                    </button>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Produit</th>
                            <th>Catégorie / Labo</th>
                            <th>Stock</th>
                            <th>Min.</th>
                            <th>Prix</th>
                            <th>Statut</th>
                            <th>Emplacement</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td>
                                    <div style={{ fontWeight: '600' }}>{product.name}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>CIP: {product.code}</div>
                                </td>
                                <td>
                                    <div style={{ fontSize: '0.875rem' }}>{product.category}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{product.labs}</div>
                                </td>
                                <td>{product.stock} units</td>
                                <td>{product.minStock}</td>
                                <td>{product.price.toFixed(2)} €</td>
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
