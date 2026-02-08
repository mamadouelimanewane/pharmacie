import React, { useState } from 'react';
import {
    LayoutDashboard, Package, ShoppingCart,
    TrendingUp, Users, Settings, Tag,
    Image as ImageIcon, Eye, BarChart3,
    ArrowUpRight, Clock, Plus, Filter,
    Search, Edit2, Trash2, CheckCircle2
} from 'lucide-react';
import { BOUTIQUE_PRODUCTS } from '../data/boutiqueData';

export default function BoutiqueBackoffice() {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className="boutique-backoffice fade-in" style={{ paddingBottom: '2rem' }}>
            <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--secondary)' }}>
                        Manager Boutique Elite
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Pilotage de votre commerce en ligne et suivi des performances e-commerce.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="glass" style={{ padding: '0.85rem 1.5rem', borderRadius: '12px', border: '1px solid var(--border)', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Eye size={20} /> Preview Boutique
                    </button>
                    <button style={{ padding: '0.85rem 1.5rem', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Plus size={20} /> Nouveau Produit
                    </button>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
                {[
                    { id: 'dashboard', label: 'Dashboard Expo', icon: LayoutDashboard },
                    { id: 'catalog', label: 'Catalogue & Stock', icon: Package },
                    { id: 'orders', label: 'Commandes Web', icon: ShoppingCart },
                    { id: 'marketing', label: 'Offres & Design', icon: Tag }
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

            {activeTab === 'dashboard' && (
                <div className="fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
                        {[
                            { label: 'VISITES (24H)', value: '1 248', trend: '+12%', icon: Users, color: 'var(--primary)' },
                            { label: 'VENTES BOUTIQUE', value: '450 000 F', trend: '+8.5%', icon: TrendingUp, color: '#10b981' },
                            { label: 'PANIER MOYEN', value: '42 500 F', trend: '-2%', icon: ShoppingCart, color: '#3b82f6' },
                            { label: 'TAUX CONVERSION', value: '3.4%', trend: '+0.5%', icon: BarChart3, color: '#8b5cf6' }
                        ].map((stat, i) => (
                            <div key={i} className="card" style={{ borderLeft: `4px solid ${stat.color}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                    <p style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)' }}>{stat.label}</p>
                                    <stat.icon size={18} color={stat.color} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                                    <p style={{ fontSize: '1.8rem', fontWeight: '950' }}>{stat.value}</p>
                                    <span style={{ fontSize: '0.8rem', fontWeight: '900', color: stat.trend.startsWith('+') ? '#10b981' : '#ef4444' }}>{stat.trend}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                        <div className="card" style={{ padding: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <h3 style={{ fontWeight: '900' }}>Évolution du Trafic Web</h3>
                                <button className="glass" style={{ padding: '6px 14px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700' }}>7 DERNIERS JOURS</button>
                            </div>
                            <div style={{ height: '280px', display: 'flex', alignItems: 'flex-end', gap: '20px', padding: '20px 0' }}>
                                {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                                    <div key={i} style={{ flex: 1, backgroundColor: 'var(--primary)', height: `${h}%`, borderRadius: '6px 6px 0 0', position: 'relative', opacity: i === 5 ? 1 : 0.4 }}>
                                        <div style={{ position: 'absolute', bottom: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)' }}>J-{6 - i}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="card" style={{ padding: '24px' }}>
                            <h3 style={{ fontWeight: '900', marginBottom: '20px' }}>Canaux d'Acquisition</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {[
                                    { label: 'Recherche Google', value: '45%', color: 'var(--primary)' },
                                    { label: 'Instagram / Facebook', value: '30%', color: '#8b5cf6' },
                                    { label: 'Accès Direct', value: '15%', color: '#0ea5e9' },
                                    { label: 'WhatsApp Status', value: '10%', color: '#25d366' }
                                ].map((source, i) => (
                                    <div key={i}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem', fontWeight: '800' }}>
                                            <span>{source.label}</span>
                                            <span>{source.value}</span>
                                        </div>
                                        <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                                            <div style={{ height: '100%', width: source.value, backgroundColor: source.color }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'catalog' && (
                <div className="fade-in">
                    <div className="card" style={{ padding: 0 }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ position: 'relative', width: '350px' }}>
                                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input type="text" placeholder="Chercher un produit boutique..." style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '12px', border: '1px solid var(--border)' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button className="glass" style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '800' }}><Filter size={16} /> Filtres</button>
                                <button className="glass" style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '800' }}>Export CSV</button>
                            </div>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ background: '#f8fafc' }}>
                                <tr style={{ textAlign: 'left' }}>
                                    <th style={{ padding: '16px' }}>PRODUIT</th>
                                    <th>CATÉGORIE</th>
                                    <th>PRIX WEB</th>
                                    <th>STOCK WEB</th>
                                    <th>STATUT</th>
                                    <th style={{ textAlign: 'right', padding: '16px' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {BOUTIQUE_PRODUCTS.map(product => (
                                    <tr key={product.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                                <img src={product.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                                                <div>
                                                    <div style={{ fontWeight: '800', fontSize: '0.9rem' }}>{product.name}</div>
                                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ID: {product.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ fontWeight: '700', fontSize: '0.85rem' }}>{product.category}</td>
                                        <td style={{ fontWeight: '900' }}>{product.price.toLocaleString()} F</td>
                                        <td style={{ fontWeight: '800' }}>{product.stock} units</td>
                                        <td>
                                            <span style={{ padding: '4px 10px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '900', background: '#dcfce7', color: '#166534' }}>EN LIGNE</span>
                                        </td>
                                        <td style={{ padding: '16px', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                                <button style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white' }}><Edit2 size={16} /></button>
                                                <button style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white' }}><Trash2 size={16} color="#ef4444" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'marketing' && (
                <div className="fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div className="card" style={{ padding: '24px' }}>
                            <h3 style={{ fontWeight: '900', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><ImageIcon size={20} /> Bannières & Visuels Hero</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {[
                                    { title: 'Soldes Hiver - Eclat', status: 'Actif', img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef' },
                                    { title: 'Promo Cosmétiques 20%', status: 'Programmé', img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be' }
                                ].map((b, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '12px', border: '1px solid #eee', borderRadius: '16px' }}>
                                        <img src={b.img} style={{ width: '80px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontWeight: '800', fontSize: '0.9rem' }}>{b.title}</p>
                                            <span style={{ fontSize: '0.7rem', fontWeight: '900', color: b.status === 'Actif' ? '#10b981' : '#3b82f6' }}>{b.status.toUpperCase()}</span>
                                        </div>
                                        <button className="glass" style={{ padding: '8px', borderRadius: '8px' }}><Edit2 size={14} /></button>
                                    </div>
                                ))}
                                <button style={{ marginTop: '10px', padding: '12px', borderRadius: '12px', border: '2px dashed #e2e8f0', background: 'none', color: 'var(--text-muted)', fontWeight: '800', cursor: 'pointer' }}>+ Ajouter une bannière</button>
                            </div>
                        </div>

                        <div className="card" style={{ padding: '24px' }}>
                            <h3 style={{ fontWeight: '900', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><Tag size={20} /> Codes Promos & Offres</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {[
                                    { code: 'BIENVENUE10', desc: '-10% sur 1ère commande', usage: '142 utilisations' },
                                    { code: 'LIERAC20', desc: '-20% sur gamme Lierac', usage: '56 utilisations' }
                                ].map((c, i) => (
                                    <div key={i} style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px solid #eee' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ fontWeight: '950', color: 'var(--primary)', letterSpacing: '1px' }}>{c.code}</span>
                                            <button style={{ border: 'none', background: 'none', color: '#ef4444' }}><Trash2 size={14} /></button>
                                        </div>
                                        <p style={{ fontSize: '0.85rem', fontWeight: '700' }}>{c.desc}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>{c.usage}</p>
                                    </div>
                                ))}
                                <button style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'var(--secondary)', color: 'white', border: 'none', fontWeight: '800', cursor: 'pointer' }}>Générer un coupon</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
