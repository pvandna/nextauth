'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProtectedData = async () => {
      const res = await fetch('/api/auth/protected', {
        method: 'GET',
        credentials: 'include', // Ensure the cookie is sent with the request
      });

      if (res.status === 200) {
        const data = await res.json();
        setMessage(data.message); // Display the protected data message
      } else if (res.status === 401) {
        // Token expired or invalid, clear cookie and redirect to home page
        router.push('/'); // Redirect to home page or login page
      } else {
        setMessage('An error occurred');
      }
    };

    fetchProtectedData();
  }, [router]);

  // Logout function
  const handleLogout = async () => {
    const res = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include', // Include cookies when making the request
    });

    if (res.ok) {
      router.push('/'); // Redirect to home page (or login page)
    } else {
      console.log('Logout failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Dashboard</h1>
      
      <p className="text-center text-lg text-gray-700 mb-6">{message}</p>

      {/* Logout Button */}
      <div className="flex justify-center">
        <button
          onClick={handleLogout}
          className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Logout
        </button>
      </div>
    </div>
  </div>




    // <div>
    //   <h1>Dashboard</h1>
    //   <p>{message}</p>

    //   {/* Logout Button */}
    //   <button onClick={handleLogout}>Logout</button>
    // </div>
  );
};

export default Dashboard;

















