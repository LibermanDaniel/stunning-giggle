import React from 'react'
import Login from './pages/login'
import Registration from './pages/registration'


function App() {
  return (

    <div className>
      <header className>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Login/>
        <Registration/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
