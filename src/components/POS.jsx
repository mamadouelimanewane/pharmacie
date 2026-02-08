import React, { useState, useEffect, useRef } from 'react';
import {
    Search, Plus, Minus, Trash2, CreditCard, Banknote,
    ShieldCheck, Printer, Scan, ShoppingCart, X,
    Delete, ArrowLeft, History, User, Settings,
    Power, ChevronRight, Hash, Star, Smartphone,
    QrCode, Loader2, CheckCircle2, Barcode, Unlock,
    Mail, FileText, Download, Clock, RotateCcw, UserPlus,
    AlertTriangle, Landmark, Shield, Camera, Image as ImageIcon,
    FileSearch, CheckCircle, PenTool, Eraser, Link as LinkIcon,
    Bookmark, BookmarkCheck
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
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px',
            backgroundColor: '#f1f5f9', padding: '12px', borderRadius: 'var(--radius-md)'
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
                        padding: '16px', fontSize: '1.25rem', fontWeight: '600',
                        borderRadius: '8px', border: '1px solid var(--border)',
                        backgroundColor: (key === 'C' || key === 'DEL') ? '#fee2e2' : 'white',
                        color: (key === 'C' || key === 'DEL') ? 'var(--error)' : 'var(--secondary)',
                        cursor: 'pointer', boxShadow: 'var(--shadow-sm)', transition: 'transform 0.1s'
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
    const [mobileStatus, setMobileStatus] = useState('idle'); // 'idle', 'pending', 'waiting_pin', 'success'
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

    // Prescription Scan State
    const [showScanModal, setShowScanModal] = useState(false);
    const [scanMethod, setScanMethod] = useState('camera');
    const [isScanning, setIsScanning] = useState(false);
    const [scannedDoc, setScannedDoc] = useState(null);

    // Signature State
    const [useSignature, setUseSignature] = useState(false);
    const [isSigning, setIsSigning] = useState(false);
    const [signatureCaptured, setSignatureCaptured] = useState(false);

    // Reservation State
    const [showReservationAlert, setShowReservationAlert] = useState(false);
    const [activeReservation, setActiveReservation] = useState(null);

    // Barcode Scanner logic
    const barcodeBuffer = useRef('');
    const lastKeyTime = useRef(0);

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Tiers-Payant Logic
    const getCoverage = (mutuelle) => {
        if (!mutuelle) return 0;
        if (mutuelle.includes('IPM')) return 0.8;
        if (mutuelle.includes('AXA')) return 1.0;
        if (mutuelle.includes('CNSS')) return 0.5;
        if (mutuelle.includes('NSIA')) return 0.7;
        return 0;
    };

    const coverageRate = selectedPatient ? getCoverage(selectedPatient.mutuelle) : 0;
    const insuranceShare = Math.round(total * coverageRate);
    const patientShare = total - insuranceShare;

    const filteredProducts = MOCK_PRODUCTS.filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || (p.code && p.code.includes(search));
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
    };

    const handlePatientSelection = (patient) => {
        setSelectedPatient(patient);
        setShowPatientSelect(false);

        // Simulation of checking reservations (priority notifications)
        if (patient.name === 'Mme Diop' || patient.name === 'M. Sarr') {
            setActiveReservation({
                product: patient.name === 'Mme Diop' ? 'Ventoline Inhalateur' : 'Doliprane 1000mg',
                date: '08/02/2026'
            });
            setShowReservationAlert(true);
        }
    };

    const claimReservation = () => {
        const product = MOCK_PRODUCTS.find(p => p.name === activeReservation.product);
        if (product) {
            addToCart(product);
        }
        setShowReservationAlert(false);
        setActiveReservation(null);
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
        const feeRate = mobilePayment === 'wave' ? 0.01 : mobilePayment === 'om' ? 0.01 : 0;
        const transactionFee = Math.round(patientShare * feeRate);

        const saleData = {
            id: 'TK-' + Math.floor(Math.random() * 9999),
            items: [...cart],
            total: total,
            insuranceShare: insuranceShare,
            patientShare: patientShare,
            transactionFee: transactionFee,
            netPatientPayment: patientShare - transactionFee,
            patient: selectedPatient ? selectedPatient.name : 'Client Anonyme',
            mutuelle: selectedPatient ? selectedPatient.mutuelle : 'Aucune',
            prescriptionAttached: !!scannedDoc,
            signed: signatureCaptured,
            reservationClaimed: !!activeReservation,
            date: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
            fullDate: new Date().toLocaleString(),
            paymentMethod: type === 'cash' ? 'ESPÈCES' : mobilePayment === 'wave' ? 'WAVE' : 'ORANGE MONEY',
            cashReceived: parseInt(cashAmount) || 0,
            changeDue: type === 'cash' ? (parseInt(cashAmount) - patientShare) : 0
        };

        if (type === 'cash' && autoDrawer) triggerDrawer();

        setSalesHistory(prev => [saleData, ...prev].slice(0, 50));
        setLastSale(saleData);
        if (printOption) setShowReceipt(true);
        else resetPOS();
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
        setPhoneNumber('');
        setScannedDoc(null);
        setIsSigning(false);
        setSignatureCaptured(false);
        setActiveReservation(null);
        setShowReservationAlert(false);
    };

    const startMobilePayment = (type) => {
        if (cart.length === 0) return;
        setMobilePayment(type);
        setMobileStatus('pending');

        if (type === 'wave') {
            // Wave flow: Show QR directly
            setTimeout(() => setMobileStatus('success'), 3500);
        } else {
            // OM flow: Show Numpad for phone
            setShowNumpad(true);
        }
    };

    const confirmOMPayment = () => {
        if (phoneNumber.length < 9) return;
        setMobileStatus('waiting_pin');
        setShowNumpad(false);
        // Simulate USSD Push interaction
        setTimeout(() => {
            setMobileStatus('success');
        }, 4000);
    };

    const simulateScan = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            setScannedDoc({ id: 'ORD-' + Math.random().toString(36).substr(2, 9), status: 'OK' });
            setShowScanModal(false);
        }, 1500);
    };

    return (
        <div className="pos-tactile" style={{
            display: 'grid', gridTemplateColumns: '1fr 450px', gap: '12px',
            height: 'calc(100vh - 100px)', backgroundColor: '#f1f5f9', padding: '12px',
            borderRadius: 'var(--radius-lg)', position: 'relative'
        }}>
            {/* Modal Reservation Alert */}
            {showReservationAlert && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 7000, backdropFilter: 'blur(10px)' }}>
                    <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '32px', width: '500px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                        <div style={{ width: '80px', height: '80px', backgroundColor: '#f5f3ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                            <BookmarkCheck size={40} color="#8b5cf6" />
                        </div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--secondary)', marginBottom: '12px' }}>Stock Réservé !</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '32px' }}>
                            Un exemplaire de **{activeReservation?.product}** a été mis de côté pour **{selectedPatient?.name}** le {activeReservation?.date}.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <button onClick={() => setShowReservationAlert(false)} style={{ padding: '18px', borderRadius: '18px', border: '1px solid #e2e8f0', background: 'white', fontWeight: '800', fontSize: '1.1rem', cursor: 'pointer' }}>Ignorer</button>
                            <button onClick={claimReservation} style={{ padding: '18px', borderRadius: '18px', border: 'none', background: '#8b5cf6', color: 'white', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 4px 6px rgba(139, 92, 246, 0.3)' }}>Ajouter au Panier</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Existing Overlays (Signature, Scan, Patient, Receipt, Drawer) omitted for brevity in response but preserved in file */}
            {/* ... preserved logic for Signature, Scan, Patient, Receipt ... */}

            {/* Modal Signature Overlay */}
            {isSigning && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 6000, backdropFilter: 'blur(10px)' }}>
                    <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '32px', width: '600px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', textAlign: 'left' }}>Signature du Patient</h2>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'left' }}>Validation de la prise en charge {selectedPatient?.mutuelle}</p>
                            </div>
                            <button onClick={() => setIsSigning(false)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={32} /></button>
                        </div>
                        <div style={{ width: '100%', height: '250px', backgroundColor: '#f8fafc', border: '2px solid #e2e8f0', borderRadius: '20px', position: 'relative', cursor: 'crosshair', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setSignatureCaptured(true)}>
                            {signatureCaptured ? (
                                <div style={{ fontSize: '2rem', fontFamily: '"Dancing Script", cursive', color: 'var(--secondary)', transform: 'rotate(-5deg)' }}>Signature Client</div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', opacity: 0.3 }}>
                                    <PenTool size={48} />
                                    <p style={{ fontWeight: '600' }}>Veuillez signer ici</p>
                                </div>
                            )}
                            <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', borderBottom: '2px dashed #cbd5e1' }}></div>
                            <button onClick={(e) => { e.stopPropagation(); setSignatureCaptured(false); }} style={{ position: 'absolute', bottom: '10px', right: '10px', padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', color: 'var(--error)' }}><Eraser size={18} /></button>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button onClick={() => { setSignatureCaptured(false); setIsSigning(false); }} style={{ flex: 1, padding: '18px', borderRadius: '16px', border: '1px solid #e2e8f0', background: 'white', fontWeight: '700', fontSize: '1.1rem' }}>Ignorer</button>
                            <button onClick={() => setIsSigning(false)} disabled={!signatureCaptured} style={{ flex: 1, padding: '18px', borderRadius: '16px', border: 'none', background: signatureCaptured ? 'var(--primary)' : '#cbd5e1', color: 'white', fontWeight: '800', fontSize: '1.1rem' }}>Valider la Signature</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Scan Modal */}
            {showScanModal && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5000, backdropFilter: 'blur(8px)' }}>
                    <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '32px', width: '550px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Numérisation Ordonnance</h2>
                            <button onClick={() => { setShowScanModal(false); setScanMethod('camera'); }} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={32} /></button>
                        </div>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                            <button onClick={() => setScanMethod('camera')} style={{ flex: 1, padding: '12px', borderRadius: '14px', border: 'none', background: scanMethod === 'camera' ? 'var(--primary-light)' : '#f1f5f9', color: scanMethod === 'camera' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Camera size={18} /> Caméra Bureau</button>
                            <button onClick={() => setScanMethod('mobile')} style={{ flex: 1, padding: '12px', borderRadius: '14px', border: 'none', background: scanMethod === 'mobile' ? 'var(--primary-light)' : '#f1f5f9', color: scanMethod === 'mobile' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Smartphone size={18} /> Smartphone</button>
                        </div>
                        <div style={{ padding: '40px 20px', border: '3px dashed #e2e8f0', borderRadius: '24px', backgroundColor: '#f8fafc', marginBottom: '24px', position: 'relative', overflow: 'hidden', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {scanMethod === 'camera' ? (
                                isScanning ? (
                                    <div className="fade-in">
                                        <Loader2 size={48} className="spin" color="var(--primary)" style={{ margin: '0 auto 16px' }} />
                                        <p style={{ fontWeight: '700' }}>Lecture en cours...</p>
                                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', backgroundColor: 'var(--primary)', animation: 'scanMove 1.5s infinite' }}></div>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                                        <Camera size={64} color="#94a3b8" />
                                        <p style={{ color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.9rem' }}>Alignez l'ordonnance sous l'objectif de la webcam.</p>
                                        <button onClick={simulateScan} style={{ padding: '14px 28px', borderRadius: '16px', border: 'none', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '800', cursor: 'pointer', fontSize: '1rem' }}>Capturer</button>
                                    </div>
                                )
                            ) : (
                                <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ padding: '15px', backgroundColor: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}><QrCode size={140} color="var(--secondary)" /></div>
                                    <div>
                                        <p style={{ fontWeight: '800', color: 'var(--secondary)' }}>Scannez avec votre Smartphone</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Utilisez votre téléphone pour numériser instantanément.</p>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: '700' }}><Loader2 size={16} className="spin" /> Attente connexion mobile...</div>
                                    <button onClick={simulateScan} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#f0fdf4', color: '#166534', fontSize: '0.7rem', fontWeight: '700', cursor: 'pointer' }}>Simuler réception mobile</button>
                                </div>
                            )}
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', fontWeight: '700', fontSize: '0.9rem' }}><ImageIcon size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Galerie</button>
                            <button style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', fontWeight: '700', fontSize: '0.9rem' }}><LinkIcon size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> e-Ordonnance</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Sélection Patient Overlay */}
            {showPatientSelect && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 4000, backdropFilter: 'blur(4px)' }}>
                    <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '32px', width: '480px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Recherche Dossier Patient</h2>
                            <button onClick={() => setShowPatientSelect(false)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={28} /></button>
                        </div>
                        <div style={{ position: 'relative', marginBottom: '20px' }}>
                            <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input type="text" placeholder="Nom, NSS ou Téléphone..." style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: '12px', border: '1px solid var(--border)', fontSize: '1rem', outline: 'none' }} autoFocus />
                        </div>
                        <div style={{ maxHeight: '350px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {MOCK_PATIENTS.map(p => (
                                <div key={p.id} onClick={() => handlePatientSelection(p)} style={{ padding: '16px', border: '1px solid #f1f5f9', cursor: 'pointer', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s' }}>
                                    <div>
                                        <p style={{ fontWeight: '700', color: 'var(--secondary)' }}>{p.name}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.mutuelle} • {p.phone}</p>
                                    </div>
                                    <Shield size={20} color={p.mutuelle !== 'None' ? 'var(--primary)' : '#cbd5e1'} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Receipt Overlay */}
            {showReceipt && lastSale && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000 }}>
                    <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '24px', width: '400px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                            <div style={{ width: '60px', height: '60px', backgroundColor: 'var(--primary-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><CheckCircle2 size={32} color="var(--primary)" /></div>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Vente Enregistrée !</h2>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ticket #{lastSale.id}</p>
                        </div>
                        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '16px', marginBottom: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}><span style={{ color: 'var(--text-muted)' }}>Patient</span><span style={{ fontWeight: '700' }}>{lastSale.patient}</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}><span style={{ color: 'var(--text-muted)' }}>Signé</span><span style={{ fontWeight: '700', color: lastSale.signed ? 'var(--success)' : 'var(--text-muted)' }}>{lastSale.signed ? 'Oui ✅' : 'Non'}</span></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '0.9rem' }}><span style={{ color: 'var(--text-muted)' }}>Ordonnance</span><span style={{ fontWeight: '700', color: lastSale.prescriptionAttached ? 'var(--primary)' : 'var(--error)' }}>{lastSale.prescriptionAttached ? 'Archivée ✅' : 'Non numérisée'}</span></div>
                            <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}><span style={{ fontSize: '1rem', fontWeight: '600' }}>TOTAL VENTE</span><span style={{ fontSize: '1rem', fontWeight: '800' }}>{lastSale.total.toLocaleString()} F</span></div>
                            {lastSale.insuranceShare > 0 && (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', color: 'var(--primary)' }}><span style={{ fontSize: '0.9rem', fontWeight: '600' }}>PART MUTUELLE ({selectedPatient?.mutuelle})</span><span style={{ fontSize: '0.9rem', fontWeight: '700' }}>- {lastSale.insuranceShare.toLocaleString()} F</span></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '900', fontSize: '1.2rem', color: 'var(--secondary)', paddingTop: '8px', borderTop: '1px solid #e2e8f0' }}><span>À PAYER PATIENT</span><span>{lastSale.patientShare.toLocaleString()} F</span></div>
                                </>
                            )}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <button onClick={() => { alert('Impression...'); resetPOS(); }} style={{ padding: '16px', borderRadius: '14px', border: '2px solid var(--primary)', background: 'white', color: 'var(--primary)', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Printer size={20} /> IMPRIMER</button>
                            <button onClick={() => { alert('Email envoyé !'); resetPOS(); }} style={{ padding: '16px', borderRadius: '14px', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><Mail size={20} /> E-MAIL</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Drawer Overlay */}
            {drawerOpen && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(15, 23, 42, 0.95)', color: 'white', padding: '30px 50px', borderRadius: '24px', zIndex: 2000, textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
                    <Unlock size={64} className="fade-in" color="var(--primary)" style={{ marginBottom: '16px' }} />
                    <h2 style={{ color: 'white', fontWeight: '800' }}>TIROIR OUVERT</h2>
                    <p style={{ opacity: 0.7 }}>Récupérez le règlement patient.</p>
                </div>
            )}

            {/* Left Column : Products */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: '12px', padding: '12px', backgroundColor: 'white', borderRadius: '20px', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search size={24} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input type="text" placeholder="Scannez ou cherchez un produit..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: '100%', padding: '16px 16px 16px 52px', borderRadius: '14px', border: '2px solid #f1f5f9', outline: 'none', fontSize: '1.1rem', backgroundColor: '#f8fafc' }} />
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '4px 0' }}>{CATEGORIES.map(cat => (<button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '12px 24px', borderRadius: '100px', border: 'none', backgroundColor: activeCategory === cat ? 'var(--primary)' : 'white', color: activeCategory === cat ? 'white' : 'var(--text-main)', fontWeight: '700', whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 0.2s', boxShadow: 'var(--shadow-sm)' }}>{cat}</button>))}</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px', overflowY: 'auto', paddingRight: '4px' }}>
                    {filteredProducts.map(p => (
                        <button key={p.id} onClick={() => addToCart(p)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 12px', backgroundColor: 'white', borderRadius: '24px', border: p.stock <= p.minStock ? '2px solid #fee2e2' : '2px solid white', cursor: 'pointer', position: 'relative', transition: 'transform 0.1s, box-shadow 0.1s', boxShadow: 'var(--shadow-sm)' }} onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.96)'} onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                            <span style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '0.65rem', padding: '4px 8px', borderRadius: '8px', backgroundColor: p.stock <= p.minStock ? '#fee2e2' : '#f1f5f9', color: p.stock <= p.minStock ? 'var(--error)' : 'var(--text-muted)', fontWeight: '800' }}>{p.stock}</span>
                            <span style={{ fontWeight: '800', fontSize: '0.95rem', textAlign: 'center', marginBottom: '8px', color: 'var(--secondary)' }}>{p.name}</span>
                            <span style={{ fontWeight: '900', color: 'var(--primary)', fontSize: '1.1rem' }}>{p.price.toLocaleString()} F</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Column : Cart & Payment */}
            <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderRadius: '28px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
                <div style={{ padding: '24px', backgroundColor: 'var(--secondary)', color: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <div><h2 style={{ fontSize: '1.4rem', fontWeight: '900' }}>Caisse N1</h2><p style={{ fontSize: '0.8rem', opacity: 0.7, fontWeight: '600' }}>Dr. Wane • Officine</p></div>
                        <div style={{ display: 'flex', gap: '8px' }}><button onClick={() => setShowHistory(true)} style={{ padding: '12px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer' }}><History size={24} /></button></div>
                    </div>
                    <button onClick={() => setShowPatientSelect(true)} style={{ width: '100%', padding: '14px', borderRadius: '16px', border: 'none', backgroundColor: selectedPatient ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.1)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', transition: 'all 0.2s', marginBottom: '12px' }}>
                        {selectedPatient ? <ShieldCheck size={22} color="var(--primary)" /> : <UserPlus size={22} />}
                        <div style={{ textAlign: 'left', flex: 1 }}><p style={{ fontSize: '0.9rem', fontWeight: '800' }}>{selectedPatient ? selectedPatient.name : 'Identifier un Patient'}</p>{selectedPatient && <p style={{ fontSize: '0.7rem', opacity: 0.8 }}>Mutuelle: {selectedPatient.mutuelle} ({Math.round(coverageRate * 100)}%)</p>}</div>
                    </button>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <button onClick={() => setShowScanModal(true)} style={{ padding: '12px', borderRadius: '16px', border: scannedDoc ? 'none' : '2px dashed rgba(255,255,255,0.3)', backgroundColor: scannedDoc ? 'var(--primary)' : 'rgba(0,0,0,0.1)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}>{scannedDoc ? <CheckCircle size={18} /> : <FileSearch size={18} />}<span style={{ fontSize: '0.75rem', fontWeight: '700' }}>Ordonnance</span></button>
                        <button onClick={() => setUseSignature(!useSignature)} style={{ padding: '12px', borderRadius: '16px', border: 'none', backgroundColor: useSignature ? '#8b5cf6' : 'rgba(0,0,0,0.1)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s', opacity: selectedPatient ? 1 : 0.5 }} disabled={!selectedPatient}><PenTool size={18} /><span style={{ fontSize: '0.75rem', fontWeight: '700' }}>{useSignature ? 'Sign. Active' : 'Sans Signature'}</span></button>
                    </div>
                </div>
                <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>{cart.map(item => (<div key={item.id} style={{ display: 'flex', padding: '16px', borderBottom: '1px solid #f8fafc', alignItems: 'center' }}><div style={{ flex: 1 }}><p style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--secondary)' }}>{item.name}</p><p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>{item.price.toLocaleString()} F x {item.quantity}</p></div><div style={{ textAlign: 'right' }}><p style={{ fontWeight: '900', color: 'var(--secondary)' }}>{(item.price * item.quantity).toLocaleString()} F</p><button onClick={() => setCart(prev => prev.filter(i => i.id !== item.id))} style={{ border: 'none', background: 'none', color: '#cbd5e1', cursor: 'pointer', marginTop: '4px' }}><Trash2 size={16} /></button></div></div>))}</div>
                <div style={{ padding: '24px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontWeight: '700', fontSize: '0.9rem' }}><span>Total Articles</span><span>{total.toLocaleString()} F</span></div>
                        {insuranceShare > 0 && (<div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--primary)', fontWeight: '800', fontSize: '0.95rem', padding: '10px 14px', backgroundColor: 'var(--primary-light)', borderRadius: '12px', border: '1px dashed var(--primary)' }}><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Landmark size={18} /> Part Mutuelle</div><span>- {insuranceShare.toLocaleString()} F</span></div>)}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '8px' }}><span style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--secondary)' }}>NET À PAYER PATIENT</span><span style={{ fontSize: '2.2rem', fontWeight: '950', color: 'var(--primary)', lineHeight: 1 }}>{patientShare.toLocaleString()} <span style={{ fontSize: '1rem' }}>F</span></span></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}><button onClick={() => startMobilePayment('wave')} style={{ padding: '16px', borderRadius: '16px', border: '2px solid #1dcad3', background: 'white', color: '#1dcad3', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><WaveIcon /> WAVE</button><button onClick={() => startMobilePayment('om')} style={{ padding: '16px', borderRadius: '16px', border: '2px solid #FF6600', background: 'white', color: '#FF6600', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><OMIcon /> ORANGE</button></div>
                    <button onClick={() => { if (useSignature && selectedPatient && !signatureCaptured) setIsSigning(true); else { setShowCheckout(true); setShowNumpad(true); } }} disabled={cart.length === 0} style={{ width: '100%', padding: '20px', borderRadius: '18px', border: 'none', backgroundColor: cart.length === 0 ? '#cbd5e1' : 'var(--primary)', color: 'white', fontWeight: '900', fontSize: '1.2rem', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3)', transition: 'all 0.2s' }}>{useSignature && !signatureCaptured ? 'SIGNER & ENCAISSER' : 'ENCAISSER EN ESPÈCES'}</button>
                </div>
                {(showNumpad || showCheckout || mobilePayment) && (
                    <div style={{ position: 'absolute', bottom: '24px', right: '480px', width: '350px', backgroundColor: 'white', borderRadius: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)', padding: '28px', zIndex: 100, border: '1px solid var(--border)', animation: 'fadeIn 0.2s' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}><h3 style={{ fontWeight: '900', color: 'var(--secondary)', fontSize: '1.2rem' }}>Validation</h3><button onClick={() => { setShowNumpad(false); setShowCheckout(false); setMobilePayment(null); setMobileStatus('idle'); setCashAmount(''); }} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={28} /></button></div>
                        {/* Mobile Money Specific UI */}
                        {mobilePayment === 'wave' && mobileStatus !== 'success' && (
                            <div className="fade-in" style={{ textAlign: 'center', padding: '20px 0' }}>
                                <div style={{ background: 'white', padding: '15px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'inline-block', marginBottom: '16px' }}>
                                    <QrCode size={180} color="#1dcad3" />
                                </div>
                                <p style={{ fontWeight: '800', color: 'var(--secondary)', marginBottom: '4px' }}>Scannez pour payer avec Wave</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{patientShare.toLocaleString()} F</p>
                                <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#1dcad3' }}>
                                    <Loader2 size={20} className="spin" />
                                    <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>Attente de confirmation...</span>
                                </div>
                            </div>
                        )}

                        {mobilePayment === 'om' && mobileStatus === 'pending' && (
                            <div className="fade-in" style={{ marginBottom: '20px' }}>
                                <p style={{ fontWeight: '800', marginBottom: '12px' }}>Entrez le numéro Orange Money</p>
                                <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '14px', fontSize: '1.5rem', fontWeight: '900', border: '1px solid #FF6600', color: '#FF6600', textAlign: 'center', marginBottom: '16px' }}>
                                    {phoneNumber || '7x xxx xx xx'}
                                </div>
                                <Numpad onInput={handleNumpadInput} onDelete={() => setPhoneNumber(prev => prev.slice(0, -1))} onClear={() => setPhoneNumber('')} />
                                <button onClick={confirmOMPayment} disabled={phoneNumber.length < 9} style={{ width: '100%', padding: '18px', background: '#FF6600', color: 'white', border: 'none', borderRadius: '16px', fontWeight: '900', marginTop: '20px', cursor: 'pointer' }}>INITIER LE PAIEMENT</button>
                            </div>
                        )}

                        {mobilePayment === 'om' && mobileStatus === 'waiting_pin' && (
                            <div className="fade-in" style={{ textAlign: 'center', padding: '30px 0' }}>
                                <div style={{ width: 64, height: 64, backgroundColor: 'rgba(255, 102, 0, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                                    <Smartphone size={32} color="#FF6600" />
                                </div>
                                <h3 style={{ fontWeight: '900', marginBottom: '8px' }}>Push SMS envoyé</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>Le client doit saisir son **code secret** sur son mobile **{phoneNumber}**.</p>
                                <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#FF6600' }}>
                                    <Loader2 size={18} className="spin" />
                                    <span style={{ fontWeight: '700', fontSize: '0.85rem' }}>Attente du PIN...</span>
                                </div>
                            </div>
                        )}

                        {/* Completion / Final Button */}
                        {((showCheckout && parseInt(cashAmount) >= patientShare) || mobileStatus === 'success') && (
                            <div className="fade-in">
                                {mobileStatus === 'success' && (
                                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                                        <div style={{ width: 50, height: 50, backgroundColor: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                                            <CheckCircle2 size={30} color="#10b981" />
                                        </div>
                                        <p style={{ fontWeight: '900', color: '#10b981' }}>PAIEMENT CONFIRMÉ</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Référence: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                                    </div>
                                )}
                                <button onClick={() => finalizePayment(showCheckout ? 'cash' : 'mobile')} style={{ width: '100%', padding: '20px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '18px', fontWeight: '900', fontSize: '1.1rem', marginTop: '10px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)' }}>
                                    {mobileStatus === 'success' ? 'VALIDER & IMPRIMER TICKET' : 'FINALISER LA VENTE'}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <style>{` @keyframes scanMove { 0% { top: 0; } 50% { top: 100%; } 100% { top: 0; } } `}</style>
        </div>
    );
}
