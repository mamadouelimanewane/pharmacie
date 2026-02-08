import React, { useState } from 'react';
import {
    Calendar, Clock, User, CalendarDays, Plus,
    UserCheck, AlertCircle, FileText, DollarSign,
    TrendingUp, Briefcase, Award, ShieldCheck,
    Download, Eye, Settings, Search, CheckCircle2,
    X, ChevronRight, UserPlus, FileCheck, Mail,
    Stethoscope, Sun, Umbrella, MessageSquare,
    Check
} from 'lucide-react';
import { MOCK_STAFF } from '../data/mockData';

export default function Planning() {
    const [activeView, setActiveView] = useState('planning'); // 'planning', 'staff', 'leave', 'payroll', 'documents'
    const [showStaffModal, setShowStaffModal] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    const [replacementAnalysis, setReplacementAnalysis] = useState(null); // { absentMember, strategy }

    const LEAVE_REQUESTS = [
        { id: 1, name: 'Fatou Sow', type: 'Congés Payés', start: '15/02/2026', end: '22/02/2026', days: 7, status: 'En attente', reason: 'Vacances familiales' },
        { id: 2, name: 'Cheikh Tidiane', type: 'Maladie', start: '08/02/2026', end: '10/02/2026', days: 3, status: 'Validé', reason: 'Grippe saisonnière' },
        { id: 3, name: 'Dr. Ramatoulaye', type: 'Formation', start: '12/02/2026', end: '13/02/2026', days: 2, status: 'Validé', reason: 'Séminaire Pharmacie' },
    ];

    return (
        <div className="planning fade-in" style={{ paddingBottom: '2rem' }}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--secondary)' }}>
                        {activeView === 'planning' ? 'Planning Officine' :
                            activeView === 'staff' ? 'Gestion du Personnel' :
                                activeView === 'leave' ? 'Congés & Absences' :
                                    activeView === 'payroll' ? 'Simulation de Paie' : 'Documents & Contrats'}
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        {activeView === 'leave' ? 'Gestion centralisée des congés, arrêts maladie et absences exceptionnelles.' :
                            'Pilotage RH de l\'équipe officinale : roulements, rémunérations et conformité sociale.'}
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="glass" style={{ padding: '0.75rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border)', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Download size={18} /> Rapports RH
                    </button>
                    <button onClick={() => setShowStaffModal(true)} style={{ padding: '0.75rem 1.25rem', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <UserPlus size={18} /> {activeView === 'leave' ? 'Nouvelle Demande' : 'Ajouter Collaborateur'}
                    </button>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
                {[
                    { id: 'planning', label: 'Rotations & Pauses', icon: CalendarDays },
                    { id: 'staff', label: 'Annuaire Équipe', icon: UserCircle },
                    { id: 'leave', label: 'Congés & Maladies', icon: Umbrella },
                    { id: 'payroll', label: 'Paie & Primes', icon: DollarSign },
                    { id: 'documents', label: 'Centre de Documents', icon: FileCheck }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveView(tab.id)}
                        style={{
                            padding: '12px 0', border: 'none', background: 'none',
                            color: activeView === tab.id ? 'var(--primary)' : 'var(--text-muted)',
                            fontWeight: '800', fontSize: '1rem', cursor: 'pointer',
                            borderBottom: activeView === tab.id ? '3px solid var(--primary)' : '3px solid transparent',
                            display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s'
                        }}
                    >
                        <tab.icon size={20} /> {tab.label}
                    </button>
                ))}
            </div>

            {activeView === 'planning' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem' }}>
                    <div className="card" style={{ padding: 0 }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontWeight: '900', display: 'flex', alignItems: 'center', gap: '10px' }}><Calendar size={20} color="var(--primary)" /> Emploi du temps - Aujourd'hui</h3>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button className="glass" style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700' }}>JOUR</button>
                                <button className="glass" style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', opacity: 0.5 }}>SEMAINE</button>
                            </div>
                        </div>
                        <div style={{ padding: '16px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {MOCK_STAFF.map(member => (
                                    <div key={member.id} style={{ padding: '16px', borderRadius: '16px', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: member.status === 'Present' ? 'white' : '#fff7ed' }}>
                                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', color: 'var(--secondary)' }}>
                                                {member.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p style={{ fontWeight: '800', color: 'var(--secondary)' }}>{member.name}</p>
                                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>{member.role}</p>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end', fontWeight: '800', fontSize: '0.9rem' }}>
                                                <Clock size={16} color="var(--primary)" /> {member.shift}
                                            </div>
                                            <span style={{ fontSize: '0.7rem', fontWeight: '900', color: member.status === 'Present' ? '#16a34a' : '#ea580c', textTransform: 'uppercase' }}>
                                                {member.reason || 'SÉRÉNITÉ'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="card" style={{ background: 'var(--secondary)', color: 'white', padding: '24px' }}>
                            <h3 style={{ fontWeight: '900', fontSize: '1rem', color: 'white', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                                <UserCheck size={20} color="var(--primary)" /> État du Comptoir
                            </h3>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                <span style={{ fontSize: '2.5rem', fontWeight: '900' }}>3 / 5</span>
                                <span style={{ opacity: 0.6, fontSize: '0.9rem' }}>Pharmacien(s)</span>
                            </div>
                            <p style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '8px', lineHeight: '1.5' }}>
                                Couverture optimale prévue pour le pic d'affluence de 18h.
                            </p>
                        </div>

                        <div className="card" style={{ padding: '24px' }}>
                            <h3 style={{ fontWeight: '900', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                                <AlertCircle size={20} color="#f59e0b" /> Rappels IA / RH
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {[
                                    { text: 'Visite médicale Fatou S.', date: 'Le 12/03', type: 'urgent' },
                                    { text: 'Renouvellement Habilitation', date: 'Dr. Ramatoulaye', type: 'warn' },
                                    { text: 'Point Performance Q1', date: 'Cheikh T.', type: 'info' }
                                ].map((alert, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: alert.type === 'urgent' ? '#ef4444' : '#f59e0b', marginTop: '6px' }}></div>
                                        <div>
                                            <p style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--secondary)' }}>{alert.text}</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>{alert.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeView === 'staff' && (
                <div className="fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                        {MOCK_STAFF.map(member => (
                            <div key={member.id} className="card" style={{ padding: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                                    <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '900', color: 'var(--primary)' }}>
                                        {member.name.charAt(0)}
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '4px' }}>PERFORMANCE</p>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            {[1, 2, 3, 4, 5].map(s => <Award key={s} size={14} color={s <= 4 ? "#f59e0b" : "#e2e8f0"} fill={s <= 4 ? "#f59e0b" : "none"} />)}
                                        </div>
                                    </div>
                                </div>
                                <h3 style={{ fontWeight: '900', fontSize: '1.25rem', marginBottom: '4px', color: 'var(--secondary)' }}>{member.name}</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '700', marginBottom: '16px' }}>{member.role}</p>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '16px', marginBottom: '20px' }}>
                                    <div>
                                        <p style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '4px' }}>ANCIENNETÉ</p>
                                        <p style={{ fontWeight: '800', fontSize: '0.85rem' }}>4 ans</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '4px' }}>SOLDE CONGÉS</p>
                                        <p style={{ fontWeight: '800', fontSize: '0.85rem', color: '#16a34a' }}>12 JOURS</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid var(--border)', background: 'white', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                        <Eye size={16} /> Profil
                                    </button>
                                    <button style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: 'var(--secondary)', color: 'white', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                        <Mail size={16} /> Message
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeView === 'leave' && (
                <div className="fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div className="card" style={{ borderLeft: '4px solid #3b82f6' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '8px' }}>CONGÉS EN COURS</p>
                            <p style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--secondary)' }}>2</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#3b82f6', fontSize: '0.8rem', marginTop: '8px', fontWeight: '600' }}>
                                <Sun size={14} /> Fatou, Cheikh
                            </div>
                        </div>
                        <div className="card" style={{ borderLeft: '4px solid #ef4444' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '8px' }}>ARRÊTS MALADIE</p>
                            <p style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ef4444' }}>1</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ef4444', fontSize: '0.8rem', marginTop: '8px', fontWeight: '600' }}>
                                <Stethoscope size={14} /> Mamadou K.
                            </div>
                        </div>
                        <div className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '8px' }}>DEMANDES À VALIDER</p>
                            <p style={{ fontSize: '1.8rem', fontWeight: '900', color: '#f59e0b' }}>3</p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>Action requise</p>
                        </div>
                        <div className="card" style={{ background: '#f0f9ff', border: 'none' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: '800', color: '#0369a1', marginBottom: '8px' }}>INDICE D'ABSENTÉISME</p>
                            <p style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0369a1' }}>2.1%</p>
                            <p style={{ fontSize: '0.8rem', color: '#16a34a', marginTop: '8px', fontWeight: '700' }}>Stable (Sous 5%)</p>
                        </div>
                    </div>

                    <div className="card" style={{ padding: 0 }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontWeight: '900', display: 'flex', alignItems: 'center', gap: '10px' }}><Umbrella size={20} color="var(--primary)" /> Gestion des Congés & Absences</h3>
                            <button className="glass" style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '800' }}>Exporter Planning</button>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ backgroundColor: '#f8fafc' }}>
                                <tr style={{ textAlign: 'left' }}>
                                    <th style={{ padding: '20px', fontSize: '0.8rem', fontWeight: '900' }}>COLLABORATEUR</th>
                                    <th style={{ fontSize: '0.8rem', fontWeight: '900' }}>TYPE D'ABSENCE</th>
                                    <th style={{ fontSize: '0.8rem', fontWeight: '900' }}>PÉRIODE</th>
                                    <th style={{ fontSize: '0.8rem', fontWeight: '900' }}>DURÉE</th>
                                    <th style={{ fontSize: '0.8rem', fontWeight: '900' }}>STATUT</th>
                                    <th style={{ padding: '20px', textAlign: 'right' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {LEAVE_REQUESTS.map(req => (
                                    <tr key={req.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '20px' }}>
                                            <div style={{ fontWeight: '800' }}>{req.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{req.reason}</div>
                                        </td>
                                        <td>
                                            <span style={{
                                                display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', fontSize: '0.85rem',
                                                color: req.type === 'Maladie' ? '#ef4444' : req.type === 'Formation' ? '#8b5cf6' : '#3b82f6'
                                            }}>
                                                {req.type === 'Maladie' && <Stethoscope size={14} />}
                                                {req.type === 'Congés Payés' && <Sun size={14} />}
                                                {req.type === 'Formation' && <Briefcase size={14} />}
                                                {req.type}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: '700' }}>{req.start} → {req.end}</div>
                                        </td>
                                        <td style={{ fontWeight: '800' }}>{req.days} jours</td>
                                        <td>
                                            <span style={{
                                                padding: '6px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '900',
                                                backgroundColor: req.status === 'Validé' ? '#dcfce7' : '#fff7ed',
                                                color: req.status === 'Validé' ? '#15803d' : '#9a3412'
                                            }}>
                                                {req.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td style={{ padding: '20px', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                {req.type === 'Maladie' && (
                                                    <button
                                                        onClick={() => setReplacementAnalysis({ absentMember: req.name, type: req.type })}
                                                        style={{ padding: '8px', borderRadius: '8px', border: 'none', background: 'var(--secondary)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                                                    >
                                                        <TrendingUp size={16} /> IA Remplacement
                                                    </button>
                                                )}
                                                {req.status === 'En attente' ? (
                                                    <>
                                                        <button style={{ padding: '8px', borderRadius: '8px', border: 'none', background: '#dcfce7', color: '#166534', cursor: 'pointer' }}><Check size={18} /></button>
                                                        <button style={{ padding: '8px', borderRadius: '8px', border: 'none', background: '#fee2e2', color: '#991b1b', cursor: 'pointer' }}><X size={18} /></button>
                                                    </>
                                                ) : (
                                                    <button style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white' }}><Eye size={18} /></button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* AI Replacement Analysis Modal */}
            {replacementAnalysis && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
                    <div className="card fade-in" style={{ maxWidth: '700px', width: '100%', padding: '32px', position: 'relative', border: '1px solid var(--primary)' }}>
                        <button onClick={() => setReplacementAnalysis(null)} style={{ position: 'absolute', top: '20px', right: '20px', padding: '8px', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                            <X size={24} />
                        </button>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                            <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'var(--secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                <TrendingUp size={32} />
                            </div>
                            <div>
                                <h2 style={{ fontWeight: '900', fontSize: '1.4rem' }}>Analyse de Remplacement IA</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Scénarios d'optimisation pour l'absence de <strong>{replacementAnalysis.absentMember}</strong></p>
                            </div>
                        </div>

                        <div style={{ backgroundColor: '#fff7ed', border: '1px solid #ffedd5', padding: '16px', borderRadius: '14px', marginBottom: '24px', display: 'flex', gap: '12px' }}>
                            <AlertCircle size={20} color="#ea580c" />
                            <p style={{ fontSize: '0.85rem', color: '#9a3412', fontWeight: '600', lineHeight: '1.5' }}>
                                L'absence prévue (3 jours) réduit votre couverture comptoir de <strong>20%</strong> sur la plage 14h-18h. Action recommandée : Rotation interne.
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '24px' }}>
                            <div style={{ padding: '20px', borderRadius: '20px', border: '2px solid var(--primary)', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '-12px', right: '12px', background: 'var(--primary)', color: 'white', padding: '2px 10px', borderRadius: '100px', fontSize: '0.65rem', fontWeight: '900' }}>IA RECOMMENDED</div>
                                <h4 style={{ fontWeight: '900', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <UserCheck size={18} color="var(--primary)" /> Rotation Interne
                                </h4>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <li style={{ fontSize: '0.8rem', fontWeight: '700', padding: '8px', background: '#f0fdf4', borderRadius: '8px' }}>✓ <strong>Mamadou K.</strong> : Prolonger shift +2h</li>
                                    <li style={{ fontSize: '0.8rem', fontWeight: '700', padding: '8px', background: '#f0fdf4', borderRadius: '8px' }}>✓ <strong>Dr. Ramatoulaye</strong> : Reprise shift matin</li>
                                </ul>
                                <p style={{ fontSize: '0.75rem', marginTop: '12px', color: 'var(--text-muted)' }}>Coût estimé : <strong>+45 000 F</strong> (HS)</p>
                                <button style={{ width: '100%', marginTop: '12px', padding: '10px', borderRadius: '10px', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: '800', cursor: 'pointer' }}>Appliquer le Plan</button>
                            </div>

                            <div style={{ padding: '20px', borderRadius: '20px', border: '1px solid var(--border)' }}>
                                <h4 style={{ fontWeight: '900', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <UserPlus size={18} color="var(--secondary)" /> Intérim / Remplaçant
                                </h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                                    Recherche de remplaçants disponibles dans le réseau <strong>Sédar RH</strong>.
                                </p>
                                <div style={{ padding: '8px', border: '1px solid #f1f5f9', borderRadius: '10px', marginBottom: '12px' }}>
                                    <p style={{ fontSize: '0.75rem', fontWeight: '800' }}>2 Profils trouvés</p>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Dispo : Immédiate</p>
                                </div>
                                <button style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid var(--border)', background: 'white', fontWeight: '800', cursor: 'pointer' }}>Contacter Agence</button>
                            </div>
                        </div>

                        <div className="card" style={{ background: '#f8fafc', padding: '16px' }}>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: '900', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <MessageSquare size={16} color="var(--primary)" /> Note de l'Assistant IA
                            </h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                                "J'ai vérifié les certifications. <strong>Mamadou K.</strong> est le plus apte à remplacer Cheikh pour la dispensation des psychotropes car ses habilitations sont à jour."
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {activeView === 'payroll' && (
                <div className="fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '8px' }}>MASSE SALARIALE (MENSUEL)</p>
                            <p style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--secondary)' }}>4 250 000 F</p>
                        </div>
                        <div className="card" style={{ borderLeft: '4px solid #8b5cf6' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '8px' }}>CHARGES SOCIALES (IPRES/CSS)</p>
                            <p style={{ fontSize: '1.8rem', fontWeight: '900', color: '#8b5cf6' }}>845 000 F</p>
                        </div>
                        <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '8px' }}>PRIMES PERFORMANCE</p>
                            <p style={{ fontSize: '1.8rem', fontWeight: '900', color: '#10b981' }}>350 000 F</p>
                        </div>
                        <div className="card" style={{ background: '#f0f9ff', border: 'none' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: '800', color: '#0369a1', marginBottom: '8px' }}>SIMULATION IA PAIE</p>
                            <button style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: '#0ea5e9', color: 'white', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer' }}>Générer Pré-Bulletins</button>
                        </div>
                    </div>

                    <div className="card" style={{ padding: 0 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ backgroundColor: '#f8fafc' }}>
                                <tr style={{ textAlign: 'left' }}>
                                    <th style={{ padding: '20px', fontSize: '0.8rem', fontWeight: '900' }}>COLLABORATEUR</th>
                                    <th style={{ fontSize: '0.8rem', fontWeight: '900' }}>SALAIRE DE BASE</th>
                                    <th style={{ fontSize: '0.8rem', fontWeight: '900' }}>HS / PRIMES</th>
                                    <th style={{ fontSize: '0.8rem', fontWeight: '900' }}>NET À PAYER</th>
                                    <th style={{ fontSize: '0.8rem', fontWeight: '900' }}>STATUT PAIE</th>
                                    <th style={{ padding: '20px', textAlign: 'right' }}>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_STAFF.map(member => (
                                    <tr key={member.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '20px' }}>
                                            <div style={{ fontWeight: '800' }}>{member.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{member.role}</div>
                                        </td>
                                        <td style={{ fontWeight: '700' }}>450 000 F</td>
                                        <td style={{ color: '#10b981', fontWeight: '800' }}>+25 000 F</td>
                                        <td style={{ fontWeight: '900', color: 'var(--secondary)' }}>475 000 F</td>
                                        <td>
                                            <span style={{ padding: '4px 10px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '900', background: '#dcfce7', color: '#166534' }}>VALIDE</span>
                                        </td>
                                        <td style={{ padding: '20px', textAlign: 'right' }}>
                                            <button style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white' }}><FileText size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeView === 'documents' && (
                <div className="fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                        {[
                            { title: 'Dossier Administratif', count: '45 fichiers', icon: Briefcase, color: '#3b82f6' },
                            { title: 'Contrats de Travail', count: '12 fichiers', icon: ShieldCheck, color: '#10b981' },
                            { title: 'Bulletins de Paie', count: '144 fichiers', icon: FileText, color: '#8b5cf6' },
                            { title: 'Certifications / Diplômes', count: '18 fichiers', icon: Award, color: '#f59e0b' }
                        ].map((box, i) => (
                            <div key={i} className="card" style={{ padding: '24px', textAlign: 'center', transition: 'transform 0.2s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                                <div style={{ width: '64px', height: '64px', borderRadius: '20px', backgroundColor: box.color + '15', color: box.color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                    <box.icon size={32} />
                                </div>
                                <h3 style={{ fontWeight: '900', fontSize: '1rem', marginBottom: '4px' }}>{box.title}</h3>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700' }}>{box.count}</p>
                            </div>
                        ))}
                    </div>

                    <div className="card" style={{ marginTop: '2rem', padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontWeight: '900', fontSize: '1.1rem' }}>Documents Récents</h3>
                            <button className="glass" style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '800' }}>Tout voir</button>
                        </div>
                        {[
                            { name: 'Contrat_CDI_Cheikh_T_2026.pdf', date: '01/02/2026', size: '2.4 MB' },
                            { name: 'Bulletin_Paie_Janv_2026.zip', date: '03/02/2026', size: '1.1 MB' },
                            { name: 'Attestation_Vidal_Dr_Ramatoulaye.pdf', date: '05/02/2026', size: '840 KB' }
                        ].map((doc, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                    <FileText size={20} color="var(--text-muted)" />
                                    <div>
                                        <p style={{ fontWeight: '700', fontSize: '0.9rem' }}>{doc.name}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{doc.date} • {doc.size}</p>
                                    </div>
                                </div>
                                <button style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white' }}><Download size={18} /></button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

const UserCircle = ({ size, color = "currentColor", opacity = 1 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity }}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);
