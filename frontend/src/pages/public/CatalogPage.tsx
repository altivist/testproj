import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { Car } from '../../types';
import { CarCard } from '../../components/CarCard';
import { CarFilters } from '../../components/CarFilters';

export const CatalogPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});

  useEffect(() => {
    api.get('/cars', { params: filters }).then((res) => setCars(res.data));
  }, [filters]);

  return (
    <main className="mx-auto max-w-6xl space-y-4 px-4 py-8">
      <h1 className="text-3xl font-bold">Каталог</h1>
      <CarFilters filters={filters} onChange={setFilters} />
      <div className="grid gap-4 md:grid-cols-3">{cars.map((car) => <CarCard key={car.id} car={car} />)}</div>
    </main>
  );
};
