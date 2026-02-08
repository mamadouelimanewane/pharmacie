import React from 'react';
import { Settings, User, Building2, Shield, Bell, Database, Cloud, Key, Save } from 'lucide-react';

const SettingItem = ({ icon: Icon, title, description, active }) => (
    <div style={{
        padding: '1.25rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
        backgroundColor: active ? 'white' : '#f8fafc',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.75rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease'
    }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ color: active ? 'var(--primary)' : 'var(--text-muted)' }}>
                <Icon size={20} />
            </div>
            <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }}>{title}</h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{description}</p>
            </div>
        </div>
        <div style={{
            width: '40px',
            height: '24px',
            backgroundColor: active ? 'var(--primary)' : 'var(--border)',
            borderRadius: '12px',
            position: 'relative',
            transition: 'background-color 0.3s'
        }}>
            <div style={{
                width: '18px',
                height: '18px',
                backgroundColor: 'white',
                borderRadius: '50%',
                position: 'absolute',
                top: '3px',
                left: active ? '19px' : '3px',
                transition: 'left 0.3s'
            }} />
        </div>
    </div>
);

export default function Configuration() {
    return (
        <div className="configuration fade-in">
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Paramètres & Configuration</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Outils d'administration, comptes utilisateurs et intégrations tierces.</p>
                </div>
                <button style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: 'var(--radius-md)',
                    border: 'none',
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <Save size={18} /> Enregistrer
                </button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[
                        { id: 'general', icon: Building2, label: 'Officine' },
                        { id: 'users', icon: User, label: 'Utilisateurs' },
                        { id: 'integrations', icon: Cloud, label: 'Intégrations (Vidal, SESAM)' },
                        { id: 'security', icon: Shield, label: 'Sécurité & RGPD' },
                        { id: 'notifications', icon: Bell, label: 'Notifications' },
                        { id: 'advanced', icon: Database, label: 'Base de données' },
                    ].map(item => (
                        <button key={item.id} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            padding: '0.875rem 1.25rem',
                            borderRadius: 'var(--radius-md)',
                            border: 'none',
                            backgroundColor: item.id === 'general' ? 'var(--primary-light)' : 'transparent',
                            color: item.id === 'general' ? 'var(--primary)' : 'var(--text-main)',
                            fontWeight: item.id === 'general' ? '600' : '400',
                            textAlign: 'left',
                            cursor: 'pointer'
                        }}>
                            <item.icon size={18} /> {item.label}
                        </button>
                    ))}
                </div>

                <div className="card">
                    <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Informations de l'Officine</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div>
                                <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>Nom Commercial</label>
                                <input type="text" defaultValue="Pharmacie de la Mairie" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }} />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', display: 'block', marginBottom: '0.5rem' }}>N° FINESS</label>
                                <input type="text" defaultValue="750012345" style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }} />
                            </div>
                        </div>
                    </div>

                    <h3 style={{ marginBottom: '1rem' }}>Services & Connexions</h3>
                    <SettingItem
                        icon={Cloud}
                        title="Mise à jour automatique VIDAL"
                        description="Vérifier et installer les bases médicamenteuses chaque nuit."
                        active={true}
                    />
                    <SettingItem
                        icon={Key}
                        title="Télétransmission SCOR"
                        description="Activation de la numérisation et envoi des pièces justificatives."
                        active={true}
                    />
                    <SettingItem
                        icon={Shield}
                        title="Authentification forte (CPS/CPE)"
                        description="Forcer l'usage du lecteur de carte pour l'accès aux dossiers."
                        active={false}
                    />
                    <SettingItem
                        icon={Database}
                        title="Sauvegarde Cloud (HDS)"
                        description="Export chiffré quotidien vers un hébergeur de données de santé."
                        active={true}
                    />
                </div>
            </div>
        </div>
    );
}
