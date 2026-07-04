// ADD PAGES HERE TO REGISTER ROUTES
// examples: '/page', '/page/:id'

const loadHome = () => import('./Home.vue');
const loadStudent = () => import('./Student.vue');
const loadMentors = () => import('./Mentors.vue');
const loadHelpdesk = () => import('./Helpdesk.vue');
const loadOurWork = () => import('./OurWork.vue');
const loadAboutUs = () => import('./AboutUs.vue');
const loadContact = () => import('./Contact.vue');
const loadManagment = () => import('./Managment.vue');
const loadStriim = () => import('./Striim.vue');
const loadCalendar = () => import('./Calendar.vue');
const loadWorkshops = () => import('./Workshops.vue');

// Route mapping for language switching
export const routeMap = {
  // Home
  '/': { est: '/', en: '/' },
  
  // Student/Tudengile
  '/tudengile': { est: '/tudengile', en: '/student' },
  '/student': { est: '/tudengile', en: '/student' },
  
  // Mentors/Mentorid
  '/mentorid': { est: '/mentorid', en: '/mentors' },
  '/mentors': { est: '/mentorid', en: '/mentors' },
  
  // Helpdesk
  '/helpdesk': { est: '/helpdesk', en: '/helpdesk' },
  
  // OurWork/Ettevõttele
  '/ettevottele': { est: '/ettevottele', en: '/ourwork' },
  '/ourwork': { est: '/ettevottele', en: '/ourwork' },
  
  // AboutUs/Lapikutest
  '/lapikutest': { est: '/lapikutest', en: '/aboutus' },
  '/aboutus': { est: '/lapikutest', en: '/aboutus' },
  
  // Contact/Kontakt
  '/kontakt': { est: '/kontakt', en: '/contact' },
  '/contact': { est: '/kontakt', en: '/contact' },

  // Juhatus/Managment
  '/juhatus': { est: '/juhatus', en: '/management' },
  '/management': { est: '/juhatus', en: '/management' },

  // Workshops/Koolitused
  '/koolitused': { est: '/koolitused', en: '/workshops' },
  '/workshops': { est: '/koolitused', en: '/workshops' },

  // Calendar/Kalender
  '/kalender': { est: '/kalender', en: '/calendar' },
  '/calendar': { est: '/kalender', en: '/calendar' },
};

// Detect language from route
export function getLanguageFromRoute(path) {
  const estRoutes = [
    '/tudengile',
    '/mentorid',
    '/ettevottele',
    '/lapikutest',
    '/kontakt',
    '/juhatus',
    '/koolitused',
    '/kalender',
  ];
  const enRoutes = [
    '/student',
    '/mentors',
    '/ourwork',
    '/aboutus',
    '/contact',
    '/management',
    '/workshops',
    '/calendar',
  ];
  
  if (estRoutes.includes(path)) return 'est';
  if (enRoutes.includes(path)) return 'en';
  
  return null;
}

// Get translated route
export function getTranslatedRoute(currentPath, targetLang) {
  const mapping = routeMap[currentPath];
  if (!mapping) return currentPath;
  return mapping[targetLang] || currentPath;
}

export const routes = {
  '/': loadHome,
  '/tudengile': loadStudent,
  '/student': loadStudent,
  '/mentorid': loadMentors,
  '/mentors': loadMentors,
  '/helpdesk': loadHelpdesk,
  '/ettevottele': loadOurWork,
  '/ourwork': loadOurWork,
  '/lapikutest': loadAboutUs,
  '/aboutus': loadAboutUs,
  '/kontakt': loadContact,
  '/contact': loadContact,
  '/juhatus': loadManagment,
  '/management': loadManagment,
  '/koolitused': loadWorkshops,
  '/workshops': loadWorkshops,
  '/striim': loadStriim,
  '/kalender': loadCalendar,
  '/calendar': loadCalendar,
}
