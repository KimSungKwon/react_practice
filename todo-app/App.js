import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 2500; ++i){
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

const App = () => {
  const [todos, setTodos] = useState(createBulkTodos);
  /*
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링 해보기',
      checked: true,
    },
    {
      id: 3,
      text: '일정관리 앱 만들기',
      checked: false,
    },
  ]);
  */

  const nextId = useRef(2501); //const nextId = useRef(4);

  const onInsert = useCallback(text => {    // 객체 추가. TodoInsert의 props로 전달되는 함수여서 useCallback
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    setTodos(todos => todos.concat(todo))  // 함수형 업데이트.  원래대로면 setTodos(todos.concat(todo)), [todos];
    nextId.current += 1;
  }, []);

  const onRemove = useCallback(id => {
    setTodos(todos => todos.filter(todo => id !== todo.id));  // setTodos(todos.filter(todo => id !== todo.id));
  }, []);

  const onToggle = useCallback(id => {
    setTodos(
      todos => todos.map(todo => todo.id === id ? { ...todo, checked: !todo.checked } : todo)  // todos.map(todo => todo.id === id ? { ...todo, checked: !todo.checked } : todo)
    );
  },
  [todos]
  );
  
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;