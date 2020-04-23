'use strict';

const Handler = require('./handler');

exports.load = [
    { path: '/listingProductFromEl', method: 'GET', handler: Handler.run.listingProductFromEl},
    { path: '/create', method: 'POST', handler: Handler.run.createProduct },
    { path: '/detailProduct/{id}', method: 'GET', handler: Handler.run.detailProduct },
    { path: '/listingProduct', method: 'GET', handler: Handler.run.listingProduct },
    { path: '/update/{id}', method: ['PATCH', 'PUT'], handler: Handler.run.updateProduct },
    { path: '/delete/{id}', method: 'DELETE', handler: Handler.run.deleteProduct }
];

