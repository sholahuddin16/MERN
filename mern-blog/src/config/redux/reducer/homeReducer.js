const inisialStateHome = {
    dataBlog: [],
    page: {
        currentPage: 1,
        totalPage: 1, 
    }//new state pege ination
}

const homeReducer = (state = inisialStateHome, action) => {
    if (action.type === 'UPDATE_DATA_BLOG') {
        return {
            ...state,
            dataBlog: action.payload
        }
    }

    if(action.type === 'UPDATE_PAGE'){
        return{
            ...state,
            page: action.payload
        }
    }
    
    return state;
}

export default homeReducer;