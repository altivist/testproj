import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../api/client';
import { Car } from '../../types';
import { ApplicationForm, TestDriveForm } from '../../components/LeadForms';

export const CarDetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    api.get(`/cars/${id}`).then((res) => setCar(res.data));
  }, [id]);

  if (!car) return <div className="p-8">Loading...</div>;

  return (
    <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 md:grid-cols-3">
      <section className="space-y-3 md:col-span-2">
        <img src={car.imageUrl} alt="car" className="h-80 w-full rounded-xl object-cover" />
        <h1 className="text-3xl font-bold">{car.model.brand} {car.model.modelName}</h1>
        <p>{car.description}</p>
        <p className="font-semibold text-accent">${Number(car.price).toLocaleString()}</p>
      </section>
      <aside className="space-y-4">
        <ApplicationForm carId={car.id} />
        <TestDriveForm carId={car.id} />
      </aside>
    </main>
  );
};
