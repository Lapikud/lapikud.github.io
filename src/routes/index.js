// ADD PAGES HERE TO REGISTER ROUTES
// examples: '/page', '/page/:id'

const loadHome = () => import('./Home.vue');
const loadStudent = () => import('./Student.vue');
const loadHelpdesk = () => import('./Helpdesk.vue');
const loadOurWork = () => import('./OurWork.vue');
const loadAboutUs = () => import('./AboutUs.vue');
const loadPohikiri = () => import('./Pohikiri.vue');
const loadAjalugu = () => import('./Ajalugu.vue');
const loadManagment = () => import('./Managment.vue');
const loadStriim = () => import('./Striim.vue');
const loadCalendar = () => import('./Calendar.vue');
const loadLiikmed = () => import('./Liikmed.vue');

// Redirect legacy English routes to their Estonian equivalents
export const redirects = {
  '/student': '/tudengile',
  '/ourwork': '/meietood',
  '/ettevottele': '/meietood',
  '/aboutus': '/lapikutest',
  '/statute': '/pohikiri',
  '/history': '/ajalugu',
  '/contact': '/kontakt',
  '/management': '/juhatus',
  '/calendar': '/kalender',
};

export const routes = {
  '/': loadHome,
  '/tudengile': loadStudent,
  '/helpdesk': loadHelpdesk,
  '/meietood': loadOurWork,
  '/lapikutest': loadAboutUs,
  '/pohikiri': loadPohikiri,
  '/ajalugu': loadAjalugu,
  '/liikmed': loadLiikmed,
  '/juhatus': loadManagment,
  '/striim': loadStriim,
  '/kalender': loadCalendar,
}
