import React, { useState } from 'react';
import {
    FileText, Search, Filter, Clock, CheckCircle,
    AlertCircle, Printer, Download, Eye, Scan,
    Smartphone, MessageCircle, Send, Loader2,
    Calendar, User, ChevronRight, Play, CheckCircle2,
    Zap, Box
} from 'lucide-react';

const INITIAL_PRESCRIPTIONS = [
    { id: 'ORD-2024-001', patient: 'Abdoulaye Diop', phone: '77 452 11 00', date: '08/02', time: '14:20', items: 3, status: 'À PRÉPARER', method: 'Mobile Scan', priority: 'High' },
    { id: 'ORD-2024-002', patient: 'Fatou Sow', phone: '76 889 44 22', date: '08/02', time: '14:35', items: 5, status: 'EN PRÉPARATION', method: 'Caméra', priority: 'Normal' },
    { id: 'ORD-2024-003', patient: 'Mamadou Kane', phone: '70 123 45 67', date: '08/02', time: '15:10', items: 2, status: 'PRÊTE', method: 'Saisie Manuelle', priority: 'Normal' },
];

export default function Prescriptions() {
    const [activeTab, setActiveTab] = useState('preparation'); // 'queue' or 'preparation'
    const [prescriptions, setPrescriptions] = useState(INITIAL_PRESCRIPTIONS);
    const [notifyingId, setNotifyingId] = useState(null);

    const updateStatus = (id, newStatus) => {
        setPrescriptions(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));

        if (newStatus === 'PRÊTE') {
            handleAutoNotify(id);
        }
    };

    const handleAutoNotify = (id) => {
        setNotifyingId(id);
        // Simulate SMS sending
        setTimeout(() => {
            setNotifyingId(null);
            alert("Notification SMS/WhatsApp envoyée au patient.");
        }, 2000);
    };

    return (
        <div className="prescriptions fade-in" style={{ height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Zap color="var(--primary)" size={32} /> Système de Préparation & SCOR
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Gestion intelligente des files d'attente et notifications automatiques de mise à disposition.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '12px' }}>
                        <button onClick={() => setActiveTab('queue')} style={{ padding: '8px 16px', borderRadius: '10px', border: 'none', background: activeTab === 'queue' ? 'white' : 'transparent', color: activeTab === 'queue' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '800', cursor: 'pointer', boxShadow: activeTab === 'queue' ? 'var(--shadow-sm)' : 'none' }}>Vue Liste</button>
                        <button onClick={() => setActiveTab('preparation')} style={{ padding: '8px 16px', borderRadius: '10px', border: 'none', background: activeTab === 'preparation' ? 'white' : 'transparent', color: activeTab === 'preparation' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '800', cursor: 'pointer', boxShadow: activeTab === 'preparation' ? 'var(--shadow-sm)' : 'none' }}>Atelier Préparation</button>
                    </div>
                </div>
            </header>

            {activeTab === 'preparation' ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', flex: 1, overflowY: 'auto', padding: '10px' }}>
                    {/* Columns per Status */}
                    {['À PRÉPARER', 'EN PRÉPARATION', 'PRÊTE'].map(status => (
                        <div key={status} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px' }}>
                                <h3 style={{ fontSize: '0.9rem', fontWeight: '900', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                    {status} ({prescriptions.filter(p => p.status === status).length})
                                </h3>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: status === 'À PRÉPARER' ? '#ef4444' : status === 'EN PRÉPARATION' ? '#f59e0b' : '#10b981' }}></div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {prescriptions.filter(p => p.status === status).map(ord => (
                                    <div key={ord.id} className="card fade-in" style={{ padding: '20px', borderLeft: `6px solid ${status === 'À PRÉPARER' ? '#ef4444' : status === 'EN PRÉPARATION' ? '#f59e0b' : '#10b981'}` }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                            <span style={{ fontSize: '0.7rem', fontWeight: '900', color: 'var(--text-muted)' }}>#{ord.id}</span>
                                            <span style={{ fontSize: '0.7rem', color: 'white', backgroundColor: ord.priority === 'High' ? '#ef4444' : '#94a3b8', padding: '2px 8px', borderRadius: '4px', fontWeight: '900' }}>{ord.priority}</span>
                                        </div>
                                        <div style={{ marginBottom: '16px' }}>
                                            <p style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--secondary)' }}>{ord.patient}</p>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{ord.items} articles • {ord.method}</p>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Clock size={14} /> {ord.time}
                                            </span>

                                            {status === 'À PRÉPARER' && (
                                                <button onClick={() => updateStatus(ord.id, 'EN PRÉPARATION')} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: 'var(--secondary)', color: 'white', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
                                                    <Play size={14} /> PRÉPARER
                                                </button>
                                            )}

                                            {status === 'EN PRÉPARATION' && (
                                                <button onClick={() => updateStatus(ord.id, 'PRÊTE')} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
                                                    <CheckCircle2 size={14} /> TERMINER
                                                </button>
                                            )}

                                            {status === 'PRÊTE' && (
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button onClick={() => handleAutoNotify(ord.id)} disabled={notifyingId === ord.id} style={{ padding: '8px', borderRadius: '8px', border: '1px solid var(--primary)', background: 'white', color: 'var(--primary)', cursor: 'pointer' }}>
                                                        {notifyingId === ord.id ? <Loader2 size={16} className="spin" /> : <MessageCircle size={16} />}
                                                    </button>
                                                    <button style={{ padding: '8px', borderRadius: '8px', border: 'none', background: '#f5f3ff', color: '#8b5cf6', cursor: 'pointer' }}>
                                                        <Printer size={16} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {prescriptions.filter(p => p.status === status).length === 0 && (
                                    <div style={{ padding: '40px 20px', textAlign: 'center', backgroundColor: '#f8fafc', borderRadius: '16px', border: '2px dashed #e2e8f0', opacity: 0.5 }}>
                                        <p style={{ fontSize: '0.8rem', fontWeight: '700' }}>Vide</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    {/* List View similar to before but with status badges */}
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ backgroundColor: '#f8fafc' }}>
                            <tr style={{ textAlign: 'left' }}>
                                <th style={{ padding: '20px' }}>Patient</th>
                                <th>Méthode</th>
                                <th>Items</th>
                                <th>Statut</th>
                                <th style={{ padding: '20px', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prescriptions.map(p => (
                                <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '20px' }}>
                                        <div style={{ fontWeight: '800', color: 'var(--secondary)' }}>{p.patient}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.id} • {p.time}</div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: '700', color: '#8b5cf6' }}>
                                            {p.method.includes('Scan') ? <Smartphone size={14} /> : <Scan size={14} />}
                                            {p.method}
                                        </div>
                                    </td>
                                    <td><span style={{ fontWeight: '800' }}>{p.items}</span></td>
                                    <td>
                                        <span style={{
                                            padding: '4px 10px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '900',
                                            backgroundColor: p.status === 'PRÊTE' ? '#dcfce7' : p.status === 'EN PRÉPARATION' ? '#fff7ed' : '#fee2e2',
                                            color: p.status === 'PRÊTE' ? '#15803d' : p.status === 'EN PRÉPARATION' ? '#9a3412' : '#b91c1c'
                                        }}>
                                            {p.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '20px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                            <button style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', color: 'var(--text-muted)', cursor: 'pointer' }}><Eye size={18} /></button>
                                            <button style={{ padding: '8px', borderRadius: '8px', border: 'none', background: 'white', color: 'var(--primary)', border: '1px solid var(--primary)', cursor: 'pointer' }}><Printer size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
