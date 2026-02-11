import React from 'react';
import { TrendingUp, AlertCircle, ShoppingCart, ArrowRight } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="fade-in">
            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                <KpiCard title="Ventes ce mois" value="1.2M FCA" sub="+12% vs M-1" icon={TrendingUp} color="var(--primary)" />
                <KpiCard title="Achats B2B" value="450K FCA" sub="8 commandes" icon={ShoppingCart} color="var(--success)" />
                <KpiCard title="Alertes Rupture" value="3" sub="Urgent" icon={AlertCircle} color="var(--danger)" />
                <KpiCard title="Offres Actives" value="12" sub="Produits en vente" icon={TrendingUp} color="var(--warning)" />
            </div>

            {/* Recent Opportunities */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Opportunités Récentes (Dakar)</h3>
                        <button style={{ color: 'var(--primary)', background: 'none', border: 'none', fontSize: '0.9rem', fontWeight: '600' }}>Voir tout</button>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>PRODUIT</th>
                                <th>QUANTITÉ</th>
                                <th>PRIX / UNITÉ</th>
                                <th>VENDEUR</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { prod: 'Doliprane 1000mg', qty: 50, price: '850 F', vendor: 'Pharmacie Mermoz', dist: '2km' },
                                { prod: 'Augmentin Adultes', qty: 20, price: '4200 F', vendor: 'Pharmacie Plateau', dist: '5km' },
                                { prod: 'Ventoline Inhalateur', qty: 15, price: '1800 F', vendor: 'Pharmacie Yoff', dist: '8km' },
                            ].map((row, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: '600' }}>{row.prod}</td>
                                    <td>{row.qty} boîtes</td>
                                    <td style={{ color: 'var(--success)', fontWeight: '700' }}>{row.price}</td>
                                    <td>
                                        <div>{row.vendor}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{row.dist}</div>
                                    </td>
                                    <td>
                                        <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>COMMANDER</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="card" style={{ background: '#eff6ff', border: '1px solid #dbeafe' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e3a8a', marginBottom: '16px' }}>Astuce B2B</h3>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#1e40af', marginBottom: '20px' }}>
                        Saviez-vous que vous pouvez échanger vos produits à date courte (3 mois) sans perte financière grâce au réseau PharmaSwap ?
                    </p>
                    <button style={{ width: '100%', padding: '12px', background: 'white', color: 'var(--primary)', border: '1px solid var(--primary)', borderRadius: '8px', fontWeight: '600' }}>
                        Publier mes dates courtes
                    </button>
                </div>
            </div>
        </div>
    );
}

function KpiCard({ title, value, sub, icon: Icon, color }) {
    return (
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${color}20`, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={24} />
            </div>
            <div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>{title}</div>
                <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text)' }}>{value}</div>
                <div style={{ fontSize: '0.75rem', color: color, fontWeight: '600' }}>{sub}</div>
            </div>
        </div>
    );
}
