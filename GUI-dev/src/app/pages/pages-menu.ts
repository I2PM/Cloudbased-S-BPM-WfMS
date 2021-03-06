import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-bar-chart',
    link: '/dashboard',
  },
  {
    title: 'Process Store',
    icon: 'ion-ios-cart',
    link: '/processstore-search',
  },
  {
    title: 'Create Process',
    icon: 'nb-paper-plane',
    link: '/createProcess',
  },
  {
    title: 'User management',
    icon: 'ion-settings',
    link: '/user-management',
  },
  {
    title: 'Process execution',
    icon: 'nb-lightbulb',
    link: '/myprocesses/active',
  },
  {
    title: 'Pay As You Go',
    icon: 'ion-cash',
    link: '/pay-as-you-go',
  },
  {
	title: 'Help',
    icon: 'ion-help',
    link: '/help',
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
