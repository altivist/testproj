import { useState } from 'react';
import { api } from '../api/client';

export const ApplicationForm = ({ carId }: { carId: number }) => {
  const [state, setState] = useState({ fullName: '', phone: '', email: '', message: '' });
  const submit = async () => {
    await api.post('/applications', { ...state, carId });
    alert('Заявка отправлена');
    setState({ fullName: '', phone: '', email: '', message: '' });
  };
  return (
    <div className="space-y-2 rounded-xl bg-white p-4 shadow">
      <h4 className="font-semibold">Заявка на покупку</h4>
      {Object.keys(state).map((key) => (
        <input key={key} className="input" placeholder={key} value={state[key as keyof typeof state]}
          onChange={(e) => setState((p) => ({ ...p, [key]: e.target.value }))} />
      ))}
      <button className="btn" onClick={submit}>Отправить</button>
    </div>
  );
};

export const TestDriveForm = ({ carId }: { carId: number }) => {
  const [state, setState] = useState({ fullName: '', phone: '', email: '', preferredDate: '', comment: '' });
  const submit = async () => {
    await api.post('/test-drives', { ...state, carId });
    alert('Запись создана');
    setState({ fullName: '', phone: '', email: '', preferredDate: '', comment: '' });
  };
  return (
    <div className="space-y-2 rounded-xl bg-white p-4 shadow">
      <h4 className="font-semibold">Тест-драйв</h4>
      <input className="input" placeholder="ФИО" value={state.fullName} onChange={(e) => setState({ ...state, fullName: e.target.value })} />
      <input className="input" placeholder="Телефон" value={state.phone} onChange={(e) => setState({ ...state, phone: e.target.value })} />
      <input className="input" placeholder="Email" value={state.email} onChange={(e) => setState({ ...state, email: e.target.value })} />
      <input className="input" type="datetime-local" value={state.preferredDate} onChange={(e) => setState({ ...state, preferredDate: e.target.value })} />
      <input className="input" placeholder="Комментарий" value={state.comment} onChange={(e) => setState({ ...state, comment: e.target.value })} />
      <button className="btn" onClick={submit}>Записаться</button>
    </div>
  );
};
