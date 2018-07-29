import MODULE_NAME from './foodsConstants';

export const getState = state => state[MODULE_NAME];
export const getGoodFoods = state => state[MODULE_NAME]['goodFoods'];
export const getBadFoods = state => state[MODULE_NAME]['badFoods'];
export const getSearchResults = state => state[MODULE_NAME]['searchResults'] || [];
