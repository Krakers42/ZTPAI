import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { email, password });
      setMsg('Account created!');
      nav('/login');
    } catch (err) {
      setMsg(err.response?.data?.error || 'Connection error');
    }
  };

  return (
    <form onSubmit={submit}>
      <div>{msg}</div>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        placeholder="password"
      />
      <button type="submit">REGISTER</button>
    </form>
  );
}
