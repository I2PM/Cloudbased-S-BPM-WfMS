import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-bar-chart',
    link: '/dashboard',
  },

  {
    title: 'Process Store',
    icon: 'ion-cash',
    link: '/processstore-search',
  },
  {
    title: 'Approval Page',
    icon: 'nb-checkmark',
    link: '/approval',
  },
  {
    title: 'Create Process',
    icon: 'nb-paper-plane',
    link: '/createProcess',
  },
  /*{
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Auth',
    icon: 'nb-locked',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },*/
];
