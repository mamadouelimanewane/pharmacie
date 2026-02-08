import React, { useState, useEffect } from 'react';
import {
    TrendingUp, TrendingDown, DollarSign, Package,
    Users, AlertCircle, Clock, ArrowRight,
    ShoppingCart, Scan, CheckCircle2, MessageCircle,
    Activity, Zap, ShieldCheck, PenTool
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts';

const data = [
    { name: '08:00', sales: 400, prediction: 380 },
    { name: '10:00', sales: 1200, prediction: 1100 },
    { name: '12:00', sales: 900, prediction: 950 },
    { name: '14:00', sales: 1500, prediction: 1400 },
    { name: '16:00', sales: 2100, prediction: 2000 },
    { name: '18:00', sales: 1800, prediction: 1850 },
    { name: '20:00', sales: 800, prediction: 850 },
];

const StatCard = ({ title, value, icon: Icon, trend, color, subtitle }) => (
    <div className="card fade-in" style={{ flex: 1, minWidth: '260px', borderBottom: `4px solid ${color}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{
                width: '48px', height: '48px', borderRadius: '16px',
                backgroundColor: `${color}15`, display: 'flex',
                alignItems: 'center', justifyContent: 'center', color: color
            }}>
                <Icon size={24} />
            </div>
            <div style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                fontSize: '0.85rem', fontWeight: '800',
                color: trend > 0 ? '#10b981' : '#ef4444',
                padding: '4px 8px', borderRadius: '8px', backgroundColor: trend > 0 ? '#f0fdf4' : '#fef2f2'
            }}>
                {trend > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {Math.abs(trend)}%
            </div>
        </div>
        <h3 style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</h3>
        <p style={{ fontSize: '1.8rem', fontWeight: '950', color: 'var(--secondary)', margin: '4px 0' }}>{value}</p>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>{subtitle}</p>
    </div>
);

export default function Dashboard() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="dashboard fade-in">
            <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2.4rem', fontWeight: '900', color: 'var(--secondary)', letterSpacing: '-1px' }}>
                        Dashboard <span style={{ color: 'var(--primary)' }}>Elite</span>
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: '500' }}>
                        Pilotage opérationnel de l'officine • Dr. Wane
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '1.2rem' }}>
                    <div className="card" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '12px', border: 'none', background: 'white' }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#10b981', animation: 'pulse 2s infinite' }}></div>
                        <span style={{ fontWeight: '800', color: 'var(--secondary)', fontSize: '0.9rem' }}>
                            {currentTime.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </span>
                        <span style={{ fontWeight: '950', color: 'var(--primary)', borderLeft: '2px solid #e2e8f0', paddingLeft: '12px' }}>
                            {currentTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                </div>
            </header>

            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
                <StatCard title="Chiffre d'Affaires" value="1 845 200 F" icon={DollarSign} trend={+12.5} color="var(--primary)" subtitle="82% via Tiers-Payant" />
                <StatCard title="Numérisations SCOR" value="48" icon={Scan} trend={+24.0} color="#8b5cf6" subtitle="100% conformité IA" />
                <StatCard title="Ruptures Notifiées" value="14" icon={MessageCircle} trend={+18.2} color="#0ea5e9" subtitle="Conversion : 86%" />
                <StatCard title="Alertes Stock" value="6" icon={AlertCircle} trend={-15.0} color="#f59e0b" subtitle="Livraison COPHASE à 16h" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div className="card" style={{ height: '450px', display: 'flex', flexDirection: 'column', padding: '30px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--secondary)' }}>Flux d'Activité Officinale</h3>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Analyse prédictive vs Ventes réelles</p>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: '800' }}>
                                <div style={{ width: 10, height: 10, borderRadius: '3px', backgroundColor: 'var(--primary)' }}></div> RÉEL
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: '800', opacity: 0.5 }}>
                                <div style={{ width: 10, height: 10, borderRadius: '3px', backgroundColor: '#94a3b8' }}></div> PRÉDICTION IA
                            </div>
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.15} />
                                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '12px 16px' }}
                                    itemStyle={{ fontWeight: '900' }}
                                />
                                <Area type="monotone" dataKey="sales" stroke="var(--primary)" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                                <Area type="monotone" dataKey="prediction" stroke="#94a3b8" strokeWidth={2} strokeDasharray="8 5" fill="none" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card" style={{ padding: '30px', background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: 'var(--secondary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Zap size={22} color="#f59e0b" fill="#f59e0b" /> Live Activity Feed
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {[
                            { type: 'scan', text: 'Ord. #9422 numérisée via Smartphone (Poste 2)', time: '14:52', color: '#8b5cf6', icon: Scan },
                            { type: 'sale', text: 'Vente Tiers-Payant AXA validée (Caisse 1)', time: '15:01', color: '#10b981', icon: ShieldCheck },
                            { type: 'sms', text: 'SMS "Produit Dispo" envoyé à Mme Ndiaye', time: '15:04', color: '#0ea5e9', icon: MessageCircle },
                            { type: 'alert', text: 'Stock critique : Paracétamol 500 MG', time: '15:10', color: '#ef4444', icon: AlertCircle },
                        ].map((alert, i) => (
                            <div key={i} style={{
                                padding: '16px', borderRadius: '18px', backgroundColor: 'white',
                                border: '1px solid #f1f5f9', display: 'flex', gap: '16px', alignItems: 'center',
                                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
                            }}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '12px',
                                    backgroundColor: `${alert.color}15`, display: 'flex',
                                    alignItems: 'center', justifyContent: 'center', color: alert.color
                                }}>
                                    <alert.icon size={20} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--secondary)', marginBottom: '2px' }}>{alert.text}</p>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>{alert.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button style={{
                        marginTop: '24px', width: '100%', padding: '16px', borderRadius: '16px',
                        border: '1px solid #e2e8f0', backgroundColor: 'white', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        gap: '0.75rem', color: 'var(--secondary)', fontWeight: '800', transition: 'all 0.2s'
                    }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}>
                        Journal Complet <ArrowRight size={18} />
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes pulse {
                    0% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(0.95); }
                    100% { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
}
