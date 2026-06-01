import { useState, useEffect } from 'react';
import './todolist.css'
// import Button from './components/Button.jsx'
// import TodoItemEmpty from './components/TodoItemEmpty.jsx'
import TodoHeader from './components/TodoHeader.jsx'
import TodoDate from './components/TodoDate.jsx'
// import Checkbox from './components/Checkbox.jsx'
import TodoAdder from './components/TodoAdder.jsx'
// import TodoItem from './components/TodoItem.jsx'
import TodoList from './components/TodoList.jsx'

class Todo {
    constructor(text) {
        this.id = Date.now();       //할일 고유 id: 만든시각. new Date().getTime()
        this.text = text;           //할일 내용
        this.isCompleted = false;   //완료 여부: 기본값 false
        this.createdAt = new Date().toISOString(); //생성 시각
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

    //todos가 바뀌면, LocalStroage에 저장하자
    useEffect(() => {
        localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);     //[](mount할 때 한번 실행), [todos]에 있는 state가 바뀌면, 그 앞 함수정의 를 호출하자

    const addTodo = (text) => setTodos((todos) => [
        //이전 todos 복사하자
        ...todos,
        //newTodo 만들자
        //이전 todos에 추가하자
        new Todo(text)
    ]);
    // const addTodo = (text) => setTodos((todos) => [...todos, new Todo(text)]
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
    return (
        <div className="todo">
            <TodoHeader />
            <TodoDate />
            <TodoAdder addTodo={addTodo} />
            <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} />
        </div>
    )
}

export default TodoListApp;