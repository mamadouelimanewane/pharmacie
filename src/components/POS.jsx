import React, { useState, useEffect } from 'react';
import {
    Search, Plus, Minus, Trash2, CreditCard, Banknote,
    ShieldCheck, Printer, Scan, ShoppingCart, X,
    Delete, ArrowLeft, History, User, Settings,
    Power, ChevronRight, Hash, Star, Smartphone,
    QrCode, Loader2, CheckCircle2
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockData';

const CATEGORIES = ['Tous', 'Antalgique', 'Antibiotique', 'ORL', 'Complement', 'Hygiene'];

// Mobile Money Icons
const WaveIcon = () => (
    <div style={{ width: 24, height: 24, backgroundColor: '#1dcad3', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '10px' }}>W</div>
);

const OMIcon = () => (
    <div style={{ width: 24, height: 24, backgroundColor: '#FF6600', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontWeight: 'bold', fontSize: '10px' }}>OM</div>
);

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
    const [activeCategory, setActiveCategory] = useState('Tous');
    const [showNumpad, setShowNumpad] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [cashAmount, setCashAmount] = useState('');
    const [showCheckout, setShowCheckout] = useState(false);
    const [mobilePayment, setMobilePayment] = useState(null);
    const [mobileStatus, setMobileStatus] = useState('idle');
    const [phoneNumber, setPhoneNumber] = useState('');

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const filteredProducts = MOCK_PRODUCTS.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.code.includes(search);
        const matchesCat = activeCategory === 'Tous' || p.category === activeCategory;
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
        } else if (mobilePayment === 'om' && mobileStatus === 'idle') {
            setPhoneNumber(prev => (prev.length < 9 ? prev + val : prev));
        } else if (selectedItem) {
            setCart(prev => prev.map(item =>
                item.id === selectedItem ? { ...item, quantity: parseInt((item.quantity + val).toString().slice(-4)) || 1 } : item
            ));
        }
    };

    const startMobilePayment = (type) => {
        setMobilePayment(type);
        setMobileStatus('idle');
        setPhoneNumber('');
        if (type === 'wave') {
            setMobileStatus('pending');
        }
    };

    useEffect(() => {
        if (mobileStatus === 'pending') {
            const timer = setTimeout(() => {
                setMobileStatus('success');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [mobileStatus]);

    const finalizePayment = () => {
        setCart([]);
        setShowCheckout(false);
        setMobilePayment(null);
        setMobileStatus('idle');
        setCashAmount('');
        setShowNumpad(false);
        alert('Vente validée ! Impression du ticket...');
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'hidden' }}>
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
                            placeholder="Rechercher ou scanner..."
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
                </div>

                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '4px 0' }}>
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
                                cursor: 'pointer'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                    gap: '12px',
                    overflowY: 'auto'
                }}>
                    {filteredProducts.map(p => (
                        <button
                            key={p.id}
                            onClick={() => addToCart(p)}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '20px 12px',
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                border: '1px solid #e2e8f0',
                                cursor: 'pointer'
                            }}
                        >
                            <span style={{ fontWeight: '700', fontSize: '0.9rem', textAlign: 'center', marginBottom: '8px' }}>{p.name}</span>
                            <span style={{ fontWeight: '800', color: 'var(--primary)' }}>{p.price.toLocaleString()} F</span>
                        </button>
                    ))}
                </div>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden'
            }}>
                <div style={{ padding: '20px', backgroundColor: 'var(--secondary)', color: 'white' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Caisse N1</h2>
                    <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>Cassier : Dr. Wane</p>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
                    {cart.map(item => (
                        <div key={item.id} onClick={() => setSelectedItem(item.id)} style={{ display: 'flex', padding: '12px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer', backgroundColor: selectedItem === item.id ? '#f8fafc' : 'transparent' }}>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontWeight: '600' }}>{item.name}</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.price.toLocaleString()} F x {item.quantity}</p>
                            </div>
                            <p style={{ fontWeight: '700' }}>{(item.price * item.quantity).toLocaleString()} F</p>
                        </div>
                    ))}
                </div>

                <div style={{ padding: '20px', backgroundColor: '#f8fafc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ fontWeight: '700' }}>TOTAL</span>
                        <span style={{ fontWeight: '800', fontSize: '1.5rem', color: 'var(--primary)' }}>{total.toLocaleString()} F</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                        <button onClick={() => startMobilePayment('wave')} style={{ padding: '12px', borderRadius: '8px', border: '2px solid #1dcad3', background: 'white', cursor: 'pointer', color: '#1dcad3', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}><WaveIcon /> WAVE</button>
                        <button onClick={() => startMobilePayment('om')} style={{ padding: '12px', borderRadius: '8px', border: '2px solid #FF6600', background: 'white', cursor: 'pointer', color: '#FF6600', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}><OMIcon /> ORANGE</button>
                    </div>

                    <button onClick={() => { setShowCheckout(true); setShowNumpad(true); }} style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '800', cursor: 'pointer' }}>ESPÈCES</button>
                </div>

                {(showNumpad || showCheckout || mobilePayment) && (
                    <div style={{ position: 'absolute', bottom: '24px', right: '480px', width: '320px', backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', padding: '24px', zIndex: 100 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <h3 style={{ fontWeight: '700' }}>Paiement</h3>
                            <button onClick={() => { setShowNumpad(false); setShowCheckout(false); setMobilePayment(null); setMobileStatus('idle'); }} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X /></button>
                        </div>

                        {showCheckout && (
                            <div style={{ marginBottom: '16px' }}>
                                <p style={{ textAlign: 'right', fontSize: '1.5rem', fontWeight: '800' }}>{cashAmount || '0'} F</p>
                                {parseInt(cashAmount) >= total && <p style={{ textAlign: 'right', color: 'green' }}>Rendu : {(parseInt(cashAmount) - total).toLocaleString()} F</p>}
                            </div>
                        )}

                        {mobilePayment === 'wave' && (
                            <div style={{ textAlign: 'center', padding: '20px' }}>
                                {mobileStatus === 'pending' ? <><QrCode size={100} /><p>Attente scan...</p></> : <p style={{ color: 'green' }}>Succès Wave !</p>}
                            </div>
                        )}

                        {mobilePayment === 'om' && (
                            <div style={{ textAlign: 'center' }}>
                                {mobileStatus === 'idle' ? (
                                    <>
                                        <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{phoneNumber || 'Numéro OM'}</p>
                                        <button disabled={phoneNumber.length < 9} onClick={() => setMobileStatus('pending')} style={{ width: '100%', padding: '12px', background: '#FF6600', color: 'white', border: 'none', borderRadius: '8px', marginTop: '8px' }}>VALIDER</button>
                                    </>
                                ) : mobileStatus === 'pending' ? <p>Attente validation USSD...</p> : <p style={{ color: 'green' }}>Succès OM !</p>}
                            </div>
                        )}

                        {(showCheckout || (mobilePayment === 'om' && mobileStatus === 'idle')) && (
                            <Numpad onInput={handleNumpadInput} onDelete={() => showCheckout ? setCashAmount(prev => prev.slice(0, -1)) : setPhoneNumber(prev => prev.slice(0, -1))} onClear={() => showCheckout ? setCashAmount('') : setPhoneNumber('')} />
                        )}

                        {((showCheckout && parseInt(cashAmount) >= total) || mobileStatus === 'success') && (
                            <button onClick={finalizePayment} style={{ width: '100%', padding: '16px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', marginTop: '12px' }}>VALIDER LA VENTE</button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
