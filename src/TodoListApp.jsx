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
        this.completedAt = null;
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

    useEffect(() => {
        const Now = Date.now();
        const One_Day = 24 * 60 * 60 * 1000; 

        const filterdTodos = todos.filter((todo) => {
            if (todo.isCompleted && todo.completedAt) { 
                const isExpired = Now - todo.completedAt > One_Day; // 현재 시간 - 완료 시간이 24시간을 넘으면 true
                return !isExpired; // 하루가 안지났으면 true, 지났으면 false로 삭제
            }
            return true; // 완료 안한 일들은 true로 유지
        });

        if (filterdTodos.length !== todos.length) {
            setTodos(filterdTodos);
        }
    }, []);

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

    const toggleTodo = (id) => {
        setTodos((todos) =>
            todos.map((todo) => {
                if (todo.id === id) {
                    const nextCompleted = !todo.isCompleted;
                    return {
                        ...todo,
                        isCompleted: nextCompleted,
                        // 체크를 눌러 완료로 바꾸면 현재 시간 기록, 체크를 풀면 다시 null로 처음 상태로
                        completedAt: nextCompleted ? Date.now() : null
                    };
                }
                return todo;
            })
        );
    };

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
            <TodoAdder addTodo={addTodo} />
            <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} />
        </div>
    )
}

export default TodoListApp;