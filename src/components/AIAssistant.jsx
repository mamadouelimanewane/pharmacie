import React, { useState, useEffect } from 'react';
import {
    Brain, Sparkles, TrendingUp, AlertCircle,
    MessageSquare, Send, Bot, ShieldCheck,
    Zap, Target, LineChart, BarChart3,
    ArrowRightCircle, CheckCircle2, Info
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { MOCK_PRODUCTS } from '../data/mockData';

const predictionData = [
    { day: 'Lun', sales: 120, predicted: 125 },
    { day: 'Mar', sales: 132, predicted: 130 },
    { day: 'Mer', sales: 101, predicted: 110 },
    { day: 'Jeu', sales: 134, predicted: 140 },
    { day: 'Ven', sales: 90, predicted: 155 }, // Big gap simulation
    { day: 'Sam', sales: 230, predicted: 220 },
    { day: 'Dim', sales: 210, predicted: 205 },
];

export default function AIAssistant() {
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Bonjour Dr. Wane. Je suis PharmaElite-AI. J\'ai analysé vos données de la nuit. Souhaitez-vous voir mes recommandations pour optimiser vos stocks ?' }
    ]);
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const newMessages = [...messages, { role: 'user', text: inputValue }];
        setMessages(newMessages);
        setInputValue('');

        // Simulate AI thinking
        setTimeout(() => {
            let botResponse = "Je n'ai pas pu analyser cette demande précise, mais je note que votre marge sur les génériques a augmenté de 2% ce mois-ci.";
            if (inputValue.toLowerCase().includes('stock')) botResponse = "D'après mes prévisions, le stock de Doliprane 1000mg sera insuffisant pour le week-end prochain. Je vous suggère de commander 50 boîtes supplémentaires.";
            if (inputValue.toLowerCase().includes('marge')) botResponse = "Votre marge brute actuelle est de 32.5%. Le produit le plus rentable est le Magné B6.";

            setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
        }, 1000);
    };

    return (
        <div className="ai-assistant fade-in" style={{ paddingBottom: '2rem' }}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Brain color="#8b5cf6" size={36} /> Intelligence Artificielle <span style={{ color: '#8b5cf6', fontSize: '0.8rem', backgroundColor: '#f5f3ff', padding: '4px 12px', borderRadius: '100px', fontWeight: '700', border: '1px solid #ddd6fe' }}>ELITE-AI V2.0</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Moteur prédictif et assistant de gestion autonome pour votre officine.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#f5f3ff', padding: '10px 20px', borderRadius: '16px', border: '1px solid #ddd6fe' }}>
                    <Sparkles size={20} color="#8b5cf6" />
                    <span style={{ color: '#6d28d9', fontWeight: '700', fontSize: '0.9rem' }}>Santé du Stock : OPTIMALE</span>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>

                {/* Section Prédictions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Insights Cartes */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="card" style={{ border: 'none', background: 'white', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: '#8b5cf6' }}></div>
                            <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Target size={18} color="#8b5cf6" /> PRÉVISION DE VENTES
                            </h3>
                            <p style={{ fontSize: '1.5rem', fontWeight: '800' }}>+15% le week-end</p>
                            <p style={{ fontSize: '0.75rem', color: '#6d28d9', marginTop: '0.5rem' }}>Tendance détectée : Vague de chaleur prévue à Dakar</p>
                        </div>
                        <div className="card" style={{ border: 'none', background: 'white', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', backgroundColor: '#ef4444' }}></div>
                            <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <AlertCircle size={18} color="#ef4444" /> RISQUE DE RUPTURE
                            </h3>
                            <p style={{ fontSize: '1.5rem', fontWeight: '800' }}>Amoxicilline 1g</p>
                            <p style={{ fontSize: '0.75rem', color: '#b91c1c', marginTop: '0.5rem' }}>Délai réapprovisionnement critique : +48h prévu</p>
                        </div>
                    </div>

                    {/* Chart Prédictif */}
                    <div className="card" style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                            <h3 style={{ fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <LineChart size={20} color="var(--primary)" /> Analyse Prédictive vs Réel
                            </h3>
                            <div style={{ display: 'flex', gap: '15px', fontSize: '0.75rem' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--primary)' }}></div> Réel</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#8b5cf6' }}></div> IA (Prédit)</span>
                            </div>
                        </div>
                        <div style={{ height: '300px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={predictionData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-lg)' }} />
                                    <Area type="monotone" dataKey="sales" stroke="var(--primary)" fill="var(--primary-light)" strokeWidth={3} fillOpacity={0.2} />
                                    <Area type="monotone" dataKey="predicted" stroke="#8b5cf6" fill="#f5f3ff" strokeDasharray="5 5" strokeWidth={2} fillOpacity={0} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Recommandations Automatiques */}
                    <div className="card" style={{ padding: '24px' }}>
                        <h3 style={{ fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Zap size={20} color="#f59e0b" /> Actions IA Prioritaires
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { title: 'Optimisation Stock', desc: 'Réduire le stock de Biafine (-20%) - Rotation faible prévue', impact: '+120k Trésorerie' },
                                { title: 'Campagne de Rappel', desc: 'Envoyer SMS aux 15 patients diabétiques pour leur suivi mensuel', impact: 'Fidélisation Patient' },
                                { title: 'Ajustement Prix', desc: 'Augmenter de 2% la parapharmacie (Solaire) - Demande en hausse', impact: '+5% Marge' },
                            ].map((action, i) => (
                                <div key={i} style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #f1f5f9' }}>
                                    <div>
                                        <p style={{ fontWeight: '700', color: 'var(--secondary)', fontSize: '0.9rem' }}>{action.title}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{action.desc}</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)', backgroundColor: 'var(--primary-light)', padding: '4px 10px', borderRadius: '8px' }}>{action.impact}</div>
                                        <button style={{ border: 'none', background: 'none', color: '#8b5cf6', fontSize: '0.7rem', fontWeight: '700', marginTop: '4px', cursor: 'pointer' }}>Appliquer <ArrowRightCircle size={10} style={{ verticalAlign: 'middle' }} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Section Assistant Chat */}
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '1.5rem' }}>
                    <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden', border: 'none', boxShadow: 'var(--shadow-xl)' }}>
                        <div style={{ padding: '20px', backgroundColor: '#8b5cf6', color: 'white', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                            <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Assistant Elite-AI</h3>
                        </div>

                        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {messages.map((msg, i) => (
                                <div key={i} style={{
                                    alignSelf: msg.role === 'bot' ? 'flex-start' : 'flex-end',
                                    maxWidth: '85%',
                                    padding: '12px 16px',
                                    borderRadius: msg.role === 'bot' ? '0 16px 16px 16px' : '16px 16px 0 16px',
                                    backgroundColor: msg.role === 'bot' ? '#f3f4f6' : '#8b5cf6',
                                    color: msg.role === 'bot' ? '#1f2937' : 'white',
                                    fontSize: '0.85rem',
                                    lineHeight: '1.4'
                                }}>
                                    {msg.text}
                                </div>
                            ))}
                        </div>

                        <div style={{ padding: '20px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '10px' }}>
                            <input
                                type="text"
                                placeholder="Demandez moi (ex: prévision stock)..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }}
                            />
                            <button
                                onClick={handleSendMessage}
                                style={{ padding: '12px', borderRadius: '12px', border: 'none', backgroundColor: '#8b5cf6', color: 'white', cursor: 'pointer' }}
                            >
                                <Send size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="card" style={{ backgroundColor: '#fdf4ff', border: '1px solid #f5d0fe' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                            <ShieldCheck color="#c026d3" size={24} />
                            <div>
                                <p style={{ fontWeight: '700', color: '#86198f', fontSize: '0.85rem' }}>Sécurité des Données</p>
                                <p style={{ fontSize: '0.75rem', color: '#a21caf' }}>Toutes les analyses sont locales et conformes RGPD/Pharmacovigilance.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
