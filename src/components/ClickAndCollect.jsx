import React, { useState } from 'react';
import { Smartphone, ShoppingBag, Clock, CheckCircle2, AlertCircle, MapPin, User, Package, ArrowRight } from 'lucide-react';

const mockOrders = [
    { id: 'CC-8942', patient: 'Alice Robert', time: '14:30', status: 'À préparer', items: 4, type: 'Ordonnance numérisée' },
    { id: 'CC-8943', patient: 'Marc Vasseur', time: '15:15', status: 'En préparation', items: 2, type: 'Parapharmacie' },
    { id: 'CC-8944', patient: 'Sophie Laine', time: '16:00', status: 'Prêt', items: 3, type: 'Mixte' },
    { id: 'CC-8945', patient: 'Lucie Verne', time: '16:30', status: 'Prêt', items: 1, type: 'Ordonnance numérisée' },
];

export default function ClickAndCollect() {
    return (
        <div className="click-collect fade-in">
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>E-Commerce & Click & Collect</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Gérez les commandes web, la parapharmacie en ligne et les réservations d'ordonnance.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div className="glass" style={{ padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Smartphone size={18} color="var(--primary)" />
                        <span style={{ fontWeight: '600' }}>App Patient Connectée</span>
                    </div>
                </div>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card" style={{ backgroundColor: 'var(--primary)', color: 'white' }}>
                    <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>À PRÉPARER</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: '1.75rem', fontWeight: '700' }}>{mockOrders.filter(o => o.status === 'À préparer').length}</p>
                        <Clock size={24} />
                    </div>
                </div>
                <div className="card">
                    <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>PRÊT POUR RETRAIT</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--success)' }}>{mockOrders.filter(o => o.status === 'Prêt').length}</p>
                        <MapPin size={24} color="var(--success)" />
                    </div>
                </div>
                <div className="card">
                    <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>DÉLAI MOYEN</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: '1.75rem', fontWeight: '700' }}>18 min</p>
                        <Clock size={24} color="var(--primary)" />
                    </div>
                </div>
                <div className="card">
                    <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>COMMANDES JOUR</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontSize: '1.75rem', fontWeight: '700' }}>24</p>
                        <ShoppingBag size={24} color="var(--accent)" />
                    </div>
                </div>
            </div>

            <div className="card" style={{ padding: 0 }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: '1.125rem' }}>Flux de Collecte en Temps Réel</h3>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Commande</th>
                            <th>Patient</th>
                            <th>Type</th>
                            <th>Heure de Retrait</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockOrders.map(order => (
                            <tr key={order.id}>
                                <td style={{ fontWeight: '700', color: 'var(--primary)' }}>{order.id}</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <User size={14} />
                                        </div>
                                        <span>{order.patient}</span>
                                    </div>
                                </td>
                                <td>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{order.type}</span>
                                </td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500' }}>
                                        <Clock size={14} /> {order.time}
                                    </div>
                                </td>
                                <td>
                                    <span style={{
                                        padding: '4px 10px',
                                        borderRadius: '20px',
                                        fontSize: '0.7rem',
                                        fontWeight: '700',
                                        backgroundColor: order.status === 'Prêt' ? 'var(--primary-light)' : '#fef3c7',
                                        color: order.status === 'Prêt' ? 'var(--primary)' : '#b45309'
                                    }}>
                                        {order.status}
                                    </span>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <button style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: 'var(--radius-sm)',
                                        border: 'none',
                                        backgroundColor: order.status === 'Prêt' ? 'var(--secondary)' : 'var(--primary)',
                                        color: 'white',
                                        cursor: 'pointer',
                                        fontSize: '0.8rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        marginLeft: 'auto'
                                    }}>
                                        {order.status === 'Prêt' ? 'Valider Retrait' : 'Préparer'} <ArrowRight size={14} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
