/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/authSlice";
import type { AppDispatch } from "../redux/store";

function Sidebar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logoutUser());
    navigate("/login");
  }
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
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
