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

  // Handle logout
  const handleLogout = async () => {
    await signOut(auth);
  };

  // Handle form submission with client-side validation
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

  // Render logout UI when user is authenticated
  if (currentUser) {
    return (
      <div className="flex items-center space-x-3">
        <span className="text-gray-700 text-sm">Welcome, {currentUser.email}</span>
        <button
          className="px-4 py-1 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    );
  }

  // Render authentication form when user is not authenticated
  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-bold">{isSignUp ? 'Sign Up' : 'Login'}</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        type="email"
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError(null); // Clear error when user types
        }}
      />
      <input
        type="password"
        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setError(null); // Clear error when user types
        }}
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition"
        onClick={handleSubmit}
      >
        {isSignUp ? 'Sign Up' : 'Login'}
      </button>
      <button
        className="text-blue-500 text-sm hover:underline"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
}

export default Auth;