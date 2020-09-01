import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// 1. 액션 이름
const CHANGE_INPUT = 'todos/CHANGE_INPUT';  // 인풋값 변경
const INSERT = 'todos/INSERT';              // 새로운 todo 등록
const TOGGLE = 'todos/TOGGLE';              // todo 체크/체크해제
const REMOVE = 'todos/REMOVE';              // todo 제거

// 2. 액션 생성 함수
export const changeInput = createAction(CHANGE_INPUT, input => input) // input => ({ type: CHANGE_INPUT, input }); 

let id = 3;
export const insert = createAction(INSERT, text => ({ id: id++, text, done: false }));

export const toggle = createAction(TOGGLE, id => id);

export const remove = createAction(REMOVE, id => id);

// 3. 초기상태
const initialState = {
    input: '',
    todos: [
        {
            id: 1,
            text: '리덕스 기초 배우기',
            done: true
        },
        {
            id: 2,
            text: '리액트와 리덕스 사용하기',
            done: false
        }
    ]
};

// 4. 리듀서
const todos = handleActions(
    {
        [CHANGE_INPUT]: (state, { payload: input }) => ({ ...state, input }),
            
        [INSERT]: (state, { payload: todo }) => ({ 
            ...state,
            todos: state.todos.concat(todo)
        }),
            
        [TOGGLE]: (state, { payload: id }) => 
            produce(state, draft => {
                const todo = draft.todos.find(todo => todo.id === id);
                todo.done = !todo.done;
            }),

        [REMOVE]: (state, { payload: id }) => ({
            ...state,
            todos: state.todos.filter(todo => todo.id !== id)
        })
           
    },
    initialState
);
/*
function todos(state = initialState, action) {
    switch(action.type) {
        case CHANGE_INPUT:
            return {
                ...state,
                input: action.input
            };
        case INSERT:
            return {
                ...state,
                todos: state.todos.concat(action.todo)
            };
        case TOGGLE:
            return {
                ...state,
                todos: state.todos.map(todo => todo.id === action.id ? { ...todo, done: !todo.done } : todo)
            };
        case REMOVE:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.id)
            };
        default:
            return state;
    }
}
*/
export default todos;