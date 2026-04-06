function TodoListApp() {
    return (
        <div>
            <h1>ToDo List</h1>
            <form>
                <input type="text" placeholder="할 일을 입력하세요."/>
                <button>Add</button>
            </form>
            <ul>
                <li>
                    <input type="checkbox" name="" id="chk-1" />
                    <label htmlFor="chk-1">놀기</label>
                    <button>✏️</button>
                    <button>❌</button>
                </li>
                <li>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="">집 가기</label>
                    <button>✏️</button>
                    <button>❌</button>
                </li>
            </ul>
        </div>
    )
}

export default TodoListApp;