import { createAction, handleActions } from 'redux-actions';
import { delay, put, takeEvery, takeLatest, select } from 'redux-saga/effects';

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);     // 마우스 클릭 이벤트가 payload에 들어가지 않도록 undefined 넣어줌.
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

function* increaseSaga() {
    yield delay(1000);      // 1초 기다림
    yield put(increase());  // 액션 디스패치
    const number = yield select(state => state.counter);    // state : 스토어 상태
    console.log(`현재 값은 ${number} 입니다. `); 
}
function* decreaseSaga() {
    yield delay(1000);
    yield put(decrease());
}

export function* counterSaga() {
    yield takeEvery(INCREASE_ASYNC, increaseSaga);      // takeEvery는 들어오는 모든 액션에 대해 특정 작업을 처리해줌
    yield takeLatest(DECREASE_ASYNC, decreaseSaga);     // takeLatest는 기존에 진행 중이던 작업이 있다면 취소처리 하고 가장 마지막으로 실행된 작업만 수행함
}

/* thunk함수
// 1초 뒤에 increase, decrease 함수를 디스패치함
export const increaseAsync = () => dispatch => {
    setTimeout(() => {
        dispatch(increase());
    }, 1000);
};
export const decreaseAsync = () => dispatch => {
    setTimeout(() => {
        dispatch(decrease());
    }, 1000);
};
*/
const initialState = 0; // 상태는 꼭 객체일 필요 없음

const counter = handleActions(
    {
        [INCREASE]: state => state + 1,
        [DECREASE]: state => state - 1
    },
    initialState
);

export default counter;