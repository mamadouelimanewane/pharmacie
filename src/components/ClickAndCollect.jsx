import React, { useState } from 'react';
import {
    Smartphone, ShoppingBag, Clock, CheckCircle2,
    AlertCircle, MapPin, User, Package,
    ArrowRight, MessageSquare, Truck, Send,
    MoreVertical, Receipt, Search, Image as ImageIcon,
    Mic, FileText, Download, X, Phone
} from 'lucide-react';
import { MOCK_ORDERS } from '../data/mockData';

// Mock WhatsApp Conversations
const WHATSAPP_CHATS = [
    { id: 1, name: 'Mme Fatou Ndiaye', phone: '+221 77 123 45 67', lastMsg: 'Bonjour, avez-vous du Doliprane sirop ?', time: '14:32', unread: 2, status: 'new' },
    { id: 2, name: 'Amadou Sy', phone: '+221 70 890 12 34', lastMsg: 'Je vous envoie l\'ordonnance.', time: '14:15', unread: 0, status: 'pending' },
    { id: 3, name: 'Sophie Diop', phone: '+221 76 543 21 09', lastMsg: 'Merci, je passe ce soir.', time: '13:45', unread: 0, status: 'ready' },
];

const WHATSAPP_MESSAGES = [
    { id: 1, sender: 'client', type: 'text', content: 'Bonjour, je voudrais savoir si mon ordonnance est prête ?', time: '14:30' },
    { id: 2, sender: 'pharmacy', type: 'text', content: 'Bonjour Mme Ndiaye, pouvez-vous me rappeler votre numéro de commande ?', time: '14:31' },
    { id: 3, sender: 'client', type: 'image', content: 'ordonnance_scan.jpg', caption: 'Voici la photo de l\'ordonnance', time: '14:32' },
    { id: 4, sender: 'client', type: 'audio', duration: '0:15', time: '14:33' },
];

export default function ClickAndCollect() {
    const [activeView, setActiveView] = useState('active'); // 'active', 'whatsapp', 'delivery', 'history'
    const [selectedChat, setSelectedChat] = useState(null);
    const [replyText, setReplyText] = useState('');

    return (
        <div className="click-collect fade-in" style={{ paddingBottom: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexShrink: 0 }}>
                <div>
                    <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--secondary)' }}>
                        Omnicanal & WhatsApp Commerce
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Interface unifiée : Web, Mobile et Messagerie Instantanée.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <div className="glass" style={{ padding: '0.75rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#25d366', boxShadow: '0 0 10px #25d366' }}></div>
                        <span style={{ fontWeight: '800', color: '#10b981' }}>WhatsApp API : Connecté</span>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
                {[
                    { id: 'active', label: 'Commandes Web', icon: ShoppingBag },
                    { id: 'whatsapp', label: 'Messagerie WhatsApp', icon: MessageSquare, badge: 2 },
                    { id: 'delivery', label: 'Suivi Livraisons', icon: Truck },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveView(tab.id)}
                        style={{
                            padding: '12px 0', border: 'none', background: 'none',
                            color: activeView === tab.id ? 'var(--primary)' : 'var(--text-muted)',
                            fontWeight: '800', fontSize: '1rem', cursor: 'pointer',
                            borderBottom: activeView === tab.id ? '3px solid var(--primary)' : '3px solid transparent',
                            display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s',
                            position: 'relative'
                        }}
                    >
                        <tab.icon size={20} /> {tab.label}
                        {tab.badge && (
                            <span style={{ position: 'absolute', top: 0, right: -12, background: '#ef4444', color: 'white', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '10px' }}>{tab.badge}</span>
                        )}
                    </button>
                ))}
            </div>

            {/* VIEWS */}
            <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

                {/* 1. COMMANDES ACTIVES */}
                {activeView === 'active' && (
                    <div className="fade-in" style={{ overflowY: 'auto' }}>
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
                                <p style={{ fontSize: '1.8rem', fontWeight: '900', color: 'var(--secondary)' }}>345 000 F</p>
                            </div>
                        </div>

                        <div className="card" style={{ padding: 0 }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead style={{ background: '#f8fafc' }}>
                                    <tr style={{ textAlign: 'left' }}>
                                        <th style={{ padding: '20px' }}>COMMANDE</th>
                                        <th>PATIENT</th>
                                        <th>ORIGINE</th>
                                        <th>STATUT</th>
                                        <th style={{ textAlign: 'right', padding: '20px' }}>ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {MOCK_ORDERS.map(order => (
                                        <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '20px', fontWeight: '900', color: 'var(--primary)' }}>{order.id}</td>
                                            <td style={{ fontWeight: '800' }}>{order.patient}</td>
                                            <td>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: '700', color: order.type === 'App' ? 'var(--primary)' : '#25d366' }}>
                                                    {order.type === 'App' ? <Smartphone size={14} /> : <MessageSquare size={14} />} {order.type}
                                                </span>
                                            </td>
                                            <td>
                                                <span style={{ padding: '6px 14px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: '900', backgroundColor: order.status === 'Prêt' ? '#dcfce7' : '#fff7ed', color: order.status === 'Prêt' ? '#166534' : '#9a3412' }}>
                                                    {order.status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td style={{ padding: '20px', textAlign: 'right' }}>
                                                <button style={{ padding: '8px 16px', borderRadius: '10px', border: 'none', background: 'var(--secondary)', color: 'white', fontWeight: '800', cursor: 'pointer' }}>Traiter</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* 2. MESSAGERIE WHATSAPP */}
                {activeView === 'whatsapp' && (
                    <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '20px', height: '100%' }}>
                        {/* Chat List */}
                        <div className="card" style={{ padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                            <div style={{ padding: '20px', borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                                <div style={{ position: 'relative' }}>
                                    <Search size={18} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                    <input type="text" placeholder="Rechercher une conversation..." style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }} />
                                </div>
                            </div>
                            <div style={{ overflowY: 'auto', flex: 1 }}>
                                {WHATSAPP_CHATS.map(chat => (
                                    <div key={chat.id} onClick={() => setSelectedChat(chat)} style={{ padding: '20px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer', background: selectedChat?.id === chat.id ? '#f0fdf4' : 'white', borderLeft: selectedChat?.id === chat.id ? '4px solid #10b981' : '4px solid transparent' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                            <span style={{ fontWeight: '800', color: 'var(--secondary)' }}>{chat.name}</span>
                                            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{chat.time}</span>
                                        </div>
                                        <p style={{ fontSize: '0.8rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.lastMsg}</p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#10b981' }}>{chat.phone}</span>
                                            {chat.unread > 0 && <span style={{ background: '#10b981', color: 'white', fontSize: '0.65rem', fontWeight: '800', padding: '2px 6px', borderRadius: '10px' }}>{chat.unread}</span>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Chat Window */}
                        <div className="card" style={{ padding: 0, display: 'flex', flexDirection: 'column', background: selectedChat ? '#efeae2' : 'white', overflow: 'hidden' }}>
                            {selectedChat ? (
                                <>
                                    <div style={{ padding: '16px 24px', background: 'white', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={20} color="white" /></div>
                                            <div>
                                                <p style={{ fontWeight: '800', color: 'var(--secondary)' }}>{selectedChat.name}</p>
                                                <p style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '600' }}>En ligne sur WhatsApp</p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', gap: '12px' }}>
                                            <button style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white' }}><Phone size={18} /></button>
                                            <button style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'white', color: 'var(--secondary)', fontWeight: '700', fontSize: '0.8rem' }}>Créer Commande</button>
                                        </div>
                                    </div>

                                    <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        {WHATSAPP_MESSAGES.map(msg => (
                                            <div key={msg.id} style={{ alignSelf: msg.sender === 'client' ? 'flex-start' : 'flex-end', maxWidth: '70%' }}>
                                                <div style={{ padding: '12px 16px', borderRadius: msg.sender === 'client' ? '0 16px 16px 16px' : '16px 0 16px 16px', background: msg.sender === 'client' ? 'white' : '#dcfce7', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', position: 'relative' }}>
                                                    {msg.type === 'text' && <p style={{ fontSize: '0.9rem', color: '#1e293b' }}>{msg.content}</p>}
                                                    {msg.type === 'image' && (
                                                        <div>
                                                            <div style={{ width: '200px', height: '140px', background: '#e2e8f0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                                                                <ImageIcon size={32} color="#94a3b8" />
                                                            </div>
                                                            <p style={{ fontSize: '0.8rem', fontStyle: 'italic' }}>{msg.caption}</p>
                                                        </div>
                                                    )}
                                                    {msg.type === 'audio' && (
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                            <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Mic size={14} color="white" /></div>
                                                            <div style={{ height: 4, width: 100, background: '#e2e8f0', borderRadius: 2 }}></div>
                                                            <span style={{ fontSize: '0.7rem' }}>{msg.duration}</span>
                                                        </div>
                                                    )}
                                                    <span style={{ fontSize: '0.65rem', color: '#94a3b8', position: 'absolute', bottom: -18, right: 0 }}>{msg.time}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div style={{ padding: '16px', background: '#f0f2f5', borderTop: '1px solid #d1d7db', display: 'flex', gap: '12px', alignItems: 'center' }}>
                                        <button style={{ padding: '10px', borderRadius: '50%', border: 'none', background: 'white', color: '#64748b' }}><ImageIcon size={20} /></button>
                                        <input type="text" placeholder="Écrire un message..." value={replyText} onChange={(e) => setReplyText(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '24px', border: 'none', outline: 'none', fontSize: '0.9rem' }} />
                                        <button onClick={() => setReplyText('')} style={{ padding: '10px', borderRadius: '50%', border: 'none', background: '#00a884', color: 'white', cursor: 'pointer' }}><Send size={20} /></button>
                                    </div>
                                </>
                            ) : (
                                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', color: '#94a3b8' }}>
                                    <MessageSquare size={64} style={{ marginBottom: '16px', opacity: 0.5 }} />
                                    <p>Sélectionnez une conversation pour commencer</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* 3. SUIVI LIVRAISONS */}
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
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
