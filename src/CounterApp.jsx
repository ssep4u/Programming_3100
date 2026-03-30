import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
// import './App.css'

function CounterApp() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button
        className="counter"
        onClick={() => setCount((count) => count + 1)}
      >
        Count is {count}
      </button>
    </>
  )
}

export default CounterApp
//선생님 저 누군지 맞혀주세요.
//힌트는 없어요.