'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">{isSignup ? 'Signup' : 'Login'}</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="flex justify-end mt-4 mb-4">
            <Link href="/forgetPassword" className="text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {isSignup ? 'Signup' : 'Login'}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-red-500">{message}</p>
        )}

        <p className="mt-6 text-center text-sm text-gray-600">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-500 hover:underline"
          >
            {isSignup ? 'Login here' : 'Signup here'}
          </button>
        </p>
      </div>
    </div>







    // <div>
    //   <h1>{isSignup ? 'Signup' : 'Login'}</h1>
    //   <form onSubmit={handleSubmit}>
    //     <div>
    //       <label>Username</label>
    //       <input
    //         type="text"
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <div>
    //       <label>Password</label>
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <button type="submit">{isSignup ? 'Signup' : 'Login'}</button>
    //   </form>
    //   {message && <p>{message}</p>}
    //   <p>
    //     {isSignup
    //       ? 'Already have an account?'
    //       : "Don't have an account?"}{' '}
    //     <button onClick={() => setIsSignup(!isSignup)}>
    //       {isSignup ? 'Login here' : 'Signup here'}
    //     </button>
    //   </p>
    // </div>
  );
}
