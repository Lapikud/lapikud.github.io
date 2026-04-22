// ADD PAGES HERE TO REGISTER ROUTES
// examples: '/page', '/page/:id'

const loadHome = () => import('./Home.svelte');
const loadStudent = () => import('./Student.svelte');
const loadMentors = () => import('./Mentors.svelte');
const loadHelpdesk = () => import('./Helpdesk.svelte');
const loadOurWork = () => import('./OurWork.svelte');
const loadAboutUs = () => import('./AboutUs.svelte');
const loadContact = () => import('./Contact.svelte');
const loadManagment = () => import('./Managment.svelte');
const loadStriim = () => import('./Striim.svelte');
const loadCalendar = () => import('./Calendar.svelte');
const loadWorkshops = () => import('./Workshops.svelte');

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