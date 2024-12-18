'use client';

import { useState } from 'react';

export default function ForgotPassword() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setError('');
      } else {
        setError(data.message);
        setMessage('');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Forgot Password</h1>

      {error && <p className="text-center text-sm text-red-500">{error}</p>}
      {message && <p className="text-center text-sm text-green-500">{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Send Reset Link
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        <p>
          Remembered your password?{' '}
          <button
            onClick={() => router.push('/')}
            className="text-blue-500 hover:underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  </div>
  );
}
