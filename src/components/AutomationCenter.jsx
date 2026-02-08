import React, { useState } from 'react';
import {
    Cpu, Zap, Activity, AlertTriangle,
    RefreshCw, Brain, Terminal, ShieldCheck,
    MessageSquare, Landmark, Package, Radio,
    Play, Pause, Settings, BarChart3
} from 'lucide-react';

export default function AutomationCenter() {
    const [automationLogs, setAutomationLogs] = useState([
        { id: 1, time: '23:00', bot: 'FinBank-Bot', action: 'Rapprochement bancaire effectué', status: 'success', confidence: '99.8%' },
        { id: 2, time: '22:45', bot: 'Inventory-Bot', action: 'Commande automatique Laborex générée', status: 'success', confidence: '94.2%' },
        { id: 3, time: '22:15', bot: 'Teletrans-Bot', action: 'Envoi des bordereaux SCOR CPAM', status: 'processing', confidence: '100%' },
    ]);

    return (
        <div className="automation-center fade-in" style={{ paddingBottom: '2rem' }}>
            <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--secondary)' }}>
                        Centre d'Automatisation Inteligente
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Supervisez les agents autonomes qui gèrent votre comptabilité, vos stocks et vos télétransmissions.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <div style={{ padding: '0.85rem 1.5rem', borderRadius: '12px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 0 20px rgba(16, 185, 129, 0.3)' }}>
                        <Radio size={20} className="pulse" />
                        <span style={{ fontWeight: '900' }}>COEURS IA : 4 ACTIFS</span>
                    </div>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
                {[
                    { label: 'TACHES AUTO / JOUR', value: '142', icon: Activity, color: 'var(--primary)' },
                    { label: 'GAIN DE TEMPS ESTIMÉ', value: '4.5h', icon: Cpu, color: '#0ea5e9' },
                    { label: 'PRÉCISION MOYENNE', value: '99.4%', icon: Brain, color: '#8b5cf6' },
                    { label: 'ÉCONOMIE OPÉRATIONNELLE', value: '125k F', icon: Zap, color: '#f59e0b' }
                ].map((stat, i) => (
                    <div key={i} className="card" style={{ borderBottom: `4px solid ${stat.color}` }}>
                        <p style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '8px' }}>{stat.label}</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p style={{ fontSize: '1.8rem', fontWeight: '900' }}>{stat.value}</p>
                            <stat.icon size={24} color={stat.color} />
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                <div className="card" style={{ padding: 0 }}>
                    <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontWeight: '900', display: 'flex', alignItems: 'center', gap: '10px' }}><Terminal size={20} color="var(--primary)" /> Dashboard des Agents (Bots)</h3>
                        <button className="glass" style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '800' }}>Relancer tout</button>
                    </div>
                    <div style={{ padding: '16px' }}>
                        {[
                            { name: 'FinBank-Bot', sub: 'Comptabilité Autonome', icon: Landmark, status: 'Dormant', color: '#64748b' },
                            { name: 'Inventory-Bot', sub: 'Optimisation des Commandes', icon: Package, status: 'Actif', color: '#10b981' },
                            { name: 'Teletrans-Bot', sub: 'Bordereaux & Mutuelles', icon: ShieldCheck, status: 'Processing', color: '#3b82f6' },
                            { name: 'Social-Bot', sub: 'Relances Observance WhatsApp', icon: MessageSquare, status: 'Actif', color: '#25d366' }
                        ].map((bot, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', borderBottom: i < 3 ? '1px solid #f1f5f9' : 'none', alignItems: 'center' }}>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: bot.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', color: bot.color }}>
                                        <bot.icon size={24} />
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: '900' }}>{bot.name}</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{bot.sub}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: '900', color: bot.color }}>{bot.status.toUpperCase()}</span>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}><Play size={16} /></button>
                                        <button style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}><Settings size={16} /></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card" style={{ padding: 0 }}>
                    <div style={{ padding: '24px', borderBottom: '1px solid var(--border)' }}>
                        <h3 style={{ fontWeight: '900' }}>Console de Log IA</h3>
                    </div>
                    <div style={{ padding: '16px', background: '#0f172a', color: '#94a3b8', fontFamily: 'monospace', fontSize: '0.8rem', height: '100%', minHeight: '350px' }}>
                        {automationLogs.map((log, i) => (
                            <div key={i} style={{ marginBottom: '12px' }}>
                                <span style={{ color: 'var(--primary)' }}>[{log.time}]</span>{' '}
                                <span style={{ color: '#0ea5e9' }}>{log.bot}</span>:{' '}
                                {log.action} <span style={{ color: '#10b981' }}>({log.confidence})</span>
                            </div>
                        ))}
                        <div style={{ color: 'white', animation: 'blink 1s infinite' }}>_</div>
                    </div>
                </div>
            </div>

            <style>{`
                .pulse { animation: pulseAnim 2s infinite; }
                @keyframes pulseAnim { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.1); } 100% { opacity: 1; transform: scale(1); } }
                @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
            `}</style>
        </div>
    );
}
