import React, { useState } from 'react';
import {
    CreditCard, Banknote, Landmark, ArrowUpRight,
    ArrowDownRight, FileCheck, AlertCircle, PieChart,
    TrendingUp, DollarSign, ShoppingBag, Percent,
    ChevronRight, Info, BookOpen, Receipt,
    FileText, CheckCircle2, Clock, Trash2,
    Download, Eye, Send, Search, Filter,
    Calculator, Wallet, History
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
import { MOCK_PRODUCTS } from '../data/mockData';

const paymentData = [
    { name: 'Espèces (Cash)', value: 5200, color: '#10b981' },
    { name: 'Tiers-Payant (AMO)', value: 4500, color: '#3b82f6' },
    { name: 'Wave Mobile', value: 2800, color: '#1dcad3' },
    { name: 'Orange Money', value: 1900, color: '#FF6600' },
    { name: 'Complémentaires (AMC)', value: 800, color: '#8b5cf6' },
    { name: 'Frais Opérateurs (1%)', value: 47, color: '#ef4444' },
];

const marginTrendData = [
    { month: 'Jan', margin: 28 },
    { month: 'Fév', margin: 32 },
    { month: 'Mar', margin: 31 },
    { month: 'Avr', margin: 34 },
    { month: 'Mai', margin: 33 },
    { month: 'Juin', margin: 35 },
];

const MOCK_INVOICES = [
    { id: 'FAC-2026-001', supplier: 'LABOREX SÉNÉGAL', date: '05/02/2026', due: '20/02/2026', amount: 1250000, status: 'En attente', type: 'Grossiste' },
    { id: 'FAC-2026-002', supplier: 'COPHASE', date: '01/02/2026', due: '15/02/2026', amount: 840000, status: 'Payé', type: 'Grossiste' },
    { id: 'FAC-2026-003', supplier: 'SENELEC', date: '07/02/2026', due: '07/02/2026', amount: 156000, status: 'Retard', type: 'Charges' },
    { id: 'FAC-2026-004', supplier: 'BIOGARAN', date: '02/02/2026', due: '02/03/2026', amount: 2400000, status: 'En attente', type: 'Laboratoire' },
];

const MOCK_CHEQUES = [
    { id: 'CHQ-001254', beneficiary: 'COPHASE', amount: 840000, date: '01/02/2026', status: 'Décaissé' },
    { id: 'CHQ-001255', beneficiary: 'Immeuble Pharmacie', amount: 450000, date: '05/02/2026', status: 'En attente' },
];

const MOCK_BANK = [
    { date: '08/02/2026', label: 'VIREMENT WAVE SÉNÉGAL', amount: +450000, type: 'Credit' },
    { date: '07/02/2026', label: 'PRÉLÈVEMENT SENELEC', amount: -65000, type: 'Debit' },
    { date: '06/02/2026', label: 'REMISE ESPÈCES', amount: +800000, type: 'Credit' },
];

export default function Finances() {
    const [activeTab, setActiveTab] = useState('analytics'); // 'analytics', 'suppliers', 'treasury'

    // Analytics calculations from MOCK_PRODUCTS
    const productStats = MOCK_PRODUCTS.map(p => ({
        name: p.name,
        margin: p.price - p.costPrice,
        marginPercent: ((p.price - p.costPrice) / p.price * 100).toFixed(1),
        stockValue: p.stock * p.costPrice,
        potentialProfit: p.stock * (p.price - p.costPrice)
    }));

    const totalPotentialProfit = productStats.reduce((acc, p) => acc + p.potentialProfit, 0);
    const avgMarginPercent = (productStats.reduce((acc, p) => acc + parseFloat(p.marginPercent), 0) / productStats.length).toFixed(1);
    const topPerformers = [...productStats].sort((a, b) => b.margin - a.margin).slice(0, 5);

    return (
        <div className="finances fade-in" style={{ paddingBottom: '2rem' }}>
            <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--secondary)' }}>
                        {activeTab === 'analytics' ? 'Pilotage de la Rentabilité' : activeTab === 'suppliers' ? 'Factures & Fournisseurs' : 'Trésorerie & Chéquiers'}
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        {activeTab === 'analytics' ? 'Analyse des marges réelles et performance financière.' :
                            activeTab === 'suppliers' ? 'Gestion automatisée des achats et dettes fournisseurs.' :
                                'Suivi des banques, chéquiers et rapprochement bancaire.'}
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="glass" style={{ padding: '0.85rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)', color: 'var(--secondary)', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Download size={20} /> Exporter FEC</button>
                    {activeTab === 'suppliers' && (
                        <button style={{ padding: '0.85rem 1.5rem', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 6px rgba(16, 185, 129, 0.2)' }}><FileText size={20} /> Scanner Facture IA</button>
                    )}
                </div>
            </header>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
                {[
                    { id: 'analytics', label: 'Analytique & Marges', icon: TrendingUp },
                    { id: 'suppliers', label: 'Factures Fournisseurs', icon: Receipt },
                    { id: 'treasury', label: 'Trésorerie & Chéquiers', icon: Wallet }
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

            {activeTab === 'analytics' && (
                <div className="fade-in">
                    {/* KPIs de Rentabilité */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div className="card" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: '700', opacity: 0.9, marginBottom: '0.5rem' }}>BÉNÉFICE POTENTIEL (STOCK)</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ fontSize: '1.6rem', fontWeight: '800' }}>{totalPotentialProfit.toLocaleString()} F</p>
                                <TrendingUp size={24} style={{ opacity: 0.8 }} />
                            </div>
                        </div>
                        <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>TAUX DE MARGE MOYEN</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ fontSize: '1.8rem', fontWeight: '800' }}>{avgMarginPercent}%</p>
                                <span style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', fontSize: '0.85rem', fontWeight: '600' }}>
                                    <ArrowUpRight size={16} /> +1.4%
                                </span>
                            </div>
                        </div>
                        <div className="card" style={{ borderLeft: '4px solid #0ea5e9' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>VALEUR D'ACHAT STOCK</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ fontSize: '1.6rem', fontWeight: '800' }}>2 845 000 F</p>
                                <ShoppingBag size={24} color="#0ea5e9" opacity={0.5} />
                            </div>
                        </div>
                        <div className="card" style={{ borderLeft: '4px solid var(--accent)' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>CHIFFRE D'AFFAIRES JOUR</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ fontSize: '1.6rem', fontWeight: '800' }}>850 400 F</p>
                                <div style={{ padding: '4px 8px', backgroundColor: '#fef3c7', borderRadius: '6px', color: '#d97706', fontSize: '0.75rem', fontWeight: '700' }}>32 VENTES</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                        <div className="card" style={{ padding: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', fontWeight: '800' }}>
                                    <Percent size={20} color="var(--primary)" /> Évolution de la Marge (%)
                                </h3>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>6 derniers mois</span>
                            </div>
                            <div style={{ height: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={marginTrendData}>
                                        <defs>
                                            <linearGradient id="colorMargin" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} unit="%" />
                                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: 'var(--shadow-xl)' }} />
                                        <Area type="monotone" dataKey="margin" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorMargin)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="card" style={{ padding: '24px' }}>
                            <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', fontWeight: '800' }}>
                                <AlertCircle size={20} color="#f59e0b" /> Top Marges Unitaires
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {topPerformers.map((p, i) => (
                                    <div key={i} style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '14px', border: '1px solid #f1f5f9' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                            <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{p.name}</span>
                                            <span style={{ color: 'var(--primary)', fontWeight: '800' }}>+{p.margin.toLocaleString()} F</span>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Marge: {p.marginPercent}%</span>
                                            <div style={{ width: '60px', height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
                                                <div style={{ width: `${p.marginPercent}%`, height: '100%', backgroundColor: 'var(--primary)' }}></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'suppliers' && (
                <div className="fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div className="card">
                            <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '8px' }}>DETTES FOURNISSEURS</p>
                            <p style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ef4444' }}>4 580 000 F</p>
                            <p style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: '700', marginTop: '8px' }}>8 Factures à régler</p>
                        </div>
                        <div className="card">
                            <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '8px' }}>ÉCHÉANCE 7 JOURS</p>
                            <p style={{ fontSize: '1.8rem', fontWeight: '900', color: '#f59e0b' }}>1 250 000 F</p>
                            <p style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '700', marginTop: '8px' }}>Laborex & Cophase</p>
                        </div>
                        <div className="card" style={{ background: '#f0f9ff', border: 'none' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: '800', color: '#0369a1', marginBottom: '8px' }}>AUTOMATISATION IA</p>
                            <p style={{ fontSize: '1.8rem', fontWeight: '900', color: '#0369a1' }}>100%</p>
                            <p style={{ fontSize: '0.8rem', color: '#0369a1', fontWeight: '700', marginTop: '8px' }}>Scans OCR optimisés</p>
                        </div>
                    </div>

                    <div className="card" style={{ padding: 0 }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                            <h3 style={{ fontWeight: '900', fontSize: '1.1rem' }}>Brouillard des Achats</h3>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button className="glass" style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '700' }}>Toutes Fournisseurs</button>
                                <button className="glass" style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '700' }}>Factures à payer</button>
                            </div>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ backgroundColor: '#f8fafc' }}>
                                <tr style={{ textAlign: 'left' }}>
                                    <th style={{ padding: '20px', fontSize: '0.75rem', fontWeight: '800' }}>NUMÉRO</th>
                                    <th style={{ fontSize: '0.75rem', fontWeight: '800' }}>FOURNISSEUR</th>
                                    <th style={{ fontSize: '0.75rem', fontWeight: '800' }}>MONTANT</th>
                                    <th style={{ fontSize: '0.75rem', fontWeight: '800' }}>ÉCHÉANCE</th>
                                    <th style={{ fontSize: '0.75rem', fontWeight: '800' }}>STATUT</th>
                                    <th style={{ padding: '20px', textAlign: 'right' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_INVOICES.map(fac => (
                                    <tr key={fac.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '20px', fontWeight: '800' }}>{fac.id}</td>
                                        <td>
                                            <div style={{ fontWeight: '700' }}>{fac.supplier}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{fac.type}</div>
                                        </td>
                                        <td style={{ fontWeight: '900' }}>{fac.amount.toLocaleString()} F</td>
                                        <td style={{ color: fac.status === 'Retard' ? '#ef4444' : 'inherit', fontWeight: '600' }}>{fac.due}</td>
                                        <td>
                                            <span style={{
                                                padding: '6px 12px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '800',
                                                background: fac.status === 'Payé' ? '#dcfce7' : fac.status === 'Retard' ? '#fee2e2' : '#fefce8',
                                                color: fac.status === 'Payé' ? '#166534' : fac.status === 'Retard' ? '#991b1b' : '#854d0e'
                                            }}>
                                                {fac.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td style={{ padding: '20px', textAlign: 'right' }}>
                                            <button style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', marginRight: '8px' }}><Eye size={18} /></button>
                                            <button style={{ padding: '8px', borderRadius: '8px', border: 'none', background: 'var(--primary)', color: 'white' }}><CreditCard size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'treasury' && (
                <div className="fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) 400px', gap: '2rem' }}>
                        <div>
                            {/* Rapprochement Bancaire */}
                            <div className="card" style={{ marginBottom: '2rem' }}>
                                <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ fontWeight: '900', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Landmark size={20} color="var(--primary)" /> Relevé Bancaire Automatisé (CBAO)
                                    </h3>
                                    <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: '700' }}>Synchronisé il y a 5 min</span>
                                </div>
                                <div style={{ padding: '20px' }}>
                                    {MOCK_BANK.map((item, idx) => (
                                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', backgroundColor: idx % 2 === 0 ? '#f8fafc' : 'white', borderRadius: '12px', marginBottom: '8px' }}>
                                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                                <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: item.type === 'Credit' ? '#f0fdf4' : '#fee2e2' }}>
                                                    {item.type === 'Credit' ? <ArrowDownRight size={20} color="#16a34a" /> : <ArrowUpRight size={20} color="#ef4444" />}
                                                </div>
                                                <div>
                                                    <p style={{ fontWeight: '800', fontSize: '0.9rem' }}>{item.label}</p>
                                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.date}</p>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <p style={{ fontWeight: '900', color: item.type === 'Credit' ? '#16a34a' : '#ef4444' }}>
                                                    {item.type === 'Credit' ? '+' : ''}{item.amount.toLocaleString()} F
                                                </p>
                                                <button style={{ fontSize: '0.7rem', background: 'none', border: 'none', color: 'var(--primary)', fontWeight: '800', cursor: 'pointer' }}>Lettrage IA Assistant</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Chéquier Tracking */}
                            <div className="card">
                                <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ fontWeight: '900', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <BookOpen size={20} color="var(--secondary)" /> Registre du Chéquier
                                    </h3>
                                    <button className="glass" style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '800' }}>Émettre un chèque</button>
                                </div>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ textAlign: 'left', borderBottom: '1px solid #f1f5f9' }}>
                                            <th style={{ padding: '16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>N° CHÈQUE</th>
                                            <th style={{ padding: '16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>BÉNÉFICIAIRE</th>
                                            <th style={{ padding: '16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>MONTANT</th>
                                            <th style={{ padding: '16px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>STATUT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {MOCK_CHEQUES.map((chq, i) => (
                                            <tr key={i} style={{ borderBottom: i === MOCK_CHEQUES.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                                                <td style={{ padding: '16px', fontWeight: '800' }}>{chq.id}</td>
                                                <td style={{ padding: '16px', fontWeight: '700' }}>{chq.beneficiary}</td>
                                                <td style={{ padding: '16px', fontWeight: '900' }}>{chq.amount.toLocaleString()} F</td>
                                                <td style={{ padding: '16px' }}>
                                                    <span style={{ padding: '4px 10px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '900', background: chq.status === 'Décaissé' ? '#f1f5f9' : '#fff7ed', color: chq.status === 'Décaissé' ? '#64748b' : '#9a3412' }}>{chq.status.toUpperCase()}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="card" style={{ background: 'var(--secondary)', color: 'white', padding: '30px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                    <Wallet size={32} color="var(--primary)" />
                                    <h3 style={{ fontWeight: '900', fontSize: '1.4rem' }}>Position Bancaire</h3>
                                </div>
                                <p style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '8px' }}>SOLDE RÉEL (SYNCHRO)</p>
                                <p style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '24px' }}>8 450 600 F</p>

                                <div style={{ height: '2px', backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: '24px' }}></div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>Chèques non débités</span>
                                        <span style={{ fontWeight: '800' }}>- 450 000 F</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>Factures échues</span>
                                        <span style={{ fontWeight: '800', color: '#fb7185' }}>- 1 250 000 F</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                        <span style={{ fontSize: '0.9rem', fontWeight: '800' }}>Trésorerie Disponible</span>
                                        <span style={{ fontSize: '1.1rem', fontWeight: '900', color: 'var(--primary)' }}>6 750 600 F</span>
                                    </div>
                                </div>
                            </div>

                            <div className="card" style={{ padding: '24px', border: '1px solid #dcfce7', background: '#f0fdf4' }}>
                                <h4 style={{ fontWeight: '900', fontSize: '0.9rem', color: '#166534', marginBottom: '12px' }}>CONSEIL TRÉSORERIE IA</h4>
                                <p style={{ fontSize: '0.8rem', color: '#166534', lineHeight: '1.5' }}>
                                    Votre trésorerie après paiement des factures urgentes reste robuste. Envisagez une commande anticipée chez **Biogaran** pour bénéficier de la remise de 3% sur volume.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
