export const BOUTIQUE_PRODUCTS = [
    {
        id: 'p1',
        name: 'Serum Éclat Vitamine C',
        brand: 'Lierac Elite',
        category: 'Cosmétiques',
        price: 45000,
        salePrice: 35000,
        isFlash: true,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400',
        description: 'Un serum puissant pour illuminer le teint et réduire les signes de fatigue.',
        stock: 24,
        storeStock: 12,
        rating: 4.8,
        reviews: 128
    },
    {
        id: 'p2',
        name: 'Crème Hydratante Riche',
        brand: 'Avene XeraCalm',
        category: 'Cosmétiques',
        price: 18500,
        image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400',
        description: 'Soin apaisant pour les peaux très sèches et sujettes aux démangeaisons.',
        stock: 56,
        storeStock: 100,
        rating: 4.9,
        reviews: 312
    },
    {
        id: 'p3',
        name: 'Complexe Multivitaminé 60G',
        brand: 'NutriElite',
        category: 'Diététique',
        price: 12000,
        image: 'https://images.unsplash.com/photo-1584017947486-5903e1127fe2?auto=format&fit=crop&q=80&w=400',
        description: 'Énergie naturelle et renforcement du système immunitaire.',
        stock: 120,
        storeStock: 45,
        rating: 4.5,
        reviews: 85
    },
    {
        id: 'p4',
        name: 'Eau de Parfum "Santal Royal"',
        brand: 'Guerlain',
        category: 'Parfums',
        price: 115000,
        image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400',
        description: 'Une fragrance mystérieuse et profonde aux notes de bois de santal.',
        stock: 8,
        storeStock: 2,
        rating: 5.0,
        reviews: 42
    },
    {
        id: 'p5',
        name: 'Huile de Massage Amande Douce',
        brand: 'PharmaNature',
        category: 'Bien-être',
        price: 7500,
        image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400',
        description: 'Huile 100% bio pour une peau douce et nourrie en profondeur.',
        stock: 85,
        rating: 4.7,
        reviews: 156
    },
    {
        id: 'p6',
        name: 'Proteine Whey Iso-Gold',
        brand: 'SportElite',
        category: 'Diététique',
        price: 35000,
        image: 'https://images.unsplash.com/photo-1593094478221-917379638652?auto=format&fit=crop&q=80&w=400',
        description: 'Isolat de protéine de haute qualité pour la récupération musculaire.',
        stock: 30,
        rating: 4.6,
        reviews: 210
    }
];

export const BOUTIQUE_CATEGORIES = [
    { id: 'all', label: 'Tous les produits', count: 452 },
    { id: 'cosmetics', label: 'Cosmétiques', count: 184 },
    { id: 'diet', label: 'Diététique', count: 96 },
    { id: 'parfum', label: 'Parfums', count: 32 },
    { id: 'wellness', label: 'Bien-être', count: 140 }
];

export const FLASH_SALE_CONFIG = {
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 5).toISOString(), // 5 hours from now
    discountLabel: '-25%'
};

export const REFERRAL_PROGRAM = {
    rewardAmount: 5000,
    friendDiscount: '15%',
    tiers: [
        { name: 'Elite Silver', invites: 3, reward: 'Bon de 15.000 F', perks: 'Livraison gratuite à vie' },
        { name: 'Elite Gold', invites: 10, reward: 'Bon de 60.000 F', perks: 'Accès avant-première aux nouveautés' },
        { name: 'Elite Platinum', invites: 25, reward: 'Coffret Prestige Offert', perks: 'Conseiller dermo-esthétique dédié' }
    ]
};

export const MOCK_ARTICLES = [
    {
        id: 1,
        title: "Routine Solaire : Protéger sa peau à Dakar",
        category: "Conseils Experts",
        image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=400",
        date: "08 Fév 2026",
        readTime: "5 min"
    },
    {
        id: 2,
        title: "Vitamines & Énergie : Le guide complet",
        category: "Santé",
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=400",
        date: "05 Fév 2026",
        readTime: "8 min"
    },
    {
        id: 3,
        title: "Anti-Âge : À quel âge commencer ?",
        category: "Dermato",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=400",
        date: "10 Fév 2026",
        readTime: "6 min"
    }
];

export const SKIN_DIAGNOSTIC_QUESTIONS = [
    {
        id: 'type',
        question: "Quel est votre type de peau ?",
        options: [
            { label: "Sèche", value: "dry" },
            { label: "Grasse", value: "oily" },
            { label: "Mixte", value: "mixed" },
            { label: "Sensible", value: "sensitive" }
        ]
    },
    {
        id: 'concern',
        question: "Quelle est votre préoccupation principale ?",
        options: [
            { label: "Rides & Fermeté", value: "antiage" },
            { label: "Imperfections", value: "acne" },
            { label: "Taches & Éclat", value: "spots" },
            { label: "Hydratation", value: "hydration" }
        ]
    },
    {
        id: 'environment',
        question: "Votre environnement quotidien ?",
        options: [
            { label: "Ville / Pollution", value: "urban" },
            { label: "Exposition Solaire", value: "sun" },
            { label: "Bureau / Clim", value: "climatized" },
            { label: "Air Sec", value: "dry_air" }
        ]
    }
];

export const AI_ASSISTANT_CONFIG = {
    starters: [
        "Aidez-moi à trouver une routine anti-âge",
        "Je cherche un cadeau pour homme",
        "J'ai la peau sèche, que me conseillez-vous ?",
        "Suivi de ma commande #4521"
    ]
};

export const FINANCIAL_STATS = {
    monthly: {
        web: 4500000,
        store: 12800000,
        growth: '+15%'
    },
    breakdown: [
        { label: 'Cosmétiques', value: 45, color: '#3b82f6' },
        { label: 'Médicaments', value: 30, color: '#10b981' },
        { label: 'Parapharmacie', value: 15, color: '#f59e0b' },
        { label: 'Services', value: 10, color: '#ef4444' }
    ]
};
