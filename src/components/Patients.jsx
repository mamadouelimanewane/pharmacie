import React, { useState } from 'react';
import { Users, Search, Plus, UserPlus, Filter, MoreVertical, FileText, AlertTriangle, History } from 'lucide-react';

const mockPatients = [
    { id: 1, name: 'Jean Dupont', dob: '12/05/1965', nss: '1 65 05 75 001 002 45', phone: '06 12 34 56 78', lastVisit: '02/02/2026', risk: 'None' },
    { id: 2, name: 'Marie Curie', dob: '07/11/1867', nss: '2 67 11 75 001 003 12', phone: '06 98 76 54 32', lastVisit: '05/02/2026', risk: 'Allergie Pénicilline' },
    { id: 3, name: 'Pierre Martin', dob: '22/01/1980', nss: '1 80 01 92 001 004 88', phone: '07 44 22 11 33', lastVisit: '07/02/2026', risk: 'Diabète Type 2' },
    { id: 4, name: 'Sophie Bernard', dob: '30/09/1992', nss: '2 92 09 13 001 005 55', phone: '01 45 67 89 00', lastVisit: '01/02/2026', risk: 'Hypertension' },
];

export default function Patients() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="patients fade-in">
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Dossiers Patients</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Gérez les historiques médicaux, les allergies et le suivi pharmaceutique.</p>
                </div>
                <button style={{
                    padding: '0.75rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <UserPlus size={18} /> Nouveau Patient
                </button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ padding: '12px', backgroundColor: 'var(--primary-light)', borderRadius: '10px', color: 'var(--primary)' }}>
                        <Users size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>TOTAL PATIENTS</p>
                        <p style={{ fontSize: '1.25rem', fontWeight: '700' }}>1,842</p>
                    </div>
                </div>
                <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ padding: '12px', backgroundColor: '#e0f2fe', borderRadius: '10px', color: '#0ea5e9' }}>
                        <FileText size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>DP ACTIVÉS</p>
                        <p style={{ fontSize: '1.25rem', fontWeight: '700' }}>94%</p>
                    </div>
                </div>
                <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ padding: '12px', backgroundColor: '#fee2e2', borderRadius: '10px', color: 'var(--error)' }}>
                        <AlertTriangle size={24} />
                    </div>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>ALERTES ACTIVES</p>
                        <p style={{ fontSize: '1.25rem', fontWeight: '700' }}>24</p>
                    </div>
                </div>
            </div>

            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '400px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Rechercher par nom, NSS, téléphone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.6rem 0.6rem 0.6rem 2.5rem',
                                borderRadius: 'var(--radius-sm)',
                                border: '1px solid var(--border)',
                                outline: 'none',
                                fontSize: '0.9rem'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                            <Filter size={18} /> Filtres Avancés
                        </button>
                    </div>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Patient / NSS</th>
                            <th>Date de Naissance</th>
                            <th>Dernière Visite</th>
                            <th>Risques / Alertes</th>
                            <th>Contact</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockPatients.map(patient => (
                            <tr key={patient.id}>
                                <td>
                                    <div style={{ fontWeight: '600', color: 'var(--secondary)' }}>{patient.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{patient.nss}</div>
                                </td>
                                <td>{patient.dob}</td>
                                <td style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {patient.lastVisit}
                                </td>
                                <td>
                                    {patient.risk !== 'None' ? (
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '20px',
                                            fontSize: '0.7rem',
                                            fontWeight: '600',
                                            backgroundColor: '#fee2e2',
                                            color: 'var(--error)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            width: 'fit-content'
                                        }}>
                                            <AlertTriangle size={12} /> {patient.risk}
                                        </span>
                                    ) : (
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>RAS</span>
                                    )}
                                </td>
                                <td>{patient.phone}</td>
                                <td style={{ textAlign: 'right' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                        <button style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '8px',
                                            border: '1px solid var(--border)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--text-muted)',
                                            cursor: 'pointer'
                                        }}>
                                            <History size={16} />
                                        </button>
                                        <button style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '8px',
                                            border: '1px solid var(--border)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'var(--primary)',
                                            cursor: 'pointer'
                                        }}>
                                            <FileText size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
