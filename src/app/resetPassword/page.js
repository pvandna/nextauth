'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setError('Invalid or missing token.');
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setError('');
        setTimeout(() => {
          router.push('/'); // Redirect to login page
        }, 3000);
      } else {
        setError(data.message);
        setMessage('');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Reset Password</h1>

        {error && <p className="text-center text-sm text-red-500">{error}</p>}
        {message && <p className="text-center text-sm text-green-500">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">New Password</label>
            <input
              type="password"
              id="newPassword"
                 placeholder='Enter password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
               placeholder=' Re Enter password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div className="flex justify-end mt-4 mb-4">
            <Link href="/forgetPassword" className="text-blue-500 hover:underline">
            regenerate email link
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Reset Password
          </button>
        </form>

        <div className="mt-2 text-center text-sm text-gray-600">
          
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
