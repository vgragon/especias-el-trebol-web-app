import SalesManagement from '../app/sales/SalesManagement';
import EmployeeManagement from '../app/employees/EmployeeManagement';
import ClientManagement from '../app/clients/ClientManagement';

const appRoutes = [
    {
        id: 0,
        from: '/',
        to: '/sales',
        exact: true,
        hideOnNavigation: true
    },
    {
        id: 1,
        name: 'Sales',
        path: '/sales',
        exact: true,
        component: SalesManagement,
        hideOnNavigation: false
    },
    {
        id: 2,
        name: 'Employees',
        path: '/employees',
        exact: true,
        component: EmployeeManagement,
        hideOnNavigation: false
    },
    {
        id: 3,
        name: 'Clients',
        path: '/clients',
        exact: true,
        component: ClientManagement,
        hideOnNavigation: false
    }
];

export default appRoutes;