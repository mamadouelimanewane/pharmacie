import React, { useState } from 'react';
import {
    CreditCard, Banknote, Landmark, ArrowUpRight,
    ArrowDownRight, FileCheck, AlertCircle, PieChart,
    TrendingUp, DollarSign, ShoppingBag, Percent,
    ChevronRight, Info
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
import { MOCK_PRODUCTS } from '../data/mockData';

const paymentData = [
    { name: 'Espèces (Cash)', value: 5200, color: '#10b981' },
    { name: 'Tiers-Payant (AMO)', value: 4500, color: '#3b82f6' },
    { name: 'Wave Mobile', value: 2800, color: '#1dcad3' },
    { name: 'Orange Money', value: 1900, color: '#FF6600' },
    { name: 'Complémentaires (AMC)', value: 800, color: '#8b5cf6' },
];

const marginTrendData = [
    { month: 'Jan', margin: 28 },
    { month: 'Fév', margin: 32 },
    { month: 'Mar', margin: 31 },
    { month: 'Avr', margin: 34 },
    { month: 'Mai', margin: 33 },
    { month: 'Juin', margin: 35 },
];

export default function Finances() {
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
            <header style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--secondary)' }}>
                    Pilotage de la Rentabilité
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                    Analyse des marges réelles, optimization de l'inventaire et performance financière.
                </p>
            </header>

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
                {/* Graphique d'évolution des marges */}
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

                {/* Top Produits Rentables */}
                <div className="card" style={{ padding: '24px' }}>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', fontWeight: '800' }}>
                        <Star size={20} color="#f59e0b" /> Top Marges Unitaires
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                {/* Tiers-Payant (Keep existing but polish) */}
                <div className="card" style={{ padding: '24px' }}>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', fontWeight: '800' }}>
                        <PieChart size={20} color="var(--primary)" /> Ventilation des Paiements
                    </h3>
                    <div style={{ height: '240px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={paymentData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} width={120} />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-lg)' }} />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                                    {paymentData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Optimisation Inventory Tips */}
                <div className="card" style={{ padding: '24px', backgroundColor: '#f0f9ff', border: 'none' }}>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', fontWeight: '800', color: '#0369a1' }}>
                        <Info size={20} color="#0369a1" /> Conseils d'Optimisation
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '16px', borderLeft: '4px solid #0ea5e9' }}>
                            <p style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0c4a6e', marginBottom: '4px' }}>Surplus de Stock : Doliprane</p>
                            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Vous avez 245 unités en stock (valeur d'achat: 367k F). Envisagez de réduire les commandes pour libérer de la trésorerie.</p>
                        </div>
                        <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '16px', borderLeft: '4px solid #f59e0b' }}>
                            <p style={{ fontSize: '0.85rem', fontWeight: '700', color: '#92400e', marginBottom: '4px' }}>Marge Faible : Amoxicilline</p>
                            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Votre marge est de 37% sur ce produit critique. Vérifiez si une renégociation avec le labo Biogaran est possible.</p>
                        </div>
                        <button style={{ padding: '12px', borderRadius: '12px', border: 'none', backgroundColor: '#0ea5e9', color: 'white', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', marginTop: '10px' }}>Générer Rapport Financier Complet</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Star = ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);
