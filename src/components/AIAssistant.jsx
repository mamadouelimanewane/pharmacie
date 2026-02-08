import React, { useState } from 'react';
import {
    Brain, TrendingUp, AlertTriangle, MessageCircle,
    Send, Loader2, Target, Calendar, BarChart3,
    Zap, ShieldCheck, Clock, ArrowRight, UserCheck
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_DATA = [
    { name: 'Lun', sales: 120, ai: 115 },
    { name: 'Mar', sales: 150, ai: 145 },
    { name: 'Mer', sales: 130, ai: 140 },
    { name: 'Jeu', sales: 170, ai: 165 },
    { name: 'Ven', sales: 210, ai: 200 },
    { name: 'Sam', sales: 190, ai: 210 },
    { name: 'Dim', sales: 140, ai: 150 },
];

export default function AIAssistant() {
    const [isTyping, setIsTyping] = useState(false);
    const [activeAnalysis, setActiveAnalysis] = useState('performance');

    return (
        <div className="ai-assistant fade-in" style={{ height: 'calc(100vh - 120px)', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <header style={{ marginBottom: '10px' }}>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Brain color="#8b5cf6" size={32} /> Intelligence Artificielle <span style={{ fontSize: '0.8rem', padding: '4px 8px', background: '#f5f3ff', color: '#8b5cf6', borderRadius: '8px', marginLeft: '10px', border: '1px solid #ddd6fe' }}>ELITE-AI PRO</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Analyse prédictive des performances et automatisation de la relation patient.</p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {/* Performance Preparation vs Vente */}
                    <div className="card" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontWeight: '800', color: 'var(--secondary)' }}>Efficacité de Préparation</h3>
                            <Clock size={20} color="var(--primary)" />
                        </div>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700' }}>TEMPS MOYEN SCAN ➜ SMS</p>
                                <p style={{ fontSize: '2rem', fontWeight: '950', color: 'var(--primary)' }}>4.2 <span style={{ fontSize: '0.9rem' }}>min</span></p>
                            </div>
                            <div style={{ padding: '8px 12px', background: '#f0fdf4', color: '#166534', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '800' }}>
                                +12% vs hier
                            </div>
                        </div>
                        <p style={{ marginTop: '16px', fontSize: '0.8rem' }}>AI Insights: <span style={{ color: 'var(--text-muted)' }}>La numérisation mobile a réduit le temps de saisie de 45s.</span></p>
                    </div>

                    {/* Récupération Manquants */}
                    <div className="card" style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontWeight: '800', color: 'var(--secondary)' }}>Opportunités Retenues</h3>
                            <Target size={20} color="#0ea5e9" />
                        </div>
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700' }}>CONVERSION DES MANQUANTS</p>
                                <p style={{ fontSize: '2rem', fontWeight: '950', color: '#0ea5e9' }}>82 <span style={{ fontSize: '0.9rem' }}>%</span></p>
                            </div>
                            <div style={{ padding: '8px 12px', background: '#e0f2fe', color: '#0369a1', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '800' }}>
                                Elite Target
                            </div>
                        </div>
                        <p style={{ marginTop: '16px', fontSize: '0.8rem' }}>AI Target: <span style={{ color: 'var(--text-muted)' }}>Alerter via SMS au déchargement génère 120k FCFA/jour.</span></p>
                    </div>
                </div>

                <div className="card" style={{ flex: 1, padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                        <div>
                            <h3 style={{ fontWeight: '800', color: 'var(--secondary)' }}>Prédiction d'Activité Officinale</h3>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Comparaison Vente Réelle vs Prévision IA (Smart-Flow)</p>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', fontWeight: '700' }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--primary)' }}></div> Réel
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', fontWeight: '700' }}>
                                <div style={{ width: 8, height: 8, borderRadius: '50%', border: '1px solid var(--primary)' }}></div> IA
                            </div>
                        </div>
                    </div>
                    <div style={{ width: '100%', height: 'calc(100% - 60px)' }}>
                        <ResponsiveContainer>
                            <AreaChart data={MOCK_DATA}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)' }} />
                                <Area type="monotone" dataKey="sales" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                                <Area type="monotone" dataKey="ai" stroke="var(--primary)" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* AI Insights Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="card" style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', border: '2px solid #ddd6fe', background: 'linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <Zap size={24} color="#8b5cf6" fill="#8b5cf6" />
                        <h3 style={{ fontWeight: '900', color: 'var(--secondary)' }}>Elite-AI Insights</h3>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
                        <div style={{ padding: '16px', borderRadius: '16px', background: 'white', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
                            <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                                <UserCheck size={18} color="var(--primary)" />
                                <span style={{ fontWeight: '800', fontSize: '0.85rem' }}>Satisfaction Patient</span>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>Les notifications "Ordonnance Prête" ont augmenté le taux de retour client de **18%** ce mois-ci.</p>
                        </div>

                        <div style={{ padding: '16px', borderRadius: '16px', background: 'white', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
                            <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                                <Package size={18} color="#0ea5e9" />
                                <span style={{ fontWeight: '800', fontSize: '0.85rem' }}>Optimisation Ruptures</span>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>**3 patients** ont déjà été notifiés de la réception de Ventoline. Retour estimé à 16h00.</p>
                        </div>

                        <div style={{ padding: '16px', borderRadius: '16px', background: 'white', border: '1px solid #e2e8f0', boxShadow: 'var(--shadow-sm)' }}>
                            <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                                <ShieldCheck size={18} color="#16a34a" />
                                <span style={{ fontWeight: '800', fontSize: '0.85rem' }}>Conformité SCOR</span>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>**98%** de vos dossiers mutuelles sont complets (Scan + Signature). Risque de rejet quasi nul.</p>
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                        <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--secondary)', color: 'white' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: '700', opacity: 0.8, marginBottom: '8px' }}>CONSEIL DU JOUR</p>
                            <p style={{ fontSize: '0.85rem', fontWeight: '600', lineHeight: '1.4' }}>"Utilisez le scan mobile pour les factures grossistes dès 8h pour notifier vos clients prioritaires avant l'ouverture."</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
