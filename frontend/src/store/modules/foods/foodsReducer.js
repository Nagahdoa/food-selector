import _ from 'lodash';
import {
    INIT_FOODS_STATE,
    ADD_FOOD_TO_GOOD_FOODS,
    ADD_FOOD_TO_BAD_FOODS,
    SET_SEARCH_RESULTS,
    REMOVE_PRODUCT_FROM_SEARCH_RESULTS
} from './foodsActions';

const initialState = {
    goodFoods: [],
    badFoods: [],
    searchResults: []
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT_FOODS_STATE:
            return action.payload;
        case ADD_FOOD_TO_GOOD_FOODS:
            const newGoodFoods = [ ...state.goodFoods, action.payload ];
            return { ...state, goodFoods: newGoodFoods || [] };
        case ADD_FOOD_TO_BAD_FOODS:
            const newBadFoods = [ ...state.badFoods, action.payload ];
            return { ...state, badFoods: newBadFoods || [] };
        case SET_SEARCH_RESULTS:
            return { ...state, searchResults: action.payload || [] };
        case REMOVE_PRODUCT_FROM_SEARCH_RESULTS:
            const newSearchResults = _.cloneDeep(state.searchResults);
            const productToDelete = action.payload;
            for (let i = 0; i < newSearchResults.length; i++) {
                const searchResult = newSearchResults[i];
                if (productToDelete.id === searchResult.id) {
                    newSearchResults.splice(i, 1);
                    i--;
                }
            }
            return { ...state, searchResults: newSearchResults || [] };
        default:
            return state;
    }
};

export default reducer;
