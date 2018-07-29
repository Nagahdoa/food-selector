import requestPromise from 'request-promise';
import _ from 'lodash';
import Product from '../viewModels/Product';

export const searchForProducts = async (query) => {
    if (!query) {
        return [];
    }

    const offset = 10;
    const limit = 100;

    var options = {
        uri: 'https://dev.tescolabs.com/grocery/products',
        qs: {
            query,
            offset,
            limit
        },
        headers: {
            'User-Agent': 'Request-Promise',
            'Ocp-Apim-Subscription-Key': 'd36fa31bed03489fb52ebb04ce8d986e'
        },
        json: true
    };

    const response = await requestPromise(options);
    const results = _.get(response, 'uk.ghs.products.results') || [];

    return results.map(result => new Product(result));
}

export const saveProduct = async (productInfo) => {
    var options = {
        method: 'POST',
        uri: 'http://localhost:3131/saveFood',
        body: productInfo,
        json: true,
        headers: {
            'User-Agent': 'Request-Promise'
        }
    };

    await requestPromise(options);
}

export const getProducts = async () => {
    var options = {
        method: 'GET',
        uri: 'http://localhost:3131/getFoods',
        json: true,
        headers: {
            'User-Agent': 'Request-Promise'
        }
    };

    const results = await requestPromise(options);
    return results
}
