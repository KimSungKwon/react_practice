import React, { useCallback } from 'react';
import { List } from 'react-virtualized';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({ todos, onRemove, onToggle }) => {
    const rowRenderer = useCallback(({ index, key, style }) => {
        const todo = todos[index];
        return (
            <TodoListItem 
                todo={todo}
                key={key}
                onRemove={onRemove}
                onToggle={onToggle}
                style={style}
            />
        );
    },
    [onRemove, onToggle, todos]
    );
    return (
        <List
            className="TodoList"
            width={495}
            height={513}
            rowCount={todos.length}     // 항목 개수
            rowHeight={57}
            rowRenderer={rowRenderer}   // List컴포넌트에서 각 TodoItem을 렌더링 할때 사용. props로 설정해줘야 함
            list={todos}                // 배열
            style={{ outline: 'none' }}
        />
    );
};

export default React.memo(TodoList);