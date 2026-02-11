import React from 'react';
import { Filter, MapPin } from 'lucide-react';

export default function Marketplace() {
    return (
        <div className="fade-in">
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <select style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border)', minWidth: '200px' }}>
                    <option>Toutes les Catégories</option>
                    <option>Médicaments</option>
                    <option>Parapharmacie</option>
                    <option>Matériel Médical</option>
                </select>
                <select style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <option>Péremption &gt; 6 mois</option>
                    <option>Péremption &lt; 3 mois (Déstockage)</option>
                </select>
                <button style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--border)', background: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Filter size={18} /> Filtrer
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                {[
                    { name: 'Efferalgan 1000mg', qty: 100, price: '800 F', seller: 'Pharmacie Elite (Vous)', exp: '12/2026' },
                    { name: 'Spasfon Lyoc', qty: 45, price: '1200 F', seller: 'Pharmacie Point E', exp: '06/2026' },
                    { name: 'Bétadine Jaune', qty: 30, price: '2500 F', seller: 'Pharmacie Pikine', exp: '09/2027' },
                    { name: 'Sérum Phy 5ml', qty: 200, price: '1500 F', seller: 'Pharmacie Mermoz', exp: '01/2028' },
                    { name: 'Doliprane Sirop', qty: 15, price: '900 F', seller: 'Pharmacie Plateau', exp: '03/2026' },
                    { name: 'Maalox Sachet', qty: 60, price: '3000 F', seller: 'Pharmacie Yoff', exp: '11/2026' },
                ].map((item, i) => (
                    <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                            <div style={{ fontWeight: '700', fontSize: '1.1rem' }}>{item.name}</div>
                            <span style={{ background: '#dcfce7', color: '#166534', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '100px', fontWeight: '700' }}>En Stock</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#64748b' }}>
                            <span>Quantité: <strong>{item.qty}</strong></span>
                            <span>Exp: <strong>{item.exp}</strong></span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#64748b', marginTop: '4px' }}>
                            <MapPin size={14} /> {item.seller}
                        </div>

                        <div style={{ height: '1px', background: 'var(--border)', margin: '8px 0' }}></div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--primary)' }}>{item.price}</div>
                            <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>ACHETER</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
