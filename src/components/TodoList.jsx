import TodoItemEmpty from './TodoItemEmpty.jsx'
import TodoItem from './TodoItem.jsx'

export default function TodoList({ todos }) {
    return (
        <ul className='todo__list'>
            {/* todos에 todo 없으면, <TodoItemEmpty /> */}
            {todos.length === 0 && <TodoItemEmpty />}
            {/* todos에 todo 있으면, <TodoItem /> */}
            {todos.length > 0 && todos.map((todo) =>
                <TodoItem key={todo.id} todo={todo} />
            )}
        </ul>
    )
}