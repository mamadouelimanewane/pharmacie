import React, { useState } from 'react';
import {
    Package, Search, Filter, ArrowUpRight, AlertTriangle,
    RefreshCcw, Download, Calendar, Truck, Barcode,
    X, CheckCircle2, Plus, Trash2, FileText,
    AlertCircle, CheckCircle, ArrowRight, Smartphone,
    QrCode, Loader2, Camera, Image as ImageIcon,
    Bell, MessageCircle, Send, User, BellRing, Bookmark,
    BookmarkCheck, History, Clock, ShieldCheck, ShieldAlert
} from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockData';

export default function Inventory() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [showReceiveModal, setShowReceiveModal] = useState(false);
    const [activeView, setActiveView] = useState('logistic'); // 'logistic', 'physical', 'returns', 'destruction', 'alerts', 'planning'
    const [physicalInventory, setPhysicalInventory] = useState({});
    const [inventoryLog, setInventoryLog] = useState([]);
    const [isReconciling, setIsReconciling] = useState(false);

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

    const [healthAlerts, setHealthAlerts] = useState([
        { id: 1, type: 'Recall', product: 'Zovirax 200mg', lot: 'LT99281', level: 'Critical', date: '08/02/2026', source: 'ANSM', status: 'Pending', affectedPatients: 3 }
    ]);
    const [selectedAlertForPatients, setSelectedAlertForPatients] = useState(null);

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

    const handleCountChange = (productId, count) => {
        setPhysicalInventory(prev => ({
            ...prev,
            [productId]: parseInt(count) || 0
        }));
    };

    const commitInventory = () => {
        setIsReconciling(true);
        setTimeout(() => {
            const corrections = Object.keys(physicalInventory).map(pid => {
                const product = MOCK_PRODUCTS.find(p => p.id === parseInt(pid));
                const diff = physicalInventory[pid] - product.stock;
                return {
                    id: Math.random(),
                    date: new Date().toLocaleString(),
                    product: product.name,
                    oldStock: product.stock,
                    newStock: physicalInventory[pid],
                    difference: diff,
                    status: diff === 0 ? 'Conforme' : diff > 0 ? 'Surplus' : 'Perte'
                };
            });

            setInventoryLog(prev => [...corrections.filter(c => c.difference !== 0), ...prev]);
            setPhysicalInventory({});
            setIsReconciling(false);
            alert("Inventaire physique validé et stocks mis à jour dans le grand livre.");
        }, 2000);
    };

    return (
        <div className="inventory fade-in">
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--secondary)' }}>
                        {activeView === 'logistic' ? 'Gestion Logistique' : activeView === 'physical' ? 'Inventaire Physique' : activeView === 'returns' ? 'Retours Fournisseurs' : activeView === 'destruction' ? 'Destruction Sécurisée' : activeView === 'alerts' ? 'Centre d\'Alertes Sanitaires' : 'Planning Prédictif IA'}
                    </h1>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                        <button
                            onClick={() => setActiveView('logistic')}
                            style={{ background: 'none', border: 'none', color: activeView === 'logistic' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '800', cursor: 'pointer', borderBottom: activeView === 'logistic' ? '2px solid var(--primary)' : '2px solid transparent', paddingBottom: '4px' }}
                        >
                            Logistique & Réserves
                        </button>
                        <button
                            onClick={() => setActiveView('physical')}
                            style={{ background: 'none', border: 'none', color: activeView === 'physical' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '800', cursor: 'pointer', borderBottom: activeView === 'physical' ? '2px solid var(--primary)' : '2px solid transparent', paddingBottom: '4px' }}
                        >
                            Comptage Physique
                        </button>
                        <button
                            onClick={() => setActiveView('returns')}
                            style={{ background: 'none', border: 'none', color: activeView === 'returns' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '800', cursor: 'pointer', borderBottom: activeView === 'returns' ? '2px solid var(--primary)' : '2px solid transparent', paddingBottom: '4px' }}
                        >
                            Retours Fournisseurs
                        </button>
                        <button
                            onClick={() => setActiveView('destruction')}
                            style={{ background: 'none', border: 'none', color: activeView === 'destruction' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '800', cursor: 'pointer', borderBottom: activeView === 'destruction' ? '2px solid var(--primary)' : '2px solid transparent', paddingBottom: '4px' }}
                        >
                            Destruction Sécurisée
                        </button>
                        <button
                            onClick={() => setActiveView('alerts')}
                            style={{ background: 'none', border: 'none', color: activeView === 'alerts' ? '#ef4444' : 'var(--text-muted)', fontWeight: '800', cursor: 'pointer', borderBottom: activeView === 'alerts' ? '2px solid #ef4444' : '2px solid transparent', paddingBottom: '4px' }}
                        >
                            <AlertCircle size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                            Alertes Sanitaires
                        </button>
                        <button
                            onClick={() => setActiveView('planning')}
                            style={{ background: 'none', border: 'none', color: activeView === 'planning' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '800', cursor: 'pointer', borderBottom: activeView === 'planning' ? '2px solid var(--primary)' : '2px solid transparent', paddingBottom: '4px' }}
                        >
                            <RefreshCcw size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                            Planning Prédictif IA
                        </button>
                    </div>
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

            {/* Main Content Toggle */}
            {activeView === 'logistic' && (
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
            )}

            {activeView === 'physical' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '2rem' }}>
                    <div className="card" style={{ padding: 0, borderRadius: '24px', overflow: 'hidden' }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                            <h3 style={{ fontWeight: '900', fontSize: '1.1rem' }}>Saisie des Écarts</h3>
                            <button
                                onClick={commitInventory}
                                disabled={Object.keys(physicalInventory).length === 0 || isReconciling}
                                style={{ padding: '0.75rem 1.5rem', borderRadius: '12px', backgroundColor: 'var(--secondary)', color: 'white', fontWeight: '800', border: 'none', cursor: 'pointer', opacity: (Object.keys(physicalInventory).length === 0 || isReconciling) ? 0.5 : 1 }}
                            >
                                {isReconciling ? 'Rapprochement...' : 'Valider l\'Inventaire'}
                            </button>
                        </div>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th style={{ padding: '20px' }}>Produit</th>
                                    <th>Système</th>
                                    <th>Physique</th>
                                    <th>Écart</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_PRODUCTS.slice(0, 8).map(p => {
                                    const physical = physicalInventory[p.id] !== undefined ? physicalInventory[p.id] : p.stock;
                                    const diff = physical - p.stock;
                                    return (
                                        <tr key={p.id}>
                                            <td style={{ padding: '16px 20px' }}>
                                                <div style={{ fontWeight: '800' }}>{p.name}</div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{p.ean}</div>
                                            </td>
                                            <td style={{ fontWeight: '700', fontSize: '1.1rem' }}>{p.stock}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={physicalInventory[p.id] || ''}
                                                    placeholder={p.stock}
                                                    onChange={(e) => handleCountChange(p.id, e.target.value)}
                                                    style={{ width: '80px', padding: '10px', borderRadius: '10px', border: '2px solid #e2e8f0', textAlign: 'center', fontWeight: '900', fontSize: '1.1rem' }}
                                                />
                                            </td>
                                            <td>
                                                {diff !== 0 && (
                                                    <span style={{ fontWeight: '900', color: diff > 0 ? 'var(--success)' : 'var(--error)' }}>
                                                        {diff > 0 ? `+${diff}` : diff}
                                                    </span>
                                                )}
                                                {diff === 0 && <span style={{ opacity: 0.2 }}>-</span>}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="card" style={{ background: '#0f172a', color: 'white' }}>
                            <h4 style={{ color: 'white', fontWeight: '900', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <History size={20} color="var(--primary)" /> Audit des Ajustements
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '400px', overflowY: 'auto' }}>
                                {inventoryLog.map(log => (
                                    <div key={log.id} style={{ padding: '12px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', borderLeft: `4px solid ${log.difference > 0 ? '#10b981' : '#f43f5e'}` }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                            <span style={{ fontSize: '0.8rem', fontWeight: '800' }}>{log.product}</span>
                                            <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>{log.date.split(' ')[1]}</span>
                                        </div>
                                        <p style={{ fontSize: '0.75rem', color: log.difference > 0 ? '#10b981' : '#f43f5e', fontWeight: '800' }}>
                                            {log.status} : {log.difference > 0 ? '+' : ''}{log.difference} unités
                                        </p>
                                    </div>
                                ))}
                                {inventoryLog.length === 0 && (
                                    <p style={{ textAlign: 'center', fontSize: '0.8rem', opacity: 0.4, padding: '20px' }}>Aucun ajustement récent.</p>
                                )}
                            </div>
                        </div>

                        <div className="card" style={{ border: '1px dashed var(--border)' }}>
                            <h4 style={{ fontWeight: '900', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Download size={18} /> Rapports d'Inventaire
                            </h4>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                                <button className="glass" style={{ width: '100%', padding: '12px', borderRadius: '10px', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}>📄 Export PDF - Écarts de Stock</button>
                                <button className="glass" style={{ width: '100%', padding: '12px', borderRadius: '10px', textAlign: 'left', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}>📊 Valorisation des Pertes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeView === 'returns' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: '2rem' }} className="fade-in">
                    <div className="card" style={{ padding: 0 }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', background: '#fffbeb' }}>
                            <h3 style={{ fontWeight: '900', fontSize: '1.2rem', color: '#92400e', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <ArrowRight size={20} /> Planificateur de Retours Laboratoires
                            </h3>
                            <p style={{ fontSize: '0.8rem', color: '#b45309', marginTop: '4px' }}>Séléctionnez les produits à retirer des rayons pour renvoi ou destruction.</p>
                        </div>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th style={{ padding: '20px' }}>Produit</th>
                                    <th>Péremption</th>
                                    <th>Qte Retour</th>
                                    <th>Motif</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { id: 201, name: 'Augmentin 500mg', shelf: 'Rayon A1', expiry: '03/2026', stock: 12, price: 5400 },
                                    { id: 202, name: 'Spasfon Lyoc', shelf: 'Rayon B2', expiry: '02/2026', stock: 8, price: 3200 },
                                    { id: 203, name: 'Doliprane 500mg', shelf: 'Rayon A4', expiry: 'Expiré', stock: 25, price: 1500 }
                                ].map(item => (
                                    <tr key={item.id}>
                                        <td style={{ padding: '16px 20px' }}>
                                            <div style={{ fontWeight: '800' }}>{item.name}</div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.shelf}</div>
                                        </td>
                                        <td>
                                            <span style={{ padding: '4px 8px', borderRadius: '6px', backgroundColor: item.expiry === 'Expiré' ? '#fee2e2' : '#fffbeb', color: item.expiry === 'Expiré' ? '#ef4444' : '#b45309', fontSize: '0.75rem', fontWeight: '900' }}>
                                                {item.expiry}
                                            </span>
                                        </td>
                                        <td style={{ fontWeight: '900' }}>{item.stock}</td>
                                        <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Péremption proche</td>
                                        <td>
                                            <button style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', color: 'var(--secondary)', fontWeight: '800', cursor: 'pointer', fontSize: '0.75rem' }}>AJOUTER AU COLIS</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="card" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', color: 'white' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '14px' }}>
                                    <Package size={24} color="var(--primary)" />
                                </div>
                                <div>
                                    <h4 style={{ color: 'white', fontWeight: '900', fontSize: '1rem' }}>Colis de Retour #BK-2026</h4>
                                    <p style={{ fontSize: '0.7rem', opacity: 0.6 }}>Destination : Grossiste Répartiteur</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                    <span style={{ opacity: 0.7 }}>Produits séléctionnés</span>
                                    <span style={{ fontWeight: '800' }}>14 articles</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                                    <span style={{ opacity: 0.7 }}>Valeur Marchande (C.A)</span>
                                    <span style={{ fontWeight: '800' }}>92,400 F</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                    <span style={{ fontWeight: '900' }}>Total Crédit Attendu</span>
                                    <span style={{ fontWeight: '950', color: 'var(--primary)' }}>78,500 F</span>
                                </div>
                            </div>

                            <button style={{ width: '100%', padding: '16px', borderRadius: '16px', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: '900', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.4)' }}>
                                GÉNÉRER LE BON DE RETOUR
                            </button>
                        </div>

                        <div className="card">
                            <h4 style={{ fontWeight: '900', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <RefreshCcw size={18} color="var(--primary)" /> Suivi des Avoirs
                            </h4>
                            <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                                <p style={{ fontSize: '0.75rem', fontWeight: '800' }}>Avoir #RET-982 (LABOREX)</p>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>En attente de validation • 45,000 F</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeView === 'destruction' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }} className="fade-in">
                    <div className="card" style={{ padding: 0 }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', backgroundColor: '#fef2f2' }}>
                            <h3 style={{ fontWeight: '900', fontSize: '1.2rem', color: '#991b1b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Trash2 size={24} /> Mise au Rebut & Destruction
                            </h3>
                            <p style={{ fontSize: '0.8rem', color: '#b91c1c', marginTop: '4px' }}>Procédure légale de retrait définitif du stock (Stupéfiants, Périmés, Casses).</p>
                        </div>
                        <div style={{ padding: '24px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr auto', gap: '16px', marginBottom: '24px' }}>
                                <input type="text" placeholder="Sélectionner le produit..." style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
                                <input type="number" placeholder="Qté" style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
                                <select style={{ padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                    <option>Motif: Périmé</option>
                                    <option>Motif: Stupéfiant</option>
                                    <option>Motif: Casse/Fuite</option>
                                    <option>Motif: Rappel Lot</option>
                                </select>
                                <button style={{ padding: '12px 24px', borderRadius: '10px', border: 'none', backgroundColor: '#ef4444', color: 'white', fontWeight: '800', cursor: 'pointer' }}>AJOUTER</button>
                            </div>

                            <table className="data-table" style={{ border: '1px solid #fee2e2' }}>
                                <thead>
                                    <tr>
                                        <th>Produit</th>
                                        <th>Qté</th>
                                        <th>Motif</th>
                                        <th>Valeur</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={{ backgroundColor: '#fffafa' }}>
                                        <td style={{ fontWeight: '700' }}>Morphine 10mg Amp.</td>
                                        <td>5 units</td>
                                        <td><span style={{ color: '#ef4444', fontWeight: '800' }}>STUPÉFIANT</span></td>
                                        <td style={{ fontWeight: '800' }}>12,500 F</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="card" style={{ border: '2px solid #ef4444' }}>
                            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <ShieldCheck size={48} color="#ef4444" style={{ marginBottom: '16px' }} />
                                <h4 style={{ fontWeight: '950', fontSize: '1.1rem', color: '#991b1b' }}>CERTIFICAT DE DESTRUCTION</h4>
                                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Conforme aux normes sanitaires & légales</p>
                            </div>

                            <div style={{ border: '1px dashed #ef4444', padding: '16px', borderRadius: '12px', backgroundColor: '#fff5f5', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '8px' }}>
                                    <span style={{ fontWeight: '700' }}>Date :</span>
                                    <span>{new Date().toLocaleDateString()}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '8px' }}>
                                    <span style={{ fontWeight: '700' }}>Responsable :</span>
                                    <span>Dr. Eliman Wane</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '8px' }}>
                                    <span style={{ fontWeight: '700' }}>Total Articles :</span>
                                    <span style={{ fontWeight: '800' }}>5 unités</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                    <span style={{ fontWeight: '700' }}>Status :</span>
                                    <span style={{ color: '#ef4444', fontWeight: '900' }}>EN ATTENTE DE SCELLÉ</span>
                                </div>
                            </div>

                            <button onClick={() => alert("Certificat généré et transmis aux autorités compétentes.")} style={{ width: '100%', padding: '16px', borderRadius: '16px', backgroundColor: '#991b1b', color: 'white', border: 'none', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <FileText size={20} /> GÉNÉRER LE PV DE DESTRUCTION
                            </button>
                        </div>

                        <div className="card">
                            <h4 style={{ fontWeight: '900', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <History size={18} /> Registre des Destructions
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ padding: '10px', borderRadius: '10px', background: '#f8fafc', fontSize: '0.75rem', border: '1px solid #e2e8f0' }}>
                                    <div style={{ fontWeight: '800' }}>#PV-2026-001</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', marginTop: '4px' }}>
                                        <span>12/01/2026</span>
                                        <span style={{ color: 'var(--success)', fontWeight: '800' }}>✓ ARCHIVÉ</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeView === 'alerts' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '2rem' }} className="fade-in">
                    <div className="card" style={{ padding: 0 }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', background: '#fef2f2', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ fontWeight: '900', fontSize: '1.2rem', color: '#991b1b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <ShieldAlert size={24} /> Veille Sanitaire Pharmacovigilance
                                </h3>
                                <p style={{ fontSize: '0.8rem', color: '#b91c1c', marginTop: '4px' }}>Surveillance en temps réel des rappels ANSM et alertes internationales.</p>
                            </div>
                            <button className="glass" style={{ padding: '10px 20px', borderRadius: '12px', color: '#991b1b', border: '1px solid #fee2e2', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <RefreshCcw size={18} /> SCANNER ANSM
                            </button>
                        </div>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th style={{ padding: '20px' }}>Type / Produit</th>
                                    <th>Lot Affecté</th>
                                    <th>Risque</th>
                                    <th>Source</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {healthAlerts.map(alert => (
                                    <tr key={alert.id} style={{ borderLeft: alert.level === 'Critical' ? '4px solid #ef4444' : '4px solid #f59e0b' }}>
                                        <td style={{ padding: '16px 20px' }}>
                                            <div style={{ fontWeight: '800' }}>{alert.product}</div>
                                            <div style={{ fontSize: '0.7rem', color: '#991b1b', fontWeight: '700' }}>{alert.type.toUpperCase()}</div>
                                        </td>
                                        <td style={{ fontWeight: '900', color: '#1e293b' }}>{alert.lot}</td>
                                        <td>
                                            <span style={{ padding: '4px 8px', borderRadius: '6px', backgroundColor: alert.level === 'Critical' ? '#fee2e2' : '#fffbeb', color: alert.level === 'Critical' ? '#ef4444' : '#b45309', fontSize: '0.7rem', fontWeight: '900' }}>
                                                {alert.level.toUpperCase()}
                                            </span>
                                        </td>
                                        <td style={{ fontSize: '0.8rem', fontWeight: '700' }}>{alert.source}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    onClick={() => setSelectedAlertForPatients(alert)}
                                                    style={{ padding: '6px 12px', borderRadius: '8px', border: 'none', backgroundColor: '#ef4444', color: 'white', fontSize: '0.7rem', fontWeight: '800', cursor: 'pointer' }}
                                                >
                                                    {alert.affectedPatients} PATIENTS À CONTACTER
                                                </button>
                                                <button style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', color: '#64748b', fontSize: '0.7rem', fontWeight: '800', cursor: 'pointer' }}>IGNORER</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="card" style={{ background: '#0f172a', color: 'white' }}>
                            <h4 style={{ color: 'white', fontWeight: '900', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <AlertTriangle size={20} color="#f59e0b" /> Stats Sécurité
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#ef4444' }}>{healthAlerts.length}</div>
                                    <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>Alertes actives nécessitant une action</div>
                                </div>
                                <div style={{ padding: '16px', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '0.7rem', fontWeight: '700' }}>Couverture ANSM</span>
                                        <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: '800' }}>OPÉRATIONNEL</span>
                                    </div>
                                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px' }}>
                                        <div style={{ height: '100%', width: '100%', background: '#10b981', borderRadius: '2px' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <h4 style={{ fontWeight: '900', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <FileText size={18} /> Actions Automatisées
                            </h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Configuration de l'isolation des lots suspects.</p>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', cursor: 'pointer' }}>
                                <input type="checkbox" defaultChecked /> Bloquer la vente à l'officine
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', cursor: 'pointer', marginTop: '10px' }}>
                                <input type="checkbox" defaultChecked /> Alerter le préparateur au scan
                            </label>
                        </div>
                    </div>
                </div>
            )}

            {/* Patient Recall Modal */}
            {selectedAlertForPatients && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.9)', zIndex: 6000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
                    <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '32px', width: '700px', maxWidth: '90vw' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                            <div>
                                <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#991b1b', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Users size={28} /> Rappel Patients : {selectedAlertForPatients.product}
                                </h2>
                                <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>Lot {selectedAlertForPatients.lot} • Source {selectedAlertForPatients.source}</p>
                            </div>
                            <button onClick={() => setSelectedAlertForPatients(null)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={24} /></button>
                        </div>

                        <div style={{ backgroundColor: '#fff7ed', border: '1px solid #ffedd5', padding: '20px', borderRadius: '20px', marginBottom: '32px', display: 'flex', gap: '16px', alignItems: 'start' }}>
                            <AlertTriangle color="#f59e0b" size={24} />
                            <p style={{ fontSize: '0.85rem', color: '#9a3412', lineHeight: '1.5' }}>
                                ⚠️ <strong>Action Requise :</strong> Ces patients ont reçu ce lot durant les 30 derniers jours. Vous devez les informer immédiatement de ne pas consommer le produit et de le rapporter à l'officine.
                            </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { name: 'Mme Fatou Sow', phone: '77 450 11 22', date: '02/02/2026', qty: 2 },
                                { name: 'M. Amadou Diallo', phone: '76 300 44 55', date: '28/01/2026', qty: 1 },
                                { name: 'Mme Khady Ndiaye', phone: '78 123 77 88', date: '15/01/2026', qty: 1 }
                            ].map((patient, idx) => (
                                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderRadius: '16px', border: '1px solid #f1f5f9', background: '#f8fafc' }}>
                                    <div>
                                        <div style={{ fontWeight: '800', fontSize: '1rem' }}>{patient.name}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>Délivré le {patient.date} • {patient.qty} boîte(s)</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <button className="glass" style={{ padding: '10px 16px', borderRadius: '100px', border: '1px solid #e2e8f0', color: 'var(--secondary)', fontWeight: '800', fontSize: '0.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <MessageCircle size={14} /> SMS
                                        </button>
                                        <button style={{ padding: '10px 16px', borderRadius: '100px', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: '800', fontSize: '0.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <Smartphone size={14} /> APPELER
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                            <button onClick={() => setSelectedAlertForPatients(null)} className="glass" style={{ padding: '14px 28px', borderRadius: '14px', border: '1px solid #e2e8f0', color: 'var(--secondary)', fontWeight: '800', cursor: 'pointer' }}>FERMER</button>
                            <button onClick={() => { alert("Protocole de rappel général activé."); setSelectedAlertForPatients(null); }} style={{ padding: '14px 28px', borderRadius: '14px', border: 'none', background: '#991b1b', color: 'white', fontWeight: '900', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(153, 27, 27, 0.4)' }}>DÉCLARER RAPPEL EFFECTUÉ</button>
                        </div>
                    </div>
                </div>
            )}

            {activeView === 'planning' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: '2rem' }} className="fade-in">
                    <div className="card" style={{ padding: 0 }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)' }}>
                            <h3 style={{ fontWeight: '900', fontSize: '1.2rem', color: '#1e40af', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <RefreshCcw size={20} /> Prévisions de Stock Stratégique (IA)
                            </h3>
                            <p style={{ fontSize: '0.85rem', color: '#3b82f6', marginTop: '4px', fontWeight: '600' }}>Analyse basée sur les tendances épidémiologiques et historiques Sédar/ANSM</p>
                        </div>
                        <div style={{ padding: '24px' }}>
                            <div className="table-container">
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--border)' }}>
                                            <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '800' }}>PRODUIT</th>
                                            <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '800' }}>DEMANDE PRÉVUE (30j)</th>
                                            <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '800' }}>STOCK ACTUEL</th>
                                            <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '800' }}>COMMANDE SUGGÉRÉE</th>
                                            <th style={{ padding: '12px 16px', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '800' }}>CONTEXTE IA</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { name: 'Coartem Dispersible', demand: '+150%', stock: 24, suggest: 120, trend: 'Saison des pluies - Pic Palu', color: '#dc2626' },
                                            { name: 'Humex Rhume', demand: '+85%', stock: 12, suggest: 60, trend: 'Vague de froid matinal prévue', color: '#ea580c' },
                                            { name: 'Amoxicilline 1g', demand: '+20%', stock: 45, suggest: 30, trend: 'Demande stable', color: '#2563eb' },
                                            { name: 'Paracétamol 1000mg', demand: '+10%', stock: 156, suggest: 0, trend: 'Couverture suffisante', color: '#16a34a' }
                                        ].map((item, idx) => (
                                            <tr key={idx} style={{ borderBottom: '1px solid var(--border)' }}>
                                                <td style={{ padding: '16px', fontWeight: '800', color: 'var(--secondary)' }}>{item.name}</td>
                                                <td style={{ padding: '16px', fontWeight: '900', color: item.color }}>{item.demand}</td>
                                                <td style={{ padding: '16px', fontWeight: '700' }}>{item.stock}</td>
                                                <td style={{ padding: '16px' }}>
                                                    <span style={{ padding: '4px 12px', background: item.suggest > 0 ? '#10b981' : '#f1f5f9', color: item.suggest > 0 ? 'white' : 'var(--text-muted)', borderRadius: '100px', fontWeight: '900', fontSize: '0.85rem' }}>
                                                        {item.suggest > 0 ? `+${item.suggest} Btes` : 'A JOUR'}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '16px', fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>{item.trend}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div className="card" style={{ background: 'var(--secondary)', color: 'white', padding: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                <ShieldCheck color="var(--primary)" size={24} />
                                <h3 style={{ fontWeight: '900', fontSize: '1.1rem' }}>Sérénité d'Appro</h3>
                            </div>
                            <p style={{ opacity: 0.8, fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '20px' }}>
                                L'IA a analysé les 3 dernières années et les rapports météo. <strong>Vague de grippe</strong> prévue sous 10 jours.
                            </p>
                            <button style={{ width: '100%', padding: '16px', borderRadius: '14px', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: '900', cursor: 'pointer', boxShadow: '0 4px 6px rgba(16, 185, 129, 0.4)' }}>
                                GÉNÉRER LE PANIER IA
                            </button>
                        </div>

                        <div className="card" style={{ border: '1px solid #dbeafe', background: '#f8faff', padding: '24px' }}>
                            <h4 style={{ fontWeight: '900', fontSize: '0.9rem', color: '#1e40af', marginBottom: '16px' }}>ANALYSE DES FLUX LOCAUX</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {[
                                    { label: 'Indice de Rupture Évité', val: '98%', color: '#16a34a' },
                                    { label: 'Réduction Surstock', val: '-15%', color: '#2563eb' },
                                    { label: 'Optimisation Trésorerie', val: '+2.4M F', color: '#8b5cf6' }
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>{stat.label}</span>
                                            <span style={{ fontSize: '0.85rem', fontWeight: '900', color: stat.color }}>{stat.val}</span>
                                        </div>
                                        <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '3px' }}>
                                            <div style={{ height: '100%', width: stat.val.includes('%') ? stat.val.replace('-', '') : '80%', background: stat.color, borderRadius: '3px' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
