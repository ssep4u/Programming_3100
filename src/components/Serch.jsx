import { useState } from 'react';

export default function TodoListApp() {
  const [todos, setTodos] = useState([]);
  
  const [newTodo, setNewTodo] = useState('');
  const [keyword, setKeyword] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;
    
    const newTask = { id: Date.now(), text: newTodo };
    setTodos([...todos, newTask]);
    setNewTodo('');
  };

  const filteredTodos = todos.filter((todo) =>
    todo.text.includes(keyword)
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>나의 투두 리스트</h2>

      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <strong>검색: </strong>
        <input
          type="text"
          placeholder="찾고 싶은 할 일을 검색하세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ padding: '5px', width: '200px', marginLeft: '10px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="새로운 할 일을 입력하세요"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          style={{ padding: '5px', width: '200px' }}
        />
        <button onClick={handleAddTodo} style={{ marginLeft: '10px', padding: '6px 12px' }}>
          추가
        </button>
      </div>

      <ul>
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <li key={todo.id} style={{ marginBottom: '10px' }}>
              {todo.text}
            </li>
          ))
        ) : (
          <li style={{ color: 'gray' }}>표시할 할 일이 없습니다.</li>
        )}
      </ul>
    </div>
  );
}