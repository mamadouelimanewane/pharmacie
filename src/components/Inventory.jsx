import React, { useState } from 'react';
import {
    Package, Search, Filter, ArrowUpRight, AlertTriangle,
    RefreshCcw, Download, Calendar, Truck, Barcode,
    X, CheckCircle2, Plus, Trash2, FileText,
    AlertCircle, CheckCircle, ArrowRight, Smartphone,
    QrCode, Loader2, Camera, Image as ImageIcon,
    Bell, MessageCircle, Send, User, BellRing
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockData';

export default function Inventory() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [showReceiveModal, setShowReceiveModal] = useState(false);

    // Delivery Reception State
    const [receivedItems, setReceivedItems] = useState([]);
    const [scanFeedback, setScanFeedback] = useState(null);
    const [invoiceMode, setInvoiceMode] = useState(false);
    const [invoiceData, setInvoiceData] = useState(null);

    // Smartphone Scan State
    const [showLogisticsScan, setShowLogisticsScan] = useState(false);
    const [logisticsScanMethod, setLogisticsScanMethod] = useState('camera');
    const [isLogisticsScanning, setIsLogisticsScanning] = useState(false);
    const [scannedInvoice, setScannedInvoice] = useState(null);

    // Backorder / Waitlist Alerts State
    const [showBackorderAlerts, setShowBackorderAlerts] = useState(false);
    const [notifyingPatientId, setNotifyingPatientId] = useState(null);
    const [notifiedPatients, setNotifiedPatients] = useState([]);

    // Mock Waitlist (Patients waiting for out-of-stock items)
    const [waitlist, setWaitlist] = useState([
        { id: 1, patient: 'Mme Diop', phone: '77 125 44 22', product: 'Ventoline Inhalateur', date: '05/02', status: 'pending' },
        { id: 2, patient: 'M. Sarr', phone: '76 890 11 33', product: 'Doliprane 1000mg', date: '07/02', status: 'pending' },
        { id: 3, patient: 'Awa Ndiaye', phone: '78 555 66 77', product: 'Amoxicilline 1g', date: '08/02', status: 'pending' }
    ]);

    const handleNotifyPatient = (id) => {
        setNotifyingPatientId(id);
        setTimeout(() => {
            setNotifyingPatientId(null);
            setNotifiedPatients(prev => [...prev, id]);
        }, 1200);
    };

    const validateReception = () => {
        // Find if any received items were on the waitlist
        const backorderMatches = waitlist.filter(w => receivedItems.some(r => r.name.toLowerCase().includes(w.product.toLowerCase())));

        if (backorderMatches.length > 0) {
            setShowBackorderAlerts(true);
        } else {
            alert(`Stock mis à jour ! ${receivedItems.length} références réceptionnées.`);
            resetReception();
        }
    };

    const resetReception = () => {
        setReceivedItems([]);
        setShowReceiveModal(false);
        setInvoiceMode(false);
        setScannedInvoice(null);
        setShowBackorderAlerts(false);
    };

    // ... (rest of filtering and helper logic from previous version)

    return (
        <div className="inventory fade-in">
            {/* Header and Stats (same as before) */}
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--secondary)' }}>Gestion Logistique</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Réceptionnez vos colis et gérez les alertes de disponibilité.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button onClick={() => setShowReceiveModal(true)} style={{ padding: '0.85rem 1.5rem', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)' }}><Barcode size={20} /> Réception Livraison</button>
                    <button onClick={() => setShowOrderModal(true)} className="glass" style={{ padding: '0.85rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)', color: 'var(--secondary)', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Truck size={20} /> Commande Express</button>
                </div>
            </header>

            {/* Modal de Réception avec Alertes Backorder */}
            {showReceiveModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.9)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                    <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '32px', width: showBackorderAlerts ? '600px' : '900px', maxHeight: '92vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', overflow: 'hidden', transition: 'width 0.3s' }}>

                        {!showBackorderAlerts ? (
                            <>
                                {/* Step 1: Reception Table (Simplified for brevity, assuming existing logic) */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Réception Colis</h2>
                                    <button onClick={() => setShowReceiveModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={24} /></button>
                                </div>

                                <div style={{ padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '16px', textAlign: 'center', border: '2px dashed #0ea5e9', marginBottom: '20px' }}>
                                    <p style={{ fontWeight: '800', color: '#0369a1' }}>PRODUITS SCANNÉS : {receivedItems.length}</p>
                                    <button onClick={() => setReceivedItems([{ id: 1, name: 'Ventoline Inhalateur', stock: 0, receivedQty: 10, code: '3400930007' }])} style={{ marginTop: '10px', fontSize: '0.7rem', padding: '4px 8px', borderRadius: '4px', border: '1px solid #0ea5e9', background: 'white' }}>Simuler scan Ventoline (Attendu par patient)</button>
                                </div>

                                <div style={{ flex: 1, overflowY: 'auto', marginBottom: '24px' }}>
                                    {receivedItems.map(item => (
                                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid #f1f5f9' }}>
                                            <span style={{ fontWeight: '700' }}>{item.name}</span>
                                            <span style={{ fontWeight: '900', color: 'var(--primary)' }}>+ {item.receivedQty}</span>
                                        </div>
                                    ))}
                                </div>

                                <button onClick={validateReception} style={{ padding: '18px', borderRadius: '16px', background: 'var(--primary)', color: 'white', fontWeight: '800', border: 'none', cursor: 'pointer' }}>VALIDER LA RÉCEPTION</button>
                            </>
                        ) : (
                            <div className="fade-in">
                                {/* Step 2: Smart Alerts (Backorder Availability) */}
                                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                                    <div style={{ width: '64px', height: '64px', backgroundColor: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                        <BellRing size={32} color="#16a34a" />
                                    </div>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--secondary)' }}>Opportunités de Vente !</h2>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Des articles que vous venez de recevoir sont attendus par des clients.</p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                                    {waitlist.filter(w => receivedItems.some(r => r.name.toLowerCase().includes(w.product.toLowerCase()))).map(w => (
                                        <div key={w.id} style={{ padding: '16px', borderRadius: '20px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <span style={{ fontWeight: '800', color: 'var(--secondary)' }}>{w.patient}</span>
                                                    <span style={{ fontSize: '0.7rem', padding: '2px 6px', backgroundColor: '#e0f2fe', color: '#0369a1', borderRadius: '6px', fontWeight: '700' }}>{w.product}</span>
                                                </div>
                                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Inscrit le {w.date} • {w.phone}</p>
                                            </div>

                                            {notifiedPatients.includes(w.id) ? (
                                                <div style={{ color: '#16a34a', fontWeight: '800', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <CheckCircle size={16} /> SMS Envoyé
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => handleNotifyPatient(w.id)}
                                                    disabled={notifyingPatientId === w.id}
                                                    style={{ padding: '10px 16px', borderRadius: '12px', border: 'none', background: '#1dcad3', color: 'white', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}
                                                >
                                                    {notifyingPatientId === w.id ? <Loader2 size={16} className="spin" /> : <MessageCircle size={16} />}
                                                    {notifyingPatientId === w.id ? 'Envoi...' : 'Alerter SMS'}
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <button onClick={resetReception} style={{ width: '100%', padding: '18px', borderRadius: '16px', background: 'var(--secondary)', color: 'white', fontWeight: '800', border: 'none', cursor: 'pointer' }}>TERMINER LA MISE À JOUR</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Rest of the Inventory Table (Already optimized in previous turns) */}
            <div className="card" style={{ padding: 0, borderRadius: '24px', overflow: 'hidden' }}>
                {/* ... existing table code ... */}
            </div>
        </div>
    );
}
