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
    friendDiscount: '15%'
};
