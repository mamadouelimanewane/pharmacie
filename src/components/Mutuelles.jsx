import React, { useState } from 'react';
import {
    Shield, Landmark, FileCheck, AlertCircle,
    Search, Download, Filter, CheckCircle2,
    Clock, ArrowRight, User, Percent,
    FileText, Send, PieChart, PenTool,
    Scan, FileSearch, X, CheckCircle,
    Info, Eye, AlertTriangle
} from 'lucide-react';

const MUTUELLES_LIST = [
    { id: 'IPM', name: 'IPM Dakar', coverage: '80%', type: 'Obligatoire', status: 'Conventionné' },
    { id: 'AXA', name: 'AXA Sénégal', coverage: '100%', type: 'Complémentaire', status: 'Conventionné' },
    { id: 'NSIA', name: 'NSIA Assurances', coverage: '70%', type: 'Mixte', status: 'En renégociation' },
    { id: 'CNSS', name: 'CNSS', coverage: '50%', type: 'Étatique', status: 'Conventionné' },
];

const PENDING_CLAIMS = [
    { id: 'BC-2024-001', patient: 'Abdoulaye Diop', mutuelle: 'IPM Dakar', date: '08/02/2026', amount: 12500, scan: true, signature: true, status: 'Prêt SCOR' },
    { id: 'BC-2024-002', patient: 'Fatou Sow', mutuelle: 'AXA Sénégal', date: '08/02/2026', amount: 35400, scan: true, signature: false, status: 'Incomplet' },
    { id: 'BC-2024-003', patient: 'Mamadou Kane', mutuelle: 'IPRES', date: '07/02/2026', amount: 8900, scan: false, signature: false, status: 'Incomplet', error: 'Scan manquant' },
    { id: 'BC-2024-004', patient: 'Awa Ndiaye', mutuelle: 'NSIA', date: '07/02/2026', amount: 15000, scan: true, signature: true, status: 'Télétransmis' },
    { id: 'BC-2024-005', patient: 'Mme Diop', mutuelle: 'IPM Dakar', date: '09/02/2026', amount: 22000, scan: true, signature: true, status: 'Prêt SCOR' },
];

export default function Mutuelles() {
    const [activeView, setActiveView] = useState('bordereaux');
    const [filter, setFilter] = useState('Tous');

    const filteredClaims = PENDING_CLAIMS.filter(c => {
        if (filter === 'Tous') return true;
        return c.status === filter;
    });

    return (
        <div className="mutuelles fade-in" style={{ paddingBottom: '2rem' }}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Shield color="var(--primary)" size={32} /> Registre Tiers-Payant & SCOR
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Contrôle de conformité des dossiers : signatures électroniques et ordonnances numérisées.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="glass" style={{ padding: '0.75rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
                        <Download size={18} /> Exporter Bordereaux
                    </button>
                    <button style={{ padding: '0.75rem 1.25rem', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)' }}>
                        <Send size={18} /> Télétransmettre Lot SCOR
                    </button>
                </div>
            </header>

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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
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

            {/* Sidebar Alerts within the page */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '2rem' }}>
                <div className="card" style={{ border: '2px dashed #e2e8f0', background: 'white', padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <Info size={24} color="var(--primary)" />
                        <h3 style={{ fontWeight: '800', fontSize: '1rem' }}>Guide SCOR V2.1</h3>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                        Toutes les ordonnances doivent être numérisées en couleur (300dpi) avant la télétransmission du lot. Les signatures électroniques sont validées par la CNIL.
                    </p>
                </div>
                <div className="card" style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', padding: '24px' }}>
                    <h3 style={{ fontWeight: '800', fontSize: '1rem', color: '#5b21b6', marginBottom: '12px' }}>Optimisation Flux</h3>
                    <p style={{ fontSize: '0.8rem', color: '#6d28d9' }}>
                        Vous avez 8 dossiers "Incomplets" bloqués par une signature manquante. Utilisez l'application mobile pour capturer les signatures lors de la livraison.
                    </p>
                </div>
                <div className="card" style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '24px' }}>
                    <h3 style={{ fontWeight: '800', fontSize: '1rem', color: '#b91c1c', marginBottom: '12px' }}>Rejets Assurance</h3>
                    <p style={{ fontSize: '0.8rem', color: '#991b1b' }}>
                        AXA Sénégal a rejeté 3 dossiers ce matin (Motif : Carte expirable). Vérifiez les dates de droits dans l'onglet Conventions.
                    </p>
                </div>
            </div>

            <style>{`
                .table-row-hover:hover {
                    background-color: #f8fafc;
                }
            `}</style>
        </div>
    );
}
