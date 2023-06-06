import axios from 'axios';
import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const proxy = "http://localhost:4000/login"

    try {
      // Send a POST request to the login endpoint
      const response = await axios.post(proxy, {
        username,
        password,
      });

      // Authentication successful
      console.log(response.data); // Display the response data or perform any desired actions
    } catch (error) {
      // Authentication failed
      console.error(error.response.data); // Display the error message or handle the error as needed
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;