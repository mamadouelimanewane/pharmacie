import React, { useState } from 'react';
import {
    Shield, Landmark, FileCheck, AlertCircle,
    Search, Download, Filter, CheckCircle2,
    Clock, ArrowRight, User, Percent,
    FileText, Send, PieChart, PenTool,
    Scan, FileSearch, X, CheckCircle,
    Info, Eye, AlertTriangle, CreditCard,
    TrendingUp, Calendar, ChevronRight,
    Briefcase, Activity, CheckSquare
} from 'lucide-react';

const MUTUELLES_LIST = [
    { id: 'IPM', name: 'IPM Dakar', coverage: '80%', type: 'Obligatoire', status: 'Conventionné', contact: '77 125 44 22', delay: '15 jours' },
    { id: 'AXA', name: 'AXA Sénégal', coverage: '100%', type: 'Complémentaire', status: 'Conventionné', contact: '33 821 15 15', delay: '30 jours' },
    { id: 'NSIA', name: 'NSIA Assurances', coverage: '70%', type: 'Mixte', status: 'En renégociation', contact: '33 889 00 22', delay: '45 jours' },
    { id: 'CNSS', name: 'CNSS', coverage: '50%', type: 'Étatique', status: 'Conventionné', contact: '33 849 50 50', delay: '60 jours' },
];

const PENDING_CLAIMS = [
    { id: 'BC-2024-001', patient: 'Abdoulaye Diop', mutuelle: 'IPM Dakar', date: '08/02/2026', amount: 12500, scan: true, signature: true, status: 'Prêt SCOR' },
    { id: 'BC-2024-002', patient: 'Fatou Sow', mutuelle: 'AXA Sénégal', date: '08/02/2026', amount: 35400, scan: true, signature: false, status: 'Incomplet' },
    { id: 'BC-2024-003', patient: 'Mamadou Kane', mutuelle: 'IPRES', date: '07/02/2026', amount: 8900, scan: false, signature: false, status: 'Incomplet', error: 'Scan manquant' },
    { id: 'BC-2024-004', patient: 'Awa Ndiaye', mutuelle: 'NSIA', date: '07/02/2026', amount: 15000, scan: true, signature: true, status: 'Télétransmis' },
    { id: 'BC-2024-005', patient: 'Mme Diop', mutuelle: 'IPM Dakar', date: '09/02/2026', amount: 22000, scan: true, signature: true, status: 'Prêt SCOR' },
];

const REIMBURSEMENT_SLIPS = [
    { id: 'BR-9921', mutuelle: 'IPM Dakar', period: 'Janvier 2026', sentDate: '01/02/2026', totalAmount: 850000, receivedAmount: 810000, gap: 40000, status: 'Partiel', rejets: 3 },
    { id: 'BR-9922', mutuelle: 'AXA Sénégal', period: 'Janvier 2026', sentDate: '02/02/2026', totalAmount: 1200000, receivedAmount: 1200000, gap: 0, status: 'Payé', rejets: 0 },
    { id: 'BR-9923', mutuelle: 'CNSS', period: 'Décembre 2025', sentDate: '28/12/2025', totalAmount: 450000, receivedAmount: 0, gap: 450000, status: 'En attente', rejets: 0 },
];

export default function Mutuelles() {
    const [activeView, setActiveView] = useState('bordereaux'); // 'bordereaux', 'remboursements', 'conventions'
    const [filter, setFilter] = useState('Tous');
    const [showConventionModal, setShowConventionModal] = useState(false);

    const filteredClaims = PENDING_CLAIMS.filter(c => {
        if (filter === 'Tous') return true;
        return c.status === filter;
    });

    return (
        <div className="mutuelles fade-in" style={{ paddingBottom: '2rem' }}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Shield color="var(--primary)" size={32} />
                        {activeView === 'bordereaux' ? 'Gestion Tiers-Payant' : activeView === 'remboursements' ? 'Suivi des Remboursements' : 'Conventions Mutuelles'}
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        {activeView === 'bordereaux' ? 'Contrôle de conformité et télétransmission des bons (SCOR).' :
                            activeView === 'remboursements' ? 'Suivi financier des bordereaux et rapprochement bancaire.' :
                                'Gestion des accords cadre et des taux de prise en charge par mutuelle.'}
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    {activeView === 'bordereaux' ? (
                        <>
                            <button className="glass" style={{ padding: '0.75rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
                                <Download size={18} /> Exporter Bordereaux
                            </button>
                            <button style={{ padding: '0.75rem 1.25rem', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)' }}>
                                <Send size={18} /> Télétransmettre Lot SCOR
                            </button>
                        </>
                    ) : activeView === 'remboursements' ? (
                        <button style={{ padding: '0.75rem 1.25rem', borderRadius: '12px', border: 'none', backgroundColor: 'var(--secondary)', color: 'white', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ArrowRight size={18} /> Relance Mutuelles
                        </button>
                    ) : (
                        <button onClick={() => setShowConventionModal(true)} style={{ padding: '0.75rem 1.25rem', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Percent size={18} /> Nouvelle Convention
                        </button>
                    )}
                </div>
            </header>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
                {[
                    { id: 'bordereaux', label: 'Bordereaux de Vente', icon: FileText },
                    { id: 'remboursements', label: 'Suivi Règlements', icon: CreditCard },
                    { id: 'conventions', label: 'Conventions IA', icon: Briefcase }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveView(tab.id)}
                        style={{
                            padding: '12px 24px', background: 'none', border: 'none',
                            color: activeView === tab.id ? 'var(--primary)' : 'var(--text-muted)',
                            fontWeight: '800', cursor: 'pointer',
                            borderBottom: activeView === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
                            display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s'
                        }}
                    >
                        <tab.icon size={18} /> {tab.label}
                    </button>
                ))}
            </div>

            {activeView === 'bordereaux' && (
                <div className="fade-in">
                    {/* Statistiques SCOR & Compliance */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
                            <p style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>TAUX DE CONFORMITÉ SCOR</p>
                            <p style={{ fontSize: '1.6rem', fontWeight: '900' }}>94.2%</p>
                            <div style={{ width: '100%', height: '4px', backgroundColor: '#f1f5f9', borderRadius: '2px', marginTop: '8px' }}>
                                <div style={{ width: '94%', height: '100%', backgroundColor: 'var(--primary)', borderRadius: '2px' }}></div>
                            </div>
                        </div>
                        <div className="card" style={{ borderLeft: '4px solid #8b5cf6' }}>
                            <p style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>ORDS. NUMÉRISÉES</p>
                            <p style={{ fontSize: '1.6rem', fontWeight: '900' }}>1,248</p>
                            <p style={{ fontSize: '0.75rem', color: '#8b5cf6', marginTop: '4px' }}>+12 aujourd'hui</p>
                        </div>
                        <div className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
                            <p style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>SIGNATURES MANQUANTES</p>
                            <p style={{ fontSize: '1.6rem', fontWeight: '900' }}>8</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--warning)', marginTop: '4px' }}>Action requise</p>
                        </div>
                        <div className="card" style={{ borderLeft: '4px solid #0ea5e9' }}>
                            <p style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>EN ATTENTE RÉCOUVREMENT</p>
                            <p style={{ fontSize: '1.6rem', fontWeight: '900' }}>3.8M F</p>
                            <p style={{ fontSize: '0.75rem', color: '#0ea5e9', marginTop: '4px' }}>Cycle 15 jours</p>
                        </div>
                    </div>

                    <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {['Tous', 'Prêt SCOR', 'Incomplet', 'Télétransmis'].map(f => (
                                    <button
                                        key={f}
                                        onClick={() => setFilter(f)}
                                        style={{
                                            padding: '10px 20px', borderRadius: '12px', border: 'none',
                                            background: filter === f ? 'var(--primary-light)' : '#f8fafc',
                                            color: filter === f ? 'var(--primary)' : 'var(--text-muted)',
                                            fontWeight: '800', cursor: 'pointer', transition: 'all 0.2s',
                                            fontSize: '0.85rem'
                                        }}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                            <div style={{ position: 'relative', width: '300px' }}>
                                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input type="text" placeholder="Patient, Mutuelle ou N° Bon..." style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.9rem' }} />
                            </div>
                        </div>

                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                <tr style={{ textAlign: 'left' }}>
                                    <th style={{ padding: '20px', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>ID DOSSIER</th>
                                    <th style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>PATIENT / MUTUELLE</th>
                                    <th style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>MONTANT</th>
                                    <th style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>SCAN</th>
                                    <th style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>SIGN.</th>
                                    <th style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>CONFORMITÉ</th>
                                    <th style={{ padding: '20px', textAlign: 'right' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredClaims.map(claim => (
                                    <tr key={claim.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }} className="table-row-hover">
                                        <td style={{ padding: '20px', fontSize: '0.85rem', fontWeight: '700', color: 'var(--secondary)' }}>{claim.id}</td>
                                        <td>
                                            <div style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--secondary)' }}>{claim.patient}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                <Landmark size={12} /> {claim.mutuelle} • {claim.date}
                                            </div>
                                        </td>
                                        <td><span style={{ fontWeight: '900', color: 'var(--primary)', fontSize: '1.1rem' }}>{claim.amount.toLocaleString()} F</span></td>
                                        <td style={{ textAlign: 'center' }}>
                                            <div style={{ display: 'inline-flex', padding: '8px', borderRadius: '10px', backgroundColor: claim.scan ? '#f0fdf4' : '#fef2f2', color: claim.scan ? '#16a34a' : '#ef4444' }}>
                                                {claim.scan ? <Scan size={18} /> : <AlertTriangle size={18} />}
                                            </div>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <div style={{ display: 'inline-flex', padding: '8px', borderRadius: '10px', backgroundColor: claim.signature ? '#f5f3ff' : '#fff7ed', color: claim.signature ? '#8b5cf6' : '#f59e0b' }}>
                                                {claim.signature ? <PenTool size={18} /> : <AlertCircle size={18} />}
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{
                                                padding: '6px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '900',
                                                backgroundColor: claim.status === 'Prêt SCOR' ? '#dcfce7' : claim.status === 'Télétransmis' ? '#f0f9ff' : '#fff7ed',
                                                color: claim.status === 'Prêt SCOR' ? '#15803d' : claim.status === 'Télétransmis' ? '#0369a1' : '#92400e',
                                                display: 'flex', alignItems: 'center', gap: '6px', width: 'fit-content'
                                            }}>
                                                {claim.status === 'Prêt SCOR' && <CheckCircle size={14} />}
                                                {claim.status === 'Incomplet' && <Clock size={14} />}
                                                {claim.status === 'Télétransmis' && <Send size={14} />}
                                                {claim.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td style={{ padding: '20px', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                <button style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', color: 'var(--secondary)', cursor: 'pointer' }} title="Voir documents"><Eye size={18} /></button>
                                                <button style={{ padding: '8px', borderRadius: '8px', border: 'none', background: 'var(--primary-light)', color: 'var(--primary)', cursor: 'pointer' }} title="Valider pour SCOR"><FileCheck size={18} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeView === 'remboursements' && (
                <div className="fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div className="card" style={{ background: 'var(--primary)', color: 'white' }}>
                            <p style={{ fontSize: '0.7rem', fontWeight: '800', opacity: 0.8, marginBottom: '0.5rem' }}>TOTAL ENCAISSÉ (MOIS)</p>
                            <p style={{ fontSize: '1.8rem', fontWeight: '900' }}>3.2M F</p>
                            <p style={{ fontSize: '0.8rem', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <TrendingUp size={16} /> +12% vs mois dernier
                            </p>
                        </div>
                        <div className="card">
                            <p style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>BORDEREAUX EN ATTENTE</p>
                            <p style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--secondary)' }}>12</p>
                            <p style={{ fontSize: '0.8rem', color: '#6366f1', marginTop: '8px' }}>Valeur: 580k F</p>
                        </div>
                        <div className="card">
                            <p style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>REJETS CONVENTIONS</p>
                            <p style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ef4444' }}>3</p>
                            <p style={{ fontSize: '0.8rem', color: '#ef4444', marginTop: '8px' }}>Action nécessaire</p>
                        </div>
                        <div className="card">
                            <p style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>DÉLAI MOYEN RÉGLEMENT</p>
                            <p style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--secondary)' }}>22 jours</p>
                            <p style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '8px' }}>-2j vs cible</p>
                        </div>
                    </div>

                    <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 style={{ fontWeight: '900', fontSize: '1.1rem' }}>Historique des Bordereaux de Remboursement</h3>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button className="glass" style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '700' }}>Filtre Mutation</button>
                                <button className="glass" style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '700' }}>Janvier 2026</button>
                            </div>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ backgroundColor: '#f8fafc' }}>
                                <tr style={{ textAlign: 'left' }}>
                                    <th style={{ padding: '20px', fontSize: '0.75rem', fontWeight: '800' }}>N° BORDEREAU</th>
                                    <th style={{ fontSize: '0.75rem', fontWeight: '800' }}>MUTUELLE / PÉRIODE</th>
                                    <th style={{ fontSize: '0.75rem', fontWeight: '800' }}>TOTAL ENVOYÉ</th>
                                    <th style={{ fontSize: '0.75rem', fontWeight: '800' }}>RÉGLÉ</th>
                                    <th style={{ fontSize: '0.75rem', fontWeight: '800' }}>REJETS</th>
                                    <th style={{ fontSize: '0.75rem', fontWeight: '800' }}>STATUT</th>
                                    <th style={{ padding: '20px', textAlign: 'right' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {REIMBURSEMENT_SLIPS.map(slip => (
                                    <tr key={slip.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '20px', fontWeight: '800' }}>{slip.id}</td>
                                        <td>
                                            <div style={{ fontWeight: '700' }}>{slip.mutuelle}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{slip.period}</div>
                                        </td>
                                        <td style={{ fontWeight: '700' }}>{slip.totalAmount.toLocaleString()} F</td>
                                        <td style={{ fontWeight: '900', color: slip.receivedAmount > 0 ? '#16a34a' : 'var(--text-muted)' }}>
                                            {slip.receivedAmount.toLocaleString()} F
                                        </td>
                                        <td>
                                            {slip.rejets > 0 ? (
                                                <span style={{ color: '#ef4444', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                                    <AlertCircle size={14} /> {slip.rejets}
                                                </span>
                                            ) : '—'}
                                        </td>
                                        <td>
                                            <span style={{
                                                padding: '4px 10px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '900',
                                                background: slip.status === 'Payé' ? '#dcfce7' : slip.status === 'Partiel' ? '#fff7ed' : '#f1f5f9',
                                                color: slip.status === 'Payé' ? '#166534' : slip.status === 'Partiel' ? '#9a3412' : '#64748b'
                                            }}>
                                                {slip.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td style={{ padding: '20px', textAlign: 'right' }}>
                                            <button style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer' }}>Détails</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeView === 'conventions' && (
                <div className="fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {MUTUELLES_LIST.map(mut => (
                            <div key={mut.id} className="card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                        <Landmark size={24} />
                                    </div>
                                    <span style={{ padding: '4px 10px', borderRadius: '8px', fontSize: '0.65rem', fontWeight: '900', background: mut.status === 'Conventionné' ? '#dcfce7' : '#fff7ed', color: mut.status === 'Conventionné' ? '#166534' : '#9a3412' }}>
                                        {mut.status.toUpperCase()}
                                    </span>
                                </div>
                                <div>
                                    <h3 style={{ fontWeight: '900', fontSize: '1.2rem', marginBottom: '4px' }}>{mut.name}</h3>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{mut.type}</p>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
                                    <div>
                                        <p style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '4px' }}>COUVERTURE</p>
                                        <p style={{ fontWeight: '900', color: 'var(--primary)' }}>{mut.coverage}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '4px' }}>DÉLAI MOYEN</p>
                                        <p style={{ fontWeight: '900', color: 'var(--secondary)' }}>{mut.delay}</p>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)' }}><Activity size={14} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> {mut.contact}</span>
                                    <button style={{ border: 'none', background: 'none', color: 'var(--primary)', fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer' }}>Modifier <ChevronRight size={14} style={{ verticalAlign: 'middle' }} /></button>
                                </div>
                            </div>
                        ))}
                        <div className="card" style={{ border: '2px dashed #e2e8f0', background: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.2s' }} onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'} onMouseOut={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Plus size={24} color="#64748b" />
                            </div>
                            <p style={{ fontWeight: '800', color: '#64748b' }}>Ajouter une Convention</p>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .table-row-hover:hover {
                    background-color: #f8fafc;
                }
            `}</style>
        </div>
    );
}
