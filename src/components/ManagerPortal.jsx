import React, { useState, useEffect } from 'react';
import {
    TrendingUp, Users, Package, AlertTriangle,
    DollarSign, Activity, Bell, Smartphone,
    Lock, CheckCircle2, ChevronRight, BarChart3,
    Clock, ShieldCheck, Zap, Menu, X, ArrowUpRight,
    ShoppingBag, LogOut, Settings, Filter, Search,
    Scan, Camera, RefreshCw, FileText, MessageCircle
} from 'lucide-react';

export default function ManagerPortal() {
    const [activeView, setActiveView] = useState('summary');
    const [isLive, setIsLive] = useState(true);
    const [isScanning, setIsScanning] = useState(false);
    const [scannedProduct, setScannedProduct] = useState(null);
    const [physicalCount, setPhysicalCount] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [scanMode, setScanMode] = useState('inventory'); // 'inventory' or 'expiry'
    const [scanAnimation, setScanAnimation] = useState(false);

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
            fontFamily: "'Inter', sans-serif",
            paddingBottom: '100px', // Space for mobile nav
            width: '100%',
            maxWidth: '500px', // Mobile width constraint
            margin: '0 auto', // Center on tablet
            overflowX: 'hidden'
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
                    <p style={{ fontSize: '0.7rem', fontWeight: '800', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block', animation: 'pulse 2s infinite' }}></span>
                        LIVE • PHARMACIE ELITE
                    </p>
                    <h1 style={{ fontSize: '1.2rem', fontWeight: '900', marginTop: '4px' }}>Portail Gérant</h1>
                </div>
                <div style={{ position: 'relative' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #334155' }}>
                        <Bell size={20} className="shake" />
                        <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#ef4444', color: 'white', fontSize: '9px', fontWeight: '900', padding: '2px 5px', borderRadius: '10px', border: '2px solid #0f172a' }}>3</span>
                    </div>
                </div>
            </header>

            <main style={{ padding: '0 16px' }}>
                {/* Main Stats Cards Grid */}
                <div className="manager-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                    <div style={{ padding: '16px', borderRadius: '20px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', boxShadow: '0 15px 20px -5px rgba(16, 185, 129, 0.3)' }}>
                        <DollarSign size={18} color="white" style={{ marginBottom: '10px', opacity: 0.8 }} />
                        <p style={{ fontSize: '0.65rem', fontWeight: '800', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>C.A Jour</p>
                        <p style={{ fontSize: '1.15rem', fontWeight: '950', marginTop: '2px' }}>{stats.revenue}</p>
                    </div>
                    <div style={{ padding: '16px', borderRadius: '20px', background: '#1e293b', border: '1px solid #334155' }}>
                        <ShoppingBag size={18} color="#10b981" style={{ marginBottom: '10px' }} />
                        <p style={{ fontSize: '0.65rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Ventes</p>
                        <p style={{ fontSize: '1.15rem', fontWeight: '950', marginTop: '2px', color: 'white' }}>{stats.salesCount}</p>
                    </div>
                </div>

                {/* Secondary Metrics Scroll */}
                <div className="no-scrollbar" style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '16px', marginBottom: '10px', WebkitOverflowScrolling: 'touch' }}>
                    {[
                        { label: 'Stock Bas', val: '14 Ref', icon: AlertTriangle, color: '#f59e0b' },
                        { label: 'Tiers Payant', val: '450k F', icon: ShieldCheck, color: '#3b82f6' },
                        { label: 'Patients', val: '89', icon: Users, color: '#8b5cf6' }
                    ].map((m, i) => (
                        <div key={i} style={{ minWidth: '120px', padding: '14px', borderRadius: '16px', background: '#1e293b', border: '1px solid #334155' }}>
                            <m.icon size={16} color={m.color} style={{ marginBottom: '6px' }} />
                            <p style={{ fontSize: '0.6rem', fontWeight: '800', color: '#94a3b8' }}>{m.label.toUpperCase()}</p>
                            <p style={{ fontSize: '0.9rem', fontWeight: '900', marginTop: '2px' }}>{m.val}</p>
                        </div>
                    ))}
                </div>

                {/* View Switcher Container */}
                {activeView === 'summary' && (
                    <div className="fade-in">
                        {/* Live Traffic Monitoring */}
                        <section style={{ marginBottom: '20px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <h3 style={{ fontSize: '0.9rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Activity size={16} color="#10b981" /> Direct Officine
                                </h3>
                                <span style={{ fontSize: '0.65rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '2px 8px', borderRadius: '100px', fontWeight: '800' }}>Live</span>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {liveActivity.map((activity) => (
                                    <div key={activity.id} style={{
                                        padding: '14px',
                                        borderRadius: '16px',
                                        background: '#1e293b',
                                        border: '1px solid #334155',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px'
                                    }}>
                                        <div style={{
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '10px',
                                            backgroundColor: activity.status === 'success' ? 'rgba(16,185,129,0.1)' : activity.status === 'error' ? 'rgba(239,68,68,0.1)' : 'rgba(59,130,246,0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: activity.status === 'success' ? '#10b981' : activity.status === 'error' ? '#ef4444' : '#3b82f6'
                                        }}>
                                            {activity.type === 'sale' ? <DollarSign size={18} /> : activity.type === 'alert' ? <AlertTriangle size={18} /> : activity.type === 'prescription' ? <FileText size={18} /> : <Bell size={18} />}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: '0.8rem', fontWeight: '700', color: '#f1f5f9', lineHeight: '1.3' }}>{activity.msg}</p>
                                            <p style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '1px' }}>{activity.time}</p>
                                        </div>
                                        <ChevronRight size={14} color="#334155" />
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Remote Actions Grid */}
                        <section style={{ marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '0.9rem', fontWeight: '900', marginBottom: '12px', color: '#94a3b8' }}>Actions Rapides</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                                {[
                                    { label: 'Valider SCOR', icon: ShieldCheck, color: '#3b82f6', action: () => { } },
                                    { label: 'Stocks Rapide', icon: Package, color: '#10b981', action: () => setActiveView('inventory') },
                                    { label: 'Chat Équipe', icon: MessageCircle, color: '#8b5cf6', action: () => { } },
                                    { label: 'Paramètres', icon: Settings, color: '#64748b', action: () => { } }
                                ].map((btn, i) => (
                                    <button key={i} onClick={btn.action} style={{
                                        padding: '16px 12px', borderRadius: '16px', background: '#1e293b', border: '1px solid #334155',
                                        color: 'white', fontWeight: '800', fontSize: '0.75rem', display: 'flex', flexDirection: 'column',
                                        alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'transform 0.1s'
                                    }}>
                                        <btn.icon size={20} color={btn.color} />
                                        {btn.label}
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {activeView === 'inventory' && (
                    <div className="fade-in">
                        <section style={{ marginBottom: '20px' }}>
                            <div style={{ padding: '24px', borderRadius: '24px', backgroundColor: '#1e293b', border: '1px solid #334155', textAlign: 'center', marginBottom: '20px' }}>
                                <div style={{ width: '80px', height: '80px', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                    <Scan size={32} color="#10b981" />
                                </div>
                                <h3 style={{ fontWeight: '900', fontSize: '1.2rem', marginBottom: '8px' }}>Scanner de Stock</h3>
                                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '20px' }}>Pointez le code-barres pour ajuster le stock ou gérer les dates.</p>

                                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', background: '#0f172a', padding: '4px', borderRadius: '12px' }}>
                                    <button
                                        onClick={() => { setScanMode('inventory'); setScannedProduct(null); }}
                                        style={{ flex: 1, padding: '8px', borderRadius: '8px', border: 'none', background: scanMode === 'inventory' ? '#10b981' : 'transparent', color: scanMode === 'inventory' ? 'white' : '#64748b', fontSize: '0.7rem', fontWeight: '800', cursor: 'pointer' }}
                                    >
                                        INVENTAIRE
                                    </button>
                                    <button
                                        onClick={() => { setScanMode('expiry'); setScannedProduct(null); }}
                                        style={{ flex: 1, padding: '8px', borderRadius: '8px', border: 'none', background: scanMode === 'expiry' ? '#f59e0b' : 'transparent', color: scanMode === 'expiry' ? 'white' : '#64748b', fontSize: '0.7rem', fontWeight: '800', cursor: 'pointer' }}
                                    >
                                        PÉREMPTION
                                    </button>
                                </div>

                                {!isScanning && !scannedProduct && (
                                    <button
                                        onClick={() => {
                                            setIsScanning(true);
                                            setTimeout(() => {
                                                setScanAnimation(true);
                                                setTimeout(() => {
                                                    setScanAnimation(false);
                                                    setIsScanning(false);
                                                    setScannedProduct({ id: 1, name: 'Doliprane 1000mg', systemStock: 140, ean: '3400930000012', currentExpiry: '06/2026' });
                                                }, 1500);
                                            }, 1000);
                                        }}
                                        style={{ width: '100%', padding: '16px', borderRadius: '16px', background: scanMode === 'inventory' ? '#10b981' : '#f59e0b', color: 'white', border: 'none', fontWeight: '900', fontSize: '1rem', cursor: 'pointer', boxShadow: scanMode === 'inventory' ? '0 10px 15px -3px rgba(16, 185, 129, 0.4)' : '0 10px 15px -3px rgba(245, 158, 11, 0.4)' }}
                                    >
                                        SCANNER PRODUIT
                                    </button>
                                )}

                                {isScanning && (
                                    <div style={{ padding: '40px 0', position: 'relative' }}>
                                        <div style={{ width: '200px', height: '120px', border: '2px solid #10b981', margin: '0 auto', borderRadius: '12px', position: 'relative', overflow: 'hidden' }}>
                                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '2px', background: '#10b981', boxShadow: '0 0 10px #10b981', animation: 'scanMove 2s infinite linear' }}></div>
                                            <Camera size={40} color="#10b981" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.3 }} />
                                        </div>
                                        <p style={{ marginTop: '20px', fontSize: '0.8rem', fontWeight: '700', color: '#10b981' }}>Recherche de code-barres...</p>
                                    </div>
                                )}

                                {scannedProduct && (
                                    <div className="fade-in" style={{ textAlign: 'left', padding: '16px', backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid #10b981' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                            <div>
                                                <p style={{ fontSize: '1rem', fontWeight: '900' }}>{scannedProduct.name}</p>
                                                <p style={{ fontSize: '0.7rem', color: '#64748b' }}>EAN: {scannedProduct.ean}</p>
                                            </div>
                                            <button onClick={() => { setScannedProduct(null); setPhysicalCount(''); setExpiryDate(''); }} style={{ background: 'none', border: 'none', color: '#64748b' }}><X size={20} /></button>
                                        </div>

                                        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                                            {scanMode === 'inventory' ? (
                                                <>
                                                    <div style={{ flex: 1, padding: '12px', background: '#1e293b', borderRadius: '12px' }}>
                                                        <p style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: '800' }}>STOCK SYSTÈME</p>
                                                        <p style={{ fontSize: '1.2rem', fontWeight: '900' }}>{scannedProduct.systemStock}</p>
                                                    </div>
                                                    <div style={{ flex: 1, padding: '12px', background: '#1e293b', borderRadius: '12px', border: '2px solid #10b981' }}>
                                                        <p style={{ fontSize: '0.6rem', color: '#10b981', fontWeight: '800' }}>COMPTAGE RÉEL</p>
                                                        <input
                                                            type="number"
                                                            value={physicalCount}
                                                            onChange={(e) => setPhysicalCount(e.target.value)}
                                                            placeholder="0"
                                                            style={{ width: '100%', background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', fontWeight: '900', outline: 'none' }}
                                                        />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div style={{ flex: 1, padding: '12px', background: '#1e293b', borderRadius: '12px' }}>
                                                        <p style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: '800' }}>EXP. ACTUELLE</p>
                                                        <p style={{ fontSize: '1.2rem', fontWeight: '900', color: '#f59e0b' }}>{scannedProduct.currentExpiry}</p>
                                                    </div>
                                                    <div style={{ flex: 1, padding: '12px', background: '#1e293b', borderRadius: '12px', border: '2px solid #f59e0b' }}>
                                                        <p style={{ fontSize: '0.6rem', color: '#f59e0b', fontWeight: '800' }}>NOUVELLE DATE</p>
                                                        <input
                                                            type="text"
                                                            value={expiryDate}
                                                            onChange={(e) => setExpiryDate(e.target.value)}
                                                            placeholder="MM/AAAA"
                                                            style={{ width: '100%', background: 'none', border: 'none', color: 'white', fontSize: '1.1rem', fontWeight: '900', outline: 'none' }}
                                                        />
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => {
                                                if (scanMode === 'inventory') {
                                                    alert(`Stock de ${scannedProduct.name} mis à jour : ${physicalCount} unités.`);
                                                } else {
                                                    alert(`Date de péremption de ${scannedProduct.name} enregistrée : ${expiryDate}. Le produit est marqué pour surveillance.`);
                                                }
                                                setScannedProduct(null);
                                                setPhysicalCount('');
                                                setExpiryDate('');
                                            }}
                                            disabled={scanMode === 'inventory' ? !physicalCount : !expiryDate}
                                            style={{
                                                width: '100%', padding: '14px', borderRadius: '12px',
                                                background: scanMode === 'inventory' ? 'white' : '#f59e0b', color: scanMode === 'inventory' ? '#0f172a' : 'white', border: 'none',
                                                fontWeight: '900', cursor: 'pointer',
                                                opacity: (scanMode === 'inventory' ? physicalCount : expiryDate) ? 1 : 0.5
                                            }}
                                        >
                                            {scanMode === 'inventory' ? 'VALIDER L\'AJUSTEMENT' : 'ENREGISTRER LA DATE'}
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                                <div style={{ padding: '16px', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <History size={16} color="#10b981" />
                                    <span style={{ fontWeight: '800', fontSize: '0.85rem' }}>Derniers Ajustements</span>
                                </div>
                                {[
                                    { name: 'Ventoline Inhalateur', diff: -2, time: '20:15' },
                                    { name: 'Efferalgan 500mg', diff: +5, time: '19:40' }
                                ].map((log, i) => (
                                    <div key={i} style={{ padding: '14px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontSize: '0.8rem', fontWeight: '700' }}>{log.name}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ color: log.diff > 0 ? '#10b981' : '#ef4444', fontWeight: '900', fontSize: '0.8rem' }}>{log.diff > 0 ? '+' : ''}{log.diff}</span>
                                            <span style={{ fontSize: '0.65rem', color: '#64748b' }}>{log.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}
            </main>

            {/* Floating Bottom Navigation */}
            <nav style={{
                position: 'fixed',
                bottom: '16px',
                left: '16px',
                right: '16px',
                height: '60px',
                backgroundColor: 'rgba(30, 41, 59, 0.9)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '0 8px',
                zIndex: 1000,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
            }}>
                {[
                    { label: 'Stats', icon: BarChart3, id: 'summary' },
                    { label: 'Stocks', icon: Package, id: 'inventory' },
                    { label: 'Action', icon: Zap, id: 'special', center: true },
                    { label: 'Ventes', icon: ShoppingBag, id: 'sales' },
                    { label: 'Profil', icon: Settings, id: 'settings' }
                ].map((item) => (
                    item.center ? (
                        <button key={item.id} style={{
                            width: '52px', height: '52px', borderRadius: '18px', backgroundColor: '#10b981',
                            color: 'white', marginTop: '-34px', display: 'flex', alignItems: 'center',
                            justifyContent: 'center', boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.4)',
                            border: '4px solid #0f172a'
                        }}>
                            <Zap size={24} />
                        </button>
                    ) : (
                        <button key={item.id} onClick={() => setActiveView(item.id)} style={{
                            background: 'none', border: 'none', color: activeView === item.id ? '#10b981' : '#64748b',
                            cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px'
                        }}>
                            <item.icon size={22} />
                            <span style={{ fontSize: '9px', fontWeight: '900' }}>{item.label}</span>
                        </button>
                    )
                ))}
            </nav>

            <style>{`
        @keyframes scanMove {
          0% { top: 0; }
          100% { top: 100%; }
        }
        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        .shake { animation: shake 5s infinite; }
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          5%, 15% { transform: rotate(10deg); }
          10%, 20% { transform: rotate(-10deg); }
          25% { transform: rotate(0deg); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (min-width: 769px) {
          .manager-portal { max-width: 480px; position: relative; height: 90vh; border-radius: 40px; margin-top: 2vh; border: 8px solid #1e293b; overflow-y: auto; }
        }
      `}</style>
        </div>
    );
}
