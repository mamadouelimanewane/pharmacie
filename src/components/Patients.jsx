import React, { useState } from 'react';
import {
    Users, Search, Plus, UserPlus, Filter,
    MoreVertical, FileText, AlertTriangle, History,
    Stethoscope, Activity, Bell, Calendar,
    TrendingUp, MessageSquare, CheckCircle2,
    Heart, ShieldAlert, BadgeInfo
} from 'lucide-react';
import { MOCK_PATIENTS } from '../data/mockData';

export default function Patients() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('directory'); // 'directory', 'observance', 'medical'

    const filteredPatients = MOCK_PATIENTS.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.nss.includes(searchTerm) ||
        p.phone.includes(searchTerm)
    );

    return (
        <div className="patients fade-in" style={{ paddingBottom: '2rem' }}>
            <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--secondary)' }}>
                        {activeTab === 'directory' ? 'Dossiers Patients' : activeTab === 'observance' ? 'Observance & IA Thérapeutique' : 'Suivi des Constantes'}
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        {activeTab === 'observance' ? 'L\'IA analyse les comportements de renouvellement pour prévenir les interruptions de traitement.' : 'Gérez les historiques médicaux, les allergies et le suivi pharmaceutique.'}
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="glass" style={{ padding: '0.85rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <BadgeInfo size={20} /> Entretiens Pharm.
                    </button>
                    <button style={{ padding: '0.85rem 1.5rem', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <UserPlus size={20} /> Nouveau Patient
                    </button>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
                {[
                    { id: 'directory', label: 'Annuaire & Dossiers', icon: Users },
                    { id: 'observance', label: 'Observance IA', icon: Activity },
                    { id: 'medical', label: 'Constantes & Santé', icon: Heart }
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

            {activeTab === 'directory' && (
                <div className="fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '800', marginBottom: '8px' }}>TOTAL PATIENTS</p>
                            <p style={{ fontSize: '1.8rem', fontWeight: '900' }}>1 842</p>
                        </div>
                        <div className="card" style={{ borderLeft: '4px solid #0ea5e9' }}>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '800', marginBottom: '8px' }}>DOSSIERS COMPLETS (DP)</p>
                            <p style={{ fontSize: '1.8rem', fontWeight: '900' }}>94%</p>
                        </div>
                        <div className="card" style={{ borderLeft: '4px solid #ef4444' }}>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '800', marginBottom: '8px' }}>RISQUES DDI DÉTECTÉS</p>
                            <p style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ef4444' }}>24</p>
                        </div>
                    </div>

                    <div className="card" style={{ padding: 0 }}>
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ position: 'relative', width: '400px' }}>
                                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    placeholder="Nom, NSS, Téléphone..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ width: '100%', padding: '12px 12px 12px 42px', borderRadius: '12px', border: '1px solid var(--border)' }}
                                />
                            </div>
                        </div>

                        <table className="data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ background: '#f8fafc' }}>
                                <tr style={{ textAlign: 'left' }}>
                                    <th style={{ padding: '16px' }}>PATIENT</th>
                                    <th>NSS</th>
                                    <th>DERNIÈRE VISITE</th>
                                    <th>ALERTES</th>
                                    <th style={{ textAlign: 'right', padding: '16px' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPatients.map(patient => (
                                    <tr key={patient.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ fontWeight: '800' }}>{patient.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{patient.dob}</div>
                                        </td>
                                        <td style={{ fontWeight: '600' }}>{patient.nss}</td>
                                        <td>{patient.lastVisit}</td>
                                        <td>
                                            {patient.risk !== 'None' ? (
                                                <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.7rem', fontWeight: '800', backgroundColor: '#fee2e2', color: '#991b1b', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                                    <AlertTriangle size={12} /> {patient.risk}
                                                </span>
                                            ) : <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Aucune</span>}
                                        </td>
                                        <td style={{ padding: '16px', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                <button style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white' }}><History size={16} /></button>
                                                <button style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white' }}><FileText size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'observance' && (
                <div className="fade-in">
                    <div className="card" style={{ padding: '24px', background: 'var(--secondary)', color: 'white', marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '8px' }}>Score d'Observance Global</h3>
                                <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Analyse des patients chroniques sur les 30 derniers jours.</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)' }}>84%</p>
                                <p style={{ fontSize: '0.8rem', fontWeight: '700' }}>Stable (Objectif 90%)</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem' }}>
                        <div className="card" style={{ padding: 0 }}>
                            <div style={{ padding: '24px', borderBottom: '1px solid var(--border)' }}>
                                <h3 style={{ fontWeight: '900' }}>Défauts de Renouvellement Détectés (IA)</h3>
                            </div>
                            <div style={{ padding: '16px' }}>
                                {[
                                    { name: 'Mamadou Diallo', drug: 'Amlodipine 5mg', delay: '4 jours', risk: 'Elevé', status: 'Relance auto envoyée' },
                                    { name: 'Aicha Fall', drug: 'Metformine 1000', delay: '2 jours', risk: 'Modéré', status: 'A rappeler' },
                                    { name: 'Jean Gomis', drug: 'Innohep 10000', delay: '7 jours', risk: 'Critique', status: 'Alerte Médecin' }
                                ].map((alert, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', borderBottom: i < 2 ? '1px solid #f1f5f9' : 'none', alignItems: 'center' }}>
                                        <div>
                                            <p style={{ fontWeight: '900', fontSize: '1rem' }}>{alert.name}</p>
                                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{alert.drug} • Retard : <strong>{alert.delay}</strong></p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <span style={{
                                                padding: '6px 14px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '900',
                                                backgroundColor: alert.risk === 'Critique' ? '#fee2e2' : alert.risk === 'Elevé' ? '#fff7ed' : '#f0fdf4',
                                                color: alert.risk === 'Critique' ? '#991b1b' : alert.risk === 'Elevé' ? '#9a3412' : '#166534',
                                                marginRight: '12px'
                                            }}>
                                                RISQUE {alert.risk.toUpperCase()}
                                            </span>
                                            <button style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', fontWeight: '800', fontSize: '0.8rem' }}>Gérer</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="card" style={{ padding: '24px' }}>
                                <h3 style={{ fontWeight: '900', fontSize: '1.1rem', marginBottom: '20px' }}>Canaux de Relance</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {[
                                        { label: 'SMS Automatique', status: 'Activé', color: '#10b981' },
                                        { label: 'WhatsApp Patient', status: 'En attente API', color: '#f59e0b' },
                                        { label: 'Notification App', status: 'Activé', color: '#10b981' }
                                    ].map((c, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#f8fafc', borderRadius: '12px' }}>
                                            <span style={{ fontWeight: '800', fontSize: '0.85rem' }}>{c.label}</span>
                                            <span style={{ fontWeight: '900', color: c.color, fontSize: '0.75rem' }}>{c.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="card" style={{ padding: '24px', border: '1px solid #dbeafe', background: '#eff6ff' }}>
                                <h4 style={{ color: '#1e40af', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '8px' }}><BadgeInfo size={18} /> Conseil IA Pro</h4>
                                <p style={{ fontSize: '0.8rem', color: '#1e40af', marginTop: '10px', lineHeight: '1.5' }}>
                                    Le taux d'abandon du traitement pour **Jean Gomis** augmente chaque mois. Proposez-lui un pilulier hebdomadaire lors de sa prochaine visite.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
