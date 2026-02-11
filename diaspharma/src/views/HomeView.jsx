import React from 'react';
import { Search, MapPin, ArrowRight, Wallet, Users } from 'lucide-react';

export default function HomeView({ setActiveTab }) {
    return (
        <div className="fade-in">
            {/* Header Banner */}
            <div style={{ padding: '24px 20px', background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: 'white', borderBottomLeftRadius: '32px', borderBottomRightRadius: '32px', marginBottom: '24px' }}>
                <div style={{ opacity: 0.8, fontSize: '0.9rem', marginBottom: '4px' }}>Bonjour, Moussa 👋</div>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '800', lineHeight: '1.2' }}>Prenez soin d'eux,<br />depuis Paris.</h1>

                <div style={{ marginTop: '24px', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', padding: '16px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>WALLET SANTÉ</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '900' }}>150.00 €</div>
                    </div>
                    <button style={{ padding: '8px 16px', borderRadius: '10px', background: 'white', color: 'var(--primary)', border: 'none', fontWeight: '800', fontSize: '0.8rem' }}>
                        RECHARGER
                    </button>
                </div>
            </div>

            <div style={{ padding: '0 20px' }}>
                {/* Actions Grid */}
                <h3 style={{ fontWeight: '800', marginBottom: '16px', color: 'var(--secondary)' }}>Actions Rapides</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                    <div onClick={() => setActiveTab('send')} style={{ padding: '20px', background: 'white', borderRadius: '20px', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
                        <div style={{ width: '40px', height: '40px', background: '#dcfce7', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                            <MapPin size={20} color="var(--primary)" />
                        </div>
                        <h4 style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--secondary)' }}>Payer une Ordonnance</h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Scanner ou choisir pharmacie</p>
                    </div>

                    <div style={{ padding: '20px', background: 'white', borderRadius: '20px', border: '1px solid var(--border)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', cursor: 'pointer' }}>
                        <div style={{ width: '40px', height: '40px', background: '#e0f2fe', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                            <Wallet size={20} color="#0284c7" />
                        </div>
                        <h4 style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--secondary)' }}>Santé Pass</h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Assurance prépayée</p>
                    </div>
                </div>

                {/* Beneficiaries */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontWeight: '800', color: 'var(--secondary)' }}>Mes Proches (Dakar)</h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '700' }}>Voir tout</span>
                </div>

                <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px' }}>
                    {[
                        { name: 'Maman Fatou', relation: 'Mère', img: 'F' },
                        { name: 'Papa Oumar', relation: 'Père', img: 'O' },
                        { name: 'Tantin Aïcha', relation: 'Tante', img: 'A' },
                    ].map((p, i) => (
                        <div key={i} style={{ minWidth: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#f1f5f9', border: '2px solid white', boxShadow: '0 0 0 2px var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '1.5rem', fontWeight: '800' }}>
                                {p.img}
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '0.85rem', fontWeight: '700' }}>{p.name}</div>
                                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{p.relation}</div>
                            </div>
                        </div>
                    ))}
                    <div style={{ minWidth: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                        <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2px dashed var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                            <Users size={24} />
                        </div>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>Ajouter</div>
                    </div>
                </div>

                {/* Recent Activity Mini */}
                <h3 style={{ fontWeight: '800', marginBottom: '16px', marginTop: '16px', color: 'var(--secondary)' }}>Derniers Envois</h3>
                <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--border)', padding: '0 16px' }}>
                    {[
                        { title: 'Pharmacie Elite (Dr. Wane)', date: 'Auj. 11:45', amount: '- 65.00 €', type: 'Ordonnance #ORD-998' },
                        { title: 'Recharge Wallet', date: '05 Fév', amount: '+ 100.00 €', type: 'Dépôt CB' }
                    ].map((t, i) => (
                        <div key={i} style={{ padding: '16px 0', borderBottom: i === 0 ? '1px solid var(--border)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {t.amount.includes('+') ? <Wallet size={18} color="#059669" /> : <MapPin size={18} color="#ef4444" />}
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{t.title}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.type} • {t.date}</div>
                                </div>
                            </div>
                            <div style={{ fontWeight: '800', color: t.amount.includes('+') ? '#059669' : 'var(--text)' }}>
                                {t.amount}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
