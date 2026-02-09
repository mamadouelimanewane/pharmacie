import React, { useState } from 'react';
import {
    Users, Search, Plus, UserPlus, Filter,
    MoreVertical, FileText, AlertTriangle, History,
    Stethoscope, Activity, Bell, Calendar,
    TrendingUp, MessageSquare, CheckCircle2,
    Heart, ShieldAlert, BadgeInfo, X, Pill, Thermometer,
    ArrowRight, Brain
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MOCK_PATIENTS } from '../data/mockData';

const CONSTANTS_DATA = [
    { date: 'Jan', tension: 120, glycemie: 0.95 },
    { date: 'Fev', tension: 125, glycemie: 0.98 },
    { date: 'Mar', tension: 118, glycemie: 0.92 },
    { date: 'Avr', tension: 122, glycemie: 0.96 },
    { date: 'Mai', tension: 130, glycemie: 1.05 },
    { date: 'Juin', tension: 124, glycemie: 0.97 },
];

export default function Patients() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('directory'); // 'directory', 'observance', 'medical'
    const [selectedPatient, setSelectedPatient] = useState(null);

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
                        {activeTab === 'directory' ? 'Dossiers Patients Intelligent' : activeTab === 'observance' ? 'Observance & IA Thérapeutique' : 'Suivi des Constantes'}
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        {activeTab === 'observance' ? 'L\'IA analyse les comportements de renouvellement pour prévenir les interruptions de traitement.' : 'Gérez les historiques médicaux, les allergies et le suivi pharmaceutique avec assistance IA.'}
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
                                    <tr key={patient.id} style={{ borderBottom: '1px solid #f1f5f9', cursor: 'pointer', transition: 'background 0.2s' }} onClick={() => setSelectedPatient(patient)} onMouseOver={e => e.currentTarget.style.background = '#f8fafc'} onMouseOut={e => e.currentTarget.style.background = 'white'}>
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
                                                <button style={{ padding: '8px', borderRadius: '8px', border: 'none', background: 'var(--secondary)', color: 'white' }}><ArrowRight size={16} /></button>
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

            {/* --- PATIENT DETAIL MODAL --- */}
            {selectedPatient && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'end' }} onClick={() => setSelectedPatient(null)}>
                    <div className="fade-in-right" style={{ width: '800px', height: '100%', backgroundColor: '#fff', padding: '0', display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 30px rgba(0,0,0,0.1)' }} onClick={e => e.stopPropagation()}>

                        {/* Header */}
                        <div style={{ padding: '2rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'start', backgroundColor: '#f8fafc' }}>
                            <div style={{ display: 'flex', gap: '1.5rem' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '24px', backgroundColor: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '900' }}>
                                    {selectedPatient.name.charAt(0)}
                                </div>
                                <div>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: '900', lineHeight: 1.1 }}>{selectedPatient.name}</h2>
                                    <div style={{ display: 'flex', gap: '1rem', marginTop: '8px', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '600' }}>
                                        <span>Né(e) le {selectedPatient.dob}</span>
                                        <span>•</span>
                                        <span>NSS: {selectedPatient.nss}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                                        <span style={{ padding: '4px 10px', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '800' }}>ASSURÉ</span>
                                        <span style={{ padding: '4px 10px', backgroundColor: '#e0f2fe', color: '#0369a1', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '800' }}>DIABÈTE T2</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setSelectedPatient(null)} style={{ padding: '8px', borderRadius: '50%', border: 'none', cursor: 'pointer', background: '#fff' }}><X size={24} color="#666" /></button>
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>

                            {/* Alert Logic */}
                            {selectedPatient.risk !== 'None' && (
                                <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '16px', padding: '20px', marginBottom: '2rem', display: 'flex', gap: '16px' }}>
                                    <div style={{ padding: '10px', background: '#fff', borderRadius: '12px', height: 'fit-content' }}>
                                        <ShieldAlert size={24} color="#dc2626" />
                                    </div>
                                    <div>
                                        <h4 style={{ color: '#991b1b', fontWeight: '900', fontSize: '1.1rem' }}>Attention : Interaction Médicamenteuse</h4>
                                        <p style={{ color: '#7f1d1d', fontSize: '0.9rem', marginTop: '4px' }}>
                                            La prescription récente de <strong>Ibuprofène</strong> présente un risque avec le traitement de fond (<strong>IEC/ARA II</strong>). Risque d'insuffisance rénale aiguë.
                                        </p>
                                        <div style={{ marginTop: '12px', display: 'flex', gap: '10px' }}>
                                            <button style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#dc2626', color: '#fff', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}>Contacter Prescripteur</button>
                                            <button style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #fca5a5', background: '#fff', color: '#991b1b', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}>Noter dans le dossier</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Vital Signs Chart */}
                            <div style={{ marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Activity size={20} color="var(--primary)" /> Constantes Vitales
                                    </h3>
                                    <button style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer' }}>Voir tout l'historique</button>
                                </div>
                                <div className="card" style={{ height: '250px', padding: '20px' }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={CONSTANTS_DATA}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                                            <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} domain={[100, 150]} />
                                            <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} domain={[0.8, 1.2]} />
                                            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
                                            <Line yAxisId="left" type="monotone" dataKey="tension" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} name="Tension Sys." />
                                            <Line yAxisId="right" type="monotone" dataKey="glycemie" stroke="#10b981" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} name="Glycémie (g/L)" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div>
                                <h3 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <History size={20} color="var(--secondary)" /> Historique de Dispensation
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                                    {[
                                        { date: '08 Fev', items: ['Metformine 1000', 'Diamicron 60'], doctor: 'Dr. Diop', status: 'Renouvellement' },
                                        { date: '15 Jan', items: ['Doliprane 1000', 'Rhinadvil'], doctor: 'Dr. Fall', status: 'Ponctuel' },
                                        { date: '10 Jan', items: ['Metformine 1000', 'Diamicron 60', 'Kardegic 75'], doctor: 'Dr. Diop', status: 'Renouvellement' }
                                    ].map((visit, i) => (
                                        <div key={i} style={{ display: 'flex', gap: '20px', paddingBottom: '20px', position: 'relative' }}>
                                            {/* Line */}
                                            {i < 2 && <div style={{ position: 'absolute', top: '24px', left: '19px', bottom: '-4px', width: '2px', backgroundColor: '#f1f5f9' }}></div>}

                                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: i === 0 ? 'var(--primary)' : '#f1f5f9', color: i === 0 ? 'white' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.8rem', zIndex: 1 }}>
                                                {visit.date.split(' ')[0]}
                                            </div>
                                            <div style={{ flex: 1, padding: '20px', borderRadius: '16px', background: '#fff', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                    <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-muted)' }}>{visit.date} • {visit.doctor}</span>
                                                    <span style={{ fontSize: '0.7rem', fontWeight: '800', padding: '2px 8px', borderRadius: '100px', backgroundColor: '#f8fafc', color: 'var(--text-muted)' }}>{visit.status}</span>
                                                </div>
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                                    {visit.items.map(drug => (
                                                        <span key={drug} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px', backgroundColor: '#f0f9ff', color: '#0369a1', fontSize: '0.85rem', fontWeight: '700' }}>
                                                            <Pill size={14} /> {drug}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Footer Actions */}
                        <div style={{ padding: '20px', borderTop: '1px solid #eee', display: 'flex', gap: '1rem', backgroundColor: '#fff' }}>
                            <button style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', fontWeight: '800', cursor: 'pointer', display: 'flex', aliems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <FileText size={18} /> Ordonnancier
                            </button>
                            <button style={{ flex: 1, padding: '14px', borderRadius: '12px', border: 'none', background: 'var(--secondary)', color: 'white', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <Stethoscope size={18} /> Nouvelle Vente
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
