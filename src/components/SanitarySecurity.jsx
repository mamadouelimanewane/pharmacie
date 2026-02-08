import React, { useState } from 'react';
import {
    Thermometer, ShieldCheck, AlertCircle, History,
    Zap, RefreshCw, Box, Download,
    CheckCircle2, Bell, ShieldAlert, BadgeInfo,
    FlaskConical, Wind, Activity
} from 'lucide-react';

export default function SanitarySecurity() {
    const [activeTab, setActiveTab] = useState('monitoring'); // 'monitoring', 'lot-recall', 'compliance'

    const tempSensors = [
        { id: 'FRIGO_1', name: 'Frigo Insuline (P1)', temp: 4.2, status: 'stable', icon: Thermometer },
        { id: 'FRIGO_2', name: 'Frigo Vaccins (P2)', temp: 3.8, status: 'stable', icon: Thermometer },
        { id: 'AMBIENT_1', name: 'Zone Stockage (Ambient)', temp: 22.5, status: 'stable', icon: Wind },
    ];

    return (
        <div className="sanitary-security fade-in" style={{ paddingBottom: '2rem' }}>
            <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--secondary)' }}>
                        Sécurité Sanitaire & Chaîne du Froid
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Surveillance IoT des frigos, traçabilité des lots et conformité ANSM/MSAS.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="glass" style={{ padding: '0.85rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Download size={20} /> Registre Sanitaire
                    </button>
                    <button style={{ padding: '0.85rem 1.5rem', borderRadius: '12px', border: 'none', backgroundColor: '#ef4444', color: 'white', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ShieldAlert size={20} /> Lancer Alerte Lot
                    </button>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
                {[
                    { id: 'monitoring', label: 'IoT Températures', icon: Thermometer },
                    { id: 'lot-recall', label: 'Gestion des Retraits / Lots', icon: Box },
                    { id: 'compliance', label: 'Conformité & HACCP', icon: ShieldCheck }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        style={{
                            padding: '12px 0', border: 'none', background: 'none',
                            color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)',
                            fontWeight: '800', fontSize: '1rem', cursor: 'pointer',
                            borderBottom: activeTab === tab.id ? '3px solid var(--primary)' : '3px solid transparent',
                            display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s'
                        }}
                    >
                        <tab.icon size={20} /> {tab.label}
                    </button>
                ))}
            </div>

            {activeTab === 'monitoring' && (
                <div className="fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                        {tempSensors.map(s => (
                            <div key={s.id} className="card" style={{ padding: '24px', border: '1px solid var(--border)', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '20px', right: '20px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 10px #10b981' }}></div>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
                                    <div style={{ padding: '12px', borderRadius: '14px', backgroundColor: '#eff6ff', color: 'var(--primary)' }}>
                                        <s.icon size={28} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>{s.id}</p>
                                        <h4 style={{ fontWeight: '900' }}>{s.name}</h4>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                    <span style={{ fontSize: '2.5rem', fontWeight: '900' }}>{s.temp}°C</span>
                                    <span style={{ color: '#10b981', fontWeight: '800', fontSize: '0.9rem' }}>Optimal</span>
                                </div>
                                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>Plage cible : 2.0 - 8.0°C</p>
                                    <button style={{ border: 'none', background: 'none', color: 'var(--primary)', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer' }}>Graphiques</button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="card" style={{ background: 'var(--secondary)', color: 'white', padding: '32px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <BadgeInfo size={48} color="var(--primary)" />
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: 'white' }}>Audit IA : Stabilité Thermique</h3>
                                    <p style={{ opacity: 0.8, fontSize: '0.9rem', marginTop: '4px' }}>Aucune excursion de température détectée au cours des 7 derniers jours.</p>
                                </div>
                            </div>
                            <button style={{ padding: '12px 24px', borderRadius: '12px', border: '2px solid var(--primary)', background: 'transparent', color: 'var(--primary)', fontWeight: '800', cursor: 'pointer' }}>Générer rapport mensuel</button>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'lot-recall' && (
                <div className="fade-in">
                    <div className="card" style={{ padding: 0 }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                            <h3 style={{ fontWeight: '900' }}>Alertes Laboratoires & Retraits de Lots</h3>
                            <button className="glass" style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '900' }}>Scanner Code CIP</button>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ background: '#f8fafc' }}>
                                <tr style={{ textAlign: 'left' }}>
                                    <th style={{ padding: '16px' }}>PRODUIT / LABO</th>
                                    <th>LOT CONCERNÉ</th>
                                    <th>MOTIF DU RETRAIT</th>
                                    <th>IMPACT OFFICINE</th>
                                    <th style={{ textAlign: 'right', padding: '16px' }}>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: 'Augmentin 500mg', lab: 'GSK', lot: 'LOT_ABC_123', reason: 'Défaut de conditionnement', impact: '2 boîtes en stock', status: 'critical' },
                                    { name: 'Doliprane 1000', lab: 'Sanofi', lot: 'LOT_XYZ_999', reason: 'Erreur de dosage (suspicion)', impact: 'Aucun (Epuisé)', status: 'info' }
                                ].map((alert, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ fontWeight: '800' }}>{alert.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{alert.lab}</div>
                                        </td>
                                        <td style={{ fontWeight: '700', color: '#ef4444' }}>{alert.lot}</td>
                                        <td style={{ fontSize: '0.85rem' }}>{alert.reason}</td>
                                        <td>
                                            <span style={{ fontWeight: '900', color: alert.status === 'critical' ? '#ef4444' : 'var(--text-muted)' }}>{alert.impact}</span>
                                        </td>
                                        <td style={{ padding: '16px', textAlign: 'right' }}>
                                            <button style={{ padding: '8px 16px', borderRadius: '10px', border: 'none', background: alert.status === 'critical' ? '#ef4444' : 'var(--primary)', color: 'white', fontWeight: '800', cursor: 'pointer' }}>Isoler le Lot</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
