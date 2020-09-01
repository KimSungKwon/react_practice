import React from 'react';
import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';

const TodoListItem = ({ todo, onRemove, onToggle, style }) => {    // todo: TodoList에서 받은 "todos 배열"의 한 객체
    const { id, text, checked } = todo;     // 한 객체 todo의 text값과 checked값을 가져옴
    return (
        <div className="TodoListItem-virtualized" style={style}>
            <div className="TodoListItem">
                <div className={cn('checkbox', { checked })} onClick={() => onToggle(id)}>  {/* 체크박스 */}
                    {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                    <div className="text">{text}</div>
                </div>
                <div className="remove" onClick={() => onRemove(id)}>
                    <MdRemoveCircleOutline />
                </div>
            </div>
        </div>
    );
};

export default React.memo(TodoListItem);    // todo, onRemove. onToggle이 바뀌지 않으면 리렌더링 안됨