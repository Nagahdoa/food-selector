const initialState = {
    goodFoods: [
        { name: 'Rice cake', description: 'No known reaction' },
        { name: 'Sweet potato', description: 'No known reaction' },
        { name: 'Broccoli', description: 'No known reaction' },
        { name: 'Carrots', description: 'No known reaction' },
        { name: 'Grapes', description: 'No known reaction' },
    ],
    badFoods: [
        { name: 'Peanut', description: 'Worst' },
        { name: 'Gluten', description: 'Major' },
        { name: 'Chicken', description: 'Don\'t like' },
        { name: 'Nuts', description: 'Don\'t like' },
        { name: 'Fish', description: 'Don\'t like' },
    ]
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default reducer;
