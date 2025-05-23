import React, { useState, useEffect } from 'react';
import Auth from './components/Auth.jsx';

import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTaskText, setNewTaskText] = useState('');
  const [user, setUser] = useState(null); // Manage user state

  const handleAddTask = () => {
    if (newTaskText.trim() !== '') {
      setTasks(prev => [
        ...prev,
        { text: newTaskText.trim(), completed: false },
      ]);
      setNewTaskText('');
    }
  };

  const toggleTaskCompletion = index => {
    setTasks(prev =>
      prev.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = indexToDelete => {
    setTasks(prev => prev.filter((_, index) => index !== indexToDelete));
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', String(darkMode));
      document.body.classList.toggle('dark-mode', darkMode);
    }
  }, [darkMode]);

  return (
    <div className={`app-container ${darkMode ? 'dark-mode-container' : 'light-mode-container'}`}>
      <div>
        <div className="card">
          <Auth setUser={setUser} /> {/* Render Auth component */}
          <button onClick={() => setDarkMode(prev => !prev)}>
            Toggle dark mode
          </button>
        </div>
        {user ? (
          <>
            <div className="headi" style={{ textAlign: 'right' }}>
              <input
                value={newTaskText}
                onChange={e => setNewTaskText(e.target.value)}
              />
              <button onClick={handleAddTask}>ADD</button>
            </div>

            <h2>Active Tasks</h2>
            <ul className="at">
              {tasks.map((task, i) => {
                if (task.completed) return null;
                return (
                  <li key={i}>
                    <label>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(i)}
                      />
                      {task.text} {/* Fixed typo: task.text instead of task racial */}
                    </label>
                    <button onClick={() => handleDeleteTask(i)}>❌</button>
                  </li>
                );
              })}
            </ul>

            <h2>Completed Tasks</h2>
            <ul>
              {tasks.map((task, i) => {
                if (!task.completed) return null;
                return (
                  <li key={i}>
                    <label>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(i)}
                      />
                      <s>{task.text}</s>
                    </label>
                    <button onClick={() => handleDeleteTask(i)}>❌</button>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <p>Please log in or sign up to manage your tasks.</p>
        )}
      </div>
    </div>
  );
}

export default App;