import React, { useState, useEffect } from 'react';
import {
    Search, Plus, Minus, Trash2, CreditCard, Banknote,
    ShieldCheck, Printer, Scan, ShoppingCart, X,
    Delete, ArrowLeft, History, User, Settings,
    Power, ChevronRight, Hash, Star
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockData';

const CATEGORIES = ['💊 Tous', '🩺 Antalgique', '🔬 Antibiotique', '🧴 ORL', '🍵 Complément', '🧼 Hygiène'];

const Numpad = ({ onInput, onDelete, onClear }) => {
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', 'DEL'];
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            backgroundColor: '#f1f5f9',
            padding: '12px',
            borderRadius: 'var(--radius-md)'
        }}>
            {keys.map(key => (
                <button
                    key={key}
                    onClick={() => {
                        if (key === 'C') onClear();
                        else if (key === 'DEL') onDelete();
                        else onInput(key);
                    }}
                    style={{
                        padding: '16px',
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        borderRadius: '8px',
                        border: '1px solid var(--border)',
                        backgroundColor: (key === 'C' || key === 'DEL') ? '#fee2e2' : 'white',
                        color: (key === 'C' || key === 'DEL') ? 'var(--error)' : 'var(--secondary)',
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-sm)',
                        transition: 'transform 0.1s'
                    }}
                    onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
                    onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                >
                    {key}
                </button>
            ))}
        </div>
    );
};

export default function POS() {
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('💊 Tous');
    const [showNumpad, setShowNumpad] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [cashAmount, setCashAmount] = useState('');
    const [showCheckout, setShowCheckout] = useState(false);

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const filteredProducts = MOCK_PRODUCTS.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.code.includes(search);
        const matchesCat = activeCategory === '💊 Tous' || p.category === activeCategory.substring(3);
        return matchesSearch && matchesCat;
    });

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));

    const updateQuantity = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const handleNumpadInput = (val) => {
        if (showCheckout) {
            setCashAmount(prev => prev + val);
        } else if (selectedItem) {
            setCart(prev => prev.map(item =>
                item.id === selectedItem ? { ...item, quantity: parseInt((item.quantity + val).toString().slice(-4)) || 1 } : item
            ));
        }
    };

    const changeDue = parseInt(cashAmount) - total;

    return (
        <div className="pos-tactile" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 450px',
            gap: '12px',
            height: 'calc(100vh - 100px)',
            backgroundColor: '#f1f5f9',
            padding: '12px',
            borderRadius: 'var(--radius-lg)'
        }}>
            {/* Colonne de Gauche : Catalogue Produit */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'hidden' }}>
                {/* Barre Supérieure Tactile */}
                <div style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '12px',
                    backgroundColor: 'white',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-sm)'
                }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search size={24} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Rechercher ou scanner un produit..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '16px 16px 16px 52px',
                                borderRadius: '12px',
                                border: '2px solid #e2e8f0',
                                outline: 'none',
                                fontSize: '1.1rem',
                                backgroundColor: '#f8fafc'
                            }}
                        />
                    </div>
                    <button style={{
                        padding: '0 24px',
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        borderRadius: '12px',
                        border: 'none',
                        fontWeight: '700',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer'
                    }}>
                        <Scan size={24} /> SCANNER
                    </button>
                </div>

                {/* Catégories (Scroll horizontal Tactile) */}
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    overflowX: 'auto',
                    padding: '4px 0',
                    scrollbarWidth: 'none'
                }}>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '12px 24px',
                                borderRadius: '100px',
                                border: 'none',
                                backgroundColor: activeCategory === cat ? 'var(--secondary)' : 'white',
                                color: activeCategory === cat ? 'white' : 'var(--text-main)',
                                fontWeight: '600',
                                whiteSpace: 'nowrap',
                                cursor: 'pointer',
                                boxShadow: 'var(--shadow-sm)',
                                transition: 'all 0.2s'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grille de Produits Tactile */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                    gap: '12px',
                    overflowY: 'auto',
                    padding: '4px'
                }}>
                    {filteredProducts.map(p => (
                        <button
                            key={p.id}
                            onClick={() => addToCart(p)}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '20px 12px',
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                border: '1px solid #e2e8f0',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                position: 'relative',
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                            }}
                            onMouseDown={(e) => e.target.style.transform = 'translateY(2px)'}
                            onMouseUp={(e) => e.target.style.transform = 'translateY(0)'}
                        >
                            <div style={{
                                width: '48px',
                                height: '48px',
                                backgroundColor: '#f1f5f9',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: '12px',
                                color: 'var(--primary)'
                            }}>
                                <Plus size={24} />
                            </div>
                            <span style={{ fontWeight: '700', fontSize: '0.9rem', textAlign: 'center', marginBottom: '8px', color: 'var(--secondary)' }}>{p.name}</span>
                            <span style={{ fontWeight: '800', color: 'var(--primary)', fontSize: '1rem' }}>{p.price.toLocaleString()} F</span>
                            {p.stock <= p.minStock && (
                                <div style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px',
                                    width: '8px',
                                    height: '8px',
                                    backgroundColor: 'var(--error)',
                                    borderRadius: '50%'
                                }} />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Colonne de Droite : Panier et Caisse */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)'
            }}>
                <div style={{ padding: '20px', backgroundColor: 'var(--secondary)', color: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Caisse N°1</h2>
                            <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>Cassier : Dr. Wane</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>Aujourd'hui</p>
                            <p style={{ fontWeight: '600' }}>08 Fév. 2026</p>
                        </div>
                    </div>
                </div>

                {/* Liste des articles du panier */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
                    {cart.length === 0 ? (
                        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', opacity: 0.5 }}>
                            <ShoppingCart size={64} strokeWidth={1} style={{ marginBottom: '16px' }} />
                            <p style={{ fontWeight: '600' }}>Aucun article encaissé</p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {cart.map(item => (
                                <div
                                    key={item.id}
                                    onClick={() => setSelectedItem(item.id)}
                                    style={{
                                        display: 'flex',
                                        padding: '16px',
                                        borderRadius: '12px',
                                        backgroundColor: selectedItem === item.id ? '#f0fdf4' : '#f8fafc',
                                        border: selectedItem === item.id ? '2px solid var(--primary)' : '2px solid transparent',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontWeight: '700', color: 'var(--secondary)', marginBottom: '4px' }}>{item.name}</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                            {item.price.toLocaleString()} F × {item.quantity}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
                                        <p style={{ fontWeight: '800', color: 'var(--secondary)' }}>{(item.price * item.quantity).toLocaleString()} F</p>
                                        {selectedItem === item.id && (
                                            <div style={{ display: 'flex', gap: '4px' }}>
                                                <button onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, -1); }} style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: 'white' }}><Minus size={14} /></button>
                                                <button onClick={(e) => { e.stopPropagation(); updateQuantity(item.id, 1); }} style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: 'white' }}><Plus size={14} /></button>
                                                <button onClick={(e) => { e.stopPropagation(); removeFromCart(item.id); }} style={{ width: '28px', height: '28px', borderRadius: '6px', border: 'none', backgroundColor: '#fee2e2', color: 'var(--error)' }}><Trash2 size={14} /></button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Section Totaux et Paiement Tactile */}
                <div style={{ padding: '20px', borderTop: '2px dashed #f1f5f9', backgroundColor: '#f8fafc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '1rem' }}>
                        <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Articles ({totalItems})</span>
                        <span style={{ fontWeight: '600' }}>{total.toLocaleString()} FCFA</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--secondary)' }}>TOTAL</span>
                        <span style={{ fontSize: '1.75rem', fontWeight: '900', color: 'var(--primary)' }}>{total.toLocaleString()} FCFA</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                        <button
                            onClick={() => { setShowCheckout(true); setShowNumpad(true); }}
                            style={{
                                gridColumn: 'span 4',
                                padding: '20px',
                                borderRadius: '16px',
                                border: 'none',
                                backgroundColor: 'var(--primary)',
                                color: 'white',
                                fontWeight: '800',
                                fontSize: '1.25rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px',
                                boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3)'
                            }}
                        >
                            <ShieldCheck size={28} /> ENCAISSER
                        </button>
                        <button
                            onClick={() => setShowNumpad(!showNumpad)}
                            style={{ padding: '15px', borderRadius: '12px', border: '1px solid #cbd5e1', backgroundColor: 'white', cursor: 'pointer' }}
                        >
                            <Hash size={24} color="var(--secondary)" />
                        </button>
                        <button style={{ padding: '15px', borderRadius: '12px', border: '1px solid #cbd5e1', backgroundColor: 'white', cursor: 'pointer' }}>
                            <Printer size={24} color="var(--secondary)" />
                        </button>
                        <button style={{ padding: '15px', borderRadius: '12px', border: '1px solid #cbd5e1', backgroundColor: 'white', cursor: 'pointer' }}>
                            <History size={24} color="var(--secondary)" />
                        </button>
                        <button
                            onClick={() => setCart([])}
                            style={{ padding: '15px', borderRadius: '12px', border: 'none', backgroundColor: '#fee2e2', cursor: 'pointer' }}
                        >
                            <Trash2 size={24} color="var(--error)" />
                        </button>
                    </div>
                </div>

                {/* Overlay Tactile : Pave Numérique / Encaissement */}
                {(showNumpad || showCheckout) && (
                    <div style={{
                        position: 'absolute',
                        bottom: '24px',
                        right: '480px',
                        width: '320px',
                        backgroundColor: 'white',
                        borderRadius: '24px',
                        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
                        padding: '20px',
                        border: '1px solid var(--border)',
                        zIndex: 100
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ fontWeight: '700' }}>{showCheckout ? 'Encaissement Espèces' : 'Pave Numérique'}</h3>
                            <button onClick={() => { setShowNumpad(false); setShowCheckout(false); setCashAmount(''); }} style={{ border: 'none', background: 'none' }}><X size={24} /></button>
                        </div>

                        {showCheckout && (
                            <div style={{ marginBottom: '16px' }}>
                                <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '12px', textAlign: 'right', marginBottom: '8px' }}>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Montant Reçu</p>
                                    <p style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>{cashAmount || '0'} F</p>
                                </div>
                                {parseInt(cashAmount) >= total && (
                                    <div style={{ backgroundColor: '#f0fdf4', padding: '16px', borderRadius: '12px', textAlign: 'right' }}>
                                        <p style={{ fontSize: '0.75rem', color: '#15803d' }}>Rendu Monnaie</p>
                                        <p style={{ fontSize: '1.5rem', fontWeight: '800', color: '#15803d' }}>{changeDue.toLocaleString()} F</p>
                                    </div>
                                )}
                            </div>
                        )}

                        <Numpad
                            onInput={handleNumpadInput}
                            onDelete={() => showCheckout ? setCashAmount(prev => prev.slice(0, -1)) : null}
                            onClear={() => showCheckout ? setCashAmount('') : null}
                        />

                        {showCheckout && parseInt(cashAmount) >= total && (
                            <button
                                onClick={() => {
                                    setCart([]);
                                    setShowCheckout(false);
                                    setShowNumpad(false);
                                    setCashAmount('');
                                    alert('Vente validée ! Impression du ticket...');
                                }}
                                style={{
                                    width: '100%',
                                    marginTop: '16px',
                                    padding: '16px',
                                    backgroundColor: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontWeight: '700',
                                    fontSize: '1.1rem'
                                }}
                            >
                                FINALISER LA VENTE
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
