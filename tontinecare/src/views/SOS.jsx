import React, { useState } from 'react';
import { AlertTriangle, Syringe, MapPin, QrCode } from 'lucide-react';

export default function SOS({ group }) {
    const [step, setStep] = useState(1); // 1: Who, 2: Code

    return (
        <div className="fade-in">
            {step === 1 && (
                <>
                    <div style={{ background: '#fee2e2', border: '2px solid #fecaca', borderRadius: '20px', padding: '24px', textAlign: 'center', marginBottom: '32px' }}>
                        <div style={{ width: '64px', height: '64px', background: '#ef4444', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <Syringe size={32} />
                        </div>
                        <h2 style={{ color: '#b91c1c', fontWeight: '900', fontSize: '1.5rem', marginBottom: '8px' }}>URGENCE SANTÉ</h2>
                        <p style={{ color: '#7f1d1d', fontSize: '0.9rem' }}>Débloquer des fonds immédiatement pour une ordonnance.</p>
                    </div>

                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '16px' }}>Qui est malade ?</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                        {['Fatou', 'Oumar', 'Aïcha', 'Bébé'].map((n) => (
                            <button key={n} onClick={() => setStep(2)} style={{ padding: '20px', borderRadius: '16px', border: '2px solid #e5e7eb', background: 'white', fontWeight: '800', fontSize: '1rem', cursor: 'pointer' }}>
                                {n}
                            </button>
                        ))}
                    </div>
                </>
            )}

            {step === 2 && (
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '8px' }}>Code d'Urgence Généré</h2>
                    <p style={{ color: '#a8a29e', marginBottom: '32px' }}>Présentez ce code à la pharmacie partenaire.</p>

                    <div style={{ background: 'white', padding: '32px', borderRadius: '24px', border: '4px solid #f59e0b', marginBottom: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <QrCode size={180} color="#292524" />
                        <div style={{ marginTop: '24px', fontSize: '2rem', fontWeight: '900', letterSpacing: '4px', fontFamily: 'monospace' }}>
                            SOS-8821
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#16a34a', fontWeight: '700', background: '#dcfce7', padding: '12px', borderRadius: '12px' }}>
                        <MapPin size={20} /> ALERTE ENVOYÉE À PHARMAELITE
                    </div>

                    <button onClick={() => setStep(1)} style={{ marginTop: '24px', padding: '16px 32px', background: '#e5e7eb', border: 'none', borderRadius: '12px', fontWeight: '800', cursor: 'pointer' }}>
                        Fermer
                    </button>
                </div>
            )}
        </div>
    );
}
