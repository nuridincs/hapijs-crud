'use strict';

const Request = require('request-promise')
const API_URL = 'http://api.elevenia.co.id/rest';
const { transform } = require('camaro');

exports.run = {
  listingProduct: function (request) {
    function getProduct() {
      return new Promise(function (resolve, reject) {
        const knex = request.server.plugins.knex.run;
        knex.select('*').from('product')
          .asCallback(function (err, rows) {
            if (err) {
              reject(err);
            }
            resolve(rows);
          });
      });
    }
    return getProduct();
  },

  createProduct: function (request) {
    function createProduct() {
      return new Promise(function (resolve, reject) {
        const knex = request.server.plugins.knex.run;
        knex('product')
        .insert(
          {
            sku: decodeURIComponent(request.payload.sku),
            product_name: decodeURIComponent(request.payload.product_name),
            description: decodeURIComponent(request.payload.description),
            price: decodeURIComponent(request.payload.price),
            image: decodeURIComponent(request.payload.image)
          }
        )
        .asCallback(function (err, rows) {
          if (err) {
            reject(err);
          }
          resolve(rows);
        });
      });
    }
    return createProduct();
  },

  listingProductFromEl: function () {
    async function listingProductFromEl() {
      let options = {
        uri: `${API_URL}/prodservices/product/listing`,
        headers: {
          'openapikey': '721407f393e84a28593374cc2b347a98'
        },
      };

      let productXml = await Request.get(options);

      // const transformDataProduct = ['Products/product', {
      //     product_no: 'prdNo',
      //     product_name: 'prdNm',
      //     price: 'selPrc',
      //   }
      // ]

      // const result = await transform(productXml, transformDataProduct)
      // const jsonResult = JSON.stringify(result);
      return productXml;
    }
    return listingProductFromEl();
  },

  detailProduct: function (request) {
    function detailProduct() {
      return new Promise(function (resolve, reject) {
        const knex = request.server.plugins.knex.run;
        knex.select('*').from('product')
        .where('sku', '=', decodeURIComponent(request.params.id))
        .asCallback(function (err, rows) {
            if (err) {
              reject(err);
            }
            resolve(rows);
        });
      });
    }
    return detailProduct();
  },

  updateProduct: function (request) {
    function updateProduct() {
      return new Promise(function (resolve, reject) {
        const knex = request.server.plugins.knex.run;
        knex('product')
        .where('sku', '=', decodeURIComponent(request.params.id))
        .update(
          {
            product_name: decodeURIComponent(request.payload.product_name),
            description: decodeURIComponent(request.payload.description),
            price: decodeURIComponent(request.payload.price)
          }
        )
        .asCallback(function (err, rows) {
          if (err) {
            reject(err);
          }
          resolve(rows);
        });
      });
    }
    return updateProduct();
  },

  deleteProduct: function (request) {
    function deleteProduct() {
      return new Promise(function (resolve, reject) {
        const knex = request.server.plugins.knex.run;
        knex('product')
        .where('sku', decodeURIComponent(request.params.id))
        .del()
        .asCallback(function (err, rows) {
          if (err) {
              reject(err);
          }
          resolve(rows);
        });
      });
    }
    return deleteProduct();
  }
};
