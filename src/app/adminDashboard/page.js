// app/admin/page.js
"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // For error handling
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/auth/getUsers');
        if (!response.ok) {
          throw new Error('Failed to fetch users token expire ');
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

    fetchUsers();
  }, []);

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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Admin Page</h1>
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
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handleLogout}
          className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Logout
        </button>
      </div>
    </div>
  );
}




















// // app/admin/page.js
// "use client"
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

// export default function AdminPage() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const router=useRouter();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch('/api/auth/getUsers');
//         console.log("response",response)
//         if (!response.ok) {
//           throw new Error('Failed to fetch users');
//         }
//         const data = await response.json();
//         setUsers(data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//  // Logout function
//  const handleLogout = async () => {
//   const res = await fetch('/api/auth/logout', {
//     method: 'POST',
//     credentials: 'include', // Include cookies when making the request
//   });

//   if (res.ok) {
//     router.push('/'); // Redirect to home page (or login page)
//   } else {
//     console.log('Logout failed');
//   }
// };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//     <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
//       <h1 className="text-3xl font-semibold text-gray-800 mb-6">Admin Page</h1>
//       {loading ? (
//         <div className="text-center text-gray-600">Loading...</div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
//             <thead>
//               <tr className="text-left bg-gray-50">
//                 <th className="px-6 py-3 text-gray-600 font-medium text-sm border-b">Username</th>
//                 <th className="px-6 py-3 text-gray-600 font-medium text-sm border-b">Role</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user) => (
//                 <tr key={user._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 text-gray-800 border-b">{user.username}</td>
//                   <td className="px-6 py-4 text-gray-800 border-b">{user.role}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//     <div className="flex justify-center mt-8">
//         <button
//           onClick={handleLogout}
//           className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         >
//           Logout
//         </button>
//       </div>
//   </div>
//   );
// }
