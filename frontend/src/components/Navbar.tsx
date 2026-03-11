import { Link } from 'react-router-dom';

export const Navbar = () => (
  <header className="bg-brand text-white">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
      <Link to="/" className="text-xl font-bold">AutoSalon</Link>
      <div className="flex gap-4 text-sm">
        <Link to="/catalog">Каталог</Link>
        <Link to="/admin">Админ</Link>
      </div>
    </nav>
  </header>
);
