// Treatments as published by the clinic (website services list and its own blog articles on
// CEREC and dental implants). See docs/facts-ledger.md. Nothing here is generic filler: each
// line traces to a clinic source.
import type { L } from './site';

export interface Treatment {
  slug: string;
  name: L;
  summary: L;
  intro: L[];
  includes: L[];
  steps?: { title: L; text: L }[];
  faq: { q: L; a: L }[];
  image?: string;
  related: string[];
}

export const treatments: Treatment[] = [
  {
    slug: 'dental-implants',
    name: { en: 'Dental implants', el: 'Οδοντικά εμφυτεύματα' },
    summary: {
      en: 'Replacing missing teeth with implants, planned digitally and placed with a 3D-printed guide.',
      el: 'Αντικατάσταση δοντιών που λείπουν με εμφυτεύματα, με ψηφιακό σχεδιασμό και τρισδιάστατα εκτυπωμένο οδηγό.',
    },
    intro: [
      {
        en: 'A dental implant is a small titanium screw placed in the jawbone, where it takes the place of a missing tooth’s root. Once it has healed, it supports a crown, a bridge or a denture.',
        el: 'Το οδοντικό εμφύτευμα είναι μια μικρή βίδα τιτανίου που τοποθετείται στο οστό της γνάθου και παίρνει τη θέση της ρίζας ενός δοντιού που λείπει. Μετά την επούλωση στηρίζει στεφάνη, γέφυρα ή οδοντοστοιχία.',
      },
      {
        en: 'Dr Panagidis has trained in implantology since 2010 (Curriculum Implantology, University of Cologne) and has been a member of the International Team for Implantology (ITI) since 2015.',
        el: 'Ο Δρ Παναγίδης εκπαιδεύεται στην εμφυτευματολογία από το 2010 (Curriculum Implantology, Πανεπιστήμιο της Κολωνίας) και είναι μέλος του International Team for Implantology (ITI) από το 2015.',
      },
    ],
    includes: [
      { en: 'Surgical placement of implants', el: 'Χειρουργική τοποθέτηση εμφυτευμάτων' },
      { en: 'Crowns, bridges and dentures supported by implants', el: 'Στεφάνες, γέφυρες και οδοντοστοιχίες πάνω σε εμφυτεύματα' },
      { en: 'Computer-guided implant surgery', el: 'Καθοδηγούμενη χειρουργική εμφυτευμάτων με υπολογιστή' },
      { en: 'Bone augmentation and sinus lift where bone is insufficient', el: 'Οστική αναπλήρωση και ανύψωση ιγμορείου όταν το οστό δεν επαρκεί' },
    ],
    steps: [
      {
        title: { en: 'Consultation and records', el: 'Εξέταση και δεδομένα' },
        text: { en: 'An examination, a 3D X-ray and intraoral scans show the bone and the teeth around the gap.', el: 'Εξέταση, τρισδιάστατη ακτινογραφία και ενδοστοματικές σαρώσεις δείχνουν το οστό και τα δόντια γύρω από το κενό.' },
      },
      {
        title: { en: 'Digital planning', el: 'Ψηφιακός σχεδιασμός' },
        text: { en: 'The X-ray and scans are combined in planning software to choose the implant’s position before surgery.', el: 'Η ακτινογραφία και οι σαρώσεις συνδυάζονται σε λογισμικό σχεδιασμού, για να επιλεγεί η θέση του εμφυτεύματος πριν από την επέμβαση.' },
      },
      {
        title: { en: 'Guided placement', el: 'Καθοδηγούμενη τοποθέτηση' },
        text: { en: 'A 3D-printed surgical guide transfers the plan to the mouth, which improves accuracy and shortens the procedure, especially when several implants are placed.', el: 'Ένας τρισδιάστατα εκτυπωμένος χειρουργικός οδηγός μεταφέρει τον σχεδιασμό στο στόμα, βελτιώνοντας την ακρίβεια και μειώνοντας τη διάρκεια, ιδιαίτερα όταν τοποθετούνται πολλά εμφυτεύματα.' },
      },
      {
        title: { en: 'The new tooth', el: 'Το νέο δόντι' },
        text: { en: 'Usually about three months after placement, the permanent restoration is fitted on the implant.', el: 'Συνήθως περίπου τρεις μήνες μετά την τοποθέτηση, εφαρμόζεται η μόνιμη αποκατάσταση πάνω στο εμφύτευμα.' },
      },
    ],
    faq: [
      {
        q: { en: 'How long does it take?', el: 'Πόσο διαρκεί η θεραπεία;' },
        a: { en: 'Usually about three months pass between placing the implant and fitting the permanent tooth. In some cases an implant can be placed right after an extraction, and a fixed temporary tooth can be fitted at the same time.', el: 'Συνήθως μεσολαβούν περίπου τρεις μήνες από την τοποθέτηση του εμφυτεύματος μέχρι το μόνιμο δόντι. Σε ορισμένες περιπτώσεις το εμφύτευμα μπορεί να τοποθετηθεί αμέσως μετά την εξαγωγή, μαζί με ακίνητο προσωρινό δόντι.' },
      },
      {
        q: { en: 'What if there isn’t enough bone?', el: 'Τι γίνεται αν δεν υπάρχει αρκετό οστό;' },
        a: { en: 'Bone can be rebuilt before or during treatment. In the upper back jaw, a sinus lift may be needed to increase the bone available for an implant.', el: 'Το οστό μπορεί να αναπλαστεί πριν ή κατά τη θεραπεία. Στο πίσω μέρος της άνω γνάθου μπορεί να χρειαστεί ανύψωση ιγμορείου, ώστε να αυξηθεί το διαθέσιμο οστό.' },
      },
      {
        q: { en: 'Can implants hold a full denture?', el: 'Μπορούν τα εμφυτεύματα να στηρίξουν ολική οδοντοστοιχία;' },
        a: { en: 'Yes. The clinic provides crowns, bridges and dentures supported by implants. Which suits you is decided after examination and planning.', el: 'Ναι. Το ιατρείο προσφέρει στεφάνες, γέφυρες και οδοντοστοιχίες πάνω σε εμφυτεύματα. Η κατάλληλη λύση αποφασίζεται μετά την εξέταση και τον σχεδιασμό.' },
      },
    ],
    image: 'scanner',
    related: ['oral-surgery', 'prosthodontics', 'same-day-crowns-and-veneers'],
  },
  {
    slug: 'same-day-crowns-and-veneers',
    name: { en: 'Crowns & veneers in 1–2 days', el: 'Στεφάνες & όψεις σε 1–2 ημέρες' },
    summary: {
      en: 'Ceramic and zirconia restorations designed and milled in the clinic with CEREC, often within one to two days.',
      el: 'Κεραμικές αποκαταστάσεις και αποκαταστάσεις ζιρκονίου, σχεδιασμένες και κατασκευασμένες στο ιατρείο με CEREC, συχνά μέσα σε μία με δύο ημέρες.',
    },
    intro: [
      {
        en: 'With the CEREC MC XL Premium milling unit, crowns, veneers and inlays are made in the clinic rather than sent to an outside laboratory. What once took one to two weeks and several appointments can often be completed within one to two days, and in some cases the same day.',
        el: 'Με τη μονάδα κατασκευής CEREC MC XL Premium, οι στεφάνες, οι όψεις και τα ένθετα κατασκευάζονται μέσα στο ιατρείο αντί να αποστέλλονται σε εξωτερικό εργαστήριο. Ό,τι παλαιότερα απαιτούσε μία με δύο εβδομάδες και αρκετά ραντεβού, συχνά ολοκληρώνεται μέσα σε μία με δύο ημέρες και σε ορισμένες περιπτώσεις την ίδια μέρα.',
      },
      {
        en: 'Because the final restoration is ready so quickly, there is no need for a temporary crown and a return visit to swap it.',
        el: 'Επειδή η τελική αποκατάσταση είναι έτοιμη τόσο γρήγορα, δεν χρειάζεται προσωρινή στεφάνη ούτε επιπλέον επίσκεψη για την αντικατάστασή της.',
      },
    ],
    includes: [
      { en: 'All-ceramic crowns, veneers, inlays and onlays', el: 'Ολοκεραμικές στεφάνες, όψεις, ένθετα και επένθετα' },
      { en: 'Small all-ceramic bridges', el: 'Μικρές ολοκεραμικές γέφυρες' },
      { en: 'Zirconia crowns and small bridges', el: 'Στεφάνες και μικρές γέφυρες ζιρκονίου' },
    ],
    faq: [
      {
        q: { en: 'Is a same-day crown always possible?', el: 'Είναι πάντα εφικτή η στεφάνη την ίδια μέρα;' },
        a: { en: 'Not always. Restorations are often completed within one to two days and in some cases the same day; the dentist will tell you what to expect for your tooth.', el: 'Όχι πάντα. Οι αποκαταστάσεις ολοκληρώνονται συχνά μέσα σε μία με δύο ημέρες και σε ορισμένες περιπτώσεις την ίδια μέρα· ο οδοντίατρος θα σας εξηγήσει τι ισχύει για το δικό σας δόντι.' },
      },
      {
        q: { en: 'Is the design made by a computer?', el: 'Τον σχεδιασμό τον κάνει υπολογιστής;' },
        a: { en: 'The software proposes a design with the help of artificial intelligence after the digital impression. The dentist checks and approves it before it is milled.', el: 'Μετά το ψηφιακό αποτύπωμα, το λογισμικό προτείνει σχεδιασμό με τη βοήθεια τεχνητής νοημοσύνης. Ο οδοντίατρος τον ελέγχει και τον εγκρίνει πριν από την κατασκευή.' },
      },
      {
        q: { en: 'Do I need impression putty?', el: 'Χρειάζεται αποτυπωτικό υλικό;' },
        a: { en: 'The impression is taken digitally with the intraoral scanner.', el: 'Το αποτύπωμα λαμβάνεται ψηφιακά με τον ενδοστοματικό σαρωτή.' },
      },
    ],
    image: 'restorations',
    related: ['aesthetic-dentistry', 'prosthodontics', 'dental-implants'],
  },
  {
    slug: 'aesthetic-dentistry',
    name: { en: 'Aesthetic dentistry', el: 'Αισθητική οδοντιατρική' },
    summary: {
      en: 'Whitening, porcelain veneers, all-ceramic crowns and tooth-coloured composite to improve how your smile looks.',
      el: 'Λεύκανση, όψεις πορσελάνης, ολοκεραμικές στεφάνες και σύνθετη ρητίνη για την εμφάνιση του χαμόγελου.',
    },
    intro: [
      {
        en: 'Small changes in colour, shape or alignment can change how a smile looks. The options range from whitening, to bonding tooth-coloured composite directly onto the teeth, to porcelain veneers and all-ceramic crowns.',
        el: 'Μικρές αλλαγές στο χρώμα, στο σχήμα ή στη θέση των δοντιών μπορούν να αλλάξουν την εμφάνιση του χαμόγελου. Οι επιλογές κυμαίνονται από τη λεύκανση και τη σύνθετη ρητίνη που εφαρμόζεται απευθείας στα δόντια, μέχρι τις όψεις πορσελάνης και τις ολοκεραμικές στεφάνες.',
      },
      {
        en: 'Dr Panagidis completed a clinical programme in aesthetic dentistry in Athens in 2014. Ceramic veneers and crowns can be made in the clinic with CEREC, often within one to two days.',
        el: 'Ο Δρ Παναγίδης ολοκλήρωσε κλινικό πρόγραμμα αισθητικής οδοντιατρικής στην Αθήνα το 2014. Οι κεραμικές όψεις και στεφάνες μπορούν να κατασκευαστούν στο ιατρείο με CEREC, συχνά μέσα σε μία με δύο ημέρες.',
      },
    ],
    includes: [
      { en: 'Teeth whitening in the clinic or at home', el: 'Λεύκανση δοντιών στο ιατρείο ή στο σπίτι' },
      { en: 'Porcelain veneers and all-ceramic crowns', el: 'Όψεις πορσελάνης και ολοκεραμικές στεφάνες' },
      { en: 'Direct composite restorations to reshape and refine', el: 'Άμεσες αποκαταστάσεις σύνθετης ρητίνης για αναμόρφωση' },
    ],
    faq: [
      {
        q: { en: 'Whitening in the clinic or at home?', el: 'Λεύκανση στο ιατρείο ή στο σπίτι;' },
        a: { en: 'Both are available. Which suits you depends on your teeth; it is discussed at your appointment.', el: 'Προσφέρονται και οι δύο. Η κατάλληλη επιλογή εξαρτάται από τα δόντια σας και συζητείται στο ραντεβού.' },
      },
      {
        q: { en: 'Veneers or composite?', el: 'Όψεις ή σύνθετη ρητίνη;' },
        a: { en: 'Composite is bonded directly onto the tooth; porcelain veneers are made in ceramic. Dr Panagidis explains the pros and cons of each option for your smile.', el: 'Η σύνθετη ρητίνη εφαρμόζεται απευθείας στο δόντι· οι όψεις πορσελάνης κατασκευάζονται από κεραμικό. Ο Δρ Παναγίδης εξηγεί τα υπέρ και τα κατά κάθε επιλογής για το δικό σας χαμόγελο.' },
      },
    ],
    image: 'restorations',
    related: ['same-day-crowns-and-veneers', 'general-dentistry', 'prosthodontics'],
  },
  {
    slug: 'general-dentistry',
    name: { en: 'General dentistry', el: 'Γενική οδοντιατρική' },
    summary: {
      en: 'Check-ups, X-rays, cleaning, white fillings, root canal treatment and extractions for the whole family.',
      el: 'Έλεγχοι, ακτινογραφίες, καθαρισμός, λευκά σφραγίσματα, απονευρώσεις και εξαγωγές για όλη την οικογένεια.',
    },
    intro: [
      {
        en: 'Routine care keeps small problems small. A check-up combines a clinical examination with X-rays, including a panoramic X-ray when it is needed, followed by cleaning and any treatment you choose.',
        el: 'Η τακτική φροντίδα κρατά τα μικρά προβλήματα μικρά. Ο έλεγχος περιλαμβάνει κλινική εξέταση και ακτινογραφίες, μαζί με πανοραμική ακτινογραφία όταν χρειάζεται, και ακολουθεί καθαρισμός και όποια θεραπεία επιλέξετε.',
      },
      {
        en: 'Many patients are families who have stayed with Dr Panagidis for years. The clinic is a GESY (GHS) provider: ask when booking whether your treatment is covered.',
        el: 'Πολλοί ασθενείς είναι οικογένειες που παραμένουν στον Δρ Παναγίδη για χρόνια. Το ιατρείο είναι πάροχος του ΓεΣΥ: ρωτήστε κατά την κράτηση αν η θεραπεία σας καλύπτεται.',
      },
    ],
    includes: [
      { en: 'Clinical and X-ray examination, panoramic X-rays', el: 'Κλινική και ακτινογραφική εξέταση, πανοραμικές ακτινογραφίες' },
      { en: 'Scaling and polishing', el: 'Αποτρύγωση και στίλβωση' },
      { en: 'Tooth-coloured composite fillings', el: 'Λευκά σφραγίσματα σύνθετης ρητίνης' },
      { en: 'Root canal treatment', el: 'Απονεύρωση (ενδοδοντική θεραπεία)' },
      { en: 'Extractions', el: 'Εξαγωγές δοντιών' },
    ],
    faq: [
      {
        q: { en: 'What happens in root canal treatment?', el: 'Τι γίνεται στην απονεύρωση;' },
        a: { en: 'Under local anaesthesia, the infected or inflamed tissue inside the tooth is removed, the root canals are carefully cleaned, and they are then sealed so that bacteria cannot get back in. The aim is to keep your natural tooth.', el: 'Με τοπική αναισθησία αφαιρείται ο μολυσμένος ή φλεγμαίνων ιστός από το εσωτερικό του δοντιού, οι ριζικοί σωλήνες καθαρίζονται προσεκτικά και στη συνέχεια σφραγίζονται, ώστε να μην εισέλθουν ξανά βακτήρια. Ο στόχος είναι να διατηρηθεί το φυσικό σας δόντι.' },
      },
      {
        q: { en: 'Is the clinic part of GESY?', el: 'Συμμετέχει το ιατρείο στο ΓεΣΥ;' },
        a: { en: 'Yes, the clinic is a GESY (GHS) provider. Coverage depends on the treatment, so please ask when you book.', el: 'Ναι, το ιατρείο είναι πάροχος του ΓεΣΥ. Η κάλυψη εξαρτάται από τη θεραπεία, οπότε ρωτήστε κατά την κράτηση.' },
      },
      {
        q: { en: 'Do you see children?', el: 'Εξετάζετε παιδιά;' },
        a: { en: 'Yes. Patients describe bringing their children, and whole families are treated at the clinic.', el: 'Ναι. Ασθενείς αναφέρουν ότι φέρνουν τα παιδιά τους και ολόκληρες οικογένειες παρακολουθούνται στο ιατρείο.' },
      },
    ],
    image: 'room-1',
    related: ['aesthetic-dentistry', 'oral-surgery', 'prosthodontics'],
  },
  {
    slug: 'oral-surgery',
    name: { en: 'Oral surgery', el: 'Στοματική χειρουργική' },
    summary: {
      en: 'Surgical extractions including wisdom teeth, bone augmentation, sinus lift and crown lengthening.',
      el: 'Χειρουργικές εξαγωγές, μεταξύ αυτών φρονιμιτών, οστική αναπλήρωση, ανύψωση ιγμορείου και επιμήκυνση κλινικής μύλης.',
    },
    intro: [
      {
        en: 'Some procedures need a surgical approach: a wisdom tooth that has not come through, a tooth that cannot be removed simply, or bone that needs rebuilding before an implant.',
        el: 'Ορισμένες επεμβάσεις απαιτούν χειρουργική προσέγγιση: ένας φρονιμίτης που δεν έχει ανατείλει, ένα δόντι που δεν αφαιρείται απλά ή οστό που χρειάζεται αναπλήρωση πριν από ένα εμφύτευμα.',
      },
      {
        en: 'Dr Panagidis has trained in implant surgery and in soft tissue management around natural teeth and implants (Athens, 2016).',
        el: 'Ο Δρ Παναγίδης έχει εκπαιδευτεί στη χειρουργική εμφυτευμάτων και στη διαχείριση των μαλακών ιστών γύρω από φυσικά δόντια και εμφυτεύματα (Αθήνα, 2016).',
      },
    ],
    includes: [
      { en: 'Surgical extractions, including wisdom teeth', el: 'Χειρουργικές εξαγωγές, μεταξύ αυτών φρονιμιτών' },
      { en: 'Bone augmentation', el: 'Οστική αναπλήρωση' },
      { en: 'Sinus lift', el: 'Ανύψωση ιγμορείου' },
      { en: 'Crown lengthening', el: 'Επιμήκυνση κλινικής μύλης' },
    ],
    faq: [
      {
        q: { en: 'What is crown lengthening?', el: 'Τι είναι η επιμήκυνση κλινικής μύλης;' },
        a: { en: 'A procedure that exposes more of a tooth above the gum, for example so that a crown can be fitted securely. Whether you need it is decided at examination.', el: 'Επέμβαση που αποκαλύπτει μεγαλύτερο τμήμα του δοντιού πάνω από το ούλο, για παράδειγμα ώστε να εφαρμόσει σωστά μια στεφάνη. Το αν τη χρειάζεστε κρίνεται στην εξέταση.' },
      },
      {
        q: { en: 'Why would I need a sinus lift?', el: 'Γιατί να χρειαστώ ανύψωση ιγμορείου;' },
        a: { en: 'In the upper back jaw there is sometimes not enough bone for an implant. A sinus lift increases the bone available so that an implant can be placed.', el: 'Στο πίσω μέρος της άνω γνάθου μερικές φορές δεν υπάρχει αρκετό οστό για εμφύτευμα. Η ανύψωση ιγμορείου αυξάνει το διαθέσιμο οστό, ώστε να μπορεί να τοποθετηθεί εμφύτευμα.' },
      },
    ],
    image: 'instruments',
    related: ['dental-implants', 'general-dentistry', 'prosthodontics'],
  },
  {
    slug: 'prosthodontics',
    name: { en: 'Prosthodontics', el: 'Προσθετική' },
    summary: {
      en: 'Crowns, inlays and onlays, bridges, complete and partial dentures, and night guards for grinding.',
      el: 'Στεφάνες, ένθετα και επένθετα, γέφυρες, ολικές και μερικές οδοντοστοιχίες και νάρθηκες βρουξισμού.',
    },
    intro: [
      {
        en: 'Prosthodontics restores teeth that are broken, heavily filled, worn or missing, so that they look natural and work properly again.',
        el: 'Η προσθετική αποκαθιστά δόντια σπασμένα, με μεγάλα σφραγίσματα, φθαρμένα ή χαμένα, ώστε να δείχνουν φυσικά και να λειτουργούν ξανά σωστά.',
      },
      {
        en: 'Ceramic and zirconia work is designed and milled in the clinic with CEREC, so many restorations are completed within one to two days.',
        el: 'Οι κεραμικές εργασίες και οι εργασίες ζιρκονίου σχεδιάζονται και κατασκευάζονται στο ιατρείο με CEREC, ώστε πολλές αποκαταστάσεις να ολοκληρώνονται μέσα σε μία με δύο ημέρες.',
      },
    ],
    includes: [
      { en: 'All-ceramic crowns', el: 'Ολοκεραμικές στεφάνες' },
      { en: 'Porcelain inlays and onlays', el: 'Ένθετα και επένθετα πορσελάνης' },
      { en: 'Bridges', el: 'Γέφυρες' },
      { en: 'Complete and partial dentures', el: 'Ολικές και μερικές οδοντοστοιχίες' },
      { en: 'Night guards for teeth grinding (bruxism)', el: 'Νάρθηκες για το τρίξιμο των δοντιών (βρουξισμός)' },
    ],
    faq: [
      {
        q: { en: 'Crown or onlay?', el: 'Στεφάνη ή επένθετο;' },
        a: { en: 'An onlay covers part of the tooth and keeps more of it; a crown covers the whole tooth. Which is right depends on how much healthy tooth remains.', el: 'Το επένθετο καλύπτει μέρος του δοντιού και διατηρεί περισσότερο από αυτό· η στεφάνη καλύπτει ολόκληρο το δόντι. Η σωστή επιλογή εξαρτάται από το πόσο υγιές δόντι απομένει.' },
      },
      {
        q: { en: 'Can dentures be fixed on implants?', el: 'Μπορεί η οδοντοστοιχία να στερεωθεί σε εμφυτεύματα;' },
        a: { en: 'Yes, the clinic provides dentures supported by implants as well as conventional complete and partial dentures.', el: 'Ναι, το ιατρείο προσφέρει οδοντοστοιχίες πάνω σε εμφυτεύματα, καθώς και συμβατικές ολικές και μερικές οδοντοστοιχίες.' },
      },
    ],
    image: 'cerec-unit',
    related: ['same-day-crowns-and-veneers', 'dental-implants', 'aesthetic-dentistry'],
  },
];

export const bySlug = (slug: string) => treatments.find((t) => t.slug === slug)!;

// Concern-led entry points on the homepage.
export const concerns: { q: L; slug: string }[] = [
  { q: { en: 'I’m missing a tooth', el: 'Μου λείπει ένα δόντι' }, slug: 'dental-implants' },
  { q: { en: 'A tooth is broken or heavily filled', el: 'Έχω σπασμένο ή πολύ σφραγισμένο δόντι' }, slug: 'same-day-crowns-and-veneers' },
  { q: { en: 'I’d like a whiter, more even smile', el: 'Θέλω πιο λευκό, πιο ομοιόμορφο χαμόγελο' }, slug: 'aesthetic-dentistry' },
  { q: { en: 'I need a check-up or a cleaning', el: 'Χρειάζομαι έλεγχο ή καθαρισμό' }, slug: 'general-dentistry' },
  { q: { en: 'My wisdom tooth is causing trouble', el: 'Με ενοχλεί ένας φρονιμίτης' }, slug: 'oral-surgery' },
  { q: { en: 'I grind my teeth or my dentures need replacing', el: 'Τρίζω τα δόντια μου ή χρειάζομαι νέα οδοντοστοιχία' }, slug: 'prosthodontics' },
];
