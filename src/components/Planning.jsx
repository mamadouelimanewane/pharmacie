import { Calendar, Clock, User, CalendarDays, Plus, UserCheck, AlertCircle } from 'lucide-react';
import { MOCK_STAFF } from '../data/mockData';


export default function Planning() {
    return (
        <div className="planning fade-in">
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Planning & RH Officine</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Gérez les roulements, les pauses et les certifications de votre équipe.</p>
                </div>
                <button style={{
                    padding: '0.75rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    backgroundColor: 'var(--secondary)',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <CalendarDays size={18} /> Voir Semaine
                </button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '1.5rem' }}>
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={20} color="var(--primary)" /> Emploi du temps - Aujourd'hui</h3>
                        <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Dimanche 08 Février</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {MOCK_STAFF.map(member => (
                            <div key={member.id} style={{
                                padding: '1.25rem',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                    <div style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '50%',
                                        backgroundColor: 'var(--background)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'var(--text-muted)'
                                    }}>
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: '600' }}>{member.name}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{member.role}</p>
                                    </div>
                                </div>

                                <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                    <div>
                                        <p style={{ fontSize: '0.875rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                                            <Clock size={14} color="var(--primary)" /> {member.shift}
                                        </p>
                                        <span style={{
                                            fontSize: '0.7rem',
                                            color: member.status === 'Present' ? 'var(--success)' : 'var(--error)',
                                            fontWeight: '700',
                                            textTransform: 'uppercase'
                                        }}>
                                            {member.reason || member.status}
                                        </span>
                                    </div>
                                    <button style={{ background: 'none', border: 'none', color: 'var(--border)', cursor: 'pointer' }}>
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="card" style={{ backgroundColor: 'var(--secondary)', color: 'white' }}>
                        <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <UserCheck size={18} color="var(--primary)" /> Équipe au Comptoir
                        </h3>
                        <p style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>3 / 5</p>
                        <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>Personnel suffisant pour le flux actuel.</p>
                    </div>

                    <div className="card">
                        <h3 style={{ fontSize: '1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <AlertCircle size={18} color="var(--warning)" /> Rappels RH
                        </h3>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li style={{ fontSize: '0.875rem', padding: '0.5rem', borderBottom: '1px solid var(--border)' }}>
                                • Visite médicale Fatou S. le 12/02
                            </li>
                            <li style={{ fontSize: '0.875rem', padding: '0.5rem', borderBottom: '1px solid var(--border)' }}>
                                • Renouvellement habilitation SCOR Dr. Ramatoulaye
                            </li>
                            <li style={{ fontSize: '0.875rem', padding: '0.5rem' }}>
                                • Point trimestriel Cheikh T.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
