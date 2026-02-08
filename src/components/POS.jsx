import React, { useState } from 'react';
import { Search, Plus, Minus, Trash2, CreditCard, Banknote, ShieldCheck, Printer, Scan, ShoppingCart } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockData';

export default function POS() {
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const filteredProducts = MOCK_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.code.includes(search)
    ).slice(0, 8);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    return (
        <div className="pos" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: '1.5rem', height: 'calc(100vh - 120px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1.5rem' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Rechercher un produit (Nom, CIP, Code-barres)..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border)',
                                outline: 'none',
                                fontSize: '1rem'
                            }}
                        />
                    </div>
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.75rem 1.5rem',
                        backgroundColor: 'var(--secondary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer'
                    }}>
                        <Scan size={20} /> Scanner
                    </button>
                </div>

                <div className="card" style={{ flex: 1, overflowY: 'auto' }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>{search ? 'Résultats de recherche' : 'Produits fréquents'}</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                        {filteredProducts.map(product => (
                            <button
                                key={product.id}
                                onClick={() => addToCart(product)}
                                style={{
                                    padding: '1rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--border)',
                                    backgroundColor: 'white',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    boxShadow: 'var(--shadow-sm)'
                                }}
                            >
                                <p style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{product.name}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{product.price.toFixed(2)} €</span>
                                    <span style={{ fontSize: '0.75rem', color: product.status === 'Critique' ? 'var(--error)' : 'var(--text-muted)' }}>Stock: {product.stock}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem 0' }}>
                <div style={{ padding: '0 1.5rem 1rem', borderBottom: '1px solid var(--border)' }}>
                    <h3 style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        Panier <span style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem' }}>{totalItems} articles</span>
                    </h3>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
                    {cart.length === 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)' }}>
                            <ShoppingCart size={48} opacity={0.2} style={{ marginBottom: '1rem' }} />
                            <p>Le panier est vide</p>
                        </div>
                    ) : (
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {cart.map(item => (
                                <li key={item.id} style={{ display: 'flex', gap: '0.75rem', paddingBottom: '1rem', borderBottom: '1px solid #f1f5f9' }}>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontWeight: '500', fontSize: '0.875rem' }}>{item.name}</p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '2px', borderRadius: '4px', border: '1px solid var(--border)', background: 'none', cursor: 'pointer' }}><Minus size={14} /></button>
                                                <span style={{ fontSize: '0.875rem', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '2px', borderRadius: '4px', border: '1px solid var(--border)', background: 'none', cursor: 'pointer' }}><Plus size={14} /></button>
                                            </div>
                                            <span style={{ fontWeight: '600' }}>{(item.price * item.quantity).toFixed(2)} €</span>
                                        </div>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id)} style={{ color: 'var(--error)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                                        <Trash2 size={16} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div style={{ padding: '1.5rem', borderTop: '2px dashed var(--border)', backgroundColor: '#f8fafc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Sous-total</span>
                        <span>{(total * 0.9).toFixed(2)} €</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.875rem' }}>
                        <span style={{ color: 'var(--text-muted)' }}>TVA (10% & 2.1%)</span>
                        <span>{(total * 0.1).toFixed(2)} €</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <span style={{ fontWeight: '700', fontSize: '1.25rem' }}>Total à payer</span>
                        <span style={{ fontWeight: '700', fontSize: '1.25rem', color: 'var(--primary)' }}>{total.toFixed(2)} €</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                        <button style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <CreditCard size={18} /> Carte
                        </button>
                        <button style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <Banknote size={18} /> Espèces
                        </button>
                    </div>

                    <button style={{
                        width: '100%',
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        fontWeight: '600',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        boxShadow: '0 4px 12px rgba(16, 185, 129, 0.2)'
                    }}>
                        <ShieldCheck size={20} /> Valider la Vente
                    </button>
                    <button style={{ width: '100%', marginTop: '0.75rem', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '0.875rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <Printer size={16} /> Imprimer Ticket
                    </button>
                </div>
            </div>
        </div>
    );
}
