import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [number, setNumber] = useState(0)
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');

  const handleAddTask = () => {
    if (newTaskText.trim() !== '') { // Prevent adding empty tasks
      setTasks(prevTasks => [...prevTasks, newTaskText.trim()]); // Add new task
      setNewTaskText(''); // Clear the input field
    }
  };

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', String(darkMode));
    }
  }, [darkMode]);

  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (darkMode) {
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }
  }, [darkMode]);

  return (
    <div className={`app-container ${darkMode ? 'dark-mode-container' : 'light-mode-container'}`}>
      <div>
        <div className='headi' style={{ textAlign: "right" }}>
          <input value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)} />
          <button onClick={handleAddTask}>ADD</button>
          <ul >
            {tasks.map((t, i) => (
              <li key = {i}>{t}</li>
            ))}

          </ul>
        </div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <br />
        <button onClick={() => setNumber((number) => number + 2)}>
          the next even number is {number}
        </button>
        <button onClick={() => setDarkMode(prevMode => !prevMode)}>
          Toggle dark mode
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="the1234">
        Click on the Vite logos to learn more
      </p>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App