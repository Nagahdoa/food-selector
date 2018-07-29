import MODULE_NAME from './foodsConstants';

/**
 * Actions constants
 */

export const INIT_FOODS_STATE = `${MODULE_NAME}/INIT_FOODS_STATE`;
export const ADD_FOOD_TO_GOOD_FOODS = `${MODULE_NAME}/ADD_FOOD_TO_GOOD_FOODS`;
export const ADD_FOOD_TO_BAD_FOODS = `${MODULE_NAME}/ADD_FOOD_TO_BAD_FOODS`;
export const SET_SEARCH_RESULTS = `${MODULE_NAME}/SET_SEARCH_RESULTS`;
export const REMOVE_PRODUCT_FROM_SEARCH_RESULTS = `${MODULE_NAME}/REMOVE_PRODUCT_FROM_SEARCH_RESULTS`;

/**
 * Action creators
 */

export const initFoodsState = (foods) => ({
    type: INIT_FOODS_STATE,
    payload: foods
});

export const addFoodToGoodFoods = (goodFood) => ({
    type: ADD_FOOD_TO_GOOD_FOODS,
    payload: goodFood
});

export const addFoodToBadFoods = (badFood) => ({
    type: ADD_FOOD_TO_BAD_FOODS,
    payload: badFood
});

export const setSearchResults = (searchResults) => ({
    type: SET_SEARCH_RESULTS,
    payload: searchResults
});

export const removeProductFromSearchResults = (productToRemove) => ({
    type: REMOVE_PRODUCT_FROM_SEARCH_RESULTS,
    payload: productToRemove
});
