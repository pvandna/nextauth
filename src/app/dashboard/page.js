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
    <div>
      <h1>Dashboard</h1>
      <p>{message}</p>

      {/* Logout Button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;

















