import { Link } from 'react-router-dom';

export const AdminDashboardPage = () => (
  <main className="mx-auto max-w-6xl space-y-4 px-4 py-8">
    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
    <div className="grid gap-4 md:grid-cols-3">
      <Link className="rounded-xl bg-white p-4 shadow" to="/admin/cars">Управление авто</Link>
      <Link className="rounded-xl bg-white p-4 shadow" to="/admin/applications">Заявки</Link>
      <Link className="rounded-xl bg-white p-4 shadow" to="/admin/test-drives">Тест-драйвы</Link>
    </div>
  </main>
);
