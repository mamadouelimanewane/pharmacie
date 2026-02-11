import React from 'react';
import { UserCheck, Phone, ChevronRight } from 'lucide-react';

export default function Members({ group }) {
    return (
        <div className="fade-in">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '20px' }}>Les Membres ({group.members})</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                    { name: 'Fatou Diop', status: 'À jour', phone: '77 123 45 67', role: 'Secrétaire' },
                    { name: 'Oumar Ndiaye', status: 'Retard (1 mois)', phone: '77 987 65 43', role: 'Membre' },
                    { name: 'Aïcha Fall', status: 'À jour', phone: '76 555 44 33', role: 'Membre' },
                    { name: 'Moussa Sow', status: 'À jour', phone: '70 111 22 33', role: 'Trésorier' },
                ].map((m, i) => (
                    <div key={i} className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: m.status === 'À jour' ? '4px solid #22c55e' : '4px solid #ef4444' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e7e5e4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: '#57534e' }}>
                                {m.name.charAt(0)}
                            </div>
                            <div>
                                <div style={{ fontWeight: '800', fontSize: '1rem' }}>{m.name}</div>
                                <div style={{ fontSize: '0.8rem', color: m.status === 'À jour' ? '#16a34a' : '#dc2626', fontWeight: '700' }}>{m.status}</div>
                            </div>
                        </div>
                        <button style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f5f5f4', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <Phone size={20} color="#78716c" />
                        </button>
                    </div>
                ))}
            </div>

            <button className="big-btn" style={{ marginTop: '24px', background: '#292524', color: 'white' }}>
                <UserCheck size={24} /> AJOUTER UN MEMBRE
            </button>
        </div>
    );
}
