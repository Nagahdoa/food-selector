import MODULE_NAME from './foodsConstants';

/**
 * Actions constants
 */

export const INIT_FOODS_STATE = `${MODULE_NAME}/INIT_FOODS_STATE`;

/**
 * Action creators
 */

export const initFoodsState = (foods) => ({
    type: INIT_FOODS_STATE,
    payload: { foods }
});
