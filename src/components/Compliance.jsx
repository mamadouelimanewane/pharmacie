import React, { useState } from 'react';
import {
    ShieldCheck, AlertTriangle, FileText, Search,
    Lock, Eye, Printer, Filter, Calendar, User,
    CheckCircle2, AlertCircle, History, Pill
} from 'lucide-react';

export default function Compliance() {
    const [activeTab, setActiveTab] = useState('police'); // 'police', 'traceability', 'audit'
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Police Book Data
    const [policeEntries, setPoliceEntries] = useState([
        { id: 'STU-2026-001', date: '09/02/2026 10:15', product: 'Morphine 10mg Inj.', lot: 'M8821', type: 'SORTIE', qty: -2, prescriber: 'Dr. Fall', patient: 'Mme Diop', balance: 18, signature: 'Validé' },
        { id: 'STU-2026-002', date: '08/02/2026 14:30', product: 'Fentanyl Patch 25', lot: 'F9920', type: 'ENTRÉE', qty: +50, prescriber: '-', patient: '-', balance: 50, signature: 'Validé' },
        { id: 'STU-2026-003', date: '05/02/2026 09:00', product: 'Morphine 10mg Inj.', lot: 'M8821', type: 'SORTIE', qty: -5, prescriber: 'Dr. Sow', patient: 'M. Ndiaye', balance: 20, signature: 'Validé' },
    ]);

    return (
        <div className="compliance fade-in" style={{ paddingBottom: '3rem' }}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--secondary)' }}>
                        Conformité & Livre de Police
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Gestion réglementaire dés substances vénéneuses et stupéfiants (Conforme Art. R.5132).
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <div style={{ padding: '0.75rem 1.25rem', borderRadius: '12px', background: '#ecfdf5', color: '#047857', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '800', border: '1px solid #d1fae5' }}>
                        <ShieldCheck size={20} /> AUDIT READY
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
                {[
                    { id: 'police', label: 'Livre de Police Numérique', icon: Lock },
                    { id: 'traceability', label: 'Traçabilité des Lots', icon: History },
                    { id: 'audit', label: 'Exports & Rapports', icon: FileText },
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

            {activeTab === 'police' && (
                <div className="fade-in">
                    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <div style={{ position: 'relative' }}>
                                    <Search size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                    <input
                                        type="text"
                                        placeholder="Filtrer par produit, lot..."
                                        style={{ padding: '10px 10px 10px 36px', borderRadius: '8px', border: '1px solid #e2e8f0', minWidth: '250px' }}
                                    />
                                </div>
                                <select style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white' }}>
                                    <option>Tous les mouvements</option>
                                    <option>Entrées</option>
                                    <option>Sorties</option>
                                </select>
                            </div>
                            <button style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'var(--secondary)', color: 'white', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                <Printer size={18} /> IMPRIMER PAGE DU JOUR
                            </button>
                        </div>
                        <table className="data-table" style={{ fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ background: '#f1f5f9' }}>
                                    <th style={{ padding: '16px' }}>DATE / HEURE</th>
                                    <th>RÉFÉRENCE</th>
                                    <th>PRODUIT (DCI)</th>
                                    <th>LOT / PÉREMPTION</th>
                                    <th>MOUVEMENT</th>
                                    <th>QUANTITÉ</th>
                                    <th>PRESCRIPTEUR / PATIENT</th>
                                    <th>STOCK</th>
                                    <th>SIGNATURE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {policeEntries.map((entry, index) => (
                                    <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                        <td style={{ padding: '16px', fontWeight: '700', color: 'var(--text-muted)' }}>{entry.date}</td>
                                        <td style={{ fontFamily: 'monospace', fontWeight: '700' }}>{entry.id}</td>
                                        <td style={{ fontWeight: '800', color: 'var(--secondary)' }}>{entry.product}</td>
                                        <td>
                                            <div style={{ fontSize: '0.85rem' }}>{entry.lot}</div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Exp: 12/2027</div>
                                        </td>
                                        <td>
                                            <span style={{
                                                padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800',
                                                backgroundColor: entry.type === 'ENTRÉE' ? '#dcfce7' : '#fee2e2',
                                                color: entry.type === 'ENTRÉE' ? '#166534' : '#991b1b'
                                            }}>
                                                {entry.type}
                                            </span>
                                        </td>
                                        <td style={{ fontWeight: '900', color: entry.type === 'ENTRÉE' ? '#166534' : '#991b1b' }}>
                                            {entry.qty > 0 ? `+${entry.qty}` : entry.qty}
                                        </td>
                                        <td style={{ fontSize: '0.85rem' }}>
                                            {entry.type === 'SORTIE' ? (
                                                <>
                                                    <div style={{ fontWeight: '700' }}>{entry.prescriber}</div>
                                                    <div style={{ color: 'var(--text-muted)' }}>{entry.patient}</div>
                                                </>
                                            ) : (
                                                <span style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>Commande Fournisseur</span>
                                            )}
                                        </td>
                                        <td style={{ fontWeight: '900', background: '#f8fafc', textAlign: 'center' }}>{entry.balance}</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#166534', fontWeight: '700', fontSize: '0.8rem' }}>
                                                <CheckCircle2 size={14} /> {entry.signature}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'traceability' && (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
                    <History size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                    <p>Module de traçabilité avancée en cours de chargement...</p>
                </div>
            )}

            {activeTab === 'audit' && (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
                    <FileText size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                    <p>Génération de rapports d'audit en cours...</p>
                </div>
            )}
        </div>
    );
}
