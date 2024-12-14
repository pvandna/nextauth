// app/page.js
// 'use client';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';

// export default function Home() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const router=useRouter();

//   useState

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await fetch('/api/auth/login ', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     // console.log("data",req)

//     const data = await res.json();
//     if (res.status === 200) {
//       setMessage('Login successful');
//       router.push('/dashboard')
      
//     } else {
//       setMessage(data.message || 'Login failed');
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }





'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include', // Make sure the cookie is included in the request
    });

    const data = await res.json();

    if (res.status === 200) {
      console.log("login.succeeeeeeeeeeeeeeeeeeeeeeee")
      setMessage('Login successful');
      // Redirect to the dashboard after successful login
      router.replace('/dashboard');
      console.log("loginhgjhgjkhkjh.succeeeeeeeeeeeeeeeeeeeeeeee")
    } else {
      setMessage(data.message || 'Login failed');
    }
  };

  return (
    <div>
      <h1>Login</h1>
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
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
