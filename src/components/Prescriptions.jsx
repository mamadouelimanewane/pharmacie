import React, { useState } from 'react';
import {
    FileText, Search, Plus, Filter, Clock, CheckCircle2,
    AlertCircle, Scan, Download, User, Eye,
    FileSearch, MoreVertical, RefreshCcw, CheckCircle
} from 'lucide-react';
import { MOCK_PRESCRIPTIONS } from '../data/mockData';

export default function Prescriptions() {
    const [viewMode, setViewMode] = useState('all');

    return (
        <div className="prescriptions fade-in" style={{ paddingBottom: '2rem' }}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <FileText color="var(--primary)" size={32} /> Gestion des Ordonnances
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Archives numériques, flux de préparation et conformité SCOR/SESAM.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="glass" style={{ padding: '0.75rem 1.5rem', borderRadius: '14px', border: '1px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
                        <Scan size={20} /> Scanner Dossier
                    </button>
                    <button style={{ padding: '0.75rem 1.5rem', borderRadius: '14px', border: 'none', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.3)' }}>
                        <Plus size={20} /> Nouvelle Saisie
                    </button>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                {[
                    { label: 'À PRÉPARER', count: 12, color: '#f59e0b', icon: Clock, bg: '#fffbeb' },
                    { label: 'NUMÉRISÉES', count: 45, color: '#8b5cf6', icon: FileSearch, bg: '#f5f3ff' },
                    { label: 'LIVRÉES (SCOR)', count: 28, color: '#10b981', icon: CheckCircle, bg: '#f0fdf4' },
                    { label: 'REJETS SCOR', count: 2, color: '#ef4444', icon: AlertCircle, bg: '#fef2f2' },
                ].map((stat, i) => (
                    <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '10px', border: 'none', background: 'white' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ padding: '8px', backgroundColor: stat.bg, borderRadius: '10px', color: stat.color }}>
                                <stat.icon size={20} />
                            </div>
                            <span style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--secondary)' }}>{stat.count}</span>
                        </div>
                        <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f8fafc' }}>
                    <div style={{ position: 'relative', width: '400px' }}>
                        <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input
                            type="text"
                            placeholder="Patient, prescripteur ou n° ordonnance..."
                            style={{ width: '100%', padding: '12px 12px 12px 48px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '0.95rem' }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '8px', backgroundColor: 'white', padding: '4px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                        <button onClick={() => setViewMode('all')} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: viewMode === 'all' ? 'var(--primary-light)' : 'transparent', color: viewMode === 'all' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>Toutes</button>
                        <button onClick={() => setViewMode('scanned')} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: viewMode === 'scanned' ? 'var(--primary-light)' : 'transparent', color: viewMode === 'scanned' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>Numérisées</button>
                        <button onClick={() => setViewMode('manual')} style={{ padding: '8px 16px', borderRadius: '8px', border: 'none', background: viewMode === 'manual' ? 'var(--primary-light)' : 'transparent', color: viewMode === 'manual' ? 'var(--primary)' : 'var(--text-muted)', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>Manuelles</button>
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                            <tr style={{ textAlign: 'left' }}>
                                <th style={{ padding: '16px 24px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '800' }}>PATIENT</th>
                                <th style={{ padding: '16px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '800' }}>PRESCRIPTEUR</th>
                                <th style={{ padding: '16px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '800' }}>DATE</th>
                                <th style={{ padding: '16px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '800' }}>MODE</th>
                                <th style={{ padding: '16px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '800' }}>STATUT</th>
                                <th style={{ padding: '16px 24px', textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '800' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_PRESCRIPTIONS.map((presc, idx) => (
                                <tr key={presc.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                    <td style={{ padding: '16px 24px' }}>
                                        <div style={{ fontWeight: '800', color: 'var(--secondary)', fontSize: '0.95rem' }}>{presc.patient}</div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: {presc.id}</div>
                                    </td>
                                    <td style={{ padding: '16px', fontSize: '0.9rem', fontWeight: '600' }}>{presc.doctor}</td>
                                    <td style={{ padding: '16px', fontSize: '0.9rem' }}>{presc.date}</td>
                                    <td style={{ padding: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '700', color: idx % 2 === 0 ? '#8b5cf6' : '#64748b' }}>
                                            {idx % 2 === 0 ? <Scan size={14} /> : <FileText size={14} />}
                                            {idx % 2 === 0 ? 'Numérisée' : 'Saisie'}
                                        </div>
                                    </td>
                                    <td style={{ padding: '16px' }}>
                                        <span style={{
                                            padding: '6px 14px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '800',
                                            backgroundColor: presc.status === 'Prêt' ? '#dcfce7' : presc.status === 'En cours' ? '#e0f2fe' : '#fef3c7',
                                            color: presc.status === 'Prêt' ? '#15803d' : presc.status === 'En cours' ? '#0369a1' : '#b45309',
                                            display: 'inline-flex', alignItems: 'center', gap: '6px'
                                        }}>
                                            <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'currentColor' }}></div>
                                            {presc.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                            <button style={{ padding: '8px', borderRadius: '10px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer', color: 'var(--primary)' }} title="Voir l'image"><Eye size={18} /></button>
                                            <button style={{ padding: '8px', borderRadius: '10px', border: 'none', background: 'var(--primary)', color: 'white', cursor: 'pointer', fontWeight: '700', fontSize: '0.8rem', paddingLeft: '16px', paddingRight: '16px' }}>Préparer</button>
                                            <button style={{ padding: '8px', borderRadius: '10px', border: 'none', background: 'none', cursor: 'pointer', color: '#94a3b8' }}><MoreVertical size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
