'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Initialize error state
  const router = useRouter();

  useEffect(() => {
    // Fetch users data from API
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/auth/getUsers');
        if (!response.ok) {
          throw new Error('Failed to fetch users or token expired');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);  // Set the error message for rendering
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch protected data (like the message from your API)
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

    fetchUsers(); // Fetch users when component mounts
    fetchProtectedData(); // Fetch protected data (message) when component mounts
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
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">User's Dashboard</h1>

        {/* Protected Data Message */}
        <p className="text-center text-lg text-gray-700 mb-6">{message}</p>

        {/* Users Table */}
        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>  // Display error if any
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead>
                <tr className="text-left bg-gray-50">
                  <th className="px-6 py-3 text-gray-600 font-medium text-sm border-b">Username</th>
                  <th className="px-6 py-3 text-gray-600 font-medium text-sm border-b">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-gray-800 border-b">{user.username}</td>
                    <td className="px-6 py-4 text-gray-800 border-b">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Logout Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;










////dummy page  when token expire redirect to login page
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// const Dashboard = () => {
//   const [message, setMessage] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     const fetchProtectedData = async () => {
//       const res = await fetch('/api/auth/protected', {
//         method: 'GET',
//         credentials: 'include', // Ensure the cookie is sent with the request
//       });

//       if (res.status === 200) {
//         const data = await res.json();
//         setMessage(data.message); // Display the protected data message
//       } else if (res.status === 401) {
//         // Token expired or invalid, clear cookie and redirect to home page
//         router.push('/'); // Redirect to home page or login page
//       } else {
//         setMessage('An error occurred');
//       }
//     };

//     fetchProtectedData();
//   }, [router]);

//   // Logout function
//   const handleLogout = async () => {
//     const res = await fetch('/api/auth/logout', {
//       method: 'POST',
//       credentials: 'include', // Include cookies when making the request
//     });

//     if (res.ok) {
//       router.push('/'); // Redirect to home page (or login page)
//     } else {
//       console.log('Logout failed');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//     <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-6"> User's Dashboard</h1>
      
//       <p className="text-center text-lg text-gray-700 mb-6">{message}</p>

//       {/* Logout Button */}
//       <div className="flex justify-center">
//         <button
//           onClick={handleLogout}
//           className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   </div>

//   );
// };

// export default Dashboard;

















