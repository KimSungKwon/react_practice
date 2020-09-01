import { startLoading, finishLoading } from '../modules/loading';

export default function createRequestThunk(type, request) { // (액션타입, API요청함수)
    // 성공, 실패 액션 타입 정의
    const SUCCESS = `${type}_SUCCESS`;
    const FAILURE = `${type}_FAILURE`;
    return params => async dispatch => {
        dispatch({ type });     // 시작
        dispatch(startLoading(type));
        try {
            const response = await request(params);
            dispatch({
                type: SUCCESS,
                payload: response.data
            }); // 성공
            dispatch(finishLoading(type));
        } catch (e) {
            dispatch({
                type: FAILURE,
                payload: e,
                error: true
            }); // 실패 (에러)
            dispatch(startLoading(type));
            throw e;
        }
    };
}

// 사용법: createRequestThunk('GET_USERS', api.getUsers);