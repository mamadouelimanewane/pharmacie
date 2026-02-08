import React, { useState } from 'react';
import {
    Shield, Landmark, FileCheck, AlertCircle,
    Search, Download, Filter, CheckCircle2,
    Clock, ArrowRight, User, Percent,
    FileText, Send, PieChart
} from 'lucide-react';

const MUTUELLES_LIST = [
    { id: 'IPM', name: 'IPM Dakar', coverage: '80%', type: 'Obligatoire', status: 'Conventionné' },
    { id: 'AXA', name: 'AXA Sénégal', coverage: '100%', type: 'Complémentaire', status: 'Conventionné' },
    { id: 'NSIA', name: 'NSIA Assurances', coverage: '70%', type: 'Mixte', status: 'En renégociation' },
    { id: 'CNSS', name: 'CNSS', coverage: '50%', type: 'Étatique', status: 'Conventionné' },
];

const PENDING_CLAIMS = [
    { id: 'BC-2024-001', patient: 'Abdoulaye Diop', mutuelle: 'IPM Dakar', date: '08/02/2026', amount: 12500, status: 'En attente' },
    { id: 'BC-2024-002', patient: 'Fatou Sow', mutuelle: 'AXA Sénégal', date: '08/02/2026', amount: 35400, status: 'Télétransmis' },
    { id: 'BC-2024-003', patient: 'Mamadou Kane', mutuelle: 'IPRES', date: '07/02/2026', amount: 8900, status: 'Rejeté', error: 'NSS Invalide' },
    { id: 'BC-2024-004', patient: 'Awa Ndiaye', mutuelle: 'NSIA', date: '07/02/2026', amount: 15000, status: 'Payé' },
];

export default function Mutuelles() {
    const [activeView, setActiveView] = useState('bordereaux');

    return (
        <div className="mutuelles fade-in" style={{ paddingBottom: '2rem' }}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Shield color="var(--primary)" size={32} /> Gestion des Mutuelles & Tiers-Payant
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Suivi des conventions, télétransmissions et gestion des remboursements (Bons de prise en charge).</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="glass" style={{ padding: '0.75rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
                        <Download size={18} /> Rapports
                    </button>
                    <button style={{ padding: '0.75rem 1.25rem', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Send size={18} /> Télétransmettre le lot
                    </button>
                </div>
            </header>

            {/* Statistiques Tiers-Payant */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>MONTANT À RÉCOUVRER</p>
                    <p style={{ fontSize: '1.6rem', fontWeight: '900' }}>4 250 800 F</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '4px' }}>85 dossiers actifs</p>
                </div>
                <div className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>BONS EN ATTENTE</p>
                    <p style={{ fontSize: '1.6rem', fontWeight: '900' }}>12</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--warning)', marginTop: '4px' }}>Vérification nécessaire</p>
                </div>
                <div className="card" style={{ borderLeft: '4px solid #ef4444' }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>REJETS CONVENTIONS</p>
                    <p style={{ fontSize: '1.6rem', fontWeight: '900' }}>3</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--error)', marginTop: '4px' }}>Erreurs de matricule</p>
                </div>
                <div className="card" style={{ borderLeft: '4px solid #6366f1' }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>DÉLAI MOYEN REMBOURSEMENT</p>
                    <p style={{ fontSize: '1.6rem', fontWeight: '900' }}>18 Jours</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Stable</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>

                {/* Liste des Bordereaux / Suivi des Bons */}
                <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button onClick={() => setActiveView('bordereaux')} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: activeView === 'bordereaux' ? 'var(--primary-light)' : 'transparent', color: activeView === 'bordereaux' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '700', cursor: 'pointer' }}>Suivi des Dossiers</button>
                            <button onClick={() => setActiveView('conventions')} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: activeView === 'conventions' ? 'var(--primary-light)' : 'transparent', color: activeView === 'conventions' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '700', cursor: 'pointer' }}>Conventions (Assureurs)</button>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input type="text" placeholder="Rechercher un bon..." style={{ padding: '8px 8px 8px 32px', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.85rem' }} />
                        </div>
                    </div>

                    {activeView === 'bordereaux' ? (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ backgroundColor: '#f8fafc' }}>
                                <tr style={{ textAlign: 'left' }}>
                                    <th style={{ padding: '15px' }}>N° Bon</th>
                                    <th>Patient</th>
                                    <th>Mutuelle</th>
                                    <th>Montant</th>
                                    <th>Statut</th>
                                    <th style={{ padding: '15px' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PENDING_CLAIMS.map(claim => (
                                    <tr key={claim.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '15px', fontSize: '0.85rem', fontWeight: '600' }}>{claim.id}</td>
                                        <td style={{ padding: '15px' }}>
                                            <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{claim.patient}</div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{claim.date}</div>
                                        </td>
                                        <td>{claim.mutuelle}</td>
                                        <td style={{ fontWeight: '700' }}>{claim.amount.toLocaleString()} F</td>
                                        <td>
                                            <span style={{
                                                padding: '4px 10px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '800',
                                                backgroundColor: claim.status === 'Payé' ? '#dcfce7' : claim.status === 'Rejeté' ? '#fee2e2' : '#f0f9ff',
                                                color: claim.status === 'Payé' ? '#15803d' : claim.status === 'Rejeté' ? '#b91c1c' : '#0369a1'
                                            }}>
                                                {claim.status.toUpperCase()}
                                            </span>
                                            {claim.error && <p style={{ fontSize: '0.65rem', color: 'var(--error)', marginTop: '2px' }}>{claim.error}</p>}
                                        </td>
                                        <td>
                                            <button style={{ border: 'none', background: 'none', color: 'var(--primary)', cursor: 'pointer' }}><FileText size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div style={{ padding: '20px', display: 'grid', gap: '12px' }}>
                            {MUTUELLES_LIST.map(mut => (
                                <div key={mut.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                        <div style={{ width: '40px', height: '40px', backgroundColor: '#f1f5f9', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Landmark size={20} color="var(--primary)" />
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: '700' }}>{mut.name}</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{mut.type} • Taux : {mut.coverage}</p>
                                        </div>
                                    </div>
                                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: mut.status === 'Conventionné' ? 'var(--success)' : 'var(--warning)' }}>{mut.status}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Volet de droite : Actions & Aide */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="card" style={{ backgroundColor: '#f0fdf4', border: '1px solid #dcfce7' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <CheckCircle2 color="var(--success)" size={20} /> Qualité de Saisie
                        </h3>
                        <div style={{ textAlign: 'center', padding: '10px 0' }}>
                            <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--success)' }}>98%</div>
                            <p style={{ fontSize: '0.75rem', color: '#166534' }}>Fichiers conformes pour télétransmission</p>
                        </div>
                        <div style={{ width: '100%', height: '6px', backgroundColor: '#dcfce7', borderRadius: '3px', marginTop: '10px' }}>
                            <div style={{ width: '98%', height: '100%', backgroundColor: 'var(--success)', borderRadius: '3px' }}></div>
                        </div>
                    </div>

                    <div className="card">
                        <h3 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '1rem' }}>Actions de Tiers-Payant</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <button style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', background: 'white', textAlign: 'left', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                                Imprimer Bordereau Récap <ArrowRight size={16} />
                            </button>
                            <button style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', background: 'white', textAlign: 'left', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                                Relancer les impayés <ArrowRight size={16} />
                            </button>
                            <button style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)', background: 'white', textAlign: 'left', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                                Mise à jour conventions <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="card" style={{ backgroundColor: '#fffbeb', border: '1px solid #fef3c7' }}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <AlertCircle size={24} color="#f59e0b" />
                            <div>
                                <p style={{ fontWeight: '700', color: '#92400e', fontSize: '0.85rem' }}>Alerte Convention</p>
                                <p style={{ fontSize: '0.75rem', color: '#b45309' }}>La convention avec NSIA Assurances expire dans 15 jours. Une mise à jour des tarifs est disponible.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
