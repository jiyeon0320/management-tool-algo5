/**
  action :  
 */


//테이블 조회
export const REQUEST_VIEW_GRID = 'requestViewGrid';
export const SUCCESS_VIEW_GRID = 'successViewGrid';
export const FAILURE_VIEW_GRID = 'failureViewGrid';

export const requestViewGrid = () => ({
    type: REQUEST_VIEW_GRID
});
export const successViewGrid = (data) => ({
    type: SUCCESS_VIEW_GRID,
    payload: data,
});
