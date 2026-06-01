import { useState, useEffect } from 'react';
import './todolist.css'
// import Button from './components/Button.jsx'
// import TodoItemEmpty from './components/TodoItemEmpty.jsx'
import TodoHeader from './components/TodoHeader.jsx'
// import Checkbox from './components/Checkbox.jsx'
import TodoAdder from './components/TodoAdder.jsx'
// import TodoItem from './components/TodoItem.jsx'
import TodoList from './components/TodoList.jsx'

class Todo {
    constructor(text) {
        this.id = Date.now();       //할일 고유 id: 만든시각. new Date().getTime()
        this.text = text;           //할일 내용
        this.isCompleted = false;   //완료 여부: 기본값 false
    }
}
const TODOS_STORAGE_KEY = "todos";

function TodoListApp() {
    //LocalStorage에서 저장된 할일 목록 가져오자
    const initTodos = () => {
        const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);
        return savedTodos ? JSON.parse(savedTodos) : [];
    }

    const [todos, setTodos] = useState(initTodos); //할일 목록: 기본값 빈 리스트
    const [keyword, setKeyword] = useState('');

    //todos가 바뀌면, LocalStroage에 저장하자
    useEffect(() => {
        localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);    //[](mount할 때 한번 실행), [todos]에 있는 state가 바뀌면, 그 앞 함수정의 를 호출하자

    const addTodo = (text) => setTodos((todos) => [
        //이전 todos 복사하자
        ...todos,
        //newTodo 만들자
        //이전 todos에 추가하자
        new Todo(text)
    ]);
    
    const toggleTodo = (id) => {
        setTodos(
            // todos에서 그 id에 해당하는 todo 찾고 그 todo의 isCompleted를 true -> false, false -> true
            todos.map((todo) =>
                todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
            )
        )
    }
    const deleteTodo = (id) => {
        //id가 같지 않은 todo만 복사하자(filter())
        setTodos(
            (todos) => todos.filter((todo) => todo.id !== id)
        )
    }
    const editTodo = (id, newText) => {
        //todos에서 하나씩 todo 꺼내고, id가 같은 todo 찾아서, text를 newText로 수정하자
        setTodos((todos) =>
            todos.map((todo) =>
                todo.id === id ? { ...todo, text: newText } : todo
            )
        )
    }

    const filteredTodos = todos.filter((todo) =>
        todo.text.includes(keyword)
    );

    return (
        <div className="todo">
            <TodoHeader />
            
            <div style={{ margin: '10px 0', textAlign: 'center' }}>
                <input
                    type="text"
                    placeholder="할 일을 검색하세요"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    style={{ 
                        padding: '8px', 
                        width: '90%', 
                        boxSizing: 'border-box', 
                        border: '1px solid #ccc', 
                        borderRadius: '4px' 
                    }}
                />
            </div>

            <TodoAdder addTodo={addTodo} />
            <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} />
        </div>
    )
}

export default TodoListApp;