'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSignup, setIsSignup] = useState(false); // Toggle Login/Signup

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include', // Include cookies
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(`${isSignup ? 'Signup' : 'Login'} successful`);
      if (!isSignup) router.replace('/dashboard'); // Redirect on login
    } else {
      setMessage(data.message || 'An error occurred');
    }
  };

  return (
    <div>
      <h1>{isSignup ? 'Signup' : 'Login'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
      </form>
      {message && <p>{message}</p>}
      <p>
        {isSignup
          ? 'Already have an account?'
          : "Don't have an account?"}{' '}
        <button onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Login here' : 'Signup here'}
        </button>
      </p>
    </div>
  );
}
