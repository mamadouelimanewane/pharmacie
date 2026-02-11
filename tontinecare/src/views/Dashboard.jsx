import React from 'react';
import { PlusCircle, ArrowRight, History, AlertTriangle } from 'lucide-react';

export default function Dashboard({ group, setActiveTab }) {
    return (
        <div className="fade-in">
            {/* Quick Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <button className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', border: '2px solid #dcfce7', background: '#f0fdf4', cursor: 'pointer' }}>
                    <div style={{ background: '#22c55e', padding: '12px', borderRadius: '50%', color: 'white' }}>
                        <PlusCircle size={28} />
                    </div>
                    <span style={{ fontWeight: '700', color: '#15803d' }}>Nouvelle Cotisation</span>
                </button>

                <button onClick={() => setActiveTab('sos')} className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', border: '2px solid #fee2e2', background: '#fef2f2', cursor: 'pointer' }}>
                    <div style={{ background: '#ef4444', padding: '12px', borderRadius: '50%', color: 'white' }}>
                        <AlertTriangle size={28} />
                    </div>
                    <span style={{ fontWeight: '700', color: '#b91c1c' }}>SOS Médicament</span>
                </button>
            </div>

            {/* Recent Activity Feed */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '16px', color: '#44403c' }}>Derniers Mouvements</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                    { type: 'IN', label: 'Cotisation Mensuelle', member: 'Fatou Diop', amount: '+ 5,000 F', date: 'Auj.' },
                    { type: 'OUT', label: 'PharmaElite (Urgence Palu)', member: 'Bébé Moussa', amount: '- 32,500 F', date: 'Auj. 12:10' },
                    { type: 'IN', label: 'Cotisation Retard', member: 'Jean Gomis', amount: '+ 10,000 F', date: '08 Fév' },
                ].map((act, i) => (
                    <div key={i} className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #f5f5f4' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{
                                width: '48px', height: '48px', borderRadius: '16px',
                                background: act.type === 'IN' ? '#dcfce7' : '#fee2e2',
                                color: act.type === 'IN' ? '#16a34a' : '#dc2626',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800'
                            }}>
                                {act.type === 'IN' ? 'IN' : 'SOS'}
                            </div>
                            <div>
                                <div style={{ fontWeight: '800', fontSize: '1rem' }}>{act.member}</div>
                                <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{act.label}</div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: '800', fontSize: '1rem', color: act.type === 'IN' ? '#16a34a' : '#dc2626' }}>{act.amount}</div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>{act.date}</div>
                        </div>
                    </div>
                ))}
            </div>

            <button style={{ width: '100%', marginTop: '20px', padding: '12px', background: 'none', border: 'none', color: '#a8a29e', fontWeight: '700', fontSize: '0.9rem' }}>
                Voir tout l'historique
            </button>
        </div>
    );
}
