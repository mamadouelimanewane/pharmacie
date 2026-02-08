import React from 'react';
import { CreditCard, Banknote, Landmark, ArrowUpRight, ArrowDownRight, FileCheck, AlertCircle, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const paymentData = [
    { name: 'Tiers-Payant (AMO)', value: 4500, color: '#059669' },
    { name: 'Complémentaires (AMC)', value: 2100, color: '#06b6d4' },
    { name: 'Part Patient', value: 1200, color: '#6366f1' },
];

export default function Finances() {
    return (
        <div className="finances fade-in">
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Gestion Financière & Tiers-Payant</h1>
                <p style={{ color: 'var(--text-muted)' }}>Télétransmission SESAM-Vitale, remboursements et comptabilité officinale.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>CHIFFRE D'AFFAIRES (MENSUEL)</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>85,420 €</p>
                        <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', fontSize: '0.8rem' }}><ArrowUpRight size={14} /> +4.2%</span>
                    </div>
                </div>
                <div className="card" style={{ borderLeft: '4px solid var(--accent)' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>REMBOURSEMENTS ATTENDUS</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>12,850 €</p>
                        <span style={{ color: 'var(--warning)', fontSize: '0.8rem' }}>124 factures</span>
                    </div>
                </div>
                <div className="card" style={{ borderLeft: '4px solid var(--error)' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>IMPAYÉS / REJETS</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>420 €</p>
                        <span style={{ color: 'var(--error)', display: 'flex', alignItems: 'center', fontSize: '0.8rem' }}><AlertCircle size={14} /> 8 rejets</span>
                    </div>
                </div>
                <div className="card" style={{ borderLeft: '4px solid var(--secondary)' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>MARGE BRUTE MOYENNE</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: '1.5rem', fontWeight: '700' }}>32.5%</p>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Stable</span>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="card">
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <PieChart size={20} color="var(--primary)" /> Ventilation des Paiements
                    </h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={paymentData} layout="vertical" margin={{ left: 40, right: 30 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} width={120} />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-lg)' }} />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30}>
                                    {paymentData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card">
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FileCheck size={20} color="var(--primary)" /> Flux Noémie & Télétransmissions
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            { source: 'CPAM Paris', amount: '1,420.50 €', status: 'Bordereau acquitté', date: 'Hier' },
                            { source: 'Harmonie Mutuelle', amount: '840.20 €', status: 'En attente', date: '07/02' },
                            { source: 'MGEN', amount: '125.00 €', status: 'Rejet (N° adhérent)', date: '07/02', error: true },
                            { source: 'CPAM Lyon', amount: '3,110.00 €', status: 'Partiellement payé', date: '06/02' },
                        ].map((flux, i) => (
                            <div key={i} style={{
                                padding: '1rem',
                                borderRadius: 'var(--radius-md)',
                                backgroundColor: '#f8fafc',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                border: flux.error ? '1px solid #fee2e2' : '1px solid transparent'
                            }}>
                                <div>
                                    <p style={{ fontWeight: '600', fontSize: '0.875rem' }}>{flux.source}</p>
                                    <span style={{ fontSize: '0.75rem', color: flux.error ? 'var(--error)' : 'var(--text-muted)' }}>{flux.status}</span>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontWeight: '700', color: 'var(--secondary)' }}>{flux.amount}</p>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{flux.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
