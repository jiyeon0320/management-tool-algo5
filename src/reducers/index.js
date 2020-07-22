import { REQUEST_VIEW_GRID, SUCCESS_VIEW_GRID } from '../actions';

export const initialState = {
    viewGrid: [],
 
};

export default (state = initialState, action) =>{
    // console.log('reducer ' + state);
    switch(action.type){
        case REQUEST_VIEW_GRID: 
        // console.log('reducer ' + JSON.stringify(action));
        return {...state, viewGrid: action.payload};
        case SUCCESS_VIEW_GRID: 
        // console.log('reducer ' + JSON.stringify(action));
        return {...state, viewGrid: action.payload};
        default: 
            return state;
    }
}