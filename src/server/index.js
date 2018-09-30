const dbUtil = {
    URLS: {
        sales: {
            read: 'http://localhost:3000/sales/',
            create: 'http://localhost:3000/sales/create',
            update: 'http://localhost:3000/sales/update',
            delete: 'http://localhost:3000/sales/delete',
        },
        employees: {
            read: 'http://localhost:3000/employees/',
            create: 'http://localhost:3000/employees/create',
            update: 'http://localhost:3000/employees/update',
            delete: 'http://localhost:3000/employees/delete',
        },
        clients: {
            read: 'http://localhost:3000/clients/',
            create: 'http://localhost:3000/clients/create',
            update: 'http://localhost:3000/clients/update',
            delete: 'http://localhost:3000/clients/delete',
        }
    }
};

export default dbUtil;