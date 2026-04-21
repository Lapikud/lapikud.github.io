// ADD PAGES HERE TO REGISTER ROUTES
// examples: '/page', '/page/:id'

import Home from './Home.svelte'
import Student from './Student.svelte'
import Mentors from './Mentors.svelte'
import Helpdesk from './Helpdesk.svelte'
import OurWork from './OurWork.svelte'
import AboutUs from './AboutUs.svelte'
import Contact from './Contact.svelte'
import Managment from './Managment.svelte'
import Striim from './Striim.svelte'
import Calendar from './Calendar.svelte'
import Workshops from './Workshops.svelte';

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
  '/': Home,
  '/tudengile': Student,
  '/student': Student,
  '/mentorid': Mentors,
  '/mentors': Mentors,
  '/helpdesk': Helpdesk,
  '/ettevottele': OurWork,
  '/ourwork': OurWork,
  '/lapikutest': AboutUs,
  '/aboutus': AboutUs,
  '/kontakt': Contact,
  '/contact': Contact,
  '/juhatus': Managment,
  '/management': Managment,
  '/koolitused': Workshops,
  '/workshops': Workshops,
  '/striim': Striim,
  '/kalender': Calendar,
  '/calendar': Calendar,
}