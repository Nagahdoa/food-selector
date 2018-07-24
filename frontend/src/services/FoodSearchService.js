import requestPromise from 'request-promise';
import _ from 'lodash';

export const searchForProducts = async (query) => {
    if (!query) {
        return [];
    }

    const offset = 10;
    const limit = 10;

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
    return _.get(response, 'uk.ghs.products.results') || [];
}
