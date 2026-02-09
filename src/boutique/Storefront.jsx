import React, { useState } from 'react';
import {
    ShoppingBag, Search, Menu, X, Star,
    ArrowRight, Heart, Filter, MessageCircle,
    ChevronDown, LayoutGrid, List, Plus, Minus,
    Zap, Share2, Gift, Send, Copy, BookOpen, Sparkles,
    BellRing, CheckCircle, AlertCircle
} from 'lucide-react';
import { BOUTIQUE_PRODUCTS, BOUTIQUE_CATEGORIES, FLASH_SALE_CONFIG, REFERRAL_PROGRAM, MOCK_ARTICLES } from '../data/boutiqueData';

export default function Storefront() {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isAiOpen, setIsAiOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isReferralOpen, setIsReferralOpen] = useState(false);
    const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
    const [diagnosticStep, setDiagnosticStep] = useState(0);
    const [diagnosticAnswers, setDiagnosticAnswers] = useState({});
    const [diagnosticComplete, setDiagnosticComplete] = useState(false);
    const [isMilestoneOpen, setIsMilestoneOpen] = useState(false);
    const [referralCount, setReferralCount] = useState(2);

    const handleShare = () => {
        const newCount = referralCount + 1;
        setReferralCount(newCount);
        if (newCount >= 3 && referralCount < 3) {
            setIsReferralOpen(false);
            setIsMilestoneOpen(true);
        }
    };

    const diagnosticQuestions = [
        {
            id: 'type',
            q: "Quel est votre type de peau ?",
            options: ['Sèche', 'Grasse', 'Mixte', 'Sensible']
        },
        {
            id: 'concern',
            q: "Votre préoccupation principale ?",
            options: ['Rides & Fermeté', 'Imperfections', 'Taches & Éclat', 'Hydratation']
        },
        {
            id: 'env',
            q: "Votre environnement quotidien ?",
            options: ['Ville / Pollution', 'Exposition Solaire', 'Bureau / Clim', 'Air Sec']
        }
    ];

    const addToCart = (product) => {
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
        } else {
            setCart([...cart, { ...product, qty: 1 }]);
        }
        setIsCartOpen(true);
    };

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    return (
        <div className="storefront" style={{ backgroundColor: '#fff', color: '#1a1a1a', minHeight: '100vh', fontFamily: '"Outfit", sans-serif', position: 'relative' }}>
            {/* --- PROMO BANNER --- */}
            <div style={{ backgroundColor: '#000', color: '#fff', padding: '10px 0', textAlign: 'center', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '2px' }}>
                LIVRAISON OFFERTE DÈS 50 000 F D'ACHATS • ÉCHANTILLONS OFFERTS DANS CHAQUE COMMANDE
            </div>
            {/* --- FLASH SALE BAR --- */}
            <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '12px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #fecaca' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ backgroundColor: '#ef4444', color: '#fff', padding: '4px 12px', borderRadius: '6px', fontWeight: '900', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Zap size={14} fill="white" /> FLASH SALE
                    </div>
                    <span style={{ fontWeight: '800', fontSize: '0.9rem' }}>Jusqu'à -25% sur les sérums éclat • <span style={{ color: '#000' }}>Fin dans : 04:59:12</span></span>
                </div>
                <button style={{ border: 'none', background: 'none', color: '#000', fontWeight: '900', fontSize: '0.8rem', textDecoration: 'underline', cursor: 'pointer' }}>Voir les offres</button>
            </div>

            {/* --- TOP NAV --- */}
            <nav style={{ padding: '1.25rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid #f0f0f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
                    <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#000', letterSpacing: '-1px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #10b981, #3b82f6)' }}></div>
                        ELITE <span style={{ fontWeight: '300' }}>PARA</span>
                    </div>
                    <div className="desktop-menu" style={{ display: 'flex', gap: '2rem' }}>
                        {['Nouveautés', 'Visage', 'Corps', 'Cheveux', 'Santé'].map(link => (
                            <a key={link} href="#" style={{ color: '#666', fontWeight: '600', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>{link}</a>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                        <Search size={20} style={{ position: 'absolute', left: '12px', color: '#999' }} />
                        <input
                            type="text"
                            placeholder="Rechercher un soin..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ padding: '10px 10px 10px 40px', borderRadius: '100px', border: '1px solid #eee', background: '#f8f8f8', outline: 'none', width: '250px', fontSize: '0.85rem' }}
                        />
                    </div>
                    <button onClick={() => setIsCartOpen(true)} style={{ position: 'relative', border: 'none', background: 'none', cursor: 'pointer' }}>
                        <ShoppingBag size={24} />
                        {cart.length > 0 && (
                            <span style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: '#3b82f6', color: 'white', fontSize: '0.7rem', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
                                {cart.reduce((s, i) => s + i.qty, 0)}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => setIsDiagnosticOpen(true)}
                        style={{ border: 'none', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: '#fff', padding: '10px 20px', borderRadius: '100px', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                        <Sparkles size={16} /> Diagnostic Peau IA
                    </button>
                    <button style={{ border: 'none', background: '#000', color: '#fff', padding: '10px 20px', borderRadius: '100px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>Connexion</button>
                </div>
            </nav>

            {/* --- HERO SECTION --- */}
            <header style={{ height: '70vh', background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url("https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1920")', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', padding: '0 10%' }}>
                <div style={{ maxWidth: '600px', color: '#fff' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '1.5rem', display: 'block' }}>Révélez votre beauté naturelle</span>
                    <h1 style={{ fontSize: '4.5rem', fontWeight: '900', lineHeight: 1, marginBottom: '2rem' }}>L'Excellence Pharmaceutique à Domicile</h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '3rem', lineHeight: 1.6 }}>Découvrez notre sélection exclusive de soins dermo-cosmétiques et produits bien-être recommandés par nos experts.</p>
                    <button style={{ padding: '1.25rem 2.5rem', borderRadius: '100px', backgroundColor: '#fff', color: '#000', border: 'none', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1rem', cursor: 'pointer' }}>
                        Acheter maintenant <ArrowRight size={20} />
                    </button>
                </div>
            </header>

            {/* --- PRODUCTS GRID --- */}
            <main style={{ padding: '5rem 5%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '900' }}>Sélections du Moment</h2>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {BOUTIQUE_CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                style={{
                                    padding: '8px 20px', borderRadius: '100px', border: '1px solid #eee',
                                    background: activeCategory === cat.id ? '#000' : '#fff',
                                    color: activeCategory === cat.id ? '#fff' : '#666',
                                    fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s'
                                }}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2.5rem' }}>
                    {BOUTIQUE_PRODUCTS.map(product => (
                        <div key={product.id} className="product-card" style={{ position: 'relative', cursor: 'pointer' }}>
                            <div style={{ height: '400px', borderRadius: '24px', overflow: 'hidden', position: 'relative', backgroundColor: '#f9f9f9' }}>
                                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} className="p-img" />
                                <button style={{ position: 'absolute', top: '20px', right: '20px', width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                                    <Heart size={20} />
                                </button>
                                <div className="p-overlay" style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    <button
                                        onClick={() => setSelectedProduct(product)}
                                        style={{ width: '100%', padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.9)', color: '#000', border: 'none', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer' }}
                                    >
                                        <Eye size={18} /> Aperçu rapide
                                    </button>
                                    <button
                                        onClick={() => addToCart(product)}
                                        style={{ width: '100%', padding: '14px', borderRadius: '12px', backgroundColor: '#000', color: '#fff', border: 'none', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 10px 20px rgba(0,0,0,0.2)', cursor: 'pointer' }}
                                    >
                                        <Plus size={18} /> Ajouter au panier
                                    </button>
                                </div>
                            </div>
                            <div style={{ marginTop: '1.25rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#3b82f6', textTransform: 'uppercase' }}>{product.brand}</span>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', fontWeight: '700' }}>
                                        <Star size={14} fill="#f59e0b" color="#f59e0b" /> {product.rating}
                                    </div>
                                </div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '800' }}>{product.name}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
                                    {product.isFlash ? (
                                        <>
                                            <span style={{ fontSize: '1.25rem', fontWeight: '900', color: '#ef4444' }}>{product.salePrice.toLocaleString()} F</span>
                                            <span style={{ fontSize: '0.9rem', color: '#999', textDecoration: 'line-through' }}>{product.price.toLocaleString()} F</span>
                                        </>
                                    ) : (
                                        <p style={{ fontSize: '1.25rem', fontWeight: '900' }}>{product.price.toLocaleString()} F</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* --- REFERRAL SECTION --- */}
            <section style={{ backgroundColor: '#f8fafc', padding: '5rem 5%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ maxWidth: '900px', textAlign: 'center', backgroundColor: '#fff', padding: '4rem', borderRadius: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                        <Gift size={40} />
                    </div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '1rem' }}>Offrez {REFERRAL_PROGRAM.friendDiscount}, Recevez {REFERRAL_PROGRAM.rewardAmount.toLocaleString()} F</h2>
                    <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
                        Partagez votre secret beauté avec vos amis. Pour chaque parrainage réussi, bénéficiez de réductions sur vos prochains soins.
                    </p>
                    <button
                        onClick={() => setIsReferralOpen(true)}
                        style={{ padding: '1.25rem 3rem', borderRadius: '100px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', fontWeight: '800', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto' }}
                    >
                        Parrainer un ami <Share2 size={20} />
                    </button>
                </div>
            </section>

            {/* --- ELITE JOURNAL --- */}
            <section style={{ padding: '5rem 5%', backgroundColor: '#fcfcfc' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '900' }}>Journal de Beauté Elite</h2>
                    <button style={{ border: 'none', background: 'none', color: '#3b82f6', fontWeight: '800', textDecoration: 'underline', cursor: 'pointer' }}>Voir tous les articles</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                    {MOCK_ARTICLES.map(article => (
                        <div key={article.id} className="article-card" style={{ cursor: 'pointer', backgroundColor: '#fff', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', transition: 'transform 0.3s' }}>
                            <div style={{ height: '250px', overflow: 'hidden' }}>
                                <img src={article.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#10b981', textTransform: 'uppercase' }}>{article.category}</span>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: '900', margin: '10px 0', lineHeight: 1.3 }}>{article.title}</h3>
                                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.75rem', fontWeight: '700', color: '#999', marginTop: '1rem' }}>
                                    <span>{article.date}</span>
                                    <span>{article.readTime}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div style={{ height: '100px' }}></div>

            {/* --- FOOTER --- */}
            <footer style={{ backgroundColor: '#000', color: '#fff', padding: '5rem 5%', marginTop: '5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4rem' }}>
                    <div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '2rem' }}>ELITE PARA</div>
                        <p style={{ opacity: 0.6, fontSize: '0.9rem', lineHeight: 1.8 }}>Votre destination d'excellence pour la parapharmacie en ligne. Qualité pharmaceutique garantie.</p>
                    </div>
                    {['Boutique', 'Service Client', 'Société', 'Nous Suivre'].map(title => (
                        <div key={title}>
                            <h4 style={{ fontWeight: '800', marginBottom: '1.5rem' }}>{title}</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', opacity: 0.6, fontSize: '0.9rem' }}>
                                <span>Lien exemple</span>
                                <span>Lien exemple</span>
                                <span>Lien exemple</span>
                            </div>
                        </div>
                    ))}
                </div>
            </footer>

            {/* --- CART DRAWER --- */}
            {isCartOpen && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
                    <div className="cart-drawer fade-in-right" style={{ width: '450px', backgroundColor: '#fff', height: '100%', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '900' }}>Mon Panier</h2>
                            <button onClick={() => setIsCartOpen(false)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={28} /></button>
                        </div>

                        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {cart.length === 0 ? (
                                <div style={{ textAlign: 'center', marginTop: '5rem', opacity: 0.5 }}>Votre panier est vide</div>
                            ) : cart.map(item => (
                                <div key={item.id} style={{ display: 'flex', gap: '1.25rem' }}>
                                    <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontWeight: '800', fontSize: '0.9rem' }}>{item.name}</h4>
                                        <p style={{ fontSize: '0.85rem', fontWeight: '700', marginTop: '4px' }}>{item.price.toLocaleString()} F</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                                            <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #eee', background: 'none' }}><Minus size={14} /></button>
                                            <span style={{ fontWeight: '800' }}>{item.qty}</span>
                                            <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: '1px solid #eee', background: 'none' }}><Plus size={14} /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {cart.length > 0 && (
                            <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                    <span style={{ fontWeight: '700', fontSize: '1.1rem' }}>Total</span>
                                    <span style={{ fontWeight: '900', fontSize: '1.5rem' }}>{cartTotal.toLocaleString()} F</span>
                                </div>
                                <button style={{ width: '100%', padding: '1.25rem', borderRadius: '100px', backgroundColor: '#000', color: '#fff', border: 'none', fontWeight: '900', fontSize: '1rem', cursor: 'pointer' }}>Passer la commande</button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* --- QUICK VIEW MODAL --- */}
            {selectedProduct && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }} onClick={() => setSelectedProduct(null)}>
                    <div className="fade-in" style={{ backgroundColor: '#fff', width: '1000px', maxWidth: '100%', borderRadius: '32px', overflow: 'hidden', display: 'flex', position: 'relative' }} onClick={e => e.stopPropagation()}>
                        <button onClick={() => setSelectedProduct(null)} style={{ position: 'absolute', top: '30px', right: '30px', border: 'none', background: '#f8f8f8', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><X size={24} /></button>

                        <div style={{ flex: 1, backgroundColor: '#f9f9f9' }}>
                            <img src={selectedProduct.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>

                        <div style={{ flex: 1, padding: '4rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div>
                                <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#3b82f6', textTransform: 'uppercase', letterSpacing: '2px' }}>{selectedProduct.brand}</span>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginTop: '10px', lineHeight: 1.1 }}>{selectedProduct.name}</h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '1rem' }}>
                                    <div style={{ display: 'flex', gap: '2px' }}>{[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill={i <= Math.floor(selectedProduct.rating) ? "#f59e0b" : "none"} color="#f59e0b" />)}</div>
                                    <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{selectedProduct.rating}</span>
                                    <span style={{ color: '#999', fontSize: '0.9rem' }}>({selectedProduct.reviews} avis client)</span>
                                </div>
                            </div>

                            <p style={{ fontSize: '1.8rem', fontWeight: '900', color: '#000' }}>{selectedProduct.price.toLocaleString()} F</p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: 1.6 }}>{selectedProduct.description}</p>
                                <div style={{ display: 'flex', gap: '2rem' }}>
                                    <div>
                                        <p style={{ fontSize: '0.7rem', fontWeight: '800', color: '#999', textTransform: 'uppercase', marginBottom: '8px' }}>CATÉGORIE</p>
                                        <p style={{ fontWeight: '700' }}>{selectedProduct.category}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '0.7rem', fontWeight: '800', color: '#999', textTransform: 'uppercase', marginBottom: '8px' }}>DISPONIBILITÉ</p>
                                        <p style={{ fontWeight: '700', color: '#10b981' }}>{selectedProduct.stock > 0 ? 'En stock' : 'Rupture'}</p>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {selectedProduct.stock > 0 ? (
                                    <button
                                        onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                                        style={{ width: '100%', padding: '1.5rem', borderRadius: '100px', backgroundColor: '#000', color: '#fff', border: 'none', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
                                    >
                                        <ShoppingBag size={24} /> Ajouter au panier
                                    </button>
                                ) : (
                                    <button
                                        style={{ width: '100%', padding: '1.5rem', borderRadius: '100px', backgroundColor: '#25d366', color: '#fff', border: 'none', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
                                    >
                                        <BellRing size={24} /> M'alerter sur WhatsApp
                                    </button>
                                )}

                                <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
                                    <p style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', color: '#999', marginBottom: '1rem' }}>L'IA Elite Recommande</p>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', backgroundColor: '#f0f9ff', padding: '12px', borderRadius: '16px', border: '1px solid #e0f2fe' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Sparkles size={20} color="#3b82f6" />
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '0.85rem', fontWeight: '800' }}>Complétez avec le Nettoyant Doux</p>
                                            <p style={{ fontSize: '0.75rem', color: '#3b82f6', fontWeight: '700' }}>Optimisez les résultats de ce soin</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <button
                onClick={() => setIsAiOpen(!isAiOpen)}
                style={{ position: 'fixed', bottom: '30px', right: '30px', width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)', cursor: 'pointer', zIndex: 900 }}
            >
                <MessageCircle size={32} />
            </button>

            {isAiOpen && (
                <div style={{ position: 'fixed', bottom: '110px', right: '30px', width: '350px', backgroundColor: '#fff', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', zIndex: 1000, overflow: 'hidden', border: '1px solid #eee' }} className="fade-in">
                    <div style={{ padding: '20px', background: 'linear-gradient(135deg, #10b981, #3b82f6)', color: '#fff' }}>
                        <h4 style={{ fontWeight: '900' }}>Assistante Beauté Elite</h4>
                        <p style={{ fontSize: '0.8rem', opacity: 0.9 }}>Posez-moi vos questions sur nos soins !</p>
                    </div>
                    <div style={{ height: '300px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ backgroundColor: '#f1f5f9', padding: '12px', borderRadius: '12px', fontSize: '0.85rem', width: 'fit-content', borderBottomLeftRadius: 0 }}>
                            Bonjour ! Je suis votre conseillère beauté. Avez-vous besoin d'aide pour choisir un serum ?
                        </div>
                    </div>
                    <div style={{ padding: '20px', borderTop: '1px solid #eee', display: 'flex', gap: '10px' }}>
                        <input type="text" placeholder="Écrivez votre message..." style={{ flex: 1, border: 'none', background: '#f8f8f8', padding: '12px', borderRadius: '10px', outline: 'none' }} />
                        <button style={{ background: '#3b82f6', border: 'none', color: '#fff', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Send size={18} /></button>
                    </div>
                </div>
            )}

            {/* --- REFERRAL MODAL --- */}
            {isReferralOpen && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 2500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }} onClick={() => setIsReferralOpen(false)}>
                    <div className="fade-in" style={{ backgroundColor: '#fff', width: '500px', borderRadius: '32px', padding: '3rem', position: 'relative' }} onClick={e => e.stopPropagation()}>
                        <button onClick={() => setIsReferralOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', border: 'none', background: 'none', cursor: 'pointer' }}><X size={24} /></button>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: '900', textAlign: 'center', marginBottom: '1.5rem' }}>Programme Elite Privilège</h2>
                        <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>Partagez votre lien de parrainage unique</p>

                        <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px dashed #3b82f6', marginBottom: '2rem' }}>
                            <code style={{ fontWeight: '800', color: '#3b82f6' }}>ELITE-REF-2026</code>
                            <button style={{ border: 'none', background: 'none', color: '#666', cursor: 'pointer' }}><Copy size={20} /></button>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                <span style={{ fontSize: '0.85rem', fontWeight: '800' }}>Votre Progression VIP</span>
                                <span style={{ fontSize: '0.85rem', fontWeight: '900', color: '#3b82f6' }}>{referralCount}/3 Invites</span>
                            </div>
                            <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '100px', overflow: 'hidden', marginBottom: '15px' }}>
                                <div style={{ width: `${Math.min((referralCount / 3) * 100, 100)}%`, height: '100%', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', borderRadius: '12px', backgroundColor: '#fff', border: '1px solid #eee' }}>
                                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🥈</div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontSize: '0.75rem', fontWeight: '800' }}>Prochain Palier : Elite Silver</p>
                                        <p style={{ fontSize: '0.65rem', color: '#666' }}>Récompense : Bon de 15.000 F + Livraison Offerte</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <button onClick={handleShare} style={{ width: '100%', padding: '1rem', borderRadius: '100px', backgroundColor: '#25d366', color: '#fff', border: 'none', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' }}>
                                <MessageCircle size={20} /> Partager sur WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* --- SKIN DIAGNOSTIC MODAL --- */}
            {isDiagnosticOpen && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }} onClick={() => { setIsDiagnosticOpen(false); setDiagnosticStep(0); setDiagnosticComplete(false); }}>
                    <div className="fade-in" style={{ backgroundColor: '#fff', width: '600px', borderRadius: '40px', padding: '4rem', position: 'relative', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
                        <button onClick={() => { setIsDiagnosticOpen(false); setDiagnosticStep(0); setDiagnosticComplete(false); }} style={{ position: 'absolute', top: '30px', right: '30px', border: 'none', background: 'none', cursor: 'pointer' }}><X size={28} /></button>

                        {!diagnosticComplete ? (
                            <>
                                <div style={{ width: '70px', height: '70px', borderRadius: '24px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', margin: '0 auto 2rem' }}>
                                    <Sparkles size={35} />
                                </div>
                                <h2 style={{ fontSize: '2.1rem', fontWeight: '950', marginBottom: '1rem' }}>Diagnostic Beauté IA</h2>
                                <p style={{ color: '#666', marginBottom: '3rem' }}>Étape {diagnosticStep + 1} sur 3</p>

                                <div style={{ textAlign: 'left', marginBottom: '3rem' }}>
                                    <h4 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '25px', textAlign: 'center' }}>{diagnosticQuestions[diagnosticStep].q}</h4>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                        {diagnosticQuestions[diagnosticStep].options.map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => {
                                                    if (diagnosticStep < 2) {
                                                        setDiagnosticStep(diagnosticStep + 1);
                                                    } else {
                                                        setDiagnosticComplete(true);
                                                    }
                                                }}
                                                style={{ padding: '20px', borderRadius: '20px', border: '1px solid #eee', background: '#f8fafc', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.2s' }}
                                                onMouseOver={e => e.currentTarget.style.borderColor = '#3b82f6'}
                                                onMouseOut={e => e.currentTarget.style.borderColor = '#eee'}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div style={{ width: '100%', height: '6px', backgroundColor: '#f0f0f0', borderRadius: '100px', overflow: 'hidden' }}>
                                    <div style={{ width: `${((diagnosticStep + 1) / 3) * 100}%`, height: '100%', backgroundColor: '#3b82f6', transition: 'width 0.4s' }}></div>
                                </div>
                            </>
                        ) : (
                            <div className="fade-in">
                                <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#dcfce7', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                                    <CheckCircle size={40} />
                                </div>
                                <h2 style={{ fontSize: '2.2rem', fontWeight: '950', marginBottom: '1rem' }}>Routine Prête !</h2>
                                <p style={{ color: '#666', marginBottom: '2.5rem', lineHeight: 1.6 }}>Basé sur vos réponses, nos pharmaciens recommandent la gamme **Lierac Elite Hydratant** combinée avec une protection solaire SPF50+.</p>
                                <button
                                    onClick={() => { setIsDiagnosticOpen(false); setDiagnosticStep(0); setDiagnosticComplete(false); }}
                                    style={{ width: '100%', padding: '1.5rem', borderRadius: '100px', backgroundColor: '#000', color: '#fff', border: 'none', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer' }}
                                >
                                    Voir ma sélection personnalisée
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {/* --- MILESTONE CELEBRATION --- */}
            {isMilestoneOpen && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', zIndex: 4000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                    <div className="fade-in" style={{ backgroundColor: '#fff', width: '500px', borderRadius: '40px', padding: '4rem', position: 'relative', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
                        <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🥈</div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '950', marginBottom: '1rem', background: 'linear-gradient(135deg, #64748b, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Félicitations !</h2>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem' }}>Niveau Elite Silver Atteint</h3>
                        <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '2.5rem' }}>
                            Vous avez débloqué vos privilèges Silver ! Un bon de **15.000 F** a été ajouté à votre compte et vous bénéficiez désormais de la **livraison gratuite à vie**.
                        </p>
                        <button
                            onClick={() => setIsMilestoneOpen(false)}
                            style={{ width: '100%', padding: '1.5rem', borderRadius: '100px', backgroundColor: '#000', color: '#fff', border: 'none', fontWeight: '900', fontSize: '1.1rem', cursor: 'pointer' }}
                        >
                            Profiter de mes avantages
                        </button>
                    </div>
                </div>
            )}
            <style>{`
            .fade-in-right {animation: fadeInRight 0.4s ease-out; }
            @keyframes fadeInRight {from {opacity: 0; transform: translateX(50px); } to {opacity: 1; transform: translateX(0); } }
            .product-card:hover .p-img {transform: scale(1.05); }
            .product-card:hover .p-overlay {opacity: 1; transform: translateY(0); }
            .p-overlay {opacity: 0; transform: translateY(10px); transition: all 0.3s; }
            `}</style>
        </div >
    );
}

const Send = ({ size, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
);
