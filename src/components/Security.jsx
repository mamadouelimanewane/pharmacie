import React, { useState } from 'react';
import {
    ShieldCheck, Users, Lock, Database,
    Cloud, HardDrive, Share2, AlertCircle,
    CheckCircle2, Clock, Globe, Key,
    UserPlus, MoreVertical, Search, Download,
    History, ShieldAlert, Zap, RefreshCw,
    Server, Ghost
} from 'lucide-react';

const MOCK_USERS = [
    { id: 1, name: 'Dr. Mamadou Elimane Wane', role: 'Administrateur', lastActive: 'En ligne', status: 'active', email: 'dr.wane@pharmaelite.sn' },
    { id: 2, name: 'Awa Ndiaye', role: 'Pharmacien Assistant', lastActive: 'Il y a 10 min', status: 'active', email: 'awa.n@pharmaelite.sn' },
    { id: 3, name: 'Moussa Sarr', role: 'Gérant Stock', lastActive: 'Il y a 2h', status: 'active', email: 'moussa.s@pharmaelite.sn' },
    { id: 4, name: 'Stagiaire 1', role: 'Vendeur Comptoir', lastActive: 'Hier', status: 'restricted', email: 'stagiaire@pharmaelite.sn' },
];

const BACKUP_LOGS = [
    { date: '08/02/2026 21:00', type: 'CLOUD', target: 'Azure Region Paris', size: '2.4 GB', status: 'success' },
    { date: '08/02/2026 12:00', type: 'DRIVE', target: 'Google Drive (Elite Backup)', size: '2.3 GB', status: 'success' },
    { date: '08/02/2026 08:00', type: 'LOCAL', target: 'NAS Server Local', size: '2.3 GB', status: 'success' },
];

export default function Security() {
    const [activeTab, setActiveTab] = useState('users');
    const [isBackingUp, setIsBackingUp] = useState(false);
    const [backupStep, setBackupStep] = useState('');
    const [isAirGappedSyncing, setIsAirGappedSyncing] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
    const [show2FAModal, setShow2FAModal] = useState(false);
    const [panicMode, setPanicMode] = useState(false);
    const [showPanicConfirm, setShowPanicConfirm] = useState(false);
    const [sneakyMode, setSneakyMode] = useState(false);

    const runBackup = (type) => {
        setIsBackingUp(true);
        setBackupStep(`Initialisation de la sauvegarde ${type}...`);

        setTimeout(() => setBackupStep('Compression des données (Enciffrement AES-256)...'), 1000);
        setTimeout(() => setBackupStep(`Synchronisation avec ${type}...`), 2500);
        setTimeout(() => {
            setIsBackingUp(false);
            setBackupStep('');
            alert(`Sauvegarde ${type} terminée avec succès !`);
        }, 4500);
    };

    return (
        <div className="security-module fade-in" style={{ paddingBottom: '2rem' }}>
            <header style={{ marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <ShieldCheck color="var(--primary)" size={32} /> Sécurité & Gouvernance des Données
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>Gestion des accès officinaux, droits utilisateurs et redondance multi-cloud.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                        onClick={() => setShowPanicConfirm(true)}
                        style={{
                            padding: '0.75rem 1.25rem', borderRadius: '12px', border: 'none',
                            backgroundColor: panicMode ? '#ef4444' : '#fee2e2',
                            color: panicMode ? 'white' : '#ef4444',
                            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                            fontWeight: '900', transition: 'all 0.3s',
                            boxShadow: panicMode ? '0 0 20px rgba(239, 68, 68, 0.4)' : 'none'
                        }}
                    >
                        <ShieldAlert size={18} /> {panicMode ? 'SYSTÈME VERROUILLÉ' : 'PANIC BUTTON'}
                    </button>
                    <button className="glass" style={{ padding: '0.75rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
                        <History size={18} /> Logs d'Audit
                    </button>
                </div>
            </header>

            {/* Stats Security Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
                <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>UTILISATEURS ACTIFS</p>
                    <p style={{ fontSize: '1.6rem', fontWeight: '900' }}>3 / 8</p>
                    <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></div>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></div>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></div>
                    </div>
                </div>
                <div className="card" style={{ borderLeft: '4px solid #3b82f6' }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>DERNIERE SAUVEGARDE</p>
                    <p style={{ fontSize: '1.6rem', fontWeight: '900' }}>Il y a 45 min</p>
                    <p style={{ fontSize: '0.75rem', color: '#3b82f6', marginTop: '4px' }}>Multi-Cloud Check OK</p>
                </div>
                <div className="card" style={{ borderLeft: '4px solid #f59e0b' }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>ALERTES DE SÉCURITÉ</p>
                    <p style={{ fontSize: '1.6rem', fontWeight: '900' }}>Aucune</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '4px' }}>Système intègre</p>
                </div>
                <div className="card" style={{ borderLeft: '4px solid #8b5cf6' }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>CHIFFREMENT DATA</p>
                    <p style={{ fontSize: '1.6rem', fontWeight: '900' }}>AES-256</p>
                    <p style={{ fontSize: '0.75rem', color: '#8b5cf6', marginTop: '4px' }}>Niveau Militaire</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr', gap: '2rem' }}>

                {/* Main Content Area */}
                <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', gap: '1.5rem' }}>
                        <button onClick={() => setActiveTab('users')} style={{ background: 'none', border: 'none', borderBottom: activeTab === 'users' ? '3px solid var(--primary)' : '3px solid transparent', color: activeTab === 'users' ? 'var(--secondary)' : 'var(--text-muted)', fontWeight: '800', paddingBottom: '12px', cursor: 'pointer', transition: 'all 0.2s' }}>Utilisateurs</button>
                        <button onClick={() => setActiveTab('roles')} style={{ background: 'none', border: 'none', borderBottom: activeTab === 'roles' ? '3px solid var(--primary)' : '3px solid transparent', color: activeTab === 'roles' ? 'var(--secondary)' : 'var(--text-muted)', fontWeight: '800', paddingBottom: '12px', cursor: 'pointer', transition: 'all 0.2s' }}>Rôles & Permissions</button>
                        <button onClick={() => setActiveTab('backup')} style={{ background: 'none', border: 'none', borderBottom: activeTab === 'backup' ? '3px solid var(--primary)' : '3px solid transparent', color: activeTab === 'backup' ? 'var(--secondary)' : 'var(--text-muted)', fontWeight: '800', paddingBottom: '12px', cursor: 'pointer', transition: 'all 0.2s' }}>Centre de Sauvegarde</button>
                    </div>

                    <div style={{ padding: '24px' }}>
                        {activeTab === 'users' && (
                            <>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                                    <div style={{ position: 'relative', width: '300px' }}>
                                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                        <input type="text" placeholder="Chercher un collaborateur..." style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }} />
                                    </div>
                                    <button style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', border: 'none', backgroundColor: 'var(--primary)', color: 'white', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                        <UserPlus size={18} /> Nouvel Utilisateur
                                    </button>
                                </div>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ textAlign: 'left', borderBottom: '1px solid #f1f5f9' }}>
                                            <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>NOM</th>
                                            <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>RÔLE</th>
                                            <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>ACTIVITÉ</th>
                                            <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '0.8rem' }}>STATUT</th>
                                            <th style={{ padding: '16px', textAlign: 'right' }}></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {MOCK_USERS.map(user => (
                                            <tr key={user.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                                                <td style={{ padding: '16px' }}>
                                                    <p style={{ fontWeight: '800', color: 'var(--secondary)' }}>{user.name}</p>
                                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</p>
                                                </td>
                                                <td style={{ padding: '16px' }}>
                                                    <span style={{ padding: '4px 10px', borderRadius: '8px', background: '#f5f3ff', color: '#8b5cf6', fontSize: '0.75rem', fontWeight: '800' }}>{user.role}</span>
                                                </td>
                                                <td style={{ padding: '16px', fontSize: '0.85rem' }}>{user.lastActive}</td>
                                                <td style={{ padding: '16px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: user.status === 'active' ? '#10b981' : '#f59e0b' }}></div>
                                                        <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{user.status === 'active' ? 'Opérationnel' : 'Accès Limité'}</span>
                                                    </div>
                                                </td>
                                                <td style={{ padding: '16px', textAlign: 'right' }}>
                                                    <button style={{ padding: '8px', borderRadius: '8px', border: 'none', background: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><MoreVertical size={18} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}

                        {activeTab === 'roles' && (
                            <div className="fade-in">
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
                                    <div style={{ padding: '20px', borderRadius: '20px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', position: 'relative' }}>
                                        <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                            <Shield size={16} color="var(--primary)" />
                                        </div>
                                        <h4 style={{ fontWeight: '900', marginBottom: '10px' }}>ADMIN</h4>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Accès total incluant la comptabilité, les paramètres et la gestion RH.</p>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            <div style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>✓ ACCÈS ILLIMITÉ</div>
                                            <div style={{ fontSize: '0.65rem', fontWeight: '800', color: twoFactorEnabled ? 'var(--primary)' : 'var(--error)', display: 'flex', alignItems: 'center', gap: '4px' }}>{twoFactorEnabled ? '✓ 2FA ACTIVÉ' : '! 2FA REQUIS'}</div>
                                        </div>
                                    </div>
                                    <div style={{ padding: '20px', borderRadius: '20px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                        <h4 style={{ fontWeight: '900', marginBottom: '10px' }}>PHARMACIEN</h4>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Encaissement, ordonnances, stocks et dossiers patients.</p>
                                        <div style={{ fontSize: '0.65rem', fontWeight: '800', color: 'var(--primary)' }}>✓ ACCÈS UNITÉ DE SOINS</div>
                                    </div>
                                    <div style={{ padding: '20px', borderRadius: '20px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                        <h4 style={{ fontWeight: '900', marginBottom: '10px' }}>LOGISTIQUE</h4>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Réception commandes, inventaire, ruptures. Pas d'accès finances.</p>
                                        <div style={{ fontSize: '0.65rem', fontWeight: '800', color: '#8b5cf6' }}>✓ ACCÈS STOCK UNIQUEMENT</div>
                                    </div>
                                </div>

                                <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '24px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
                                    <h3 style={{ fontSize: '1rem', fontWeight: '900', marginBottom: '1.5rem' }}>Double Authentification (2FA)</h3>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <p style={{ fontWeight: '800', fontSize: '0.9rem' }}>Sécuriser l'accès Administrateur</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Un code de vérification sera envoyé via WhatsApp ou SMS à chaque connexion.</p>
                                        </div>
                                        <button
                                            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                                            style={{
                                                width: '50px', height: '26px', borderRadius: '20px',
                                                backgroundColor: twoFactorEnabled ? 'var(--primary)' : '#cbd5e1',
                                                border: 'none', position: 'relative', cursor: 'pointer',
                                                transition: 'all 0.3s'
                                            }}
                                        >
                                            <div style={{
                                                width: '20px', height: '20px', borderRadius: '50%', background: 'white',
                                                position: 'absolute', top: '3px', left: twoFactorEnabled ? '27px' : '3px',
                                                transition: 'all 0.3s'
                                            }}></div>
                                        </button>
                                    </div>
                                    {twoFactorEnabled && (
                                        <div style={{ marginTop: '20px', padding: '12px', background: 'white', borderRadius: '12px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ padding: '8px', background: '#dcfce7', borderRadius: '8px' }}>
                                                <Smartphone size={18} color="#16a34a" />
                                            </div>
                                            <div>
                                                <p style={{ fontSize: '0.75rem', fontWeight: '700' }}>Canal de réception : WhatsApp Business</p>
                                                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Destinataire : +221 7x xxx xx 00</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button style={{ padding: '12px 24px', borderRadius: '12px', border: '1px solid var(--primary)', color: 'var(--primary)', background: 'white', fontWeight: '800', fontSize: '0.9rem', cursor: 'pointer' }}>Gérer la Matrice Globale des Permissions</button>
                            </div>
                        )}

                        {activeTab === 'backup' && (
                            <div className="fade-in">
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
                                    <div style={{ padding: '24px', borderRadius: '24px', backgroundColor: isBackingUp ? '#f0fdf4' : 'white', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                                        <Cloud size={40} color="#0ea5e9" style={{ margin: '0 auto 16px' }} />
                                        <h4 style={{ fontWeight: '900', marginBottom: '8px' }}>Google Drive</h4>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '20px' }}>Synchronisation automatique toutes les 12 heures.</p>
                                        <button onClick={() => runBackup('Google Drive')} className="glass" style={{ width: '100%', padding: '12px', borderRadius: '12px', fontWeight: '800', color: '#0ea5e9', cursor: 'pointer' }}>Sauvegarder</button>
                                    </div>
                                    <div style={{ padding: '24px', borderRadius: '24px', backgroundColor: 'white', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                                        <Server size={40} color="#8b5cf6" style={{ margin: '0 auto 16px' }} />
                                        <h4 style={{ fontWeight: '900', marginBottom: '8px' }}>Serveur Cloud (Azure)</h4>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '20px' }}>Réplication en temps réel des transactions critiques.</p>
                                        <button onClick={() => runBackup('Azure Cloud')} className="glass" style={{ width: '100%', padding: '12px', borderRadius: '12px', fontWeight: '800', color: '#8b5cf6', cursor: 'pointer' }}>Démarrer Sync</button>
                                    </div>
                                    <div style={{ padding: '24px', borderRadius: '24px', backgroundColor: 'white', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                                        <HardDrive size={40} color="#10b981" style={{ margin: '0 auto 16px' }} />
                                        <h4 style={{ fontWeight: '900', marginBottom: '8px' }}>Stockage Local (NAS)</h4>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '20px' }}>Archivage haute performance sur le réseau de l'officine.</p>
                                        <button onClick={() => runBackup('Serveur Local')} className="glass" style={{ width: '100%', padding: '12px', borderRadius: '12px', fontWeight: '800', color: '#10b981', cursor: 'pointer' }}>Exporter vers NAS</button>
                                    </div>
                                </div>

                                {isBackingUp && (
                                    <div style={{ marginBottom: '2rem', padding: '24px', borderRadius: '20px', backgroundColor: '#0f172a', color: 'white' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                                            <Loader2 size={24} className="spin" color="var(--primary)" />
                                            <span style={{ fontWeight: '800' }}>{backupStep}</span>
                                        </div>
                                        <div style={{ width: '100%', height: '8px', background: '#334155', borderRadius: '4px', overflow: 'hidden' }}>
                                            <div style={{ width: '65%', height: '100%', background: 'var(--primary)', animation: 'progress 3s' }}></div>
                                        </div>
                                    </div>
                                )}

                                <h3 style={{ fontSize: '1.1rem', fontWeight: '900', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}><History size={20} /> Journal des Sauvegardes</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {BACKUP_LOGS.map((log, i) => (
                                        <div key={i} style={{ padding: '16px', borderRadius: '16px', backgroundColor: '#f8fafc', border: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                                <div style={{ padding: '10px', backgroundColor: 'white', borderRadius: '10px' }}>
                                                    {log.type === 'CLOUD' ? <Cloud size={18} color="#3b82f6" /> : log.type === 'DRIVE' ? <Share2 size={18} color="#0ea5e9" /> : <HardDrive size={18} color="#10b981" />}
                                                </div>
                                                <div>
                                                    <p style={{ fontWeight: '800', fontSize: '0.9rem' }}>Sauvegarde {log.type} : {log.target}</p>
                                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{log.date} • {log.size}</p>
                                                </div>
                                            </div>
                                            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle2 size={14} /> RÉUSSIE</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Alerts / Config */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="card" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: 'white', border: 'none' }}>
                        <h4 style={{ color: 'white', fontWeight: '900', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><Zap size={18} color="var(--primary)" /> Sécurité Active</h4>
                        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.4', marginBottom: '20px' }}>Le système surveille les anomalies de connexion et les suppressions de lignes de facturation suspectes.</p>
                        <div style={{ padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.05)', marginBottom: '12px' }}>
                            <p style={{ fontSize: '0.7rem', fontWeight: '800', opacity: 0.6 }}>DERNIÈRE ALERTE</p>
                            <p style={{ fontSize: '0.85rem', fontWeight: '700' }}>Aucun incident détecté</p>
                        </div>
                        <button style={{ width: '100%', padding: '12px', borderRadius: '12px', border: 'none', background: 'var(--primary)', color: 'white', fontWeight: '800', marginTop: '10px', cursor: 'pointer' }}>Générer Rapport Conformité</button>
                    </div>

                    <div className="card" style={{ backgroundColor: '#fdf2f2', border: '1px solid #fecaca' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <Ghost size={24} color="#ef4444" />
                                <div>
                                    <h4 style={{ fontWeight: '900', color: '#991b1b', fontSize: '0.9rem' }}>Mode Discret (Sneaky)</h4>
                                    <p style={{ fontSize: '0.7rem', color: '#b91c1c', marginTop: '2px' }}>Masquer le lockdown en "Maintenance".</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSneakyMode(!sneakyMode)}
                                style={{
                                    width: '40px', height: '20px', borderRadius: '20px',
                                    backgroundColor: sneakyMode ? '#ef4444' : '#cbd5e1',
                                    border: 'none', position: 'relative', cursor: 'pointer'
                                }}
                            >
                                <div style={{
                                    width: '14px', height: '14px', borderRadius: '50%', background: 'white',
                                    position: 'absolute', top: '3px', left: sneakyMode ? '23px' : '3px',
                                    transition: 'all 0.2s'
                                }}></div>
                            </button>
                        </div>
                    </div>

                    <div className="card" style={{ backgroundColor: '#fff7ed', border: '1px solid #ffd6a5' }}>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <ShieldAlert size={24} color="#f59e0b" />
                            <div>
                                <h4 style={{ fontWeight: '900', color: '#92400e', fontSize: '0.95rem' }}>Alerte Backup Automatique</h4>
                                <p style={{ fontSize: '0.75rem', color: '#b45309', lineHeight: '1.4', marginTop: '4px' }}>La sauvegarde locale (NAS) est pleine à 95%. Veuillez libérer de l'espace ou migrer les logs de plus de 2 ans vers le Cloud.</p>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h4 style={{ fontWeight: '900', marginBottom: '1rem' }}>Mise à jour Signature Elite</h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Les certificats SSL et les clés de chiffrement des signatures patients seront renouvelés dans 45 jours.</p>
                        <button style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'white', fontWeight: '800', cursor: 'pointer' }}>Détails Certificats</button>
                    </div>
                </div>
            </div>

            {/* Panic Mode Confirmation Modal */}
            {showPanicConfirm && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(10px)' }}>
                    <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '32px', width: '500px', textAlign: 'center', border: '2px solid #ef4444' }}>
                        <div style={{ width: '80px', height: '80px', backgroundColor: '#fee2e2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                            <ShieldAlert size={40} color="#ef4444" />
                        </div>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#991b1b', marginBottom: '12px' }}>VERROUILLAGE D'URGENCE</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.5' }}>
                            {sneakyMode
                                ? "Le système sera verrouillé sous couvert d'un message de 'Maintenance Technique'. Les sessions seront révoquées silencieusement."
                                : "Cette action va **déconnecter instantanément** tous les utilisateurs (sauf vous) et **bloquer tout nouvel accès** jusqu'à levée manuelle."}
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <button onClick={() => setShowPanicConfirm(false)} style={{ padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', background: 'white', fontWeight: '800', cursor: 'pointer' }}>Annuler</button>
                            <button
                                onClick={() => {
                                    setPanicMode(true);
                                    setShowPanicConfirm(false);
                                    setIsAirGappedSyncing(true);
                                    setTimeout(() => setIsAirGappedSyncing(false), 3000);
                                }}
                                style={{ padding: '16px', borderRadius: '16px', border: 'none', background: '#ef4444', color: 'white', fontWeight: '900', cursor: 'pointer', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)' }}
                            >
                                ACTIVER LE LOCKDOWN
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Air-Gapped Sync Notification */}
            {isAirGappedSyncing && (
                <div style={{ position: 'fixed', top: '20px', right: '20px', backgroundColor: '#0f172a', color: 'white', padding: '20px', borderRadius: '20px', zIndex: 11000, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)', border: '1px solid #ef4444', minWidth: '300px' }} className="fade-in">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <RefreshCw size={20} className="spin" color="#ef4444" />
                        <span style={{ fontWeight: '900', color: '#ef4444' }}>SYNC. AIR-GAPPED ACTIVE</span>
                    </div>
                    <p style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '12px' }}>Extraction de la base de données vers le stockage local immuable...</p>
                    <div style={{ width: '100%', height: '4px', background: '#334155', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{ width: '100%', height: '100%', background: '#ef4444', animation: 'progressAir 3s linear' }}></div>
                    </div>
                </div>
            )}

            {/* Panic Mode Active Overlay */}
            {panicMode && (
                <div style={{ position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#ef4444', color: 'white', padding: '12px 24px', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '16px', zIndex: 10000, boxShadow: '0 10px 30px rgba(239, 68, 68, 0.5)', border: '2px solid rgba(255,255,255,0.2)' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'white', animation: 'pulse 1s infinite' }}></div>
                    <span style={{ fontWeight: '900', fontSize: '0.9rem' }}>SYSTÈME EN MODE SÉCURITÉ MAXIMUM (LOCKDOWN)</span>
                    <button
                        onClick={() => setPanicMode(false)}
                        style={{ background: 'white', color: '#ef4444', border: 'none', padding: '6px 16px', borderRadius: '50px', fontWeight: '900', fontSize: '0.75rem', cursor: 'pointer' }}
                    >
                        RÉTABLIR LES ACCÈS
                    </button>
                </div>
            )}

            <style>{`
        @keyframes progress { from { width: 0%; } to { width: 65%; } }
        @keyframes progressAir { from { width: 0%; } to { width: 100%; } }
        .spin { animation: rotate 1.5s linear infinite; }
        @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.5); } 100% { opacity: 1; transform: scale(1); } }
      `}</style>
        </div>
    );
}

const Loader2 = ({ size, color, className, style }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
);
