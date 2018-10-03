import SalesManagement from '../app/sales/SalesManagement';
import EmployeeManagement from '../app/employees/EmployeeManagement';
import ClientManagement from '../app/clients/ClientManagement';
import EmployeeDetail from "../app/employees/employee-detail/EmployeeDetail";
import ClientDetail from "../app/clients/client-detail/ClientDetail";

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
    },
    {
        id: 21,
        name: 'Employee Detail',
        path: '/employees/:id',
        component: EmployeeDetail,
        hideOnNavigation: true
    },
    {
        id: 31,
        name: 'Client Detail',
        path: '/clients/:id',
        component: ClientDetail,
        hideOnNavigation: true
    }
];

export default appRoutes;