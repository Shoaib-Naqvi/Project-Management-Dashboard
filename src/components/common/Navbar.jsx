import { useProjectStore } from '../../hooks/useProjectStore';
import { SearchIcon } from './Icons';

export default function Navbar() {
  const { searchQuery, setSearchQuery } = useProjectStore();

  return (
    <header className="main-header">
      <div className="header-search">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search projects or tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="header-profile">
        <div className="profile-info">
          <span className="profile-name">Syed Shoaib</span>
          <span className="profile-role">Web Developer</span>
        </div>
        <div className="profile-avatar">
          <img src="https://ui-avatars.com/api/?name=Syed+Shoaib&background=F15A29&color=fff" alt="Profile" />
        </div>
      </div>
    </header>
  );
}
