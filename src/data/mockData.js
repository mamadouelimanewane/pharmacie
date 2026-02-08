export const MOCK_PRODUCTS = [
    { id: 1, name: 'Doliprane 1000mg', category: 'Antalgique', stock: 245, minStock: 50, price: 3.10, status: 'Normal', code: '3400930001', location: 'A-12', labs: 'Sanofi' },
    { id: 2, name: 'Amoxicilline 1g', category: 'Antibiotique', stock: 12, minStock: 25, price: 6.80, status: 'Critique', code: '3400930002', location: 'Frigo-1', labs: 'Biogaran' },
    { id: 3, name: 'Spasfon Lyoc', category: 'Antispasmodique', stock: 85, minStock: 30, price: 4.50, status: 'Normal', code: '3400930003', location: 'B-04', labs: 'Teva' },
    { id: 4, name: 'Maxilase Sirop', category: 'ORL', stock: 4, minStock: 15, price: 5.20, status: 'Rupture Proche', code: '3400930004', location: 'A-08', labs: 'Sanofi' },
    { id: 5, name: 'Gaviscon Pro', category: 'Gastrique', stock: 110, minStock: 25, price: 7.90, status: 'Normal', code: '3400930005', location: 'C-15', labs: 'Reckitt' },
    { id: 6, name: 'Aerius 5mg', category: 'Antihistaminique', stock: 32, minStock: 15, price: 4.10, status: 'Normal', code: '3400930006', location: 'B-22', labs: 'MSD' },
    { id: 7, name: 'Ventoline Inhalateur', category: 'Asthme', stock: 18, minStock: 20, price: 5.50, status: 'Critique', code: '3400930007', location: 'A-01', labs: 'GSK' },
    { id: 8, name: 'Eludril Solution', category: 'Hygiène Buccale', stock: 45, minStock: 10, price: 6.20, status: 'Normal', code: '3400930008', location: 'P-05', labs: 'Pierre Fabre' },
    { id: 9, name: 'Biafine Émulsion', category: 'Dermatologie', stock: 60, minStock: 15, price: 8.40, status: 'Normal', code: '3400930009', location: 'P-12', labs: 'Johnson & Johnson' },
    { id: 10, name: 'Magné B6', category: 'Complément', stock: 120, minStock: 40, price: 9.90, status: 'Normal', code: '3400930010', location: 'C-02', labs: 'Sanofi' }
];

export const MOCK_PATIENTS = [
    { id: 1, name: 'Jean Dupont', dob: '12/05/1965', nss: '1 65 05 75 001 002 45', phone: '06 12 34 56 78', lastVisit: '02/02/2026', risk: 'None', email: 'j.dupont@email.com', mutuelle: 'Harmonie Mutuelle' },
    { id: 2, name: 'Marie Curie', dob: '07/11/1984', nss: '2 84 11 75 001 003 12', phone: '06 98 76 54 32', lastVisit: '05/02/2026', risk: 'Allergie Pénicilline', email: 'm.curie@science.fr', mutuelle: 'MGEN' },
    { id: 3, name: 'Pierre Martin', dob: '22/01/1980', nss: '1 80 01 92 001 004 88', phone: '07 44 22 11 33', lastVisit: '07/02/2026', risk: 'Diabète Type 2', email: 'pmartin@pro.net', mutuelle: 'Alan' },
    { id: 4, name: 'Sophie Bernard', dob: '30/09/1992', nss: '2 92 09 13 001 005 55', phone: '01 45 67 89 00', lastVisit: '01/02/2026', risk: 'Hypertension', email: 's.bernard@gmail.com', mutuelle: 'AXA' },
    { id: 5, name: 'Lucie Verne', dob: '15/03/1975', nss: '2 75 03 44 001 006 22', phone: '06 22 33 44 55', lastVisit: '08/02/2026', risk: 'Grossesse', email: 'lucie@verne.fr', mutuelle: 'Malakoff Humanis' }
];

export const MOCK_PRESCRIPTIONS = [
    { id: 1, patient: 'Jean Dupont', doctor: 'Dr. Faure', date: '08/02/2026', status: 'En attente', items: 3, priority: 'Normal', type: 'Renouvellement' },
    { id: 2, patient: 'Marie Curie', doctor: 'Dr. Pasteur', date: '08/02/2026', status: 'En cours', items: 5, priority: 'Urgent', type: 'Initiale' },
    { id: 3, patient: 'Pierre Martin', doctor: 'Dr. Lucas', date: '07/02/2026', status: 'Prêt', items: 1, priority: 'Normal', type: 'Renouvellement' },
    { id: 4, patient: 'Sophie Bernard', doctor: 'Dr. Girard', date: '07/02/2026', status: 'Terminé', items: 4, priority: 'Normal', type: 'Initiale' },
    { id: 5, patient: 'Lucie Verne', doctor: 'Dr. Martin', date: '08/02/2026', status: 'À préparer', items: 2, priority: 'Normal', type: 'Initiale' }
];

export const MOCK_ORDERS = [
    { id: 'CC-8942', patient: 'Alice Robert', time: '14:30', status: 'À préparer', items: 4, type: 'Ordonnance numérisée', total: 42.50 },
    { id: 'CC-8943', patient: 'Marc Vasseur', time: '15:15', status: 'En préparation', items: 2, type: 'Parapharmacie', total: 15.20 },
    { id: 'CC-8944', patient: 'Sophie Laine', time: '16:00', status: 'Prêt', items: 3, type: 'Mixte', total: 89.90 },
    { id: 'CC-8945', patient: 'Lucie Verne', time: '16:30', status: 'Prêt', items: 1, type: 'Ordonnance numérisée', total: 12.00 }
];

export const MOCK_STAFF = [
    { id: 1, name: 'Dr. Martin Durand', role: 'Pharmacien Titulaire', status: 'Présent', shift: '08:00 - 18:00', initials: 'MD' },
    { id: 2, name: 'Julie Leroy', role: 'Préparatrice', status: 'Présente', shift: '09:00 - 17:00', initials: 'JL' },
    { id: 3, name: 'Thomas Bernard', role: 'Apprenti', status: 'Absent', shift: 'Repos', reason: 'Formation', initials: 'TB' },
    { id: 4, name: 'Dr. Sarah Meyer', role: 'Pharmacien Adjoint', status: 'Présente', shift: '12:00 - 20:00', initials: 'SM' }
];
