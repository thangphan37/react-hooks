// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React from 'react'

/*
  -Lazy initial state: pass a function in useState(which will be excuted only on the initial render)
*/

function useLocalStorageState(initialName) {
  const [name, setName] = React.useState(() => JSON.parse(window.localStorage.getItem('name')) || initialName)

  React.useEffect(() => {
    window.localStorage.setItem('name', JSON.stringify(name))
  }, [name])

  return [name, setName]
}

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName
  const [name, setName] = useLocalStorageState(initialName)

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
