import React, { useState } from 'react';
import {
    LayoutDashboard, Package, ShoppingCart, Tag,
    Plus, Filter, Search, Edit2, Trash2, CheckCircle2,
    BookOpen, Zap, Gift
} from 'lucide-react';
import { BOUTIQUE_PRODUCTS } from '../data/boutiqueData';

export default function BoutiqueBackoffice() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [searchTerm, setSearchTerm] = useState('');

    const stats = [
        { label: 'Ventes du jour', value: '145 000 F', trend: '+12%', color: '#3b82f6' },
        { label: 'Commandes Web', value: '28', trend: '+5', color: '#10b981' },
        { label: 'Panier Moyen', value: '12 500 F', trend: '+8%', color: '#8b5cf6' },
        { label: 'Nouveaux Clients', value: '12', trend: '+3', color: '#f59e0b' },
    ];

    const filteredProducts = BOUTIQUE_PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: '2rem', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
            {/* Header / Tabs */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '1.8rem', fontWeight: '950' }}>Elite Boutique Manager</h1>
                <div style={{ display: 'flex', gap: '8px', backgroundColor: '#fff', padding: '6px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    {[
                        { id: 'dashboard', label: 'Dashboard Expo', icon: LayoutDashboard },
                        { id: 'catalog', label: 'Catalogue & Stock', icon: Package },
                        { id: 'orders', label: 'Commandes', icon: ShoppingBag },
                        { id: 'marketing', label: 'Marketing', icon: Zap },
                        { id: 'blog', label: 'Journal de Santé', icon: BookOpen },
                        { id: 'finance', label: 'Finance & Compta', icon: TrendingUp }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '12px', border: 'none',
                                backgroundColor: activeTab === tab.id ? '#000' : 'transparent',
                                color: activeTab === tab.id ? '#fff' : '#64748b',
                                fontWeight: '800', cursor: 'pointer', transition: 'all 0.2s'
                            }}
                        >
                            <tab.icon size={18} /> {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Dashboard Content */}
            {activeTab === 'dashboard' && (
                <div className="fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
                        {stats.map((s, i) => (
                            <div key={i} className="card" style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                                <p style={{ fontSize: '0.85rem', fontWeight: '800', color: '#64748b', marginBottom: '8px' }}>{s.label.toUpperCase()}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <h2 style={{ fontSize: '1.8rem', fontWeight: '950' }}>{s.value}</h2>
                                    <span style={{ fontSize: '0.8rem', fontWeight: '900', color: '#10b981' }}>{s.trend}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Catalog Management */}
            {activeTab === 'catalog' && (
                <div className="fade-in">
                    <div className="card" style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                            <div style={{ position: 'relative', width: '350px' }}>
                                <Search style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} size={18} />
                                <input
                                    type="text"
                                    placeholder="Rechercher un produit..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ width: '100%', padding: '12px 12px 12px 45px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' }}
                                />
                            </div>
                            <button style={{ padding: '10px 24px', borderRadius: '12px', backgroundColor: '#000', color: '#fff', border: 'none', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Plus size={18} /> Ajouter Produit
                            </button>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #f1f5f9', textAlign: 'left', color: '#64748b', fontSize: '0.8rem' }}>
                                    <th style={{ padding: '16px', fontWeight: '800' }}>PRODUIT</th>
                                    <th style={{ padding: '16px', fontWeight: '800' }}>CATÉGORIE</th>
                                    <th style={{ padding: '16px', fontWeight: '800' }}>PRIX</th>
                                    <th style={{ padding: '16px', fontWeight: '800' }}>STOCK WEB</th>
                                    <th style={{ padding: '16px', fontWeight: '800' }}>STOCK BOUTIQUE</th>
                                    <th style={{ padding: '16px', fontWeight: '800' }}>STATUT</th>
                                    <th style={{ padding: '16px', fontWeight: '800', textAlign: 'right' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map(product => (
                                    <tr key={product.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                                        <td style={{ padding: '16px' }}>
                                            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                                <img src={product.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                                                <div>
                                                    <div style={{ fontWeight: '800', fontSize: '0.9rem' }}>{product.name}</div>
                                                    <div style={{ fontSize: '0.7rem', color: '#64748b' }}>ID: {product.id}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ fontWeight: '700', fontSize: '0.85rem' }}>{product.category}</td>
                                        <td style={{ fontWeight: '900' }}>{product.price.toLocaleString()} F</td>
                                        <td style={{ fontWeight: '800', color: product.stock < 10 ? '#ef4444' : '#1e293b' }}>{product.stock}</td>
                                        <td style={{ fontWeight: '800', color: '#64748b' }}>{product.storeStock || '-'}</td>
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

            {/* Orders Management */}
            {activeTab === 'orders' && (
                <div className="fade-in">
                    <div className="card" style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                        <h3 style={{ fontWeight: '900', marginBottom: '20px' }}>Flux Commandes Récentes</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {[
                                { id: 'W-2045', patient: 'Awa Ndiaye', total: '15 000 F', status: 'Payé', type: 'Dermato' },
                                { id: 'W-2046', patient: 'Mamadou Kane', total: '45 000 F', status: 'Attente', type: 'Parfum' }
                            ].map((ord, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #eee' }}>
                                    <div>
                                        <span style={{ fontWeight: '800', color: '#3b82f6' }}>{ord.id}</span>
                                        <p style={{ fontSize: '0.85rem', fontWeight: '700' }}>{ord.patient} • {ord.type}</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontWeight: '900' }}>{ord.total}</p>
                                        <span style={{ fontSize: '0.7rem', fontWeight: '900', color: ord.status === 'Payé' ? '#10b981' : '#f59e0b' }}>{ord.status.toUpperCase()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Marketing Management */}
            {activeTab === 'marketing' && (
                <div className="fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                        <div className="card" style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '24px' }}>
                            <h3 style={{ fontWeight: '900', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><Zap size={20} color="#ef4444" fill="#ef4444" /> Ventes Flash Elite</h3>
                            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fee2e2', padding: '16px', borderRadius: '16px' }}>
                                <p style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ef4444', marginBottom: '4px' }}>CAMPAGNE ACTIVE</p>
                                <p style={{ fontWeight: '700' }}>Sérums Éclat de Printemps</p>
                                <button style={{ marginTop: '10px', padding: '6px 12px', borderRadius: '8px', backgroundColor: '#ef4444', color: 'white', border: 'none', fontWeight: '800', fontSize: '0.75rem' }}>Arrêter</button>
                            </div>
                        </div>
                        <div className="card" style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '24px' }}>
                            <h3 style={{ fontWeight: '900', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><Gift size={20} color="#10b981" /> Parrainages & VIP</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '1.5rem' }}>
                                <div style={{ padding: '12px', backgroundColor: '#f0fdf4', borderRadius: '12px', textAlign: 'center' }}>
                                    <p style={{ fontSize: '0.7rem', color: '#166534', fontWeight: '800' }}>PARRAINS</p>
                                    <p style={{ fontSize: '1.5rem', fontWeight: '900' }}>54</p>
                                </div>
                                <div style={{ padding: '12px', backgroundColor: '#f0fdf4', borderRadius: '12px', textAlign: 'center' }}>
                                    <p style={{ fontSize: '0.7rem', color: '#166534', fontWeight: '800' }}>VENTES</p>
                                    <p style={{ fontSize: '1.5rem', fontWeight: '900' }}>1.2M F</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {[
                                    { name: 'Elite Silver', target: '3 inv.', reward: 'Bon 15k' },
                                    { name: 'Elite Gold', target: '10 inv.', reward: 'Bon 60k' }
                                ].map((t, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #eee', fontSize: '0.8rem' }}>
                                        <span style={{ fontWeight: '800' }}>{t.name}</span>
                                        <span style={{ fontWeight: '700', color: '#10b981' }}>{t.target} → {t.reward}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Blog Management */}
            {activeTab === 'blog' && (
                <div className="fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
                        <div className="card" style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <h3 style={{ fontWeight: '900' }}>Articles du Journal Elite</h3>
                                <button style={{ padding: '10px 20px', borderRadius: '12px', background: '#000', color: 'white', border: 'none', fontWeight: '800' }}>+ Nouvel Article</button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {[
                                    { title: "Solaire : Protéger sa peau à Dakar", readers: '1.2k', status: 'Publié' },
                                    { title: "Anti-Âge : À quel âge commencer ?", readers: '2.1k', status: 'Publié' },
                                    { title: "Le guide des compléments hiver", readers: '850', status: 'Brouillon' }
                                ].map((art, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '16px', border: '1px solid #eee', borderRadius: '16px' }}>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontWeight: '800' }}>{art.title}</p>
                                            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>{art.readers} lecteurs • Partagé 45 fois</p>
                                        </div>
                                        <span style={{ fontSize: '0.7rem', fontWeight: '900', color: art.status === 'Publié' ? '#10b981' : '#94a3b8' }}>{art.status}</span>
                                        <button style={{ padding: '8px', border: '1px solid #eee', background: '#fff', borderRadius: '8px', cursor: 'pointer' }}><Edit2 size={16} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="card" style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '24px' }}>
                            <h3 style={{ fontWeight: '900', marginBottom: '20px' }}>Stats Audience Blog</h3>
                            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '20px' }}>
                                <p style={{ fontSize: '0.8rem', fontWeight: '800', color: '#64748b' }}>LECTURES TOTALES (MOIS)</p>
                                <p style={{ fontSize: '2.5rem', fontWeight: '950', color: '#3b82f6' }}>4 218</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            )}

            {/* Finance Management */}
            {activeTab === 'finance' && (
                <div className="fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '2rem' }}>
                        <div className="card" style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '24px' }}>
                            <p style={{ fontSize: '0.8rem', fontWeight: '800', color: '#64748b', marginBottom: '8px' }}>CHIFFRE D'AFFAIRES WEB</p>
                            <p style={{ fontSize: '2rem', fontWeight: '950' }}>4.5M F</p>
                            <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '800' }}>+15% vs M-1</span>
                        </div>
                        <div className="card" style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '24px' }}>
                            <p style={{ fontSize: '0.8rem', fontWeight: '800', color: '#64748b', marginBottom: '8px' }}>CHIFFRE D'AFFAIRES BOUTIQUE</p>
                            <p style={{ fontSize: '2rem', fontWeight: '950' }}>12.8M F</p>
                            <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '800' }}>+8% vs M-1</span>
                        </div>
                        <div className="card" style={{ padding: '24px', backgroundColor: '#1e293b', borderRadius: '24px', color: '#fff' }}>
                            <p style={{ fontSize: '0.8rem', fontWeight: '800', opacity: 0.7, marginBottom: '8px' }}>TOTAL GLOBAL</p>
                            <p style={{ fontSize: '2rem', fontWeight: '950' }}>17.3M F</p>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                        <div className="card" style={{ padding: '30px', backgroundColor: '#fff', borderRadius: '24px' }}>
                            <h3 style={{ fontWeight: '900', marginBottom: '30px' }}>Évolution des Revenus</h3>
                            <div style={{ display: 'flex', alignItems: 'flex-end', height: '250px', gap: '20px', paddingBottom: '20px', borderBottom: '1px solid #eee' }}>
                                {[45, 52, 48, 60, 55, 70, 75].map((h, i) => (
                                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                                        <div style={{ width: '100%', height: `${h}%`, backgroundColor: i === 6 ? '#3b82f6' : '#e2e8f0', borderRadius: '8px 8px 0 0' }}></div>
                                        <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#94a3b8' }}>{['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'][i]}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="card" style={{ padding: '30px', backgroundColor: '#fff', borderRadius: '24px' }}>
                            <h3 style={{ fontWeight: '900', marginBottom: '30px' }}>Répartition</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                {[
                                    { l: 'Cosmétiques', v: 45, c: '#3b82f6' },
                                    { l: 'Médicaments', v: 30, c: '#10b981' },
                                    { l: 'Parapharmacie', v: 15, c: '#f59e0b' },
                                    { l: 'Services', v: 10, c: '#ef4444' }
                                ].map((item, i) => (
                                    <div key={i}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '800' }}>
                                            <span>{item.l}</span>
                                            <span>{item.v}%</span>
                                        </div>
                                        <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '100px' }}>
                                            <div style={{ width: `${item.v}%`, height: '100%', backgroundColor: item.c, borderRadius: '100px' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
