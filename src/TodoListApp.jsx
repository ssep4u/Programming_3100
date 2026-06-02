import { useEffect, useState } from 'react';
import './todolist.css'
import TodoHeader from './components/TodoHeader.jsx'
import TodoAdder from './components/TodoAdder.jsx'
import TodoList from './components/TodoList.jsx'

class Todo {
    constructor(text) {
        this.id = Date.now();       
        this.text = text;           
        this.isCompleted = false;   
        this.completedAt = null;
    }
}
const TODOS_STORAGE_KEY = "todos";

function TodoListApp() {
    const initTodos = () => {
        const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);
        return savedTodos ? JSON.parse(savedTodos) : [];
    }

    const [todos, setTodos] = useState(initTodos); 
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);    

    useEffect(() => {
        const cleanExpiredTodos = () => {
            const now = Date.now();
            const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

            setTodos((prevTodos) => 
                prevTodos.filter((todo) => {
                    if (!todo.isCompleted) return true;
                    return now - todo.completedAt < TWENTY_FOUR_HOURS;
                })
            );
        };

        cleanExpiredTodos();
        const intervalId = setInterval(cleanExpiredTodos, 60 * 1000);

        return () => clearInterval(intervalId);
    }, []);

    const addTodo = (text) => setTodos((todos) => [
        ...todos,
        new Todo(text)
    ]);
    
    const toggleTodo = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => {
                if (todo.id === id) {
                    const nextCompleted = !todo.isCompleted;
                    return {
                        ...todo,
                        isCompleted: nextCompleted,
                        completedAt: nextCompleted ? Date.now() : null
                    };
                }
                return todo;
            })
        );
    };

    const deleteTodo = (id) => {
        setTodos(
            (todos) => todos.filter((todo) => todo.id !== id)
        )
    }
    const editTodo = (id, newText) => {
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