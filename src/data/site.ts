// Single source of truth for facts on the site. Every item is recorded with its source in
// docs/facts-ledger.md. Bilingual strings are { en, el }.
export type Lang = 'en' | 'el';
export type L = { en: string; el: string };
export const tr = (lang: Lang, s: L) => s[lang];

export const SITE_URL = 'https://panagides-dental-center.netlify.app';

export const clinic = {
  name: { en: 'Dr Adonis Panagidis Dental Center', el: 'Οδοντιατρικό Κέντρο Δρ Άδωνι Παναγίδη' },
  doctor: { en: 'Dr Adonis Panagidis', el: 'Δρ Άδωνις Παναγίδης' },
  doctorShort: { en: 'Dr Panagidis', el: 'Δρ Παναγίδης' },
  address: {
    en: ['15 Androkleous Str., Amaral 13 Building', 'Flat 403, 1061 Nicosia, Cyprus'],
    el: ['Ανδροκλέους 15, Κτίριο Amaral 13', 'Διαμέρισμα 403, 1061 Λευκωσία, Κύπρος'],
  },
  phone: { display: '+357 22 452345', href: 'tel:+35722452345' },
  phone2: { display: '+357 22 452346', href: 'tel:+35722452346' },
  whatsapp: { display: '+357 99 382880', href: 'https://wa.me/35799382880' },
  email: 'apanagidisdentalcenter@gmail.com',
  maps: 'https://www.google.com/maps/search/?api=1&query=Dr+Adonis+Panagidis+Dental+Center+Androkleous+15+Nicosia',
  social: {
    facebook: 'https://www.facebook.com/Dental-Center-Dr-Adonis-Panagidis-110588337290234/',
    instagram: 'https://www.instagram.com/dentalcentreadonispanagidis/',
    linkedin: 'https://cy.linkedin.com/in/adonis-panagidis-47b11433',
  },
  // Clinic website; weekends are not listed, so they are not shown.
  hours: [
    { days: { en: 'Monday – Thursday', el: 'Δευτέρα – Πέμπτη' }, time: '09:00 – 19:00' },
    { days: { en: 'Friday', el: 'Παρασκευή' }, time: '09:00 – 16:00' },
  ],
  // Google Business Profile, read 20 Oct 2026. Count not visible, so not shown.
  googleRating: '5.0',
  googleUrl: 'https://www.google.com/maps/search/?api=1&query=Dr+Adonis+Panagidis+Dental+Center',
};

// Clinic website (Team section). Dates exactly as published.
export const timeline: { year: string; title: L; text: L }[] = [
  { year: '1982', title: { en: 'Born in Larnaca', el: 'Γεννήθηκε στη Λάρνακα' }, text: { en: 'Cyprus.', el: 'Κύπρος.' } },
  {
    year: '2002–2008',
    title: { en: 'Dental School, University of Athens', el: 'Οδοντιατρική Σχολή, Πανεπιστήμιο Αθηνών' },
    text: { en: 'National and Kapodistrian University of Athens. Graduated as a Dental Surgeon in 2008.', el: 'Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών. Αποφοίτησε ως Χειρουργός Οδοντίατρος το 2008.' },
  },
  {
    year: '2008–2020',
    title: { en: 'Twelve years at Nicosia Dental Polyclinic', el: 'Δώδεκα χρόνια στη Nicosia Dental Polyclinic' },
    text: { en: 'General dentistry in Nicosia before opening his own practice.', el: 'Γενική οδοντιατρική στη Λευκωσία, πριν ιδρύσει το δικό του ιατρείο.' },
  },
  {
    year: '2010',
    title: { en: 'Curriculum Implantology', el: 'Curriculum Implantology' },
    text: { en: 'Intensive implantology course in Berlin and Athens; Certificate Curriculum Implantology from the University of Cologne, Germany.', el: 'Εντατικό πρόγραμμα εμφυτευματολογίας σε Βερολίνο και Αθήνα· πιστοποιητικό Curriculum Implantology από το Πανεπιστήμιο της Κολωνίας, Γερμανία.' },
  },
  {
    year: '2014',
    title: { en: 'Clinical Program in Aesthetic Dentistry', el: 'Κλινικό Πρόγραμμα Αισθητικής Οδοντιατρικής' },
    text: { en: 'Intensive clinical programme in Athens (September 2014).', el: 'Εντατικό κλινικό πρόγραμμα στην Αθήνα (Σεπτέμβριος 2014).' },
  },
  {
    year: '2015',
    title: { en: 'Member of the ITI', el: 'Μέλος του ITI' },
    text: { en: 'International Team for Implantology, a scientific network focused on implant dentistry. Member since 2015.', el: 'International Team for Implantology, επιστημονικό δίκτυο για την εμφυτευματολογία. Μέλος από το 2015.' },
  },
  {
    year: '2016',
    title: { en: 'Soft tissue management', el: 'Διαχείριση μαλακών ιστών' },
    text: { en: 'Hands-on course “Soft Tissue Management around Natural Teeth and Dental Implants”, Athens (May 2016).', el: 'Πρακτικό σεμινάριο «Soft Tissue Management around Natural Teeth and Dental Implants», Αθήνα (Μάιος 2016).' },
  },
  {
    year: '2020',
    title: { en: 'His own Dental Center', el: 'Το δικό του Οδοντιατρικό Κέντρο' },
    text: { en: 'Opened in March 2020 at Androkleous Street, Nicosia.', el: 'Άνοιξε τον Μάρτιο του 2020 στην οδό Ανδροκλέους, στη Λευκωσία.' },
  },
];

// 8 Google reviews (text from the July 2026 build; re-check before launch) and 3 testimonials
// from the clinic website. Names shortened to first name + initial. Testimonials carry no stars
// because the clinic site shows none.
export const reviews: { name: string; text: string; source: 'google' | 'clinic'; stars?: number }[] = [
  { name: 'Rajesh K.', source: 'google', stars: 5, text: 'I am very happy to have found this clinic! Dr. Adonis Panagidis took his time to do a thorough check up and make sure I understood what the issues with my teeth were. Also very happy with how the RCT was done! Thank you!' },
  { name: 'Antonis A.', source: 'clinic', text: 'Patient’s comfort is one of Dr. Panayides top priorities. I even brought my young daughter in for a filling and she actually fell asleep during the procedure! This is how gentle he is.' },
  { name: 'Kyriacos M.', source: 'google', stars: 5, text: 'The best dentist and person. Patient and professional.' },
  { name: 'Maria M.', source: 'clinic', text: 'Dr. Panayides always takes the time to explain everything. He will provide you with different dental health care options explaining the pros and cons of each plan. Dr. Panayides is very thorough and pays attention to detail.' },
  { name: 'Nektaria X.', source: 'google', stars: 5, text: 'An excellent professional and knowledgeable about his subject.' },
  { name: 'Soteris S.', source: 'google', stars: 5, text: 'Thorough and up to date health professional.' },
  { name: 'Andreas G.', source: 'clinic', text: 'I was so impressed from how professional, caring and gentle Dr. Panayides was that I have stayed with him ever since. Now my whole family are his patients.' },
  { name: 'Sunder S.', source: 'google', stars: 5, text: 'Very good treatment and helpful doctor and staff.' },
  { name: 'Elena P.', source: 'google', stars: 5, text: 'Excellent dentist.' },
  { name: 'Vakhtang J.', source: 'google', stars: 5, text: 'Nice clinic with qualified dentist.' },
  { name: 'Andreas M.', source: 'google', stars: 5, text: 'Great doctor and nice clinic.' },
];

// Technology: capability → what it means for the patient. Sources: clinic blog (CEREC, implants),
// clinic photographs + owner confirmation (scanner, microscope).
export const cerecSteps: { key: string; title: L; text: L }[] = [
  {
    key: 'scan',
    title: { en: 'Scan', el: 'Σάρωση' },
    text: { en: 'A digital impression of the tooth is taken with the intraoral scanner, without impression putty.', el: 'Λαμβάνεται ψηφιακό αποτύπωμα του δοντιού με τον ενδοστοματικό σαρωτή, χωρίς αποτυπωτικό υλικό.' },
  },
  {
    key: 'design',
    title: { en: 'Design', el: 'Σχεδιασμός' },
    text: { en: 'Design software proposes the restoration using artificial intelligence. The dentist reviews and approves the design before anything is made.', el: 'Το λογισμικό σχεδιασμού προτείνει την αποκατάσταση με τη βοήθεια τεχνητής νοημοσύνης. Ο οδοντίατρος ελέγχει και εγκρίνει τον σχεδιασμό πριν από την κατασκευή.' },
  },
  {
    key: 'mill',
    title: { en: 'Mill', el: 'Κατασκευή' },
    text: { en: 'The CEREC MC XL Premium mills the crown, veneer or inlay from a block of ceramic or zirconia, here in the clinic. No outside laboratory.', el: 'Το CEREC MC XL Premium κατασκευάζει τη στεφάνη, την όψη ή το ένθετο από κεραμικό ή ζιρκόνιο, εδώ στο ιατρείο. Χωρίς εξωτερικό εργαστήριο.' },
  },
  {
    key: 'fit',
    title: { en: 'Fit', el: 'Τοποθέτηση' },
    text: { en: 'The final restoration is fitted, often within one to two days and in some cases the same day. No temporary crown in between.', el: 'Η τελική αποκατάσταση τοποθετείται, συχνά μέσα σε μία με δύο ημέρες και σε ορισμένες περιπτώσεις την ίδια μέρα. Χωρίς προσωρινή στεφάνη στο ενδιάμεσο.' },
  },
];

export const implantSteps: { title: L; text: L }[] = [
  {
    title: { en: 'Records', el: 'Δεδομένα' },
    text: { en: 'A 3D X-ray and intraoral scans of your teeth.', el: 'Τρισδιάστατη ακτινογραφία και ενδοστοματικές σαρώσεις των δοντιών σας.' },
  },
  {
    title: { en: 'Digital plan', el: 'Ψηφιακός σχεδιασμός' },
    text: { en: 'Both are combined in planning software, where the implant position is decided before surgery.', el: 'Συνδυάζονται σε λογισμικό σχεδιασμού, όπου η θέση του εμφυτεύματος αποφασίζεται πριν από την επέμβαση.' },
  },
  {
    title: { en: 'Surgical guide', el: 'Χειρουργικός οδηγός' },
    text: { en: 'The plan is transferred to the mouth with a 3D-printed guide, for accuracy and a shorter procedure.', el: 'Ο σχεδιασμός μεταφέρεται στο στόμα με τρισδιάστατα εκτυπωμένο οδηγό, για ακρίβεια και συντομότερη επέμβαση.' },
  },
  {
    title: { en: 'Healing, then the tooth', el: 'Επούλωση και το νέο δόντι' },
    text: { en: 'Usually about three months later the permanent crown, bridge or denture is fitted on the implant.', el: 'Συνήθως περίπου τρεις μήνες αργότερα τοποθετείται η μόνιμη στεφάνη, γέφυρα ή οδοντοστοιχία πάνω στο εμφύτευμα.' },
  },
];
