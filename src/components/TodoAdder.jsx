import { useState } from 'react'
import Button from './Button.jsx'

export default function TodoAdder({ addTodo }) {
    const [inputTodo, setInputTodo] = useState(''); //inputTodo: 사용자가 입력한 text
    const handleSubmit = (event) => {   //submit 했을 때, 일어나는 event
        event.preventDefault(); //submit의 기본 동작 막자
        //빈칸이면 바로 return
        if (!inputTodo) return;

        //inputTodo에서 사용자가 입력한 text 가져오자
        //addTodo에 그 text 넣자
        addTodo(inputTodo.trim());
        setInputTodo('');   //input 빈칸 만들자
    }

    return (
        <form className="todo__form" onSubmit={handleSubmit}>
            {/* 사용자가 입력할 때 setInputTodo() 호출 돼서, inputTodo값에 설정 */}
            <input
                type="text"
                placeholder="할 일을 입력하세요."
                className='todo__input'
                value={inputTodo}
                onChange={(event) => setInputTodo(event.target.value)}
            />
            <Button type="submit" className='todo__button todo__button--add'>Add</Button>
        </form>
    )
}