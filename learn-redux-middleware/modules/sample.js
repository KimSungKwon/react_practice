import { createAction, handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from '../lib/api';
// import createRequestThunk from '../lib/createRequestThunk';
// import { startLoading, finishLoading } from './loading';
import createRequestSaga from '../lib/createRequestSaga';

const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';
/*
// 액션 생성함수 thunk함수. 시작할때, 성공할때, 실패할때 각각 다른 액션 디스패치
export const getPost = id => async dispatch => {
    dispatch({ type: GET_POST });   // 요청 시작
    try {
        const response = await api.getPost(id);
        dispatch({ type: GET_POST_SUCCESS, payload: response.data });   // 성공
    } catch (e) {
        dispatch({ type: GET_POST_FAILURE, payload: e, error: true });  // 실패
        throw e;
    }
};

export const getUsers = id => async dispatch => {
    dispatch({ type: GET_USERS });  // 요청 시작
    try {
        const response = await api.getUsers(id);
        dispatch({ type: GET_USERS_SUCCESS, payload: response.data });  // 성공
    } catch (e) {
        dispatch({ type: GET_USERS_FAILURE, payload: e, error: true }); // 실패
        throw e;
    }
};
*/
/*
자체 제작 라이브러리 사용
export const getPost = createRequestThunk(GET_POST, api.getPost);
export const getUsers = createRequestThunk(GET_USERS, api.getUsers);
*/

export const getPost = createAction(GET_POST, id => id);
export const getUsers = createAction(GET_USERS);
/*
    redux-saga 사용
function* getPostSaga(action) {
    yield put(startLoading(GET_POST));
    try {
        const post = yield call(api.getPost, action.payload);    // api.getPost(action.payload);
        yield put({
            type: GET_POST_SUCCESS,
            payload: post.data
        });
    } catch (e) {
        yield put({
            type: GET_POST_FAILURE,
            payload: e,
            error: true
        });
    }
    yield put(finishLoading(GET_POST));
}

function* getUsersSaga() {
    yield put(startLoading(GET_USERS));
    try {
        const users = yield call(api.getUsers);
        yield put({
            type: GET_USERS_SUCCESS,
            payload: users.data
        });
    } catch (e) {
        yield put({
            type: GET_USERS_FAILURE,
            payload: e,
            error: true
        });
    }
    yield put(finishLoading(GET_USERS));
}
*/

const getPostSaga = createRequestSaga(GET_POST, api.getPost);
const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);

export function* sampleSaga() {
    yield takeLatest(GET_POST, getPostSaga);
    yield takeLatest(GET_USERS, getUsersSaga);
}

const initialState = {
    loading: {
        GET_POST: false,
        GET_USERS: false,
    },
    post: null,
    users: null
};
/*
const sample = handleActions(
    {
        [GET_POST]: state => ({
            ...state,
            loading: {
                ...state.loading,
                GET_POST: true      // 요청 시작
            }
        }),
        [GET_POST_SUCCESS] : (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_POST: true      // 요청 완료
            },
            post: action.payload
        }),
        [GET_POST_FAILURE]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_POST: false     // 요청 완료
            }
        }),
        [GET_USERS]: state => ({
            ...state,
            loading: {
                ...state.loading,
                GET_USER: true      // 요청 시작
            }
        }),
        [GET_USERS_SUCCESS]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_USER: true      // 요청 완료
            },
            users: action.payload
        }),
        [GET_USERS_FAILURE]: (state, action) => ({
            ...state,
            loading: {
                ...state.loading,
                GET_USER: false      // 요청 완료
            }
        })
    },
    initialState
);
*/
const sample = handleActions(
    {
        [GET_POST_SUCCESS]: (state, action) => ({
            ...state,
            post: action.payload
        }),
        [GET_USERS_SUCCESS]: (state, action) => ({
            ...state,
            users: action.payload
        })
    },
    initialState
);

export default sample;