# Programming 수업 소스 코드

## 02_counter

## vanilla HTML, CSS, JavaScript로 만든 Counter

## 20260324 React 시작

```shell
npm create vite@latest .
```

### CounterApp

- `useState()`
- `onClick={() => set함수()}`
- `onClick={() => set함수((이전state) => 이전state + 1)}`

### TodoListApp

- React Component 분리
- for -> htmlFor, class -> className
- props
- `<input id={id} value={} />`, `<label htmlFor={id} />`
- onChange
- 구조 분해 할당
- `...연산자`
- `<form onSubmit={} />`
- `덩어리.map()`
- `<TodoItem key={} />`
- `const handleEvent = (event) => {}`
- `{조건식 ? 참 : 거짓}`
- `{조건식 && 참}`
- `{!조건식 && 거짓}`
- onKeyDown
- LocalStorage, `useEffect()`
- `style={{}}`
- HomeApp: page state가 home이면 `<ButtonPageApp />`, counterapp이면 `<CounterApp />`, todolistapp이면 `<TodoListApp />`
- npm install react-router-dom
- ```javascript
    <BrowserRouter>
        <Routes>
            <Route path="/" element={} />
        </Routes>
    </BrowserRouter>
  ```

````
- ```javascript
    <Link to="/"></Link>
```
- `useNavigate()`
- 3105 김주람   1-4	font	★	CSS, Google Fonts, theme state
- 3115 전O진 배경색 ★ useState, CSS class/style 변경
