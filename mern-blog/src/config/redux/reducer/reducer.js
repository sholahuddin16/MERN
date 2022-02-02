import {combineReducers} from 'redux';
import globalReducer from './globalReduser';
import homeReducer from './homeReducer';
import createBlogReducer from './createBlogReducer';

const reducer = combineReducers({homeReducer, globalReducer, createBlogReducer})

export default reducer;