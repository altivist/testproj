import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { AdminRoute } from './components/AdminRoute';
import { HomePage } from './pages/public/HomePage';
import { CatalogPage } from './pages/public/CatalogPage';
import { CarDetailsPage } from './pages/public/CarDetailsPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminCarsPage } from './pages/admin/AdminCarsPage';
import { AdminApplicationsPage } from './pages/admin/AdminApplicationsPage';
import { AdminTestDrivesPage } from './pages/admin/AdminTestDrivesPage';

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/cars/:id" element={<CarDetailsPage />} />
      <Route path="/admin" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
      <Route path="/admin/cars" element={<AdminRoute><AdminCarsPage /></AdminRoute>} />
      <Route path="/admin/applications" element={<AdminRoute><AdminApplicationsPage /></AdminRoute>} />
      <Route path="/admin/test-drives" element={<AdminRoute><AdminTestDrivesPage /></AdminRoute>} />
    </Routes>
  </>
);

export default App;
