import React, { useState, useEffect, useRef } from 'react';
import {
    Search, Plus, Minus, Trash2, CreditCard, Banknote,
    ShieldCheck, Printer, Scan, ShoppingCart, X,
    Delete, ArrowLeft, History, User, Settings,
    Power, ChevronRight, Hash, Star, Smartphone,
    QrCode, Loader2, CheckCircle2, Barcode, Unlock,
    Mail, FileText, Download, Clock, RotateCcw, UserPlus
} from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_PATIENTS } from '../data/mockData';

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
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [autoDrawer, setAutoDrawer] = useState(true);
    const [printOption, setPrintOption] = useState(true);
    const [showReceipt, setShowReceipt] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [showPatientSelect, setShowPatientSelect] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [lastSale, setLastSale] = useState(null);
    const [salesHistory, setSalesHistory] = useState([]);

    // Barcode Scanner logic
    const barcodeBuffer = useRef('');
    const lastKeyTime = useRef(0);
    const [lastScanned, setLastScanned] = useState(null);

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const filteredProducts = MOCK_PRODUCTS.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.code.includes(search);
        const matchesCat = activeCategory === 'Tous' || p.category === activeCategory;
        return matchesSearch && matchesCat;
    });

    const triggerDrawer = () => {
        setDrawerOpen(true);
        setTimeout(() => setDrawerOpen(false), 3000);
    };

    const addToCart = (product) => {
        if (product.stock <= 0) {
            alert('Produit en rupture de stock !');
            return;
        }
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setLastScanned(product.name);
        setTimeout(() => setLastScanned(null), 2000);
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

    // Global Key Listener for Barcode Scanner
    useEffect(() => {
        const handleKeyDown = (e) => {
            const now = Date.now();
            if (now - lastKeyTime.current > 100) barcodeBuffer.current = '';
            lastKeyTime.current = now;

            if (e.key === 'Enter') {
                if (barcodeBuffer.current.length > 2) {
                    const product = MOCK_PRODUCTS.find(p => p.code === barcodeBuffer.current);
                    if (product) {
                        addToCart(product);
                        barcodeBuffer.current = '';
                    }
                }
            } else if (e.key.length === 1) {
                barcodeBuffer.current += e.key;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const finalizePayment = (type) => {
        const saleData = {
            id: 'TK-' + Math.floor(Math.random() * 9999),
            items: [...cart],
            total: total,
            patient: selectedPatient ? selectedPatient.name : 'Client Anonyme',
            date: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            fullDate: new Date().toLocaleString(),
            paymentMethod: type === 'cash' ? 'ESPÈCES' : mobilePayment === 'wave' ? 'WAVE' : 'ORANGE MONEY',
            cashReceived: parseInt(cashAmount) || 0,
            changeDue: type === 'cash' ? (parseInt(cashAmount) - total) : 0
        };

        if (type === 'cash' && autoDrawer) {
            triggerDrawer();
        }

        setSalesHistory(prev => [saleData, ...prev].slice(0, 50));
        setLastSale(saleData);
        if (printOption) {
            setShowReceipt(true);
        } else {
            resetPOS();
        }
    };

    const resetPOS = () => {
        setCart([]);
        setShowCheckout(false);
        setMobilePayment(null);
        setMobileStatus('idle');
        setCashAmount('');
        setShowNumpad(false);
        setShowReceipt(false);
        setLastSale(null);
        setSelectedPatient(null);
    };

    return (
        <div className="pos-tactile" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 450px',
            gap: '12px',
            height: 'calc(100vh - 100px)',
            backgroundColor: '#f1f5f9',
            padding: '12px',
            borderRadius: 'var(--radius-lg)',
            position: 'relative'
        }}>
            {/* Modal Sélection Patient */}
            {showPatientSelect && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4000 }}>
                    <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '20px', width: '450px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <h2 style={{ fontSize: '1.2rem' }}>Rechercher un Patient</h2>
                            <button onClick={() => setShowPatientSelect(false)} style={{ border: 'none', background: 'none' }}><X size={24} /></button>
                        </div>
                        <input
                            type="text"
                            placeholder="Nom ou NSS..."
                            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', marginBottom: '15px' }}
                        />
                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {MOCK_PATIENTS.map(p => (
                                <div
                                    key={p.id}
                                    onClick={() => { setSelectedPatient(p); setShowPatientSelect(false); }}
                                    style={{ padding: '12px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer', borderRadius: '8px' }}
                                    onMouseOver={(e) => e.target.style.backgroundColor = '#f8fafc'}
                                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                    <p style={{ fontWeight: '600' }}>{p.name}</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.mutuelle} - {p.phone}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Ticket */}
            {showReceipt && lastSale && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
                    <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '16px', width: '380px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                            <h2 style={{ fontSize: '1.2rem' }}>PHARMACIE DE LA TERRANGA</h2>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ticket #{lastSale.id}</p>
                        </div>
                        <div style={{ borderTop: '1px dashed #ccc', borderBottom: '1px dashed #ccc', padding: '10px 0', marginBottom: '10px' }}>
                            <p style={{ fontSize: '0.85rem' }}>Patient: <strong>{lastSale.patient}</strong></p>
                            <p style={{ fontSize: '0.85rem' }}>Date: {lastSale.fullDate}</p>
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            {lastSale.items.map((item, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '4px' }}>
                                    <span>{item.quantity} x {item.name}</span>
                                    <span>{(item.price * item.quantity).toLocaleString()} F</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ borderTop: '2px solid #000', paddingTop: '10px', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.1rem' }}>
                                <span>TOTAL</span>
                                <span>{lastSale.total.toLocaleString()} FCFA</span>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <button onClick={() => { alert('Impression...'); resetPOS(); }} style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--primary)', background: 'white', color: 'var(--primary)', fontWeight: '700' }}><Printer size={18} /> IMPRIMER</button>
                            <button onClick={() => { alert('Email envoyé !'); resetPOS(); }} style={{ padding: '12px', borderRadius: '10px', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: '700' }}><Mail size={18} /> E-MAIL</button>
                        </div>
                        <button onClick={resetPOS} style={{ width: '100%', marginTop: '10px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>Fermer</button>
                    </div>
                </div>
            )}

            {/* Notification Tiroir */}
            {drawerOpen && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(15, 23, 42, 0.95)', color: 'white', padding: '30px 50px', borderRadius: '24px', zIndex: 2000, textAlign: 'center' }}>
                    <Unlock size={64} color="var(--primary)" style={{ marginBottom: '16px' }} />
                    <h2 style={{ color: 'white' }}>TIROIR OUVERT</h2>
                </div>
            )}

            {/* Colonne de Gauche */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: '12px', padding: '12px', backgroundColor: 'white', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search size={24} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Scannez ou recherchez un produit..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ width: '100%', padding: '16px 16px 16px 52px', borderRadius: '12px', border: '2px solid #e2e8f0', outline: 'none', fontSize: '1.1rem' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '4px 0' }}>
                    {CATEGORIES.map(cat => (
                        <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '12px 24px', borderRadius: '100px', border: 'none', backgroundColor: activeCategory === cat ? 'var(--secondary)' : 'white', color: activeCategory === cat ? 'white' : 'var(--text-main)', fontWeight: '600', whiteSpace: 'nowrap', cursor: 'pointer' }}>{cat}</button>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px', overflowY: 'auto' }}>
                    {filteredProducts.map(p => (
                        <button
                            key={p.id}
                            onClick={() => addToCart(p)}
                            style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 12px',
                                backgroundColor: 'white', borderRadius: '16px', border: p.stock <= p.minStock ? '1px solid #fee2e2' : '1px solid #e2e8f0',
                                cursor: 'pointer', position: 'relative'
                            }}
                        >
                            <span style={{
                                position: 'absolute', top: '8px', right: '8px', fontSize: '0.65rem', padding: '2px 6px',
                                borderRadius: '4px', backgroundColor: p.stock <= p.minStock ? '#fee2e2' : '#f1f5f9',
                                color: p.stock <= p.minStock ? 'var(--error)' : 'var(--text-muted)',
                                fontWeight: '700'
                            }}>
                                STK: {p.stock}
                            </span>
                            <span style={{ fontWeight: '700', fontSize: '0.9rem', textAlign: 'center', marginBottom: '8px', marginTop: '10px' }}>{p.name}</span>
                            <span style={{ fontWeight: '800', color: 'var(--primary)' }}>{p.price.toLocaleString()} F</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Colonne de Droite */}
            <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
                <div style={{ padding: '20px', backgroundColor: 'var(--secondary)', color: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Caisse N1</h2>
                            <p style={{ fontSize: '0.75rem', opacity: 0.7 }}>Dr. Wane</p>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button onClick={() => setShowHistory(true)} style={{ padding: '8px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'transparent', color: 'white', cursor: 'pointer' }}><History size={20} /></button>
                        </div>
                    </div>
                    {/* Patient Selection bar */}
                    <button
                        onClick={() => setShowPatientSelect(true)}
                        style={{
                            width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)',
                            backgroundColor: selectedPatient ? 'rgba(16, 185, 129, 0.2)' : 'rgba(0,0,0,0.1)',
                            color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px'
                        }}
                    >
                        {selectedPatient ? <ShieldCheck size={18} color="var(--success)" /> : <UserPlus size={18} />}
                        <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>
                            {selectedPatient ? selectedPatient.name : 'Associer un Patient'}
                        </span>
                        {selectedPatient && <X size={14} style={{ marginLeft: 'auto' }} onClick={(e) => { e.stopPropagation(); setSelectedPatient(null); }} />}
                    </button>
                </div>

                <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
                    {cart.map(item => (
                        <div key={item.id} style={{ display: 'flex', padding: '12px', borderBottom: '1px solid #f1f5f9' }}>
                            <div style={{ flex: 1 }}><p style={{ fontWeight: '600' }}>{item.name}</p><p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.price.toLocaleString()} F x {item.quantity}</p></div>
                            <p style={{ fontWeight: '700' }}>{(item.price * item.quantity).toLocaleString()} F</p>
                        </div>
                    ))}
                </div>

                <div style={{ padding: '20px', backgroundColor: '#f8fafc' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: '800' }}>TOTAL</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary)' }}>{total.toLocaleString()} F</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                        <button onClick={() => startMobilePayment('wave')} style={{ padding: '12px', borderRadius: '8px', border: '2px solid #1dcad3', background: 'white', color: '#1dcad3', fontWeight: 'bold' }}><WaveIcon /> WAVE</button>
                        <button onClick={() => startMobilePayment('om')} style={{ padding: '12px', borderRadius: '8px', border: '2px solid #FF6600', background: 'white', color: '#FF6600', fontWeight: 'bold' }}><OMIcon /> ORANGE</button>
                    </div>
                    <button onClick={() => { setShowCheckout(true); setShowNumpad(true); }} style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '800', cursor: 'pointer' }}>ENCAISSER ESPÈCES</button>
                </div>

                {(showNumpad || showCheckout || mobilePayment) && (
                    <div style={{ position: 'absolute', bottom: '24px', right: '480px', width: '320px', backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', padding: '24px', zIndex: 100, border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ fontWeight: '700' }}>Paiement</h3>
                            <button onClick={() => { setShowNumpad(false); setShowCheckout(false); setMobilePayment(null); setMobileStatus('idle'); }} style={{ border: 'none', background: 'none' }}><X size={24} /></button>
                        </div>
                        {showCheckout && (
                            <div style={{ marginBottom: '16px' }}>
                                <p style={{ textAlign: 'right', fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>{cashAmount || '0'} F</p>
                                {parseInt(cashAmount) >= total && <p style={{ textAlign: 'right', color: 'green', fontWeight: '700' }}>Rendu : {(parseInt(cashAmount) - total).toLocaleString()} F</p>}
                            </div>
                        )}
                        {mobilePayment === 'om' && <div style={{ textAlign: 'center' }}>{mobileStatus === 'idle' ? <><p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#FF6600' }}>{phoneNumber || 'Numéro OM'}</p><button disabled={phoneNumber.length < 9} onClick={() => setMobileStatus('pending')} style={{ width: '100%', padding: '12px', background: '#FF6600', color: 'white', border: 'none', borderRadius: '8px', marginTop: '12px' }}>VALIDER</button></> : <p>Confirmation...</p>}</div>}
                        {(showCheckout || (mobilePayment === 'om' && mobileStatus === 'idle')) && <Numpad onInput={handleNumpadInput} onDelete={() => showCheckout ? setCashAmount(prev => prev.slice(0, -1)) : setPhoneNumber(prev => prev.slice(0, -1))} onClear={() => showCheckout ? setCashAmount('') : setPhoneNumber('')} />}
                        {((showCheckout && parseInt(cashAmount) >= total) || mobileStatus === 'success') && <button onClick={() => finalizePayment(showCheckout ? 'cash' : 'mobile')} style={{ width: '100%', padding: '16px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', marginTop: '16px' }}>CONCLURE</button>}
                    </div>
                )}
            </div>
        </div>
    );
}
