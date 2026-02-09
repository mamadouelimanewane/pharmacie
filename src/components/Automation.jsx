import React, { useState, useEffect } from 'react';
import { Cpu, Zap, Activity, AlertTriangle, Package, PackageCheck, RefreshCw, Layers, Server, Wifi, Database, Settings } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const storageData = [
    { name: '08:00', load: 45, speed: 120 },
    { name: '10:00', load: 65, speed: 145 },
    { name: '12:00', load: 85, speed: 180 },
    { name: '14:00', load: 70, speed: 160 },
    { name: '16:00', load: 90, speed: 200 },
    { name: '18:00', load: 55, speed: 130 },
];

const ROBOT_LOGS = [
    { time: '10:42:15', action: 'Dispensation', target: 'Guichet 3', item: 'Doliprane 1000mg', status: 'COMPLETED' },
    { time: '10:42:18', action: 'Rangement', target: 'Zone B-12', item: 'Lierac Serum', status: 'IN_PROGRESS' },
    { time: '10:42:20', action: 'Dispensation', target: 'Commande Web #W-2045', item: 'Avene Xeracalm', status: 'QUEUED' },
    { time: '10:42:22', action: 'Optimisation', target: 'Zone A', item: 'Defrag', status: 'PENDING' },
];

export default function Automation() {
    const [robotStatus, setRobotStatus] = useState('ONLINE');
    const [activeArm, setActiveArm] = useState('ARM_A');

    // Simulate robot activity
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveArm(prev => prev === 'ARM_A' ? 'ARM_B' : 'ARM_A');
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="automation fade-in" style={{ paddingBottom: '3rem' }}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '0.5rem', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Robot Control Center
                    </h1>
                    <p style={{ color: '#64748b', fontWeight: '600' }}>Supervision du système Rowa Vmax & Synchronisation Web</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ padding: '0.75rem 1.25rem', borderRadius: '12px', backgroundColor: '#dcfce7', color: '#166534', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '800', boxShadow: '0 4px 12px rgba(22, 101, 52, 0.1)' }}>
                        <div style={{ width: '10px', height: '10px', backgroundColor: '#166534', borderRadius: '50%', animation: 'pulse 2s infinite' }}></div>
                        SYSTÈME ONLINE
                    </div>
                </div>
            </header>

            {/* --- DASHBOARD GRID --- */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>

                {/* LEFT COLUMN: VISUALIZER & STATS */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* ROBOT VISUALIZER (MOCK) */}
                    <div className="card" style={{ padding: '30px', backgroundColor: '#1e293b', borderRadius: '24px', color: '#fff', position: 'relative', overflow: 'hidden', minHeight: '300px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', position: 'relative', zIndex: 10 }}>
                            <h3 style={{ fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}><Cpu /> VUE SYNOPTIQUE</h3>
                            <span style={{ fontSize: '0.8rem', opacity: 0.7, fontFamily: 'monospace' }}>FIRMWARE v4.5.2</span>
                        </div>

                        {/* Schematic Representation */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', position: 'relative', zIndex: 10 }}>
                            {/* ARM A */}
                            <div style={{ padding: '20px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', background: activeArm === 'ARM_A' ? 'rgba(59, 130, 246, 0.2)' : 'transparent', transition: 'all 0.3s' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span style={{ fontWeight: '700', color: '#3b82f6' }}>BRAS ROBOT A</span>
                                    <Activity size={16} color={activeArm === 'ARM_A' ? '#3b82f6' : '#64748b'} />
                                </div>
                                <div style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '5px' }}>Statut: {activeArm === 'ARM_A' ? 'EN MOUVEMENT' : 'EN ATTENTE'}</div>
                                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Tâche: {activeArm === 'ARM_A' ? 'SORTIE > GUICHET 3' : '-'}</div>
                            </div>

                            {/* ARM B */}
                            <div style={{ padding: '20px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', background: activeArm === 'ARM_B' ? 'rgba(16, 185, 129, 0.2)' : 'transparent', transition: 'all 0.3s' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                    <span style={{ fontWeight: '700', color: '#10b981' }}>BRAS ROBOT B</span>
                                    <Activity size={16} color={activeArm === 'ARM_B' ? '#10b981' : '#64748b'} />
                                </div>
                                <div style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '5px' }}>Statut: {activeArm === 'ARM_B' ? 'EN MOUVEMENT' : 'EN ATTENTE'}</div>
                                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Tâche: {activeArm === 'ARM_B' ? 'ENTRÉE > ZONE B' : '-'}</div>
                            </div>
                        </div>

                        {/* Background Decoration */}
                        <div style={{ position: 'absolute', bottom: -50, right: -50, opacity: 0.05 }}>
                            <Settings size={300} />
                        </div>
                    </div>

                    {/* LIVE METRICS */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                        <div className="card" style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#64748b' }}>
                                <Layers size={20} /> <span style={{ fontSize: '0.85rem', fontWeight: '800' }}>STOCKAGE</span>
                            </div>
                            <p style={{ fontSize: '2rem', fontWeight: '950', color: '#0f172a' }}>82.5%</p>
                            <div style={{ width: '100%', height: '6px', backgroundColor: '#f1f5f9', borderRadius: '10px', marginTop: '10px' }}>
                                <div style={{ width: '82.5%', height: '100%', backgroundColor: '#3b82f6', borderRadius: '10px' }}></div>
                            </div>
                        </div>
                        <div className="card" style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#64748b' }}>
                                <PackageCheck size={20} /> <span style={{ fontSize: '0.85rem', fontWeight: '800' }}>SORTIES / H</span>
                            </div>
                            <p style={{ fontSize: '2rem', fontWeight: '950', color: '#0f172a' }}>342</p>
                            <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '800' }}>+12% Pic Midi</span>
                        </div>
                        <div className="card" style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#64748b' }}>
                                <Zap size={20} /> <span style={{ fontSize: '0.85rem', fontWeight: '800' }}>EFFICACITÉ</span>
                            </div>
                            <p style={{ fontSize: '2rem', fontWeight: '950', color: '#0f172a' }}>99.9%</p>
                            <span style={{ fontSize: '0.75rem', color: '#3b82f6', fontWeight: '800' }}>Rank A+</span>
                        </div>
                    </div>

                    {/* CHART */}
                    <div className="card" style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                        <h3 style={{ fontWeight: '800', marginBottom: '20px' }}>Charge de Travail (24h)</h3>
                        <div style={{ height: '250px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={storageData}>
                                    <defs>
                                        <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                                    <Area type="monotone" dataKey="speed" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorSpeed)" strokeWidth={3} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: LOGS & CONTROL */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* WEB SYNC STATUS */}
                    <div className="card" style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '24px', border: '2px solid #3b82f6' }}>
                        <h3 style={{ fontWeight: '900', marginBottom: '15px', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Wifi size={20} /> SYNCHRO WEB
                        </h3>
                        <div style={{ marginBottom: '15px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.85rem', fontWeight: '700' }}>
                                <span>Boutique Elite Data</span>
                                <span style={{ color: '#10b981' }}>CONNECTÉ</span>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Dernière synchro: À l'instant</div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <div style={{ flex: 1, padding: '10px', backgroundColor: '#eff6ff', borderRadius: '12px', textAlign: 'center' }}>
                                <span style={{ display: 'block', fontSize: '1.2rem', fontWeight: '900', color: '#3b82f6' }}>12</span>
                                <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#64748b' }}>ITEMS RÉSERVÉS</span>
                            </div>
                            <div style={{ flex: 1, padding: '10px', backgroundColor: '#f0fdf4', borderRadius: '12px', textAlign: 'center' }}>
                                <span style={{ display: 'block', fontSize: '1.2rem', fontWeight: '900', color: '#166534' }}>245</span>
                                <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#64748b' }}>STOCK DISPO</span>
                            </div>
                        </div>
                    </div>

                    {/* LIVE LOGS */}
                    <div className="card" style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9', flex: 1 }}>
                        <h3 style={{ fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Database size={18} /> LIVE LOGS
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {ROBOT_LOGS.map((log, i) => (
                                <div key={i} style={{ paddingBottom: '15px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                                    <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#94a3b8', marginTop: '3px' }}>{log.time}</span>
                                    <div>
                                        <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0f172a' }}>{log.action}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{log.item}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#3b82f6', marginTop: '2px' }}>Destination: {log.target}</div>
                                    </div>
                                    <span style={{
                                        marginLeft: 'auto',
                                        fontSize: '0.65rem',
                                        fontWeight: '800',
                                        padding: '4px 8px',
                                        borderRadius: '100px',
                                        backgroundColor: log.status === 'COMPLETED' ? '#dcfce7' : log.status === 'IN_PROGRESS' ? '#dbeafe' : '#f1f5f9',
                                        color: log.status === 'COMPLETED' ? '#166534' : log.status === 'IN_PROGRESS' ? '#1e40af' : '#64748b'
                                    }}>
                                        {log.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* MAINTENANCE ACTIONS */}
                    <div className="card" style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                        <h3 style={{ fontWeight: '800', marginBottom: '15px' }}>Maintenance Rapide</h3>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                                <RefreshCw size={18} color="#3b82f6" />
                                Calibrage
                            </button>
                            <button style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                                <Server size={18} color="#ef4444" />
                                Reboot
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.2); }
                    100% { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
}
