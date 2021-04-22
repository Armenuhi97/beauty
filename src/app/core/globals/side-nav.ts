import { ISideNavItem } from '@models/index';

export const DEFAULT_NAVIGATION_ITEMS: ISideNavItem[] = [
    {
        label: 'NAVIGATION.USERS',
        routerLink: 'users',
        icon: 'user',
        isFinish: true
    },
    {
        label: 'NAVIGATION.MASTERS',
        routerLink: 'masters',
        icon: 'check-square',
        isFinish: false
    },
    {
        label: 'NAVIGATION.UTILS',
        routerLink: 'utils',
        icon: 'setting',
        isFinish: true
    },
    {
        label: 'NAVIGATION.CATEGORY_UTILS',
        routerLink: 'category-utils',
        icon: 'setting',
        isFinish: true
    },
    {
        label: 'NAVIGATION.POSTS',
        routerLink: 'posts',
        icon: 'setting',
        isFinish: true
    },


    {
        label: 'NAVIGATION.ORDERS',
        routerLink: 'order',
        icon: 'setting',
        isFinish: true
    },
    {
        label: 'NAVIGATION.TARIF',
        routerLink: 'tarif',
        icon: 'setting',
        isFinish: true
    },
    {
        label: 'NAVIGATION.BOUGHT_TARIF',
        routerLink: 'buy-tarifs',
        icon: 'setting',
        isFinish: true
    },


    {
        label: 'NAVIGATION.REVIEWS',
        routerLink: 'reviews',
        icon: 'setting',
        isFinish: true
    },
    {
        label: 'NAVIGATION.BACKLINK',
        routerLink: 'feedback',
        icon: 'setting',
        isFinish: true
    },
    {
        label: 'NAVIGATION.POSTS_REVIEWS',
        routerLink: 'post-review',
        icon: 'setting',
        isFinish: true
    },
    {
        label: 'NAVIGATION.EMAILNOTIFICATIONS',
        routerLink: 'email-notifications',
        icon: 'setting',
        isFinish: true
    },
    {
        label: 'NAVIGATION.PUSHNOTIFICATIONS',
        routerLink: 'push-notifications',
        icon: 'setting',
        isFinish: true
    },


    {
        label: 'NAVIGATION.MODERATORS',
        routerLink: '#',
        icon: 'setting',
        isFinish: false
    },
    {
        label: 'NAVIGATION.STATISTICS',
        routerLink: '#',
        icon: 'setting',
        isFinish: false
    },


];

