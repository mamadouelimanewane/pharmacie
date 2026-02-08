export const MOCK_PRODUCTS = [
    { id: 1, name: 'Doliprane 1000mg', category: 'Antalgique', stock: 245, minStock: 50, price: 2500, status: 'Normal', code: '3400930001', location: 'A-12', labs: 'Sanofi' },
    { id: 2, name: 'Amoxicilline 1g', category: 'Antibiotique', stock: 12, minStock: 25, price: 4500, status: 'Critique', code: '3400930002', location: 'Frigo-1', labs: 'Biogaran' },
    { id: 3, name: 'Spasfon Lyoc', category: 'Antispasmodique', stock: 85, minStock: 30, price: 3200, status: 'Normal', code: '3400930003', location: 'B-04', labs: 'Teva' },
    { id: 4, name: 'Maxilase Sirop', category: 'ORL', stock: 4, minStock: 15, price: 3800, status: 'Rupture Proche', code: '3400930004', location: 'A-08', labs: 'Sanofi' },
    { id: 5, name: 'Gaviscon Pro', category: 'Gastrique', stock: 110, minStock: 25, price: 5500, status: 'Normal', code: '3400930005', location: 'C-15', labs: 'Reckitt' },
    { id: 6, name: 'Aerius 5mg', category: 'Antihistaminique', stock: 32, minStock: 15, price: 2800, status: 'Normal', code: '3400930006', location: 'B-22', labs: 'MSD' },
    { id: 7, name: 'Ventoline Inhalateur', category: 'Asthme', stock: 18, minStock: 20, price: 4200, status: 'Critique', code: '3400930007', location: 'A-01', labs: 'GSK' },
    { id: 8, name: 'Eludril Solution', category: 'Hygiène Buccale', stock: 45, minStock: 10, price: 4800, status: 'Normal', code: '3400930008', location: 'P-05', labs: 'Pierre Fabre' },
    { id: 9, name: 'Biafine Émulsion', category: 'Dermatologie', stock: 60, minStock: 15, price: 6200, status: 'Normal', code: '3400930009', location: 'P-12', labs: 'Johnson & Johnson' },
    { id: 10, name: 'Magné B6', category: 'Complément', stock: 120, minStock: 40, price: 7500, status: 'Normal', code: '3400930010', location: 'C-02', labs: 'Sanofi' }
];

export const MOCK_PATIENTS = [
    { id: 1, name: 'Abdoulaye Diop', dob: '12/05/1965', nss: '1 65 05 99 001 002 45', phone: '77 634 56 78', lastVisit: '02/02/2026', risk: 'None', email: 'a.diop@email.sn', mutuelle: 'IPM Dakar' },
    { id: 2, name: 'Fatou Sow', dob: '07/11/1984', nss: '2 84 11 99 001 003 12', phone: '78 123 54 32', lastVisit: '05/02/2026', risk: 'Allergie Pénicilline', email: 'fatou.sow@orange.sn', mutuelle: 'AXA Sénégal' },
    { id: 3, name: 'Mamadou Kane', dob: '22/01/1980', nss: '1 80 01 99 001 004 88', phone: '76 442 21 13', lastVisit: '07/02/2026', risk: 'Diabète Type 2', email: 'mkane@pro.sn', mutuelle: 'IPRES' },
    { id: 4, name: 'Awa Ndiaye', dob: '30/09/1992', nss: '2 92 09 99 001 005 55', phone: '70 456 78 90', lastVisit: '01/02/2026', risk: 'Hypertension', email: 'awa.ndiaye@gmail.com', mutuelle: 'NSIA Assurances' },
    { id: 5, name: 'Ousmane Gueye', dob: '15/03/1975', nss: '1 75 03 99 001 006 22', phone: '77 223 34 45', lastVisit: '08/02/2026', risk: 'None', email: 'ogueye@sentel.sn', mutuelle: 'CNSS' }
];

export const MOCK_PRESCRIPTIONS = [
    { id: 1, patient: 'Abdoulaye Diop', doctor: 'Dr. Thiam', date: '08/02/2026', status: 'En attente', items: 3, priority: 'Normal', type: 'Renouvellement' },
    { id: 2, patient: 'Fatou Sow', doctor: 'Dr. Mbaye', date: '08/02/2026', status: 'En cours', items: 5, priority: 'Urgent', type: 'Initiale' },
    { id: 3, patient: 'Mamadou Kane', doctor: 'Dr. Fall', date: '07/02/2026', status: 'Prêt', items: 1, priority: 'Normal', type: 'Renouvellement' },
    { id: 4, patient: 'Awa Ndiaye', doctor: 'Dr. Diallo', date: '07/02/2026', status: 'Terminé', items: 4, priority: 'Normal', type: 'Initiale' },
    { id: 5, patient: 'Ousmane Gueye', doctor: 'Dr. Ba', date: '08/02/2026', status: 'À préparer', items: 2, priority: 'Normal', type: 'Initiale' }
];

export const MOCK_ORDERS = [
    { id: 'CC-8942', patient: 'Mariama Ba', time: '14:30', status: 'À préparer', items: 4, type: 'Ordonnance numérisée', total: 15250 },
    { id: 'CC-8943', patient: 'Ibrahima Fall', time: '15:15', status: 'En préparation', items: 2, type: 'Parapharmacie', total: 8500 },
    { id: 'CC-8944', patient: 'Coumba Gawlo', time: '16:00', status: 'Prêt', items: 3, type: 'Mixte', total: 45000 },
    { id: 'CC-8945', patient: 'Modou Lo', time: '16:30', status: 'Prêt', items: 1, type: 'Ordonnance numérisée', total: 12000 }
];

export const MOCK_STAFF = [
    { id: 1, name: 'Dr. Mamadou Elimane Wane', role: 'Pharmacien Titulaire', status: 'Présent', shift: '08:00 - 18:00', initials: 'MW' },
    { id: 2, name: 'Aminata Diallo', role: 'Préparatrice', status: 'Présente', shift: '09:00 - 17:00', initials: 'AD' },
    { id: 3, name: 'Cheikh Tidiane Sy', role: 'Apprenti', status: 'Absent', shift: 'Repos', reason: 'Formation', initials: 'CS' },
    { id: 4, name: 'Dr. Ramatoulaye Faye', role: 'Pharmacien Adjoint', status: 'Présente', shift: '12:00 - 20:00', initials: 'RF' }
];
