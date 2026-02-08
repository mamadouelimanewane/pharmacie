import React, { useState, useEffect } from 'react';
import {
    TrendingUp, Users, Package, AlertTriangle,
    DollarSign, Activity, Bell, Smartphone,
    Lock, CheckCircle2, ChevronRight, BarChart3,
    Clock, ShieldCheck, Zap, Menu, X, ArrowUpRight,
    ShoppingBag, LogOut, Settings, Filter
} from 'lucide-react';

export default function ManagerPortal() {
    const [activeView, setActiveView] = useState('summary');
    const [isLive, setIsLive] = useState(true);

    // Mock data for the manager
    const stats = {
        revenue: "2,450,000 F",
        salesCount: 142,
        patientCount: 89,
        margin: "32%",
        lowStock: 14,
        unpaidMutuelles: "450k F"
    };

    const liveActivity = [
        { id: 1, type: 'sale', msg: 'Vente #TK-4592 - 12,500 F', time: 'Il y a 2 min', status: 'success' },
        { id: 2, type: 'alert', msg: 'Stock critique: Doliprane 1000mg', time: 'Il y a 5 min', status: 'error' },
        { id: 3, type: 'prescription', msg: 'Nouvelle ordonnance numérisée', time: 'Il y a 12 min', status: 'primary' },
        { id: 4, type: 'reservation', msg: 'Mme Diop a été notifiée (Ventoline)', time: 'Il y a 15 min', status: 'success' }
    ];

    return (
        <div className="manager-portal" style={{
            backgroundColor: '#0f172a',
            minHeight: '100vh',
            color: 'white',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            paddingBottom: '80px' // Space for mobile nav
        }}>
            {/* Header Mobile-First */}
            <header style={{
                padding: '24px 20px',
                background: 'linear-gradient(180deg, rgba(30,41,59,1) 0%, rgba(15,23,42,0) 100%)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                backdropFilter: 'blur(10px)'
            }}>
                <div>
                    <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block', animation: 'pulse 2s infinite' }}></span>
                        LIVE • PHARMACIE ELITE
                    </p>
                    <h1 style={{ fontSize: '1.25rem', fontWeight: '900', marginTop: '4px' }}>Portail Gérant</h1>
                </div>
                <div style={{ position: 'relative' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #334155' }}>
                        <Bell size={22} className="shake" />
                        <span style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ef4444', color: 'white', fontSize: '10px', fontWeight: '800', padding: '2px 6px', borderRadius: '10px', border: '2px solid #0f172a' }}>3</span>
                    </div>
                </div>
            </header>

            <main style={{ padding: '0 20px' }}>
                {/* Main Stats Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                    <div style={{ padding: '20px', borderRadius: '24px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', boxShadow: '0 20px 25px -5px rgba(16, 185, 129, 0.2)' }}>
                        <DollarSign size={20} color="white" style={{ marginBottom: '12px', opacity: 0.8 }} />
                        <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'rgba(255,255,255,0.8)' }}>CHIFFRE D'AFFAIRES</p>
                        <p style={{ fontSize: '1.25rem', fontWeight: '950', marginTop: '4px' }}>{stats.revenue}</p>
                    </div>
                    <div style={{ padding: '20px', borderRadius: '24px', background: '#1e293b', border: '1px solid #334155' }}>
                        <ShoppingBag size={20} color="#10b981" style={{ marginBottom: '12px' }} />
                        <p style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8' }}>VENTES JOUR</p>
                        <p style={{ fontSize: '1.25rem', fontWeight: '950', marginTop: '4px', color: 'white' }}>{stats.salesCount}</p>
                    </div>
                </div>

                {/* Secondary Metrics Scroll */}
                <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '20px', marginBottom: '10px', scrollbarWidth: 'none' }}>
                    {[
                        { label: 'Stock Bas', val: '14 Ref', icon: AlertTriangle, color: '#f59e0b' },
                        { label: 'Tiers Payant', val: '450k F', icon: ShieldCheck, color: '#3b82f6' },
                        { label: 'Patients', val: '89', icon: Users, color: '#8b5cf6' }
                    ].map((m, i) => (
                        <div key={i} style={{ minWidth: '140px', padding: '16px', borderRadius: '20px', background: '#1e293b', border: '1px solid #334155' }}>
                            <m.icon size={18} color={m.color} style={{ marginBottom: '8px' }} />
                            <p style={{ fontSize: '0.65rem', fontWeight: '700', color: '#94a3b8' }}>{m.label.toUpperCase()}</p>
                            <p style={{ fontSize: '1rem', fontWeight: '900', marginTop: '2px' }}>{m.val}</p>
                        </div>
                    ))}
                </div>

                {/* Live Traffic Monitoring */}
                <section style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Activity size={18} color="#10b981" /> Flux Officinal en Direct
                        </h3>
                        <span style={{ fontSize: '0.7rem', color: '#94a3b8', background: '#1e293b', padding: '4px 10px', borderRadius: '100px' }}>Temps réel</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {liveActivity.map((activity) => (
                            <div key={activity.id} style={{
                                padding: '16px',
                                borderRadius: '20px',
                                background: '#1e293b',
                                border: '1px solid #334155',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px'
                            }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '12px',
                                    backgroundColor: activity.status === 'success' ? 'rgba(16,185,129,0.1)' : activity.status === 'error' ? 'rgba(239,68,68,0.1)' : 'rgba(59,130,246,0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: activity.status === 'success' ? '#10b981' : activity.status === 'error' ? '#ef4444' : '#3b82f6'
                                }}>
                                    {activity.type === 'sale' ? <DollarSign size={20} /> : activity.type === 'alert' ? <AlertTriangle size={20} /> : activity.type === 'prescription' ? <FileText size={20} /> : <Bell size={20} />}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: '0.85rem', fontWeight: '700', color: '#f1f5f9' }}>{activity.msg}</p>
                                    <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px' }}>{activity.time}</p>
                                </div>
                                <ChevronRight size={16} color="#475569" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Advanced Remote Controls */}
                <section style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Zap size={18} color="#f59e0b" /> Contrôles Distants
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                        <button style={{
                            padding: '16px', borderRadius: '20px', background: '#1e293b', border: '1px solid #334155',
                            color: 'white', fontWeight: '700', fontSize: '0.8rem', display: 'flex', flexDirection: 'column',
                            alignItems: 'center', gap: '10px', cursor: 'pointer'
                        }}>
                            <ShieldCheck size={24} color="#3b82f6" />
                            Valider SCOR
                        </button>
                        <button style={{
                            padding: '16px', borderRadius: '20px', background: '#1e293b', border: '1px solid #334155',
                            color: 'white', fontWeight: '700', fontSize: '0.8rem', display: 'flex', flexDirection: 'column',
                            alignItems: 'center', gap: '10px', cursor: 'pointer'
                        }}>
                            <Package size={24} color="#10b981" />
                            Inventaire Rapide
                        </button>
                        <button style={{
                            padding: '16px', borderRadius: '20px', background: '#1e293b', border: '1px solid #334155',
                            color: 'white', fontWeight: '700', fontSize: '0.8rem', display: 'flex', flexDirection: 'column',
                            alignItems: 'center', gap: '10px', cursor: 'pointer'
                        }}>
                            <MessageCircle size={24} color="#8b5cf6" />
                            Chat Équipe
                        </button>
                        <button style={{
                            padding: '16px', borderRadius: '20px', background: '#1e293b', border: '1px solid #334155',
                            color: 'white', fontWeight: '700', fontSize: '0.8rem', display: 'flex', flexDirection: 'column',
                            alignItems: 'center', gap: '10px', cursor: 'pointer'
                        }}>
                            <Settings size={24} color="#94a3b8" />
                            Paramètres
                        </button>
                    </div>
                </section>
            </main>

            {/* Floating Bottom Navigation for Mobile */}
            <nav style={{
                position: 'fixed',
                bottom: '20px',
                left: '20px',
                right: '20px',
                height: '64px',
                backgroundColor: 'rgba(30, 41, 59, 0.8)',
                backdropFilter: 'blur(20px)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '0 10px',
                zIndex: 1000,
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4)'
            }}>
                <button onClick={() => setActiveView('summary')} style={{ background: 'none', border: 'none', color: activeView === 'summary' ? '#10b981' : '#94a3b8', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <BarChart3 size={24} />
                    <span style={{ fontSize: '10px', fontWeight: '800' }}>Dashboard</span>
                </button>
                <button onClick={() => setActiveView('inventory')} style={{ background: 'none', border: 'none', color: activeView === 'inventory' ? '#10b981' : '#94a3b8', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <Package size={24} />
                    <span style={{ fontSize: '10px', fontWeight: '800' }}>Stocks</span>
                </button>
                <button style={{ width: '56px', height: '56px', borderRadius: '20px', backgroundColor: '#10b981', color: 'white', marginTop: '-40px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.4)', border: '4px solid #0f172a' }}>
                    <Zap size={28} />
                </button>
                <button onClick={() => setActiveView('sales')} style={{ background: 'none', border: 'none', color: activeView === 'sales' ? '#10b981' : '#94a3b8', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <ShoppingBag size={24} />
                    <span style={{ fontSize: '10px', fontWeight: '800' }}>Ventes</span>
                </button>
                <button onClick={() => setActiveView('settings')} style={{ background: 'none', border: 'none', color: activeView === 'settings' ? '#10b981' : '#94a3b8', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <Settings size={24} />
                    <span style={{ fontSize: '10px', fontWeight: '800' }}>Profil</span>
                </button>
            </nav>

            <style>{`
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .shake {
          animation: shake 5s infinite;
        }
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          5%, 15% { transform: rotate(10deg); }
          10%, 20% { transform: rotate(-10deg); }
          25% { transform: rotate(0deg); }
        }
        .manager-portal::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </div>
    );
}
