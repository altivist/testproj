import { ChangeEvent } from 'react';

type Props = {
  filters: Record<string, string>;
  onChange: (next: Record<string, string>) => void;
};

export const CarFilters = ({ filters, onChange }: Props) => {
  const handle = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange({ ...filters, [event.target.name]: event.target.value });
  };

  return (
    <div className="grid gap-3 rounded-xl bg-white p-4 shadow md:grid-cols-4">
      {['brand', 'model', 'fuelType', 'transmission', 'status'].map((field) => (
        <input key={field} className="input" name={field} value={filters[field] ?? ''} onChange={handle} placeholder={field} />
      ))}
      <input className="input" name="minPrice" value={filters.minPrice ?? ''} onChange={handle} placeholder="min price" />
      <input className="input" name="maxPrice" value={filters.maxPrice ?? ''} onChange={handle} placeholder="max price" />
      <input className="input" name="minYear" value={filters.minYear ?? ''} onChange={handle} placeholder="min year" />
      <input className="input" name="maxYear" value={filters.maxYear ?? ''} onChange={handle} placeholder="max year" />
    </div>
  );
};
