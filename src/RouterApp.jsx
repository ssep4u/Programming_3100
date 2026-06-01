import { useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import CounterApp from "./CounterApp.jsx"
import TodoListApp from "./TodoListApp.jsx"
import bgm from './assets/redred.mp3'

function LinkButtonPageApp() {
    const navigate = useNavigate();
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleMusicToggle = () => {
        const audio = audioRef.current;

        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
            return;
        }

        audio.play();
        setIsPlaying(true);
    };

    return (
        <>
            <h1>App 목록</h1>
            <audio ref={audioRef} src={bgm} loop />
            <button
                onClick={handleMusicToggle}
                style={{
                    marginBottom: '12px',
                    padding: '8px 14px',
                    cursor: 'pointer',
                }}
            >
                {isPlaying ? '배경음악 정지' : '배경음악 재생'}
            </button>
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
