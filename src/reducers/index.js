import { SUCCESS_VIEW_GRID } from '../actions';

export const initializeState = {
    viewGrid: []
};

export default (state = initializeState, action) =>{
    // console.log('reducer ' + state);
    switch(action.type){
        case SUCCESS_VIEW_GRID: 
        // console.log('reducer ' + JSON.stringify(action));
        return {...state, viewGrid: action.payload};
        default: 
            return state;
    }
}