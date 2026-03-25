import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import './Layout.css';

export default function Layout() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-viewport">
        <Navbar />
        <div className="content-scrollable">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
