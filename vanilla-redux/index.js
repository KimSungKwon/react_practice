import { createStore } from 'redux';

const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnIncrease = document.querySelector('#increase');
const btnDecrease = document.querySelector('#decrease');
// 액션이름(타입)
const TOGGLE_SWITCHH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
// 액션생성함수
const toggleSwitch = () => ({ type: TOGGLE_SWITCHH });
const increase = difference => ({ type: INCREASE });
const decrease = () => ({ type: DECREASE });

const initialState = {
    toggle: false,
    counter: 0
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_SWITCHH:
            return {
                ...state,
                toggle: !state.toggle
            };
        case INCREASE:
            return {
                ...state,
                counter: state.counter + action.difference
            }
        case DECREASE:
            return {
                ...state,
                counter: state.counter - 1
            };
        default:
            return state;
    }
}

const store = createStore(reducer);

const render = () => {
    const state = store.getState();     // 현재 상태 불러옴
    //토글 처리
    if (state.toggle) {
        divToggle.classList.add('active');
    } else {
        divToggle.classList.remove('active');
    }
    //카운터 처리 
    counter.innerText = state.counter;
};

render();
store.subscribe(render);
// dispatch: 액션(파라미터)을 발생시킴
divToggle.onclick = () => {
    store.dispatch(toggleSwitch());
};
btnIncrease.onclick = () => {
    store.dispatch(increase(1));
};
btnDecrease.onclick = () => {
    store.dispatch(decrease());
};