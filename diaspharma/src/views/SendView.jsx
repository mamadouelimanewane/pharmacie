import React, { useState } from 'react';
import { Search, MapPin, CheckCircle2, ChevronRight, Pill } from 'lucide-react';

export default function SendView() {
    const [step, setStep] = useState(1); // 1: Select Beneficiary, 2: Select Pharmacy, 3: Confirm

    return (
        <div className="fade-in" style={{ padding: '20px', paddingTop: '10px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '24px', color: 'var(--secondary)' }}>
                {step === 1 && "Pour qui est ce soin ?"}
                {step === 2 && "Choisir la Pharmacie"}
                {step === 3 && "Confirmation"}
            </h2>

            {/* Stepper */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
                <div style={{ height: '4px', flex: 1, borderRadius: '2px', background: step >= 1 ? 'var(--primary)' : '#e2e8f0' }}></div>
                <div style={{ height: '4px', flex: 1, borderRadius: '2px', background: step >= 2 ? 'var(--primary)' : '#e2e8f0' }}></div>
                <div style={{ height: '4px', flex: 1, borderRadius: '2px', background: step >= 3 ? 'var(--primary)' : '#e2e8f0' }}></div>
            </div>

            {step === 1 && (
                <div className="fade-in">
                    <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                        <Search size={20} color="var(--text-muted)" />
                        <input type="text" placeholder="Rechercher un proche..." style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '1rem' }} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                            { name: 'Maman Fatou', phone: '+221 77 123 45 67', loc: 'Dakar, Liberté 6' },
                            { name: 'Papa Oumar', phone: '+221 77 987 65 43', loc: 'Saint-Louis' }
                        ].map((p, i) => (
                            <div key={i} onClick={() => setStep(2)} style={{ padding: '16px', borderRadius: '16px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', background: 'white' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e0f2fe', color: '#0369a1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' }}>
                                        {p.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '800', fontSize: '1rem' }}>{p.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.loc}</div>
                                    </div>
                                </div>
                                <ChevronRight size={20} color="var(--text-muted)" />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {step === 2 && (
                <div className="fade-in">
                    <div style={{ marginBottom: '20px' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-muted)' }}>Maman Fatou est à <span style={{ color: 'var(--text)' }}>Liberté 6</span></div>
                        <div style={{ background: '#dcfce7', color: '#166534', padding: '12px', borderRadius: '12px', fontSize: '0.85rem', display: 'flex', gap: '8px' }}>
                            <CheckCircle2 size={16} /> Nous avons trouvé 3 pharmacies partenaires à proximité.
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div onClick={() => setStep(3)} style={{ padding: '16px', borderRadius: '16px', border: '2px solid var(--primary)', background: '#f0fdf4', cursor: 'pointer', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: -10, right: 10, background: 'var(--primary)', color: 'white', fontSize: '0.7rem', fontWeight: '800', padding: '2px 8px', borderRadius: '100px' }}>RECOMMANDÉ</div>
                            <div style={{ fontWeight: '800', fontSize: '1.1rem', marginBottom: '4px' }}>Pharmacie Elite (Dr. Wane)</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                                <MapPin size={14} /> <span>À 200m du domicile</span>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <span style={{ fontSize: '0.7rem', background: 'white', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--primary-light)' }}>Ouvert 24/7</span>
                                <span style={{ fontSize: '0.7rem', background: 'white', padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--primary-light)' }}>Livraison Gratuite</span>
                            </div>
                        </div>

                        <div style={{ padding: '16px', borderRadius: '16px', border: '1px solid var(--border)', background: 'white', opacity: 0.7 }}>
                            <div style={{ fontWeight: '800', fontSize: '1.1rem', marginBottom: '4px' }}>Pharmacie Sacré-Cœur</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                <MapPin size={14} /> <span>À 1.2km</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="fade-in">
                    <div style={{ background: 'white', padding: '24px', borderRadius: '24px', border: '1px solid var(--border)', textAlign: 'center', marginBottom: '24px' }}>
                        <div style={{ width: '64px', height: '64px', background: '#dcfce7', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Pill size={32} color="var(--primary)" />
                        </div>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '8px' }}>Commande #ORD-8821</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Ordonnance Transmise par Dr. Wane</p>

                        <div style={{ margin: '24px 0', padding: '16px', background: '#f8fafc', borderRadius: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <span>Insuline Lantus x2</span>
                                <span>24.00 €</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                                <span>Glucophage 1000 x1</span>
                                <span>8.50 €</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', paddingTop: '16px', borderTop: '1px dashed var(--border)', fontWeight: '900', fontSize: '1.1rem' }}>
                                <span>TOTAL À PAYER</span>
                                <span>32.50 €</span>
                            </div>
                        </div>

                        <button style={{ width: '100%', padding: '16px', borderRadius: '14px', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(5, 150, 105, 0.2)' }}>
                            PAYER MAINTENANT
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
