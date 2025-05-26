import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="sidebar-logo">🏀 NBA</h2>

      <nav className="sidebar-nav">
        <NavLink to="/teams" className="sidebar-link">
          Teams
        </NavLink>
        <NavLink to="/players" className="sidebar-link">
          Players
        </NavLink>
        <NavLink to="/favorites" className="sidebar-link">
          Favorites
        </NavLink>
        <NavLink to="/results" className="sidebar-link">
          Results
        </NavLink>
        <NavLink to="/schedule" className="sidebar-link">
          Schedule
        </NavLink>
        <NavLink to="/compare" className="sidebar-link">
          Compare
        </NavLink>
        <div style={{ marginTop: "100px" }}>
          <button>Logout</button>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
