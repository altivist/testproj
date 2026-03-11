import { Link } from 'react-router-dom';
import { Car } from '../types';

export const CarCard = ({ car }: { car: Car }) => (
  <article className="overflow-hidden rounded-xl bg-white shadow">
    <img src={car.imageUrl} alt={`${car.model.brand} ${car.model.modelName}`} className="h-48 w-full object-cover" />
    <div className="space-y-2 p-4">
      <h3 className="text-lg font-semibold">{car.model.brand} {car.model.modelName}</h3>
      <p className="text-sm text-slate-600">{car.year} • {car.fuelType} • {car.transmission}</p>
      <p className="font-bold text-accent">${Number(car.price).toLocaleString()}</p>
      <Link to={`/cars/${car.id}`} className="btn inline-block">Подробнее</Link>
    </div>
  </article>
);
