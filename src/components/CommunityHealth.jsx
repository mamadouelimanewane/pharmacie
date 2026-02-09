import React, { useState } from 'react';
import {
    Globe, HeartHandshake, CreditCard, Users,
    Send, Smartphone, ShieldCheck, Wallet,
    TrendingUp, Gift, MessageCircle, Link,
    CheckCircle2, AlertCircle, Share2
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CommunityHealth() {
    const [activeTab, setActiveTab] = useState('diaspora'); // 'diaspora', 'tontiti', 'bourse'
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    return (
        <div className="community fade-in" style={{ paddingBottom: '3rem' }}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', background: 'linear-gradient(90deg, #059669, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Pharma-Link Solidaire
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Connectez la Diaspora, sécurisez les soins et financez la santé communautaire.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <div className="glass" style={{ padding: '0.5rem 1rem', borderRadius: '12px', border: '1px solid #10b981', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Globe size={20} color="#10b981" />
                        <div>
                            <p style={{ fontSize: '0.7rem', fontWeight: '800', color: '#065f46' }}>FONDS DIASPORA</p>
                            <p style={{ fontSize: '1rem', fontWeight: '900', color: '#059669' }}>2,450,000 F</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
                {[
                    { id: 'diaspora', label: 'Diaspora Direct Pay', icon: Globe },
                    { id: 'tontiti', label: 'Tontine Santé (Calebasse)', icon: Users },
                    { id: 'bourse', label: 'Bourse Inter-Pharma', icon: TrendingUp },
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

            {/* --- 1. DIASPORA DIRECT PAY --- */}
            {activeTab === 'diaspora' && (
                <div className="fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: '2rem' }}>

                        {/* Main Interaction Area */}
                        <div className="card" style={{ padding: '32px' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '20px', color: 'var(--secondary)' }}>
                                Financer une Ordonnance à Distance
                            </h3>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
                                <div>
                                    <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px' }}>Patient Bénéficiaire (Dakar)</label>
                                    <div style={{ display: 'flex', gap: '12px' }}>
                                        <div style={{ background: '#f1f5f9', padding: '12px', borderRadius: '12px', flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={16} /></div>
                                            <div>
                                                <div style={{ fontWeight: '800' }}>Mme Fatou Ndiaye</div>
                                                <div style={{ fontSize: '0.75rem' }}>Matricule #P-8821</div>
                                            </div>
                                        </div>
                                        <button className="glass" style={{ padding: '0 20px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>Changer</button>
                                    </div>
                                </div>
                                <div>
                                    <label style={{ display: 'block', fontWeight: '700', marginBottom: '8px' }}>Ordonnance à Payer</label>
                                    <div style={{ background: '#fff7ed', border: '1px solid #ffedd5', color: '#9a3412', padding: '12px', borderRadius: '12px', fontWeight: '700', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span>Ord. #ORD-2026-009 (Insuline)</span>
                                        <span style={{ fontSize: '1.1rem', fontWeight: '900' }}>42,500 F</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '24px', padding: '32px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <h4 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '8px' }}>Générer le Lien de Paiement Sécurisé</h4>
                                    <p style={{ opacity: 0.7, maxWidth: '400px' }}>Envoyez ce lien par WhatsApp au proche en France, USA ou Canada. Le paiement sera crédité instantanément ici.</p>
                                </div>
                                <button onClick={() => setShowPaymentModal(true)} style={{ padding: '16px 32px', borderRadius: '16px', background: '#10b981', color: 'white', border: 'none', fontWeight: '900', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 20px rgba(16, 185, 129, 0.3)' }}>
                                    <Link size={20} /> CRÉER LIEN MAGIC
                                </button>
                            </div>

                            {/* Recent Transfers */}
                            <div style={{ marginTop: '32px' }}>
                                <h4 style={{ fontWeight: '800', marginBottom: '16px' }}>Derniers Transferts Reçus</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {[
                                        { from: 'Moussa Diop (Paris)', for: 'Fatou Diop', amount: '25,000 F', status: 'Reçu', date: 'Auj. 10:30', method: 'CB Visa' },
                                        { from: 'Jean Gomis (New York)', for: 'Alioune Gomis', amount: '150,000 F', status: 'Reçu', date: 'Hier', method: 'Mastercard' },
                                    ].map((t, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
                                                    <CreditCard size={24} />
                                                </div>
                                                <div>
                                                    <div style={{ fontWeight: '800', fontSize: '0.95rem' }}>{t.from}</div>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pour: {t.for} • {t.method}</div>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontWeight: '900', fontSize: '1rem', color: '#16a34a' }}>+{t.amount}</div>
                                                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>{t.date}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Impact Sidebar */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div className="card" style={{ background: '#fffbeb', border: '1px solid #fcd34d', padding: '24px' }}>
                                <h4 style={{ color: '#92400e', fontWeight: '900', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <ShieldCheck size={20} /> Garantie PharmaElite
                                </h4>
                                <p style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#b45309' }}>
                                    Les fonds transférés sont <strong>100% sécurisés</strong> et ne peuvent être utilisés QUE pour des achats de médicaments ou services de santé dans votre officine. Aucun retrait d'espèces possible.
                                </p>
                            </div>

                            <div className="card">
                                <h4 style={{ fontWeight: '800', marginBottom: '16px' }}>Top Pays Contributeurs</h4>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {[
                                        { country: 'France', pc: '65%', flag: '🇫🇷' },
                                        { country: 'États-Unis', pc: '20%', flag: '🇺🇸' },
                                        { country: 'Canada', pc: '10%', flag: '🇨🇦' },
                                        { country: 'Sénégal (Local)', pc: '5%', flag: '🇸🇳' }
                                    ].map((c, i) => (
                                        <div key={i}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.85rem', fontWeight: '700' }}>
                                                <span>{c.flag} {c.country}</span>
                                                <span>{c.pc}</span>
                                            </div>
                                            <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                                                <div style={{ width: c.pc, height: '100%', background: 'var(--secondary)', borderRadius: '3px' }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- 2. TONTINE SANTE --- */}
            {activeTab === 'tontiti' && (
                <div className="fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '2rem' }}>
                        <div className="card" style={{ padding: '32px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '8px', color: 'var(--secondary)' }}>
                                        Calebasses de Santé (Tontines)
                                    </h3>
                                    <p style={{ color: 'var(--text-muted)' }}>Micro-assurance communautaire gérée par la pharmacie.</p>
                                </div>
                                <button className="glass" style={{ fontWeight: '800', padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Users size={18} /> CRÉER UN GROUPE
                                </button>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                                {[
                                    { name: 'Famille Diop & Co', members: 12, balance: '850,000 F', target: 'Obectif: Diabète Maman', health: 'Excellent' },
                                    { name: 'Quartier Liberté 6', members: 45, balance: '2,100,000 F', target: 'Fonds d\'Urgence', health: 'Bon' },
                                    { name: 'Les Commerçantes', members: 8, balance: '320,000 F', target: 'Cagnotte Maternité', health: 'Moyen' },
                                ].map((group, i) => (
                                    <div key={i} className="card" style={{ border: '1px solid #e2e8f0', boxShadow: 'none', background: '#f8fafc' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <HeartHandshake size={24} />
                                            </div>
                                            <span style={{ padding: '4px 12px', borderRadius: '100px', background: '#dcfce7', color: '#166534', fontSize: '0.7rem', fontWeight: '800', height: 'fit-content' }}>
                                                ACTIF
                                            </span>
                                        </div>
                                        <h4 style={{ fontSize: '1.1rem', fontWeight: '900', marginBottom: '4px' }}>{group.name}</h4>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>{group.target}</p>

                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                                            <div>
                                                <p style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--text-muted)' }}>SOLDE DISPONIBLE</p>
                                                <p style={{ fontSize: '1.4rem', fontWeight: '900', color: 'var(--secondary)' }}>{group.balance}</p>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                                                <div style={{ display: 'flex', - space: 'x-2' }}>
                                                {[1, 2, 3].map(m => (
                                                    <div key={m} style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#cbd5e1', border: '2px solid white', marginLeft: '-8px' }}></div>
                                                ))}
                                            </div>
                                            <p style={{ fontSize: '0.7rem', fontWeight: '700', marginTop: '4px' }}>{group.members} Membres</p>
                                        </div>
                                    </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    <div className="card" style={{ background: 'linear-gradient(180deg, #10b981 0%, #059669 100%)', color: 'white' }}>
                        <div style={{ textAlign: 'center', padding: '24px 0' }}>
                            <Wallet size={48} style={{ marginBottom: '16px', opacity: 0.9 }} />
                            <h3 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '8px' }}>Solde Global Tontines</h3>
                            <p style={{ fontSize: '2.5rem', fontWeight: '900' }}>3.2M F</p>
                            <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>Déposés chez PharmaElite</p>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.1)', padding: '20px', borderRadius: '16px' }}>
                            <h4 style={{ fontSize: '0.9rem', fontWeight: '800', marginBottom: '12px' }}>Avantages Pharmacien</h4>
                            <ul style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '8px', opacity: 0.9 }}>
                                <li style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={16} /> Trésorerie d'avance garantie</li>
                                <li style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={16} /> Fidélisation des familles entières</li>
                                <li style={{ display: 'flex', gap: '8px' }}><CheckCircle2 size={16} /> Réduction des impayés clients</li>
                            </ul>
                        </div>
                    </div>
                </div>
                </div>
    )
}

{/* --- 3. BOURSE B2B --- */ }
{
    activeTab === 'bourse' && (
        <div className="fade-in" style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>
            <TrendingUp size={64} style={{ marginBottom: '20px', color: '#cbd5e1' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--secondary)' }}>Place de Marché Inter-Officines</h3>
            <p style={{ maxWidth: '400px', margin: '10px auto' }}>Échangez vos stocks d'urgence et périmés proches avec les 400 pharmacies du réseau pour zéro perte.</p>
            <button style={{ marginTop: '20px', padding: '12px 24px', borderRadius: '12px', background: 'var(--secondary)', color: 'white', fontWeight: '800', border: 'none', cursor: 'pointer' }}>
                REJOINDRE LA BÊTA
            </button>
        </div>
    )
}

{/* Payment Modal */ }
{
    showPaymentModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(5px)' }}>
            <div className="fade-in-up" style={{ backgroundColor: 'white', padding: '40px', borderRadius: '32px', width: '500px', textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', margin: '0 auto 24px', background: '#dcfce7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Link size={40} color="#16a34a" />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--secondary)', marginBottom: '8px' }}>Lien Créé !</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Partagez ce lien sécurisé avec le proche.</p>

                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px dashed #cbd5e1', fontFamily: 'monospace', fontWeight: '700', color: 'var(--primary)', marginBottom: '24px', wordBreak: 'break-all' }}>
                    https://pay.pharmaelite.sn/pay/ord-8821
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <button style={{ padding: '16px', borderRadius: '16px', background: '#25d366', color: 'white', border: 'none', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <Share2 size={20} /> WHATSAPP
                    </button>
                    <button onClick={() => setShowPaymentModal(false)} style={{ padding: '16px', borderRadius: '16px', background: 'white', border: '1px solid #e2e8f0', fontWeight: '800', cursor: 'pointer' }}>
                        FERMER
                    </button>
                </div>
            </div>
        </div>
    )
}
        </div >
    );
}
