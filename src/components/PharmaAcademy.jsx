import React, { useState } from 'react';
import {
    GraduationCap, Play, BookOpen, Award,
    CheckCircle2, Lock, Star, Clock,
    Search, FileText, Video, UserCheck
} from 'lucide-react';

export default function PharmaAcademy() {
    const [activeTab, setActiveTab] = useState('courses'); // 'courses', 'wiki', 'team'

    const COURSES = [
        { id: 1, title: 'Nouveautés Dermo-Cosmétique 2026', author: 'Dr. Wane', duration: '45 min', progress: 100, status: 'Completed', level: 'Intermédiaire' },
        { id: 2, title: 'Protocole Délivrance Stupéfiants', author: 'Ordre Pharmaciens', duration: '30 min', progress: 60, status: 'In Progress', level: 'Avancé' },
        { id: 3, title: 'Conseil Micronutrition Hiver', author: 'Laboratoire Pileje', duration: '90 min', progress: 0, status: 'New', level: 'Expert' },
    ];

    return (
        <div className="academy fade-in" style={{ paddingBottom: '3rem' }}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--secondary)' }}>
                        Pharma Academy
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Formation continue et base de connaissance interne pour l'équipe officinale.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <div className="card" style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '10px', background: '#fffbeb', border: '1px solid #fcd34d' }}>
                        <Star size={20} fill="#f59e0b" color="#f59e0b" />
                        <div>
                            <p style={{ fontSize: '0.7rem', fontWeight: '800', color: '#b45309' }}>VOTRE SCORE</p>
                            <p style={{ fontSize: '1rem', fontWeight: '900', color: '#92400e' }}>850 XP</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)' }}>
                {[
                    { id: 'courses', label: 'E-Learning & Quiz', icon: Video },
                    { id: 'wiki', label: 'Wiki Procédures', icon: BookOpen },
                    { id: 'team', label: 'Suivi Équipe', icon: UserCheck },
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

            {activeTab === 'courses' && (
                <div className="fade-in">
                    <h3 style={{ fontWeight: '900', marginBottom: '20px', color: 'var(--secondary)' }}>Modules Disponibles</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                        {COURSES.map(course => (
                            <div key={course.id} className="card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ height: '140px', background: 'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                    <Play size={48} color="white" style={{ opacity: 0.8 }} />
                                    <div style={{ position: 'absolute', top: 12, right: 12, padding: '4px 8px', borderRadius: '6px', background: 'rgba(0,0,0,0.5)', color: 'white', fontSize: '0.7rem', fontWeight: '800' }}>
                                        {course.duration}
                                    </div>
                                </div>
                                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                        <span style={{ fontSize: '0.65rem', fontWeight: '800', padding: '4px 8px', borderRadius: '100px', background: '#f1f5f9', color: 'var(--text-muted)' }}>{course.level.toUpperCase()}</span>
                                    </div>
                                    <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '8px', color: 'var(--secondary)' }}>{course.title}</h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>Par {course.author}</p>

                                    <div style={{ marginTop: 'auto' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '800', marginBottom: '6px', color: 'var(--text-muted)' }}>
                                            <span>Progression</span>
                                            <span>{course.progress}%</span>
                                        </div>
                                        <div style={{ height: '8px', width: '100%', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                                            <div style={{ height: '100%', width: `${course.progress}%`, background: course.progress === 100 ? '#10b981' : 'var(--primary)', borderRadius: '4px' }}></div>
                                        </div>
                                        <button style={{ width: '100%', padding: '12px', marginTop: '16px', borderRadius: '10px', border: 'none', background: course.progress === 100 ? '#dcfce7' : 'var(--secondary)', color: course.progress === 100 ? '#166534' : 'white', fontWeight: '800', cursor: 'pointer' }}>
                                            {course.progress === 100 ? 'REVOIR LE MODULE' : course.progress === 0 ? 'COMMENCER' : 'CONTINUER'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'wiki' && (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
                    <BookOpen size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                    <p>Base de connaissance wiki en cours de construction...</p>
                </div>
            )}

            {activeTab === 'team' && (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#94a3b8' }}>
                    <UserCheck size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                    <p>Tableau de bord manager en cours...</p>
                </div>
            )}

        </div>
    );
}
