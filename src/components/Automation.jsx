import React, { useState } from 'react';
import { Cpu, Zap, Activity, AlertTriangle, Package, PackageCheck, RefreshCw, Layers } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const storageData = [
    { name: '08:00', used: 65 },
    { name: '10:00', used: 62 },
    { name: '12:00', used: 75 },
    { name: '14:00', used: 82 },
    { name: '16:00', used: 78 },
];

export default function Automation() {
    const [robotStatus, setRobotStatus] = useState('Opérationnel');

    return (
        <div className="automation fade-in">
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Automate & Robotique</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Contrôlez votre robot de dispensation et optimisez le rangement automatique.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{
                        padding: '0.75rem 1.25rem',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--success)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: '600'
                    }}>
                        <Zap size={18} fill="white" /> Système Actif
                    </div>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ padding: '10px', backgroundColor: '#e0f2fe', borderRadius: '10px', color: '#0ea5e9' }}>
                            <Layers size={24} />
                        </div>
                        <h3 style={{ fontSize: '1rem' }}>Capacité de Stockage</h3>
                    </div>
                    <p style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>82.5% <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: '400' }}>/ 12,000 boîtes</span></p>
                    <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: '82.5%', height: '100%', backgroundColor: 'var(--accent)' }} />
                    </div>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ padding: '10px', backgroundColor: 'var(--primary-light)', borderRadius: '10px', color: 'var(--primary)' }}>
                            <PackageCheck size={24} />
                        </div>
                        <h3 style={{ fontSize: '1rem' }}>Dispenses Aujourd'hui</h3>
                    </div>
                    <p style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>1,245</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--success)' }}>+12% par rapport à hier</p>
                </div>

                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <div style={{ padding: '10px', backgroundColor: '#fee2e2', borderRadius: '10px', color: 'var(--error)' }}>
                            <Activity size={24} />
                        </div>
                        <h3 style={{ fontSize: '1rem' }}>Santé Système</h3>
                    </div>
                    <p style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>99.8%</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Uptime (30 derniers jours)</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                <div className="card">
                    <h3 style={{ marginBottom: '1.5rem' }}>Occupation en Temps Réel</h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={storageData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip />
                                <Area type="monotone" dataKey="used" stroke="var(--accent)" fill="#0ea5e920" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ marginBottom: '1.5rem' }}>Actions de Maintenance</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <button style={{
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border)',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            fontWeight: '500'
                        }}>
                            <RefreshCw size={18} color="var(--primary)" /> Calibrage des bras
                        </button>
                        <button style={{
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid var(--border)',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            fontWeight: '500'
                        }}>
                            <Cpu size={18} color="var(--accent)" /> Mise à jour Firmware
                        </button>
                        <div style={{
                            marginTop: '1rem',
                            padding: '1.25rem',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: '#fffbeb',
                            border: '1px solid #fef3c7',
                            display: 'flex',
                            gap: '1rem'
                        }}>
                            <AlertTriangle size={24} color="#f59e0b" />
                            <div>
                                <p style={{ fontWeight: '600', color: '#92400e', fontSize: '0.875rem' }}>Entretien Prévu</p>
                                <p style={{ fontSize: '0.75rem', color: '#b45309' }}>La maintenance préventive semestrielle est prévue pour le 15/02.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
