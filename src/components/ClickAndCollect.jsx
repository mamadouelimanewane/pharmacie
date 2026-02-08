import React, { useState } from 'react';
import {
    Smartphone, ShoppingBag, Clock, CheckCircle2,
    AlertCircle, MapPin, User, Package,
    ArrowRight, MessageSquare, Truck, Send,
    MoreVertical, Receipt, Search
} from 'lucide-react';
import { MOCK_ORDERS } from '../data/mockData';

export default function ClickAndCollect() {
    const [activeView, setActiveView] = useState('active'); // 'active', 'delivery', 'history'

    return (
        <div className="click-collect fade-in" style={{ paddingBottom: '2rem' }}>
            <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--secondary)' }}>
                        Omnicanal & WhatsApp Commerce
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Centralisation des commandes web, ordonnances WhatsApp et livraison à domicile.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <div className="glass" style={{ padding: '0.75rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Smartphone size={20} color="var(--primary)" />
                        <span style={{ fontWeight: '800' }}>Patient Connect : ON</span>
                    </div>
                    <button style={{ padding: '0.75rem 1.25rem', borderRadius: '12px', border: 'none', backgroundColor: '#25d366', color: 'white', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MessageSquare size={20} /> Nouveau Panier WhatsApp
                    </button>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
                {[
                    { id: 'active', label: 'Commandes Actives', icon: ShoppingBag },
                    { id: 'delivery', label: 'Suivi Livraisons', icon: Truck },
                    { id: 'history', label: 'Historique Web', icon: Clock }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveView(tab.id)}
                        style={{
                            padding: '12px 0', border: 'none', background: 'none',
                            color: activeView === tab.id ? 'var(--primary)' : 'var(--text-muted)',
                            fontWeight: '800', fontSize: '1rem', cursor: 'pointer',
                            borderBottom: activeView === tab.id ? '3px solid var(--primary)' : '3px solid transparent',
                            display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s'
                        }}
                    >
                        <tab.icon size={20} /> {tab.label}
                    </button>
                ))}
            </div>

            {activeView === 'active' && (
                <div className="fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div className="card" style={{ background: 'var(--primary)', color: 'white' }}>
                            <p style={{ fontSize: '0.7rem', fontWeight: '800', opacity: 0.8, marginBottom: '8px' }}>À PRÉPARER (URGENT)</p>
                            <p style={{ fontSize: '1.8rem', fontWeight: '900' }}>{MOCK_ORDERS.filter(o => o.status === 'À préparer').length}</p>
                        </div>
                        <div className="card">
                            <p style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '8px' }}>PRÊT POUR RETRAIT</p>
                            <p style={{ fontSize: '1.8rem', fontWeight: '900', color: '#10b981' }}>{MOCK_ORDERS.filter(o => o.status === 'Prêt').length}</p>
                        </div>
                        <div className="card">
                            <p style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '8px' }}>ORIGINE WHATSAPP</p>
                            <p style={{ fontSize: '1.8rem', fontWeight: '900', color: '#25d366' }}>12</p>
                        </div>
                        <div className="card">
                            <p style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '8px' }}>CHIFFRE WEB JOUR</p>
                            <p style={{ fontSize: '1.8rem', fontWeight: '900' }}>345 000 F</p>
                        </div>
                    </div>

                    <div className="card" style={{ padding: 0 }}>
                        <div style={{ padding: '24px', borderBottom: '1px solid var(--border)' }}>
                            <h3 style={{ fontWeight: '900' }}>Flux de Collecte & Réservations</h3>
                        </div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ background: '#f8fafc' }}>
                                <tr style={{ textAlign: 'left' }}>
                                    <th style={{ padding: '16px' }}>COMMANDE</th>
                                    <th>PATIENT</th>
                                    <th>ORIGINE</th>
                                    <th>PRODUITS</th>
                                    <th>STATUT</th>
                                    <th style={{ textAlign: 'right', padding: '16px' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_ORDERS.map(order => (
                                    <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '16px', fontWeight: '900', color: 'var(--primary)' }}>{order.id}</td>
                                        <td style={{ fontWeight: '800' }}>{order.patient}</td>
                                        <td>
                                            <span style={{
                                                display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: '700',
                                                color: order.type === 'App' ? 'var(--primary)' : '#25d366'
                                            }}>
                                                {order.type === 'App' ? <Smartphone size={14} /> : <MessageSquare size={14} />}
                                                {order.type}
                                            </span>
                                        </td>
                                        <td>{order.itemsCount || 3} items</td>
                                        <td>
                                            <span style={{
                                                padding: '6px 14px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '900',
                                                backgroundColor: order.status === 'Prêt' ? '#dcfce7' : '#fff7ed',
                                                color: order.status === 'Prêt' ? '#166534' : '#9a3412'
                                            }}>
                                                {order.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px', textAlign: 'right' }}>
                                            <button style={{
                                                padding: '8px 16px', borderRadius: '10px', border: 'none',
                                                background: order.status === 'Prêt' ? 'var(--secondary)' : 'var(--primary)',
                                                color: 'white', fontWeight: '800', cursor: 'pointer',
                                                display: 'flex', alignItems: 'center', gap: '6px', marginLeft: 'auto'
                                            }}>
                                                {order.status === 'Prêt' ? 'Valider' : 'Préparer'} <ArrowRight size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeView === 'delivery' && (
                <div className="fade-in">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '2rem' }}>
                        <div className="card" style={{ padding: 0 }}>
                            <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                                <h3 style={{ fontWeight: '900' }}>Courses en Cours (Temps Réel)</h3>
                                <button className="glass" style={{ padding: '8px 16px', borderRadius: '10px', fontSize: '0.8rem', fontWeight: '800' }}>Assigner Livreur</button>
                            </div>
                            <div style={{ padding: '16px' }}>
                                {[
                                    { patient: 'Mme Ndiaye', addr: 'Almadies, Villa 4', courier: 'Moussa', status: 'En livraison', eta: '12 min' },
                                    { patient: 'Oumar Sy', addr: 'Plateau, Immeuble B', courier: 'Idrissa', status: 'Ramassage', eta: '35 min' }
                                ].map((d, i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', borderBottom: i === 0 ? '1px solid #f1f5f9' : 'none', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                                <Truck size={24} />
                                            </div>
                                            <div>
                                                <p style={{ fontWeight: '900' }}>{d.patient}</p>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}><MapPin size={12} style={{ verticalAlign: 'middle' }} /> {d.addr}</p>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ fontWeight: '800', color: 'var(--primary)' }}>{d.status}</p>
                                            <p style={{ fontSize: '0.75rem', fontWeight: '700' }}>ETA : {d.eta} par {d.courier}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="card" style={{ padding: 0 }}>
                            <div style={{ padding: '24px', borderBottom: '1px solid var(--border)' }}>
                                <h3 style={{ fontWeight: '900' }}>Partenaires Logistiques</h3>
                            </div>
                            <div style={{ padding: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', borderRadius: '16px', border: '1px solid #f1f5f9', marginBottom: '12px' }}>
                                    <div style={{ fontWeight: '800' }}>Paps Delivery</div>
                                    <div style={{ color: '#10b981', fontWeight: '900' }}>Connecté</div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                                    <div style={{ fontWeight: '800' }}>G-Xpress</div>
                                    <div style={{ color: '#f59e0b', fontWeight: '900' }}>Busy</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
