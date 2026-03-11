import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { Application } from '../../types';
import { useAuth } from '../../context/AuthContext';

export const AdminApplicationsPage = () => {
  const { token } = useAuth();
  const [items, setItems] = useState<Application[]>([]);

  useEffect(() => {
    api.get('/admin/applications', { headers: { Authorization: `Bearer ${token}` } }).then((res) => setItems(res.data));
  }, [token]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-4 text-2xl font-bold">Заявки</h1>
      <div className="space-y-2">{items.map((item) => <div key={item.id} className="rounded bg-white p-3 shadow">{item.client.fullName} — {item.message}</div>)}</div>
    </main>
  );
};
