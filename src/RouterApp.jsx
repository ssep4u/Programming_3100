import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import CounterApp from "./CounterApp.jsx"
import TodoListApp from "./TodoListApp.jsx"

function LinkButtonPageApp() {
    const navigate = useNavigate();

    return (
        <>
            <h1>App 목록</h1>
            <ul>
                <li>
                    <Link to="/counterapp">🔢 CounterApp</Link>
                </li>
                <li>
                    <Link to="/todolistapp">✅ TodoListApp</Link>
                </li>
                <li><button
                    style={{width: '200px', height: '200px'}}
                    onClick={() => navigate('/counterapp')}
                >🔢 CounterApp</button></li>
                <li><button
                    style={{width: '200px', height: '200px'}}
                    onClick={() => navigate('/todolistapp')}
                >✅ TodoListApp</button></li>

            </ul>
        </>
    )
}

export default function RouterApp() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LinkButtonPageApp />} />
                <Route path="/counterapp" element={<CounterApp />} />
                <Route path="/todolistapp" element={<TodoListApp />} />
            </Routes>
        </BrowserRouter>
    )
}
