const PayTab = require('./index');

const instance = new PayTab(
    {profile_id: 57190, server_key: 'S6JN96DH2W-JB2292L9LR-HZZZBMWLDL'},
    {
        endpoint: 'https://secure.paytabs.sa',
        tran_type: 'sale',
        tran_class: 'ecom',
        cart_currency: 'SAR',
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
            city: 'Ar Riyad',
            zip: '11564',
            country: 'SA'
        }
    })
    .then(console.log);

instance.getTransaction('TST2102500057353').then(console.log);
