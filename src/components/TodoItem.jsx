import { useState } from 'react';
import Checkbox from './Checkbox.jsx'
import Button from './Button.jsx'

export default function TodoItem({ todo, toggleTodo, deleteTodo, editTodo, pinTodo }) {
    const [editText, setEditText] = useState(todo.text);    //수정한 text
    const [isEditing, setIsEditing] = useState(false);      //수정중인지 아닌지
    const handleEditText = () => {
        if (!isEditing) {               //edit 시작
            setEditText(todo.text);
            setIsEditing(true);
        } else {                        //edit 끝
            const trimmedText = editText.trim();
            if (trimmedText !== "" && trimmedText !== todo.text)  //빈칸 아니고, 현재값 아니면
                editTodo(todo.id, editText);    //수정값 반영하자
            setIsEditing(false);
        }
    }
    return (
        // todo.isCompleted가 true 면 " todo__item--complete", false 면 ""
        <li className={`todo__item${todo.isCompleted ? " todo__item--complete" : ""}`}>
            {/* 수정중이 아니면, Checkbox */}
            {!isEditing &&
                <Checkbox
                    id={todo.id}
                    checked={todo.isCompleted}
                    onChange={() => toggleTodo(todo.id)}
                >{todo.text}</Checkbox>
            }
            {/* 수정중이면 input */}
            {isEditing &&
                <input
                    type="text"
                    className="todo__input--edit"
                    value={editText}
                    onChange={(event) => setEditText(event.target.value)}
                    //enter 치면 handleEditText() 실행하자
                    onKeyDown={(event) => { if (event.key === 'Enter') handleEditText(); }}
                    autoFocus
                />
            }

            <span>{new Date(todo.id).toLocaleString()}</span>
            <Button className='todo__button todo__button--edit'
                onClick={handleEditText}>{!isEditing ? "✏️" : "💾"}</Button>
            <Button
                className='todo__button todo__button--delete'
                onClick={() => deleteTodo(todo.id)}
            >❌</Button>
            <Button className='todo__button todo__button--pin' onClick={() => pinTodo(todo.id)}>📌</Button>
        </li>
    )
}