import React from 'react';
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Package,
    Users,
    AlertCircle,
    Clock,
    ArrowRight
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from 'recharts';

const data = [
    { name: '08:00', sales: 400 },
    { name: '10:00', sales: 1200 },
    { name: '12:00', sales: 900 },
    { name: '14:00', sales: 1500 },
    { name: '16:00', sales: 2100 },
    { name: '18:00', sales: 1800 },
    { name: '20:00', sales: 800 },
];

const StatCard = ({ title, value, icon: Icon, trend, color }) => (
    <div className="card fade-in" style={{ flex: 1, minWidth: '240px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: `${color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: color
            }}>
                <Icon size={24} />
            </div>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: '0.875rem',
                color: trend > 0 ? 'var(--success)' : 'var(--error)'
            }}>
                {trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {Math.abs(trend)}%
            </div>
        </div>
        <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{title}</h3>
        <p style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--secondary)' }}>{value}</p>
    </div>
);

export default function Dashboard() {
    return (
        <div className="dashboard">
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Bienvenue, Dr. Durand</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Voici un aperçu de l'activité de votre officine aujourd'hui.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="glass" style={{ padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Clock size={18} color="var(--primary)" />
                        <span style={{ fontWeight: '600' }}>08 Février 2026 - 15:08</span>
                    </div>
                </div>
            </header>

            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <StatCard title="Chiffre d'Affaires" value="2,840.00 €" icon={DollarSign} trend={12.5} color="#059669" />
                <StatCard title="Ventes réalisées" value="142" icon={ShoppingCart} trend={8.2} color="#06b6d4" />
                <StatCard title="Nouveaux Patients" value="12" icon={Users} trend={-2.4} color="#6366f1" />
                <StatCard title="Produits en Alerte" value="8" icon={AlertCircle} trend={0} color="#f59e0b" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.125rem' }}>Flux de Vente Quotidien</h3>
                        <select style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                            <option>Aujourd'hui</option>
                            <option>Hier</option>
                            <option>7 derniers jours</option>
                        </select>
                    </div>
                    <div style={{ flex: 1 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-lg)' }}
                                    itemStyle={{ color: 'var(--primary)', fontWeight: 'bold' }}
                                />
                                <Area type="monotone" dataKey="sales" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>Alertes & Tâches</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            { type: 'stock', text: 'Paracétamol 500mg - Stock critique (12 unités)', time: 'Il y a 10 min' },
                            { type: 'order', text: 'Commande GROSSISTE à valider avant 16h', time: 'Urgent' },
                            { type: 'patient', text: 'Mme Martin : Suivi pharmaceutique requis', time: '16:30' },
                            { type: 'system', text: 'Mise à jour VIDAL effectuée avec succès', time: 'Ce matin' },
                        ].map((alert, i) => (
                            <div key={i} style={{
                                padding: '1rem',
                                borderRadius: 'var(--radius-md)',
                                backgroundColor: '#f8fafc',
                                borderLeft: `4px solid ${alert.time === 'Urgent' ? 'var(--error)' : 'var(--primary)'}`
                            }}>
                                <p style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem' }}>{alert.text}</p>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{alert.time}</span>
                            </div>
                        ))}
                    </div>
                    <button style={{
                        marginTop: 'auto',
                        width: '100%',
                        padding: '0.875rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1px solid var(--border)',
                        backgroundColor: 'transparent',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        color: 'var(--text-main)',
                        fontWeight: '500'
                    }}>
                        Tout voir <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
