import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md'; // import { 사용하고싶은 아이콘 이름} 
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {
    const [value, setValue] = useState('');

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    const onSubmit = useCallback(e => {     // 버튼 클릭시 발생할 이벤트
        onInsert(value);
        setValue('');
        e.preventDefault();
    }, 
    [onInsert, value]
    );

    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input 
                placeholder="할 일을 입력하세요"
                value={value}
                onChange={onChange}
            />
            <button type="submit">
                <MdAdd />
            </button>
        </form>
    );
};

export default TodoInsert;