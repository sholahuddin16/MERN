const inisialState = {
    name: 'Muhammad', 
    age: 22
}

const globalReducer = (state = inisialState, action) => {
    if (action.type === 'UPDATE_NAME') {
        return {
            ...state,
            name: 'Muhammad Sholahuddin'
        }
    }
    return state;
}

export default globalReducer;