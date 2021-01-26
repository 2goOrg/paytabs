const PayTab = require('./index');

const instance = new PayTab(
    {profile_id: 56772, server_key: 'SRJN9DN9DK-JBBT9WRRDB-BWNDWLG26G'},
    {
        tran_type: 'sale',
        tran_class: 'ecom',
        cart_currency: 'EGP',
        callback: 'https://api.dev.yo-go.co/',
        return: 'https://api.dev.yo-go.co/'
    }
);


instance
    .createPaymentRequest({
        cart_id: '123456789123456123',
        cart_description: 'Dummy Order 35925502061445345',
        cart_amount: 5,
        customer_details: {
            name: 'John Smith',
            email: 'jsmith@gmail.com',
            street1: '404, 11th st, void',
            city: 'Cairo',
            zip: '11212',
            country: 'EG'
        }
    })
    .then(console.log);

instance.getTransaction('TST2102500057353').then(console.log);
