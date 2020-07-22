/* action, reducer  */


/** 테이블 조회 */
export const REQUEST_VIEW_GRID = 'requestViewGrid';
export const SUCCESS_VIEW_GRID = 'successViewGrid';
export const FAILURE_VIEW_GRID = 'failureViewGrid';

/** 테이블 상태 변화 insert, update, delete */
export const REQUEST_UPDATE_GRID = 'requestUpdateGrid';
export const SUCCESS_UPDATE_GRID = 'successUpdateGrid';
export const FAILURE_UPDATE_GRID = 'failureUpdateGrid';


export const requestViewGrid = () => ({
    type: REQUEST_VIEW_GRID,
});
export const successViewGrid = (data) => ({
    type: SUCCESS_VIEW_GRID,
    payload: data,
});
export const failureViewGrid =() => ({
    type: FAILURE_VIEW_GRID,
});

export const requestUpdateGrid =({study_date, grade, original_id, dailyno, stat}) =>({
    type: REQUEST_UPDATE_GRID,
    payload: {
        study_date, grade, original_id, dailyno, stat
    }
    
});
export const successUpdateGrid =(data) =>({
    type: SUCCESS_UPDATE_GRID,
    payload: data,
});
export const failureUpdateGrid = () =>({
    type: FAILURE_UPDATE_GRID
});


/** 초기화 */
export const initialState ={
    viewGrid: [],
    updateGrid: [],
}

function GridTest (state = initialState, action){
    
    switch(action.type){
        
        case SUCCESS_VIEW_GRID: 
            return {...state, viewGrid: action.payload, }

        case SUCCESS_UPDATE_GRID:
            return {...state, updateGrid: action.payload}

        default: 
        return state;
    }

}
export default GridTest;