import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

function Auth({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  // Monitor authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setUser(user); // Pass user state to parent component
    });
    return () => unsubscribe();
  }, [setUser]);

  // Validate email format
  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Handle login with specific error messages
  const handleLogin = async () => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      let errorMessage = 'Failed to log in.';
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      }
      setError(errorMessage);
    }
  };

  // Handle signup with specific error messages
  const handleSignUp = async () => {
    try {
      setError(null);
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      let errorMessage = 'Failed to sign up.';
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
      }
      setError(errorMessage);
    }
  };

  
  const handleLogout = async () => {
    await signOut(auth);
  };

 
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (isSignUp && password.length < 6) {
      setError('Password should be at least 6 characters.');
      return;
    }
    if (isSignUp) {
      handleSignUp();
    } else {
      handleLogin();
    }
  };

  
  if (currentUser) {
    return (
      <div className="flex items-center space-x-3">
        <span className="text-gray-700 text-sm">Welcome, {currentUser.email}</span>
        <button
          
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    );
  }

  // Render authentication form when user is not authenticated
  return (
    <div>
      <h2 >{isSignUp ? 'Sign Up' : 'Login'}</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        type="email"
        className="rounded-lg"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError(null); // Clear error when user types
        }}
      />
      <input
        type="password"
        
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError(null); // Clear error when user types
        }}
      />
      <button
        className="px-4 "
        onClick={handleSubmit}
      >
        {isSignUp ? 'Sign Up' : 'Login'}
      </button>
      <button
        className=""
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
}

export default Auth;