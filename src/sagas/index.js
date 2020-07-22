import { call, takeLatest, put } from 'redux-saga/effects';
import * as Api from '../apis';
import * as Actions from '../actions/index';

function* requestViewGridFlow(action){
    const response = yield call(Api.postViewGrid, action.payload);
    yield put(Actions.successViewGrid(response.data));
    // console.log(response.data);
    // console.log('sagas >> '+ JSON.stringify(response.data));
}

export default function* (){
    yield takeLatest(Actions.REQUEST_VIEW_GRID, requestViewGridFlow);
}