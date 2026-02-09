import React, { useState } from 'react';
import {
    Gift, MessageCircle, BarChart, Users,
    Search, QrCode, Send, Trophy, Wallet,
    CheckCircle2, AlertTriangle, ArrowRight,
    Megaphone, TrendingUp, Calendar, Ticket,
    MessageSquare, Smartphone
} from 'lucide-react';
import { MOCK_PATIENTS } from '../data/mockData';

export default function LoyaltyMarketing() {
    const [activeTab, setActiveTab] = useState('program'); // 'program', 'campaigns', 'analytics'
    const [showCampaignModal, setShowCampaignModal] = useState(false);
    const [selectedCampaignType, setSelectedCampaignType] = useState('sms'); // 'sms', 'whatsapp'

    // Mock Data for Campaigns
    const [campaigns, setCampaigns] = useState([
        { id: 1, name: 'Rappel Vaccin Grippe', type: 'SMS', target: 'Seniors +65 ans', status: 'Envoyé', sent: 124, openRate: '92%', date: '15/01/2026' },
        { id: 2, name: 'Promo Lait Bébé', type: 'WhatsApp', target: 'Mamans (-3ans)', status: 'Active', sent: 450, openRate: '78%', date: 'En cours' },
        { id: 3, name: 'Anniversaire Février', type: 'SMS', target: 'Nés en Février', status: 'Programmé', sent: 0, openRate: '-', date: '01/02/2026' },
    ]);

    // Mock Data for Loyalty
    const [loyaltyMembers, setLoyaltyMembers] = useState(MOCK_PATIENTS.map(p => ({ ...p, points: Math.floor(Math.random() * 500) + 50, tier: Math.random() > 0.7 ? 'Gold' : 'Silver' })));
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMembers = loyaltyMembers.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.phone.includes(searchTerm)
    );

    const handleCreateCampaign = () => {
        const newCampaign = {
            id: campaigns.length + 1,
            name: 'Nouvelle Campagne #' + (campaigns.length + 1),
            type: selectedCampaignType === 'sms' ? 'SMS' : 'WhatsApp',
            target: 'Tous les patients',
            status: 'En attente',
            sent: 0,
            openRate: '0%',
            date: new Date().toLocaleDateString()
        };
        setCampaigns([newCampaign, ...campaigns]);
        setShowCampaignModal(false);
        alert("Campagne créée avec succès !");
    };

    return (
        <div className="loyalty fade-in" style={{ paddingBottom: '3rem' }}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--secondary)' }}>
                        Fidélité & Marketing 360
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Engagez vos patients, boostez la rétention et augmentez le panier moyen.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button onClick={() => setShowCampaignModal(true)} style={{ padding: '0.85rem 1.5rem', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Megaphone size={20} /> Nouvelle Campagne
                    </button>
                </div>
            </header>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card" style={{ padding: '24px', background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', color: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <Trophy size={24} color="#ddd6fe" />
                    </div>
                    <p style={{ fontSize: '0.75rem', fontWeight: '800', opacity: 0.8 }}>MEMBRES ACTIFS</p>
                    <p style={{ fontSize: '2rem', fontWeight: '950' }}>1,240</p>
                    <p style={{ fontSize: '0.7rem', fontWeight: '700', opacity: 0.8 }}>+45 ce mois</p>
                </div>
                <div className="card" style={{ padding: '24px', background: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <Wallet size={24} color="var(--primary)" />
                    </div>
                    <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>INPACT FIDÉLITÉ</p>
                    <p style={{ fontSize: '2rem', fontWeight: '950', color: 'var(--secondary)' }}>+18%</p>
                    <p style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--success)' }}>Panier moyen membres</p>
                </div>
                <div className="card" style={{ padding: '24px', background: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <MessageCircle size={24} color="#ec4899" />
                    </div>
                    <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>CAMPAGNES ACTIVES</p>
                    <p style={{ fontSize: '2rem', fontWeight: '950', color: 'var(--secondary)' }}>3</p>
                    <p style={{ fontSize: '0.7rem', fontWeight: '700', color: '#ec4899' }}>SMS & WhatsApp</p>
                </div>
                <div className="card" style={{ padding: '24px', background: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <Gift size={24} color="#f59e0b" />
                    </div>
                    <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>CADEAUX DÉLIVRÉS</p>
                    <p style={{ fontSize: '2rem', fontWeight: '950', color: 'var(--secondary)' }}>86</p>
                    <p style={{ fontSize: '0.7rem', fontWeight: '700', color: '#f59e0b' }}>Ce mois-ci</p>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
                {[
                    { id: 'program', label: 'Programme de Fidélité', icon: QrCode },
                    { id: 'campaigns', label: 'Campagnes Marketing', icon: Send },
                    { id: 'analytics', label: 'Performance', icon: BarChart },
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

            {activeTab === 'program' && (
                <div className="fade-in">
                    <div className="card" style={{ padding: 0 }}>
                        <div style={{ padding: '20px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Search color="var(--text-muted)" size={20} />
                                <input
                                    type="text"
                                    placeholder="Rechercher un membre (Nom, Tél...)"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '1rem', width: '300px' }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button className="glass" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700' }}>Scanner Carte</button>
                                <button className="glass" style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700' }}>Nouveau Membre</button>
                            </div>
                        </div>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th style={{ padding: '20px' }}>Membre</th>
                                    <th>Niveau</th>
                                    <th>Points Solde</th>
                                    <th>Dernier Achat</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMembers.slice(0, 8).map((m, i) => (
                                    <tr key={i}>
                                        <td style={{ padding: '16px 20px' }}>
                                            <div style={{ fontWeight: '800' }}>{m.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.phone}</div>
                                        </td>
                                        <td>
                                            <span style={{
                                                padding: '4px 10px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '800',
                                                backgroundColor: m.tier === 'Gold' ? '#ffedd5' : '#f1f5f9',
                                                color: m.tier === 'Gold' ? '#b45309' : '#64748b',
                                                border: m.tier === 'Gold' ? '1px solid #fed7aa' : '1px solid #e2e8f0'
                                            }}>
                                                {m.tier.toUpperCase()}
                                            </span>
                                        </td>
                                        <td>
                                            <span style={{ fontWeight: '900', fontSize: '1.1rem', color: 'var(--primary)' }}>{m.points} pts</span>
                                        </td>
                                        <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{m.lastVisit}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button style={{ padding: '6px 12px', borderRadius: '8px', background: 'var(--secondary)', color: 'white', border: 'none', fontSize: '0.75rem', fontWeight: '700' }}>AJOUTER PTS</button>
                                                <button style={{ padding: '6px 12px', borderRadius: '8px', background: 'white', border: '1px solid #e2e8f0', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: '700' }}>HISTORIQUE</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'campaigns' && (
                <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '2rem' }}>
                    <div className="card" style={{ padding: 0 }}>
                        <div style={{ padding: '20px', borderBottom: '1px solid var(--border)', background: '#f8fafc' }}>
                            <h3 style={{ fontWeight: '900', fontSize: '1.1rem' }}>Campagnes Récentes</h3>
                        </div>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th style={{ padding: '20px' }}>Campagne</th>
                                    <th>Cible</th>
                                    <th>Canal</th>
                                    <th>Statut</th>
                                    <th>Performance</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {campaigns.map(c => (
                                    <tr key={c.id}>
                                        <td style={{ padding: '16px 20px', fontWeight: '800' }}>{c.name}</td>
                                        <td style={{ fontSize: '0.85rem' }}>{c.target}</td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                {c.type === 'SMS' ? <MessageSquare size={16} /> : <MessageCircle size={16} color="#25d366" />}
                                                <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>{c.type}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span style={{
                                                padding: '4px 10px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '800',
                                                backgroundColor: c.status === 'Envoyé' ? '#dcfce7' : c.status === 'Active' ? '#dbeafe' : '#fef2f2',
                                                color: c.status === 'Envoyé' ? '#166534' : c.status === 'Active' ? '#1e40af' : '#991b1b'
                                            }}>
                                                {c.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td>
                                            {c.sent > 0 ? (
                                                <div>
                                                    <div style={{ fontSize: '0.9rem', fontWeight: '900' }}>{c.openRate}</div>
                                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Ouverture</div>
                                                </div>
                                            ) : <span style={{ opacity: 0.5 }}>-</span>}
                                        </td>
                                        <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{c.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="card" style={{ padding: '24px', background: 'var(--secondary)', color: 'white' }}>
                        <h3 style={{ fontWeight: '900', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Gift size={24} color="#f59e0b" /> Récompenses du Mois
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { name: 'Bon d\'achat 5000F', cost: '1000 pts', avail: 12 },
                                { name: 'Trousse Soin Bébé', cost: '2500 pts', avail: 5 },
                                { name: 'Consultation Diététique', cost: '5000 pts', avail: 'Illimité' }
                            ].map((r, i) => (
                                <div key={i} style={{ padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <div style={{ fontWeight: '800', fontSize: '0.95rem' }}>{r.name}</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                                        <span style={{ color: '#f59e0b', fontWeight: '900', fontSize: '0.85rem' }}>{r.cost}</span>
                                        <span style={{ opacity: 0.7, fontSize: '0.8rem' }}>Stock: {r.avail}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Campaign Creator Modal */}
            {showCampaignModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.9)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                    <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '24px', width: '600px', maxWidth: '90vw' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '24px' }}>Créer une Nouvelle Campagne</h2>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '0.9rem' }}>Nom de la Campagne</label>
                            <input type="text" placeholder="Ex: Promo rentrée scolaire" style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '0.9rem' }}>Canal de Communication</label>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <button
                                    onClick={() => setSelectedCampaignType('sms')}
                                    style={{ flex: 1, padding: '16px', borderRadius: '12px', border: selectedCampaignType === 'sms' ? '2px solid var(--primary)' : '1px solid #e2e8f0', background: selectedCampaignType === 'sms' ? '#f0fdf4' : 'white', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                >
                                    <MessageSquare size={20} /> SMS
                                </button>
                                <button
                                    onClick={() => setSelectedCampaignType('whatsapp')}
                                    style={{ flex: 1, padding: '16px', borderRadius: '12px', border: selectedCampaignType === 'whatsapp' ? '2px solid #25d366' : '1px solid #e2e8f0', background: selectedCampaignType === 'whatsapp' ? '#dcfce7' : 'white', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                >
                                    <MessageCircle size={20} color={selectedCampaignType === 'whatsapp' ? '#25d366' : 'currentColor'} /> WhatsApp
                                </button>
                            </div>
                        </div>

                        <div style={{ marginBottom: '24px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700', fontSize: '0.9rem' }}>Message</label>
                            <textarea rows="4" placeholder="Bonjour..." style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', fontFamily: 'inherit' }}></textarea>
                            <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>0 / 160 caractères</div>
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button onClick={() => setShowCampaignModal(false)} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', fontWeight: '800', cursor: 'pointer' }}>Annuler</button>
                            <button onClick={handleCreateCampaign} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: '800', cursor: 'pointer' }}>Lancer la Campagne</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
