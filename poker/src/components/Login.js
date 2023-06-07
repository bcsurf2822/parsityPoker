import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../rtk/slices/authenticationSlice';

function Login() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login({ username, password }))
  };

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const loading = useSelector(state => state.auth.loading);
  const error = useSelector(state => state.auth.error);

  if (isAuthenticated) {
    return <p>Welcome Back1</p>;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit" disabled={loading}>Login</button>
      </form>
    </div>
  );
}

export default Login;