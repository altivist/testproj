import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const AdminLoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ login: 'admin', password: 'admin123' });

  const submit = async () => {
    await login(form.login, form.password);
    navigate('/admin/dashboard');
  };

  return (
    <main className="mx-auto max-w-md space-y-3 px-4 py-10">
      <h1 className="text-2xl font-bold">Вход администратора</h1>
      <input className="input" value={form.login} onChange={(e) => setForm({ ...form, login: e.target.value })} placeholder="Login" />
      <input className="input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" />
      <button className="btn" onClick={submit}>Войти</button>
    </main>
  );
};
