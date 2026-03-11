import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { Car } from '../../types';
import { CarCard } from '../../components/CarCard';

export const HomePage = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    api.get('/cars').then((res) => setCars(res.data.slice(0, 6)));
  }, []);

  return (
    <main className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      <section className="rounded-2xl bg-brand p-10 text-white">
        <h1 className="text-4xl font-bold">Автосалон современных автомобилей</h1>
        <p className="mt-3 text-slate-200">Подберите авто, оставьте заявку и запишитесь на тест-драйв онлайн.</p>
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-semibold">Популярные автомобили</h2>
        <div className="grid gap-4 md:grid-cols-3">{cars.map((car) => <CarCard key={car.id} car={car} />)}</div>
      </section>
    </main>
  );
};
