import { useEffect, useState } from 'react';
import './todolist.css'
import TodoHeader from './components/TodoHeader.jsx'
import TodoAdder from './components/TodoAdder.jsx'
import TodoList from './components/TodoList.jsx'
import { TodoProgress } from './components/TodoProgress.jsx';


class Todo {
    constructor(text) {
        this.id = Date.now();       //할일 고유 id: 만든시각. new Date().getTime()
        this.text = text;           //할일 내용
        this.isCompleted = false;   //완료 여부: 기본값 false
        this.isPinned = false;
        this.priority = priority;   //우선순위: 낮은 숫자가 먼저 
        this.completedAt = null;
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

    //todos가 바뀌면, LocalStroage에 저장하자 
    // [](mount할 때 한번 실행), [새앤]에 있는 state가 바뀌면, 그 앞 함수 정의를 호출하자
    useEffect(() => {
        localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);


    const addTodo = (text, priority) => setTodos((todos) => [
        //newTodo 만들자
        //이전 todos에 추가하자
        new Todo(text, priority),
        //이전 todos 복사하자
        ...todos,
    ]);
    // const addTodo = (text) => setTodos((todos) => [...todos, new Todo(text)]);

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
    const allDeleteTodo = () => {
        setTodos([])
    }


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
  
    const filteredTodos = todos.filter((todo) =>
        todo.text.includes(keyword)
    );
    let sortedTodos = filteredTodos
    sortedTodos = [...sortedTodos].sort((a, b) => (a.priority ?? 3) - (b.priority ?? 3));
    sortedTodos = [...sortedTodos].sort((a,b) => Number(!!b.isPinned) - Number(!!a.isPinned));

    return (
        <div className="todo">
            <TodoHeader changeBgColor={changeBgColor} currentBgColor={bgColor} />
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

            <TodoProgress todos={todos} />
            <Button className='todo__button todo__button--all_delete' onClick={allDeleteTodo}>전체 삭제</Button>
            <TodoList todos={sortedTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} editTodo={editTodo} pinTodo={pinTodo} />
            <TodoAdder addTodo={addTodo} />
        </div>
    )
}

export default TodoListApp;
