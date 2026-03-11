import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { Car } from '../../types';
import { useAuth } from '../../context/AuthContext';

const emptyForm = {
  modelId: 1, year: 2023, price: 30000, mileage: 10000, engine: '2.0L', transmission: 'Automatic', fuelType: 'Petrol',
  color: 'Black', description: 'Новый автомобиль в отличном состоянии', imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7', status: 'AVAILABLE'
};

export const AdminCarsPage = () => {
  const { token } = useAuth();
  const [cars, setCars] = useState<Car[]>([]);
  type CarForm = typeof emptyForm;
  const [form, setForm] = useState<CarForm>(emptyForm);

  const headers = { Authorization: `Bearer ${token}` };
  const load = () => api.get('/cars').then((res) => setCars(res.data));

  useEffect(() => { load(); }, []);

  const create = async () => {
    await api.post('/admin/cars', form, { headers });
    setForm(emptyForm);
    load();
  };

  const remove = async (id: number) => {
    await api.delete(`/admin/cars/${id}`, { headers });
    load();
  };

  return (
    <main className="mx-auto max-w-6xl space-y-4 px-4 py-8">
      <h1 className="text-2xl font-bold">Автомобили</h1>
      <div className="grid gap-2 rounded-xl bg-white p-4 shadow md:grid-cols-3">
        {Object.entries(form).map(([key, value]) => (
          <input key={key} className="input" value={value as string} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={key} />
        ))}
        <button className="btn md:col-span-3" onClick={create}>Добавить авто</button>
      </div>
      <table className="w-full overflow-hidden rounded-xl bg-white text-sm shadow">
        <thead><tr className="bg-slate-100"><th className="p-2">ID</th><th>Авто</th><th>Цена</th><th>Статус</th><th></th></tr></thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id} className="border-t"><td className="p-2">{car.id}</td><td>{car.model.brand} {car.model.modelName}</td><td>${Number(car.price).toLocaleString()}</td><td>{car.status}</td><td><button className="text-red-600" onClick={() => remove(car.id)}>Удалить</button></td></tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};
