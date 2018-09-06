import SalesManagement from './../app/sales-management/SalesManagement';

const appRoutes = [
    {
        from: '/',
        to: '/sales',
        exact: true,
        hideFromNavigation: true
    },
    {
        path: '/sales',
        exact: true,
        component: SalesManagement,
        hideFromNavigation: false
    }
];

export default appRoutes;