import { ISideNavItem } from '@models/index';

export const DEFAULT_NAVIGATION_ITEMS: ISideNavItem[] = [
    {
        label: 'NAVIGATION.USERS',
        routerLink: 'users',
        icon: 'user'
    },
    {
        label:'NAVIGATION.CATEGORY_UTILS',
        routerLink: 'category-utils',
        icon: 'setting'
    },
    {
        label: 'NAVIGATION.POSTS',
        routerLink: 'posts',
        icon: 'setting'
    },
    {
        label: 'NAVIGATION.MASTERS',
        routerLink: 'masters',
        icon: 'check-square'
    },
    {
        label: 'NAVIGATION.UTILS',
        routerLink: 'utils',
        icon: 'setting'
    },

    {
        label: 'NAVIGATION.REVIEWS',
        routerLink: 'reviews',
        icon: 'setting'
    },
    {
        label: 'NAVIGATION.BACKLINK',
        routerLink: 'feedback',
        icon: 'setting'
    },
    {
        label: 'NAVIGATION.EMAILNOTIFICATIONS',
        routerLink: 'email-notifications',
        icon: 'setting'
    },
    {
        label: 'NAVIGATION.PUSHNOTIFICATIONS',
        routerLink: 'push-notifications',
        icon: 'setting'
    },
  
    {
        label: 'NAVIGATION.POSTS_REVIEWS',
        routerLink: 'post-review',
        icon: 'setting'
    },
    {
        label: 'NAVIGATION.MODERATORS',
        routerLink: '#',
        icon: 'setting'
    },  
    {
        label: 'NAVIGATION.STATISTICS',
        routerLink: '#',
        icon: 'setting'
    },
  

];

