import React, { useState, useEffect } from 'react';
import {
    Smartphone, TrendingUp, AlertTriangle, Eye, Phone,
    CheckCircle2, XCircle, CreditCard, Banknote, ShieldAlert,
    Wifi, Battery, Activity, ArrowRight, Lock, Package, Pill
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

const LIVE_SALES_DATA = [
    { time: '14:30', amount: 12500, type: 'cash', items: 3 },
    { time: '14:35', amount: 45000, type: 'wave', items: 8 },
    { time: '14:42', amount: 8200, type: 'om', items: 2 },
    { time: '14:55', amount: 2400, type: 'cash', items: 1 },
    { time: '15:10', amount: 96000, type: 'insurance', items: 12 },
];

const SECURITY_LOGS = [
    { id: 1, time: '14:58', event: 'Tiroir Caisse ouvert (Sans Vente)', level: 'high' },
    { id: 2, time: '14:45', event: 'Annulation Ticket #9482 (25 000F)', level: 'medium' },
];

const URGENT_STOCK_ALERTS = [
    { id: 1, name: 'Doliprane 1000mg', stock: 2, min: 20, supplier: 'LABOREX' },
    { id: 2, name: 'Augmentin Adultes', stock: 0, min: 15, supplier: 'COPHASE' },
    { id: 3, name: 'Ventoline Inhalateur', stock: 1, min: 10, supplier: 'LABOREX' },
];

export default function MobileManager() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'camera', 'alerts'

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="mobile-manager fade-in" style={{
            maxWidth: '480px',
            margin: '0 auto',
            minHeight: '100vh',
            backgroundColor: '#0f172a',
            color: 'white',
            fontFamily: '"Inter", sans-serif',
            position: 'relative',
            paddingBottom: '80px'
        }}>
            {/* Status Bar Mock */}
            <div style={{ padding: '10px 20px', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', opacity: 0.8 }}>
                <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Wifi size={14} />
                    <Battery size={14} />
                </div>
            </div>

            {/* Header */}
            <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: '"Outfit", sans-serif' }}>Pharma<span style={{ color: '#10b981' }}>Elite</span></h1>
                    <span style={{ fontSize: '0.7rem', backgroundColor: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '100px' }}>MANAGER VIEW</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Bonjour, Dr. Wane</p>
            </div>

            {/* Flash Info Cards (Snapchat/Instagram Story Style) */}
            <div style={{
                display: 'flex',
                overflowX: 'auto',
                gap: '12px',
                padding: '0 20px 20px',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
            }}>
                {/* Card 1: Sales */}
                <div style={{
                    minWidth: '260px', borderRadius: '24px', padding: '20px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    boxShadow: '0 10px 20px rgba(16, 185, 129, 0.3)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <TrendingUp size={24} color="white" />
                        <span style={{ fontSize: '0.8rem', fontWeight: '800', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '8px' }}>+12%</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', opacity: 0.9, fontWeight: '600' }}>CHIFFRE D'AFFAIRES JOUR</p>
                    <p style={{ fontSize: '2.2rem', fontWeight: '900', marginTop: '4px' }}>850 k</p>
                    <p style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '8px' }}>Obj: 1.2M • Reste 5h</p>
                </div>

                {/* Card 2: Treasury */}
                <div style={{
                    minWidth: '260px', borderRadius: '24px', padding: '20px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <Smartphone size={24} color="white" />
                        <Activity size={20} color="white" />
                    </div>
                    <p style={{ fontSize: '0.8rem', opacity: 0.9, fontWeight: '600' }}>TRÉSORERIE MOBILE</p>
                    <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.9rem' }}>Wave</span>
                            <span style={{ fontSize: '1.1rem', fontWeight: '800' }}>450.000 F</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.9rem' }}>Orange</span>
                            <span style={{ fontSize: '1.1rem', fontWeight: '800' }}>125.000 F</span>
                        </div>
                    </div>
                </div>

                {/* Card 3: Stock Alert (New) */}
                <div style={{
                    minWidth: '260px', borderRadius: '24px', padding: '20px',
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    boxShadow: '0 10px 20px rgba(245, 158, 11, 0.3)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <Package size={24} color="white" />
                        <span style={{ fontSize: '0.8rem', fontWeight: '800', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '8px' }}>CRITIQUE</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', opacity: 0.9, fontWeight: '600' }}>RUPTURES URGENTES</p>
                    <p style={{ fontSize: '2.2rem', fontWeight: '900', marginTop: '4px' }}>3 REF</p>
                    <p style={{ fontSize: '0.75rem', opacity: 0.9, marginTop: '8px' }}>Doliprane, Augmentin...</p>
                    <button style={{ marginTop: '12px', width: '100%', padding: '8px', borderRadius: '8px', border: 'none', background: 'white', color: '#d97706', fontWeight: '800' }}>COMMANDER</button>
                </div>

                {/* Card 4: Security */}
                <div style={{
                    minWidth: '260px', borderRadius: '24px', padding: '20px',
                    background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
                    boxShadow: '0 10px 20px rgba(239, 68, 68, 0.3)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <ShieldAlert size={24} color="white" />
                        <span style={{ fontSize: '0.8rem', fontWeight: '800', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '8px' }}>2 Nvl</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', opacity: 0.9, fontWeight: '600' }}>SÉCURITÉ & ALERTES</p>
                    <p style={{ fontSize: '1.5rem', fontWeight: '900', marginTop: '4px' }}>Attention !</p>
                    <p style={{ fontSize: '0.8rem', opacity: 0.9, marginTop: '8px' }}>Ouverture Tiroir Suspecte Caisse 1</p>
                    <button style={{ marginTop: '12px', width: '100%', padding: '8px', borderRadius: '8px', border: 'none', background: 'white', color: '#ef4444', fontWeight: '800' }}>VOIR CAMÉRA</button>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div style={{ padding: '0 20px', marginBottom: '25px' }}>
                <h3 style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '12px', fontWeight: '700', textTransform: 'uppercase' }}>Actions Rapides</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                        <button style={{ width: '50px', height: '50px', borderRadius: '16px', border: 'none', backgroundColor: '#334155', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Phone size={24} /></button>
                        <span style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>Appeler</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                        <button style={{ width: '50px', height: '50px', borderRadius: '16px', border: 'none', backgroundColor: '#334155', color: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Eye size={24} /></button>
                        <span style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>Caméras</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                        <button style={{ width: '50px', height: '50px', borderRadius: '16px', border: 'none', backgroundColor: '#334155', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Lock size={24} /></button>
                        <span style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>SAFE</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                        <button style={{ width: '50px', height: '50px', borderRadius: '16px', border: 'none', backgroundColor: '#334155', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShieldAlert size={24} /></button>
                        <span style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>Urgence</span>
                    </div>
                </div>
            </div>

            {/* Live Feed List */}
            <div style={{
                backgroundColor: 'white',
                borderRadius: '32px 32px 0 0',
                padding: '25px 20px 80px',
                color: '#0f172a',
                minHeight: '400px'
            }}>
                <div style={{ width: '40px', height: '4px', backgroundColor: '#e2e8f0', borderRadius: '100px', margin: '0 auto 20px' }} />

                {/* Stock Alert Section */}
                {URGENT_STOCK_ALERTS.length > 0 && (
                    <div style={{ marginBottom: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#d97706' }}>Ruptures Prioritaires</h3>
                            <span style={{ background: '#fffbeb', color: '#d97706', fontSize: '0.75rem', fontWeight: '800', padding: '4px 8px', borderRadius: '100px' }}>{URGENT_STOCK_ALERTS.length} ALERTES</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {URGENT_STOCK_ALERTS.map(item => (
                                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', border: '1px solid #fef3c7', borderRadius: '16px', background: '#fffbeb' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#f59e0b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Pill size={18} />
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: '800', fontSize: '0.9rem', color: '#92400e' }}>{item.name}</p>
                                            <p style={{ fontSize: '0.75rem', color: '#b45309' }}>Stock: {item.stock} / Min: {item.min}</p>
                                        </div>
                                    </div>
                                    <button style={{ padding: '8px 12px', borderRadius: '10px', background: '#f59e0b', color: 'white', border: 'none', fontWeight: '700', fontSize: '0.75rem' }}>CDER</button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '800' }}>Dernières Transactions</h3>
                    <button style={{ border: 'none', background: 'none', color: '#10b981', fontWeight: '700', fontSize: '0.9rem' }}>Voir Tout</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {LIVE_SALES_DATA.map((sale, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{
                                    width: '48px', height: '48px', borderRadius: '14px',
                                    backgroundColor: sale.type === 'wave' ? '#dcfce7' : sale.type === 'om' ? '#ffedd5' : '#f1f5f9',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: sale.type === 'wave' ? '#166534' : sale.type === 'om' ? '#c2410c' : '#475569',
                                    fontWeight: '800', fontSize: '0.8rem'
                                }}>
                                    {sale.type === 'wave' ? 'W' : sale.type === 'om' ? 'OM' : 'Esp'}
                                </div>
                                <div>
                                    <p style={{ fontWeight: '700', fontSize: '1rem' }}>Vente {sale.type === 'insurance' ? 'Tiers-Payant' : 'Comptoir'}</p>
                                    <p style={{ fontSize: '0.8rem', color: '#64748b' }}>{sale.time} • {sale.items} articles</p>
                                </div>
                            </div>
                            <span style={{ fontWeight: '900', fontSize: '1rem' }}>+ {sale.amount.toLocaleString()}</span>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#fee2e2', borderRadius: '20px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                        <AlertTriangle size={20} color="#ef4444" />
                        <h4 style={{ fontWeight: '800', color: '#991b1b' }}>Alertes de Sécurité</h4>
                    </div>
                    {SECURITY_LOGS.map(log => (
                        <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingBottom: '12px', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                            <div>
                                <p style={{ fontWeight: '700', color: '#7f1d1d', fontSize: '0.9rem' }}>{log.event}</p>
                                <p style={{ fontSize: '0.75rem', color: '#991b1b' }}>{log.time}</p>
                            </div>
                            <button style={{ padding: '6px 12px', borderRadius: '8px', border: 'none', backgroundColor: 'white', color: '#ef4444', fontWeight: '700', fontSize: '0.75rem' }}>Vérifier</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Nav Mock for Mobile */}
            <div style={{
                position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                width: '100%', maxWidth: '480px',
                backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)',
                borderTop: '1px solid #e2e8f0',
                display: 'flex', justifyContent: 'space-around', padding: '16px',
                borderRadius: '24px 24px 0 0',
                boxShadow: '0 -10px 20px rgba(0,0,0,0.05)'
            }}>
                <Activity size={24} color="#10b981" />
                <CreditCard size={24} color="#94a3b8" />
                <div style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginTop: '-40px', boxShadow: '0 10px 20px rgba(15, 23, 42, 0.4)',
                    border: '4px solid white'
                }}>
                    <Smartphone size={24} color="white" />
                </div>
                <Eye size={24} color="#94a3b8" />
                <AlertTriangle size={24} color="#94a3b8" />
            </div>
        </div>
    );
}
