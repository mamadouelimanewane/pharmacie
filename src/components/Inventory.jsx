import React, { useState } from 'react';
import {
    Package, Search, Filter, ArrowUpRight, AlertTriangle,
    RefreshCcw, Download, Calendar, Truck, Barcode,
    X, CheckCircle2, Plus, Trash2, FileText,
    AlertCircle, CheckCircle, ArrowRight, Smartphone,
    QrCode, Loader2, Camera, Image as ImageIcon,
    Bell, MessageCircle, Send, User, BellRing, Bookmark,
    BookmarkCheck
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
    const [reservedList, setReservedList] = useState([]); // Tracking reserved items

    // Mock Waitlist
    const [waitlist, setWaitlist] = useState([
        { id: 1, patient: 'Mme Diop', phone: '77 125 44 22', product: 'Ventoline Inhalateur', date: '05/02', status: 'pending' },
        { id: 2, patient: 'M. Sarr', phone: '76 890 11 33', product: 'Doliprane 1000mg', date: '07/02', status: 'pending' },
        { id: 3, patient: 'Awa Ndiaye', phone: '78 555 66 77', product: 'Amoxicilline 1g', date: '08/02', status: 'pending' }
    ]);

    const handleNotifyAndReserve = (id) => {
        setNotifyingPatientId(id);
        setTimeout(() => {
            const entry = waitlist.find(w => w.id === id);
            setNotifyingPatientId(null);
            setNotifiedPatients(prev => [...prev, id]);
            // Automatically add to reservation list
            setReservedList(prev => [...prev, { ...entry, reservationDate: new Date().toLocaleDateString() }]);
        }, 1200);
    };

    const validateReception = () => {
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

    const getExpiryColor = (expiryStr) => {
        const expiry = new Date(expiryStr);
        const now = new Date();
        const diffMonths = (expiry.getFullYear() - now.getFullYear()) * 12 + (expiry.getMonth() - now.getMonth());
        if (diffMonths < 3) return '#fee2e2';
        if (diffMonths < 6) return '#fef3c7';
        return '#f1f5f9';
    };

    return (
        <div className="inventory fade-in">
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--secondary)' }}>Gestion Logistique</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Réceptionnez, réservez pour vos clients et suivez vos envois.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button onClick={() => setShowReceiveModal(true)} style={{ padding: '0.85rem 1.5rem', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)' }}><Barcode size={20} /> Réception Livraison</button>
                    <button onClick={() => setShowOrderModal(true)} className="glass" style={{ padding: '0.85rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)', color: 'var(--secondary)', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Truck size={20} /> Commande Express</button>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '24px', marginBottom: '24px' }}>
                {/* Main Stats Column */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                    {[
                        { label: 'RÉFÉRENCES', val: MOCK_PRODUCTS.length, icon: Package, color: 'var(--primary)' },
                        { label: 'RÉSERVATIONS', val: reservedList.length, icon: BookmarkCheck, color: '#8b5cf6' },
                        { label: 'LIVRAISONS JOUR', val: '2', icon: Truck, color: '#f59e0b' }
                    ].map((stat, i) => (
                        <div key={i} className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '24px' }}>
                            <div style={{ padding: '16px', backgroundColor: `${stat.color}15`, borderRadius: '16px', color: stat.color }}>
                                <stat.icon size={28} />
                            </div>
                            <div>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700' }}>{stat.label}</p>
                                <p style={{ fontSize: '1.5rem', fontWeight: '900' }}>{stat.val}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Reservation sidebar summary */}
                <div className="card" style={{ padding: '20px', border: '1px solid #ddd6fe', background: '#f5f3ff33' }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Bookmark size={18} color="#8b5cf6" /> Réservations Prioritaires
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {reservedList.length > 0 ? reservedList.map((res, idx) => (
                            <div key={idx} style={{ padding: '10px', backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '0.8rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <span style={{ fontWeight: '800' }}>{res.patient}</span>
                                    <span style={{ color: 'var(--primary)', fontWeight: '700' }}>OK</span>
                                </div>
                                <p style={{ opacity: 0.7 }}>{res.product}</p>
                            </div>
                        )) : <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '10px' }}>Aucune réserve active.</p>}
                    </div>
                </div>
            </div>

            {/* Modal de Réception avec Alertes & Réservation */}
            {showReceiveModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.9)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                    <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '32px', width: showBackorderAlerts ? '650px' : '900px', maxHeight: '92vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', overflow: 'hidden', transition: 'width 0.3s' }}>

                        {!showBackorderAlerts ? (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Réception Colis Grossiste</h2>
                                    <button onClick={() => setShowReceiveModal(false)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={24} /></button>
                                </div>

                                <div style={{ padding: '20px', backgroundColor: '#f0f9ff', borderRadius: '16px', textAlign: 'center', border: '2px dashed #0ea5e9', marginBottom: '20px', cursor: 'pointer' }} onClick={() => setReceivedItems([{ id: 1, name: 'Ventoline Inhalateur', stock: 0, receivedQty: 10, code: '3400930007' }])}>
                                    <p style={{ fontWeight: '800', color: '#0369a1' }}>SCANNEZ VOS BOÎTES ICI...</p>
                                    <p style={{ fontSize: '0.7rem', color: '#0369a1', marginTop: '4px', opacity: 0.7 }}>(Cliquez pour simuler le scan d'une Ventoline réservée)</p>
                                </div>

                                <div style={{ flex: 1, overflowY: 'auto', marginBottom: '24px' }}>
                                    {receivedItems.map(item => (
                                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #f1f5f9', alignItems: 'center' }}>
                                            <div>
                                                <p style={{ fontWeight: '800', color: 'var(--secondary)' }}>{item.name}</p>
                                                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>CIP: {item.code}</p>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <p style={{ fontSize: '1.1rem', fontWeight: '900', color: 'var(--primary)' }}>+ {item.receivedQty}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button onClick={validateReception} disabled={receivedItems.length === 0} style={{ padding: '20px', borderRadius: '18px', background: receivedItems.length === 0 ? '#cbd5e1' : 'var(--primary)', color: 'white', fontWeight: '800', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>INTÉGRER AU STOCK & VÉRIFIER RÉSERVATIONS</button>
                            </>
                        ) : (
                            <div className="fade-in">
                                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                                    <div style={{ width: '64px', height: '64px', backgroundColor: '#f5f3ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                        <BookmarkCheck size={32} color="#8b5cf6" />
                                    </div>
                                    <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: 'var(--secondary)' }}>Alerte & Réservation</h2>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Les articles reçus correspondent à des demandes prioritaires.</p>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                                    {waitlist.filter(w => receivedItems.some(r => r.name.toLowerCase().includes(w.product.toLowerCase()))).map(w => (
                                        <div key={w.id} style={{ padding: '20px', borderRadius: '24px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                    <span style={{ fontWeight: '900', color: 'var(--secondary)', fontSize: '1rem' }}>{w.patient}</span>
                                                    <span style={{ fontSize: '0.7rem', padding: '4px 8px', backgroundColor: '#8b5cf615', color: '#8b5cf6', borderRadius: '8px', fontWeight: '800' }}>{w.product.toUpperCase()}</span>
                                                </div>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px' }}>Attente depuis le {w.date} • {w.phone}</p>
                                            </div>

                                            {notifiedPatients.includes(w.id) ? (
                                                <div style={{ textAlign: 'right' }}>
                                                    <div style={{ color: '#16a34a', fontWeight: '900', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
                                                        <CheckCircle size={18} /> STOCK RÉSERVÉ
                                                    </div>
                                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>SMS de retrait envoyé</p>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => handleNotifyAndReserve(w.id)}
                                                    disabled={notifyingPatientId === w.id}
                                                    style={{ padding: '12px 20px', borderRadius: '14px', border: 'none', background: '#8b5cf6', color: 'white', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', boxShadow: '0 4px 6px rgba(139, 92, 246, 0.3)' }}
                                                >
                                                    {notifyingPatientId === w.id ? <Loader2 size={18} className="spin" /> : <MessageCircle size={18} />}
                                                    {notifyingPatientId === w.id ? 'Réservation...' : 'Notifier & Réserver'}
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div style={{ padding: '16px', background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '16px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                                    <AlertCircle size={20} color="#b45309" />
                                    <p style={{ fontSize: '0.8rem', color: '#92400e', fontWeight: '600' }}>En cliquant sur Notifier, 1 unité du produit est automatiquement "bloquée" pour ce patient dans le stock virtuel de vente.</p>
                                </div>

                                <button onClick={resetReception} style={{ width: '100%', padding: '20px', borderRadius: '18px', background: 'var(--secondary)', color: 'white', fontWeight: '900', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>VALIDER TOUTES LES MISES À JOUR</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Inventory table remains here */}
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
                            <th>Réservé</th>
                            <th>Péremption</th>
                            <th>Emplacement</th>
                            <th>Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(p => {
                            const isReserved = reservedList.some(r => r.product.toLowerCase().includes(p.name.toLowerCase()));
                            return (
                                <tr key={p.id}>
                                    <td style={{ padding: '18px 20px' }}><div style={{ fontWeight: '700' }}>{p.name}</div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.labs} - {p.code}</div></td>
                                    <td><span style={{ fontWeight: '800' }}>{p.stock}</span></td>
                                    <td>
                                        {isReserved ? (
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#8b5cf6', fontWeight: '800', fontSize: '0.85rem' }}>
                                                <Bookmark size={14} /> 1 unité
                                            </span>
                                        ) : <span style={{ opacity: 0.3 }}>-</span>}
                                    </td>
                                    <td><span style={{ padding: '6px 10px', borderRadius: '8px', backgroundColor: getExpiryColor(p.expiry), fontWeight: '700', fontSize: '0.8rem' }}>{new Date(p.expiry).toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })}</span></td>
                                    <td><code style={{ background: '#f8fafc', padding: '4px 8px', borderRadius: '6px', fontSize: '0.8rem', border: '1px solid #f1f5f9' }}>{p.location}</code></td>
                                    <td><span style={{ padding: '6px 12px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '800', backgroundColor: p.status === 'Normal' ? '#f0fdf4' : '#fef2f2', color: p.status === 'Normal' ? '#15803d' : '#b91c1c' }}>{p.status.toUpperCase()}</span></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <style>{`
                @keyframes scanMove {
                    0% { top: 0; }
                    50% { top: 100%; }
                    100% { top: 0; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
