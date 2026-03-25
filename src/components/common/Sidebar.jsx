import { NavLink, Link } from 'react-router-dom';
import './Sidebar.css';
import { BrandLogoIcon, DashboardIcon, ProjectIcon } from './Icons';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Link to="/">
          <BrandLogoIcon size={36} color={'var(--accent)'} />
          <span className="logo-text">Project Management</span>
        </Link>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <div className="nav-icon">
            <DashboardIcon />
          </div>
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/projects" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <div className="nav-icon">
            <ProjectIcon />
          </div>
          <span>Projects</span>
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="add-project-link">
          <Link to="/projects">
            <div className="add-icon">+</div>
            <span>Create new project</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
