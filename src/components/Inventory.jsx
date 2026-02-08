import React, { useState } from 'react';
import {
    Package, Search, Filter, ArrowUpRight, AlertTriangle,
    RefreshCcw, Download, Calendar, Truck, Barcode,
    X, CheckCircle2, Plus, Trash2, FileText,
    AlertCircle, CheckCircle, ArrowRight, Smartphone,
    QrCode, Loader2, Camera, Image as ImageIcon,
    Bell, MessageCircle, Send, User, BellRing, Bookmark,
    BookmarkCheck, History, Clock
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockData';

export default function Inventory() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [showReceiveModal, setShowReceiveModal] = useState(false);

    // Delivery Reception State
    const [receivedItems, setReceivedItems] = useState([]);
    const [scanFeedback, setScanFeedback] = useState(null);

    // Backorder / Waitlist Alerts State
    const [showBackorderAlerts, setShowBackorderAlerts] = useState(false);
    const [notifyingPatientId, setNotifyingPatientId] = useState(null);
    const [notifiedPatients, setNotifiedPatients] = useState([]);

    // Reservation List with Expiry Logic
    const [reservedList, setReservedList] = useState([
        { id: 101, patient: 'Mme Diop', phone: '77 125 44 22', product: 'Ventoline Inhalateur', date: '06/02/2026', expiry: '08/02/2026', status: 'active' },
        { id: 102, patient: 'M. Sarr', phone: '76 890 11 33', product: 'Doliprane 1000mg', date: '04/02/2026', expiry: '06/02/2026', status: 'expired' }
    ]);

    // Mock Waitlist
    const [waitlist, setWaitlist] = useState([
        { id: 1, patient: 'Awa Ndiaye', phone: '78 555 66 77', product: 'Amoxicilline 1g', date: '08/02', status: 'pending' }
    ]);

    const handleRelease = (id) => {
        setReservedList(prev => prev.filter(r => r.id !== id));
        // Logic to return block to general stock would go here
    };

    const handleNotifyAndReserve = (id) => {
        setNotifyingPatientId(id);
        setTimeout(() => {
            const entry = waitlist.find(w => w.id === id);
            const today = new Date();
            const expiry = new Date();
            expiry.setDate(today.getDate() + 2); // 48h expiry

            setNotifyingPatientId(null);
            setNotifiedPatients(prev => [...prev, id]);
            setReservedList(prev => [
                ...prev,
                {
                    id: Math.random(),
                    patient: entry.patient,
                    phone: entry.phone,
                    product: entry.product,
                    date: today.toLocaleDateString(),
                    expiry: expiry.toLocaleDateString(),
                    status: 'active'
                }
            ]);
        }, 1200);
    };

    const validateReception = () => {
        const matches = waitlist.filter(w => receivedItems.some(r => r.name.toLowerCase().includes(w.product.toLowerCase())));
        if (matches.length > 0) setShowBackorderAlerts(true);
        else { resetReception(); }
    };

    const resetReception = () => {
        setReceivedItems([]);
        setShowReceiveModal(false);
    };

    return (
        <div className="inventory fade-in">
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--secondary)' }}>Gestion Logistique</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Contrôlez vos stocks et gérez les réservations expirées.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button onClick={() => setShowReceiveModal(true)} style={{ padding: '0.85rem 1.5rem', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)' }}><Barcode size={20} /> Réception Livraison</button>
                    <button onClick={() => setShowOrderModal(true)} className="glass" style={{ padding: '0.85rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)', color: 'var(--secondary)', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Truck size={20} /> Commande Express</button>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px', marginBottom: '24px' }}>
                {/* Stats Section */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                    {[
                        { label: 'RÉFÉRENCES', val: MOCK_PRODUCTS.length, icon: Package, color: 'var(--primary)', bg: '#f0fdf4' },
                        { label: 'RÉSERVATIONS', val: reservedList.filter(r => r.status === 'active').length, icon: BookmarkCheck, color: '#8b5cf6', bg: '#f5f3ff' },
                        { label: 'À LIBÉRER', val: reservedList.filter(r => r.status === 'expired').length, icon: Clock, color: 'var(--error)', bg: '#fef2f2' }
                    ].map((stat, i) => (
                        <div key={i} className="card" style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', padding: '24px' }}>
                            <div style={{ padding: '16px', backgroundColor: stat.bg, borderRadius: '20px', color: stat.color }}>
                                <stat.icon size={28} />
                            </div>
                            <div>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '800' }}>{stat.label}</p>
                                <p style={{ fontSize: '1.8rem', fontWeight: '950', color: 'var(--secondary)' }}>{stat.val}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Expiry Management Sidebar */}
                <div className="card" style={{ padding: '24px', border: '2px solid #fee2e2', background: 'linear-gradient(180deg, #ffffff 0%, #fffbfc 100%)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                        <div style={{ backgroundColor: '#fee2e2', padding: '8px', borderRadius: '10px' }}><AlertTriangle size={20} color="#ef4444" /></div>
                        <h3 style={{ fontWeight: '900', color: 'var(--secondary)', fontSize: '1rem' }}>Nettoyage Réserves</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {reservedList.filter(r => r.status === 'expired').map((res) => (
                            <div key={res.id} style={{ padding: '16px', backgroundColor: 'white', borderRadius: '16px', border: '1px solid #fee2e2', position: 'relative' }}>
                                <div style={{ marginBottom: '8px' }}>
                                    <p style={{ fontWeight: '800', color: 'var(--secondary)', fontSize: '0.9rem' }}>{res.patient}</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--error)', fontWeight: '700' }}>Expiré le {res.expiry}</p>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{res.product}</span>
                                    <button
                                        onClick={() => handleRelease(res.id)}
                                        style={{ padding: '6px 12px', borderRadius: '8px', border: 'none', background: '#fef2f2', color: '#ef4444', fontWeight: '800', fontSize: '0.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                                    >
                                        <RefreshCcw size={12} /> LIBÉRER
                                    </button>
                                </div>
                            </div>
                        ))}
                        {reservedList.filter(r => r.status === 'expired').length === 0 && (
                            <div style={{ textAlign: 'center', padding: '20px', opacity: 0.5 }}>
                                <CheckCircle size={32} color="var(--success)" style={{ margin: '0 auto 10px' }} />
                                <p style={{ fontSize: '0.8rem' }}>Aucune réserve expirée.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Inventory Table with Reservation Indicators */}
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
                            <th>Stock Réel</th>
                            <th>Réserves</th>
                            <th>État</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_PRODUCTS.slice(0, 10).map(p => {
                            const activeRes = reservedList.filter(r => r.product.toLowerCase().includes(p.name.toLowerCase()) && r.status === 'active');
                            const expiredRes = reservedList.filter(r => r.product.toLowerCase().includes(p.name.toLowerCase()) && r.status === 'expired');

                            return (
                                <tr key={p.id}>
                                    <td style={{ padding: '18px 20px' }}><div style={{ fontWeight: '700' }}>{p.name}</div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.labs}</div></td>
                                    <td><span style={{ fontWeight: '800' }}>{p.stock}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            {activeRes.length > 0 && <span style={{ padding: '4px 8px', borderRadius: '6px', background: '#f5f3ff', color: '#8b5cf6', fontSize: '0.7rem', fontWeight: '800' }}>{activeRes.length} ACTIVE</span>}
                                            {expiredRes.length > 0 && <span style={{ padding: '4px 8px', borderRadius: '6px', background: '#fef2f2', color: '#ef4444', fontSize: '0.7rem', fontWeight: '800' }}>{expiredRes.length} EXPIRÉE</span>}
                                            {activeRes.length === 0 && expiredRes.length === 0 && <span style={{ opacity: 0.3 }}>-</span>}
                                        </div>
                                    </td>
                                    <td><span style={{ padding: '6px 12px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '800', backgroundColor: p.status === 'Normal' ? '#f0fdf4' : '#fef2f2', color: p.status === 'Normal' ? '#15803d' : '#b91c1c' }}>{p.status.toUpperCase()}</span></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Modal de Réception (Simulation Logic as before) */}
            {showReceiveModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.9)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                    <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '32px', width: '900px', maxHeight: '92vh', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Réception & Réservation Automatique (48h)</h2>
                            <button onClick={() => setShowReceiveModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={24} /></button>
                        </div>
                        <div style={{ flex: 1, padding: '40px', textAlign: 'center', border: '2px dashed #e2e8f0', borderRadius: '24px' }}>
                            <p style={{ color: 'var(--text-muted)' }}>Simulation du flux de 48h active...</p>
                            <button onClick={() => setReceivedItems([{ name: 'Amoxicilline 1g' }])} style={{ marginTop: '20px', padding: '12px 24px', borderRadius: '12px', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: '800' }}>SIMULER RÉCEPTION AMOXICILLINE</button>
                        </div>
                        {receivedItems.length > 0 && (
                            <div className="fade-in" style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f0fdf4', borderRadius: '16px', border: '1px solid #16a34a' }}>
                                <p style={{ fontWeight: '800', color: '#166534' }}>Awa Ndiaye a été notifiée. Stock réservé jusqu'au {(new Date(Date.now() + 172800000)).toLocaleDateString()}.</p>
                                <button onClick={validateReception} style={{ marginTop: '10px', width: '100%', padding: '12px', borderRadius: '10px', background: '#16a34a', color: 'white', border: 'none', fontWeight: '800' }}>VALIDER</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
