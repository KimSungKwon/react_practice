import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';    // increase, decrease : 액션 생성 함수

const CounterContainer = () => {
    const number = useSelector(state => state.counter.number);
    const dispatch = useDispatch();
    const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
    const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
    return <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />;
};

/*
const mapDispatchToProps = dispatch => ({
    increase: () => {
        dispatch(increase());   // increase() : 액션 생성.
    },
    decrease: () => {
        dispatch(decrease());
    },
});
*/

/*
 리덕스 스토어를 CounterContainer 컴포넌트에 연동. 두번째 파라미터를 객체 형태(액션생성함수로 이루어진)로 넣어주면 내부적으로 bindActionCreators 작업함
export default connect(mapStateToProps, { increase, decrease })(CounterContainer);
*/

export default React.memo(CounterContainer);