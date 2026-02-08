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
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_PRODUCTS } from '../data/mockData';

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
    const [activeTab, setActiveTab] = useState('analytics'); // 'analytics', 'suppliers', 'treasury', 'reporting'

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
                        {activeTab === 'analytics' ? 'Pilotage de la Rentabilité' : activeTab === 'suppliers' ? 'Factures & Fournisseurs' : activeTab === 'treasury' ? 'Trésorerie & Chéquiers' : 'Reporting Expert-Comptable'}
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        {activeTab === 'analytics' ? 'Analyse des marges réelles et performance financière.' :
                            activeTab === 'suppliers' ? 'Gestion automatisée des achats et dettes fournisseurs.' :
                                activeTab === 'treasury' ? 'Suivi des banques, chéquiers et rapprochement bancaire.' :
                                    'Interface dédiée à la clôture comptable et aux exports fiscaux.'}
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="glass" style={{ padding: '0.85rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)', color: 'var(--secondary)', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Download size={20} /> Exporter FEC</button>
                    {activeTab === 'suppliers' && (
                        <button style={{ padding: '0.85rem 1.5rem', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileText size={20} /> Scanner Facture IA</button>
                    )}
                </div>
            </header>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
                {[
                    { id: 'analytics', label: 'Analytique & Marges', icon: TrendingUp },
                    { id: 'suppliers', label: 'Factures Fournisseurs', icon: Receipt },
                    { id: 'treasury', label: 'Trésorerie & Chéquiers', icon: Wallet },
                    { id: 'reporting', label: 'Reporting Expert', icon: FileCheck }
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
                            <p style={{ fontSize: '1.8rem', fontWeight: '800' }}>{avgMarginPercent}%</p>
                        </div>
                        <div className="card" style={{ borderLeft: '4px solid #0ea5e9' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>VALEUR D'ACHAT STOCK</p>
                            <p style={{ fontSize: '1.6rem', fontWeight: '800' }}>2 845 000 F</p>
                        </div>
                        <div className="card" style={{ borderLeft: '4px solid var(--accent)' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>CHIFFRE D'AFFAIRES JOUR</p>
                            <p style={{ fontSize: '1.6rem', fontWeight: '800' }}>850 400 F</p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                        <div className="card" style={{ padding: '24px' }}>
                            <h3 style={{ marginBottom: '2rem', fontWeight: '800' }}><Percent size={20} color="var(--primary)" /> Évolution de la Marge (%)</h3>
                            <div style={{ height: '300px' }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={marginTrendData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} />
                                        <YAxis axisLine={false} tickLine={false} unit="%" />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="margin" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.1} strokeWidth={3} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                        <div className="card" style={{ padding: '24px' }}>
                            <h3 style={{ marginBottom: '1.5rem', fontWeight: '800' }}>Top Marges Unitaires</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {topPerformers.map((p, i) => (
                                    <div key={i} style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '14px', display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontWeight: '700' }}>{p.name}</span>
                                        <span style={{ color: 'var(--primary)', fontWeight: '900' }}>+{p.margin.toLocaleString()} F</span>
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
                            <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>DETTES FOURNISSEURS</p>
                            <p style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ef4444' }}>4 580 000 F</p>
                        </div>
                        <div className="card">
                            <p style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--text-muted)' }}>ÉCHÉANCE 7 JOURS</p>
                            <p style={{ fontSize: '1.8rem', fontWeight: '900', color: '#f59e0b' }}>1 250 000 F</p>
                        </div>
                        <div className="card" style={{ background: '#f0f9ff' }}>
                            <p style={{ fontSize: '0.75rem', fontWeight: '800', color: '#0369a1' }}>ALERTE PRIX ACHAT</p>
                            <p style={{ fontSize: '1.1rem', fontWeight: '900' }}>3 hausses détectées</p>
                        </div>
                    </div>

                    <div className="card" style={{ padding: 0 }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ backgroundColor: '#f8fafc' }}>
                                <tr style={{ textAlign: 'left' }}>
                                    <th style={{ padding: '20px' }}>ID</th>
                                    <th>FOURNISSEUR</th>
                                    <th>MONTANT</th>
                                    <th>ÉCHÉANCE</th>
                                    <th>STATUT</th>
                                    <th style={{ padding: '20px', textAlign: 'right' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_INVOICES.map(fac => (
                                    <tr key={fac.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '20px', fontWeight: '800' }}>{fac.id}</td>
                                        <td style={{ fontWeight: '700' }}>{fac.supplier}</td>
                                        <td style={{ fontWeight: '900' }}>{fac.amount.toLocaleString()} F</td>
                                        <td>{fac.due}</td>
                                        <td>
                                            <span style={{ padding: '6px 12px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '800', background: fac.status === 'Payé' ? '#dcfce7' : '#fefce8', color: fac.status === 'Payé' ? '#166534' : '#854d0e' }}>{fac.status.toUpperCase()}</span>
                                        </td>
                                        <td style={{ padding: '20px', textAlign: 'right' }}>
                                            <button style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white' }}><Eye size={18} /></button>
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
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem' }}>
                        <div>
                            <div className="card" style={{ marginBottom: '2rem' }}>
                                <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                                    <h3 style={{ fontWeight: '900' }}><Landmark size={20} color="var(--primary)" /> Relevé Bancaire Automatisé</h3>
                                    <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: '700' }}>Synchro OK</span>
                                </div>
                                <div style={{ padding: '20px' }}>
                                    {MOCK_BANK.map((item, idx) => (
                                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
                                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                                {item.type === 'Credit' ? <ArrowDownRight color="#16a34a" /> : <ArrowUpRight color="#ef4444" />}
                                                <div>
                                                    <p style={{ fontWeight: '700' }}>{item.label}</p>
                                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.date}</p>
                                                </div>
                                            </div>
                                            <p style={{ fontWeight: '900' }}>{item.amount.toLocaleString()} F</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="card">
                                <div style={{ padding: '24px', borderBottom: '1px solid var(--border)' }}>
                                    <h3 style={{ fontWeight: '900' }}>Registre Chéquier</h3>
                                </div>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <tbody>
                                        {MOCK_CHEQUES.map((chq, i) => (
                                            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={{ padding: '16px', fontWeight: '800' }}>{chq.id}</td>
                                                <td>{chq.beneficiary}</td>
                                                <td style={{ fontWeight: '900' }}>{chq.amount.toLocaleString()} F</td>
                                                <td>{chq.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="card" style={{ background: 'var(--secondary)', color: 'white', padding: '30px' }}>
                            <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><Wallet size={32} color="var(--primary)" /> Position Bancaire</h3>
                            <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>SOLDE RÉEL</p>
                            <p style={{ fontSize: '2.2rem', fontWeight: '900' }}>8 450 600 F</p>
                            <hr style={{ margin: '24px 0', opacity: 0.1 }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                <span style={{ opacity: 0.8 }}>Chèques non débités</span>
                                <span style={{ fontWeight: '800' }}>- 450 000 F</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                <span style={{ fontWeight: '800' }}>Dispo Réel</span>
                                <span style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--primary)' }}>6 750 600 F</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'reporting' && (
                <div className="fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                        <div>
                            <div className="card" style={{ padding: '32px', marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                                    <h3 style={{ fontWeight: '900', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <PieChart size={24} color="var(--primary)" /> Compte de Résultat Simulé
                                    </h3>
                                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '700' }}>Février 2026</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {[
                                        { label: 'CHIFFRE D\'AFFAIRES (HT)', amount: 14580600, type: 'plus' },
                                        { label: 'ACHATS DE MARCHANDISES (HT)', amount: 9245000, type: 'minus' },
                                        { label: 'MARGE BRUTE TOB', amount: 5335600, type: 'total', percent: '36.6%' },
                                        { label: 'CHARGES EXTERNES', amount: 650000, type: 'minus' },
                                        { label: 'CHARGES DE PERSONNEL', amount: 1850000, type: 'minus' },
                                        { label: 'EBITDA (EXCÉDENT BRUT)', amount: 2835600, type: 'total', percent: '19.4%' },
                                        { label: 'RÉSULTAT NET ESTIMÉ', amount: 2410260, type: 'final' }
                                    ].map((line, i) => (
                                        <div key={i} style={{
                                            display: 'flex', justifyContent: 'space-between', padding: '16px', borderRadius: '12px',
                                            backgroundColor: line.type === 'total' ? '#f0f9ff' : line.type === 'final' ? 'var(--secondary)' : 'transparent',
                                            color: line.type === 'final' ? 'white' : 'inherit',
                                            fontWeight: (line.type === 'total' || line.type === 'final') ? '900' : '600'
                                        }}>
                                            <span>{line.label}</span>
                                            <span>{line.amount.toLocaleString()} F</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="card" style={{ padding: '24px' }}>
                                <h3 style={{ fontWeight: '900', marginBottom: '20px' }}>Exports Comptables</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                                    <button className="glass" style={{ padding: '20px', borderRadius: '16px', fontWeight: '800' }}>FICHIER FEC</button>
                                    <button className="glass" style={{ padding: '20px', borderRadius: '16px', fontWeight: '800' }}>GRAND LIVRE</button>
                                    <button className="glass" style={{ padding: '20px', borderRadius: '16px', fontWeight: '800' }}>BRIDGE SAGE</button>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="card" style={{ padding: '24px' }}>
                                <h3 style={{ fontWeight: '900', marginBottom: '20px' }}><Calculator size={20} color="var(--primary)" /> Taxes & TVA</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
                                        <p style={{ fontSize: '0.8rem', fontWeight: '800' }}>TVA COLLECTÉE (20%)</p>
                                        <p style={{ fontSize: '1.2rem', fontWeight: '900', color: 'var(--primary)' }}>2 916 120 F</p>
                                    </div>
                                    <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '12px' }}>
                                        <p style={{ fontSize: '0.8rem', fontWeight: '800' }}>CHARGES SOCIALES</p>
                                        <p style={{ fontSize: '1.2rem', fontWeight: '900', color: '#8b5cf6' }}>245 000 F</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
