import { FileText, Search, Plus, Filter, Clock, CheckCircle2, AlertCircle, Scan, Download, User } from 'lucide-react';
import { MOCK_PRESCRIPTIONS } from '../data/mockData';


export default function Prescriptions() {
    return (
        <div className="prescriptions fade-in">
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Gestion des Ordonnances</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Suivi des prescriptions numériques et numérisées (SCOR/SESAM).</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="glass" style={{ padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Scan size={18} /> Scanner Ordonnance
                    </button>
                    <button style={{ padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: 'none', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Plus size={18} /> Saisie Manuelle
                    </button>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                {[
                    { label: 'À PRÉPARER', count: 12, color: 'var(--warning)', icon: Clock },
                    { label: 'EN COURS', count: 5, color: 'var(--accent)', icon: RefreshCcw },
                    { label: 'PRÊTES', count: 8, color: 'var(--primary)', icon: CheckCircle2 },
                    { label: 'ANOMALIES SCOR', count: 2, color: 'var(--error)', icon: AlertCircle },
                ].map((stat, i) => (
                    <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>{stat.label}</span>
                            <stat.icon size={16} color={stat.color} />
                        </div>
                        <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--secondary)' }}>{stat.count}</p>
                    </div>
                ))}
            </div>

            <div className="card" style={{ padding: 0 }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '350px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Rechercher patient, médecin, date..."
                            style={{
                                width: '100%',
                                padding: '0.6rem 0.6rem 0.6rem 2.5rem',
                                borderRadius: 'var(--radius-sm)',
                                border: '1px solid var(--border)',
                                outline: 'none'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button style={{ background: '#f8fafc', border: '1px solid var(--border)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.875rem' }}>Toutes</button>
                        <button style={{ background: 'white', border: '1px solid var(--border)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: '0.875rem' }}>Urgentes</button>
                    </div>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Patient</th>
                            <th>Médecin</th>
                            <th>Date</th>
                            <th>Produits</th>
                            <th>Statut</th>
                            <th>Priorité</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MOCK_PRESCRIPTIONS.map(presc => (
                            <tr key={presc.id}>
                                <td style={{ fontWeight: '600' }}>{presc.patient}</td>
                                <td>{presc.doctor}</td>
                                <td>{presc.date}</td>
                                <td>{presc.items} articles</td>
                                <td>
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '20px',
                                        fontSize: '0.7rem',
                                        fontWeight: '600',
                                        backgroundColor:
                                            presc.status === 'En attente' ? '#fef3c7' :
                                                presc.status === 'En cours' ? '#e0f2fe' :
                                                    presc.status === 'Prêt' ? '#dcfce7' : '#f1f5f9',
                                        color:
                                            presc.status === 'En attente' ? '#b45309' :
                                                presc.status === 'En cours' ? '#0369a1' :
                                                    presc.status === 'Prêt' ? '#15803d' : 'var(--text-muted)'
                                    }}>
                                        {presc.status}
                                    </span>
                                </td>
                                <td>
                                    <span style={{ color: presc.priority === 'Urgent' ? 'var(--error)' : 'inherit', fontWeight: presc.priority === 'Urgent' ? '600' : '400' }}>
                                        {presc.priority}
                                    </span>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <button style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>
                                        Préparer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// Helper icon
function RefreshCcw(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" /></svg>
    );
}
