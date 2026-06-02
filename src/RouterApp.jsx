import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import CounterApp from "./CounterApp.jsx"
import TodoListApp from "./TodoListApp.jsx"
import Background from './Background.jsx';

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
                <li>
                    <Link to="/backgroundapp">❤️ Background</Link>
                </li>

                <li><button
                    style={{width: '200px', height: '200px'}}
                    onClick={() => navigate('/counterapp')}
                >🔢 CounterApp</button></li>
                <li><button
                    style={{width: '200px', height: '200px'}}
                    onClick={() => navigate('/todolistapp')}
                >✅ TodoListApp</button></li>
                <li><button
                    style={{width: '200px', height: '200px'}}
                    onClick={() => navigate('/backgroundapp')}
                >❤️ Background</button></li>

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
                <Route path="/backgroundapp" element={<Background />} />
            </Routes>
        </BrowserRouter>
    )
}