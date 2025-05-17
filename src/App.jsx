import React, { useState, useEffect } from 'react'

import './App.css'

function App() {
 
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
              <li key = {i}>
                <label>
                  <input type="checkbox" />
                  {t}
                </label>
                </li>
            ))}

          </ul>
        </div>
        
      </div>
      
      <div className="card">
       
        <br />
        
        <button onClick={() => setDarkMode(prevMode => !prevMode)}>
          Toggle dark mode
        </button>
        
      </div>
      
    </div>
  )
}

export default App