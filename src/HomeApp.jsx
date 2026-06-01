import { useState } from 'react'
import CounterApp from './CounterApp.jsx'
import TodoListApp from './TodoListApp.jsx'
import './style.css'

function ButtonPageApp({ setPage }) {
    return (
        <>
            <h1>App 목록</h1>
            <ul>
                <li>
                    <button
                        onClick={() => setPage('counterapp')}
                        style={{ width: "200px", height: "200px", fontSize: "1.5rem" }}
                    >🔢CounterApp</button></li>
                <li>
                    <button
                        onClick={() => setPage('todolistapp')}
                        style={{ width: "200px", height: "200px", fontSize: "1.5rem" }}
                    >✅TodoListApp</button></li>
            </ul>
        </>
    )
}

export default function HomeApp() {
    //page가 home, counterapp, todolistapp에 따라 적절한 컴포넌트 표시하자
    const [page, setPage] = useState('home')

    return (
        <>
            {/* page가 home이면, <ButtonPageApp /> */}
            {page === 'home' && <ButtonPageApp setPage={setPage} />}

            {/* page가 counterapp이면, <CounterApp /> */}
            {page === 'counterapp' && <CounterApp />}

            {/* page가 todolistapp이면, <TodoListApp /> */}
            {page === 'todolistapp' && <TodoListApp />}

            {/* page가 home이 아니면 home으로 가는 버튼 보이고, 누르면 home으로 가자 */}
            {page !== 'home' &&
                <button
                    onClick={() => setPage('home')}
                    style={{
                        position: 'fixed',
                        left: '10px',
                        bottom: '10px',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        backgroundColor: '#eee',
                        border: 'none',
                        padding: '6px',
                    }}
                >
                🛖지이이입
                </button>
            }
        </>
    )
}