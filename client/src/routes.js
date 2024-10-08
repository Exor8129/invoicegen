/* eslint-disable */
import { lazy } from 'react';
// import { USER_ROLE } from 'constants.js';
import { DEFAULT_PATHS } from 'config.js';

const dashboards = {
  elearning: lazy(() => import('views/dashboards/ElearningDashboard')),
  school: lazy(() => import('views/dashboards/SchoolDashboard')),
};
const courses = {
  explore: lazy(() => import('views/acounting-vouchers/CoursesExplore')),
  list: lazy(() => import('views/acounting-vouchers/CoursesList')),
  detail: lazy(() => import('views/acounting-vouchers/CoursesDetail')),
  
};
const entry = {
  sale: lazy(() => import('views/entry/SaleEntry')),
  purchase: lazy(() => import('views/entry/PurchaseEntry')),
  customer: lazy(() => import('views/entry/CustomerEntry')),
  item: lazy(()=>import('views/entry/ItemEntry')),
};


const paths = {
  list: lazy(() => import('views/paths/PathsList')),
  detail: lazy(() => import('views/paths/PathsDetail')),
};

const instructor = {
  list: lazy(() => import('views/instructor/InstructorList')),
  detail: lazy(() => import('views/instructor/InstructorDetail')),
};
const misc = {
  player: lazy(() => import('views/misc/Player')),
  material: lazy(() => import('views/misc/Material')),
  syllabus: lazy(() => import('views/misc/Syllabus')),
};

const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;

const routesAndMenuItems = {
  mainMenuItems: [
    {
      path: DEFAULT_PATHS.APP,
      exact: true,
      redirect: true,
      to: `${appRoot}/dashboards/elearning`,
    },
    {
      path: `${appRoot}/dashboards`,
      icon: 'home-garage',
      label: 'menu.dashboards',
      exact: true,
      redirect: true,
      to: `${appRoot}/dashboards/elearning`,
      subs: [
        { path: '/elearning', label: 'menu.elearning', component: dashboards.elearning },
        { path: '/school', label: 'menu.school', component: dashboards.school },
      ],
    },
    {
      path: `${appRoot}/acounting-vouchers`,
      label: 'Accounting Vouchers',
      icon: 'online-class',
      exact: true,
      redirect: true,
      to: `${appRoot}/acounting-vouchers/explore`,
      subs: [
        { path: '/sales', label: 'Sales', component: courses.explore },
        { path: '/purchases', label: 'Purchases', component: courses.explore },
        { path: '/list', label: 'Ledger', component: courses.list },
        { path: '/detail', label: 'Receipt', component: courses.detail },
        { path: '/details', label: 'Credit Note', component: courses.details },
        
      ],
    },
    {
      path: `${appRoot}/entry`,
      label: 'Entry',
      icon: 'quiz',
      exact: true,
      redirect: true,
      to: `${appRoot}/entry/list`,
      subs: [
        { path: '/saleEntry', label: 'Sale Entry', component: entry.sale },
        { path: '/purchase', label: 'Purchase Entry', component: entry.purchase },
        { path: '/customer', label: 'Customer Entry', component: entry.customer },
        { path: '/Item', label: 'Item Entry', component: entry.item },
      ],
    },
    {
      path: `${appRoot}/paths`,
      label: 'menu.paths',
      icon: 'destination',
      exact: true,
      redirect: true,
      to: `${appRoot}/paths/list`,
      subs: [
        { path: '/list', label: 'menu.list', component: paths.list },
        { path: '/detail', label: 'menu.detail', component: paths.detail },
      ],
    },
    {
      path: `${appRoot}/instructor`,
      label: 'menu.instructor',
      icon: 'lecture',
      exact: true,
      redirect: true,
      to: `${appRoot}/instructor/list`,
      subs: [
        { path: '/list', label: 'menu.list', component: instructor.list },
        { path: '/detail', label: 'menu.detail', component: instructor.detail },
      ],
    },
    {
      path: `${appRoot}/misc`,
      label: 'menu.misc',
      icon: 'layout-5',
      exact: true,
      redirect: true,
      to: `${appRoot}/misc/player`,
      subs: [
        { path: '/player', label: 'menu.player', component: misc.player },
        { path: '/material', label: 'menu.material', component: misc.material },
        { path: '/syllabus', label: 'menu.syllabus', component: misc.syllabus },
      ],
    },
  ],
  sidebarItems: [],
};
export default routesAndMenuItems;
