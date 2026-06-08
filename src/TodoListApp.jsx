import { useEffect, useState } from 'react';

import './todolist.css'
import TodoItem from './components/TodoItem.jsx'
import Button from './components/Button';
import TodoItemEmpty from './components/TodoItemEmpty.jsx'
import TodoHeader from './components/TodoHeader.jsx';
import Checkbox from './components/Checkbox.jsx';
import TodoAdder from './components/TodoAdder.jsx'
import TodoList from './components/TodoList.jsx'
import { TodoProgress } from './components/TodoProgress.jsx';


class Todo {
    constructor(text, priority) {
        this.id = Date.now();       //할일 고유 id: 만든시각. new Date().getTime()
        this.text = text;           //할일 내용
        this.priority = priority;   //우선순위: 낮은 숫자가 먼저
        this.isCompleted = false;   //완료 여부: 기본값 false
        this.isPinned = false;
    }
}


const TODOS_STORAGE_KEY = "todos";

function TodoListApp() {
    // LocalStorage 에서 저장된 할일 목록 가져오자

    const initTodos = () => {
        const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);

        return savedTodos ? JSON.parse(savedTodos) : [];
        //가져온게 있으면 문자열로 되어 있는 것을 json으로 파싱(해석)하면 객체로 가져올 수 있고, 없으면 빈 리스트
    }

    const [todos, setTodos] = useState(initTodos); //할일 목록: 기본값 빈 리스트
    const sortedTodos = [...todos].sort((a, b) => (a.priority ?? 3) - (b.priority ?? 3));

    //todos가 바뀌면, LocalStroage에 저장하자 
    // [](mount할 때 한번 실행), [새앤]에 있는 state가 바뀌면, 그 앞 함수 정의를 호출하자
    useEffect(() => {
        localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);


    const addTodo = (text, priority) => setTodos((todos) => [
        //이전 todos 복사하자
        ...todos,
        //newTodo 만들자
        //이전 todos에 추가하자
        new Todo(text, priority)
    ]);

    // const addTodo = (text) => setTodos((todos) => [...todos, new Todo(text)]);
    const toggleTodo = (id) => {
        // todos에서 그 id에 해당하는 todo 찾고, 그 todo의 isCompleted를 true -> false, false -> true
        setTodos((todos) =>
            todos.map((todo) =>
                todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
            )
        )
    };

    const deleteTodo = (id) => {
        //id가 같지 않은 todo만 복사하자 (filter())
        setTodos((todos) =>
            todos.filter((todo) => todo.id !== id)
        )
    };

    const editTodo = (id, newText) => {
        setTodos((todos) =>
            //todos에서 하나씩 todo 꺼내고, id가 같은 todo 찾아서, text를 newText로 수정하자
            // ...todo 이전 값
            (todos.map((todo) => todo.id === id ? { ...todo, text: newText } : todo))
        )
    }
    const pinTodo = (id) => {
        setTodos((todos) =>
            todos.map((todo) =>
                todo.id === id ? {...todo, isPinned: !todo.isPinned} : todo
            )
        )
    }
    // const sortedTodos = [...todos].sort((a,b) => Number(!!b.isPinned) - Number(!!a.isPinned));

    const [bgColor, setBgColor] = useState(() => {
        return localStorage.getItem("bgColor") || "#ffffff";
    });
    const changeBgColor = (color) => {
        setBgColor(color);
        document.body.style.backgroundColor = color;
        localStorage.setItem("bgColor", color);
    };
    useEffect(() => {
        document.body.style.backgroundColor = bgColor;
    }, []);

    return (
        <div className="todo">
            <TodoHeader changeBgColor={changeBgColor} currentBgColor={bgColor} />
            <TodoProgress todos={todos} />
            <TodoList todos={sortedTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} pinTodo={pinTodo} />
            <TodoAdder addTodo={addTodo} />
        </div>
    )
}

export default TodoListApp;
