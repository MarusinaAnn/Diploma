import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axiosConfig";
import "./Header.css";

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthenticated(false);
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    axios
      .get("/api/auth/me/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setIsAuthenticated(true);
        setIsAdmin(res.data.is_admin);
        localStorage.setItem("is_admin", res.data.is_admin);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setIsAdmin(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return null;

  return (
    <nav>
      <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>
          Главная
        </NavLink>

        {isAuthenticated && (
          <NavLink to="/storage" className={({ isActive }) => isActive ? "active-link" : ""}>
            Мои файлы
          </NavLink>
        )}

        {isAuthenticated && isAdmin && (
          <>
            <NavLink to="/admin" end className={({ isActive }) => isActive ? "active-link" : ""}>
              Панель администратора
            </NavLink>
            <NavLink to="/admin/stats" className={({ isActive }) => isActive ? "active-link" : ""}>
              Статистика
            </NavLink>
          </>
        )}

        {isAuthenticated && (
          <button className="logout-btn" onClick={handleLogout}>
            Выход
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
