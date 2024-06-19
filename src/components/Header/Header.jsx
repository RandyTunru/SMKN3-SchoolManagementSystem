import React, { useState, useEffect } from "react";
import '../Assets/smkn3makassar.png';
import './Header.css';
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dashboardPage, setDashboardPage] = useState('/dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('role');

    switch (role) {
      case 'teacher':
        setDashboardPage('/teacher-dashboard');
        break;
      case 'headmaster':
        setDashboardPage('/headmaster-dashboard');
        break;
      case 'viceprincipal':
        setDashboardPage('/vice-principal-dashboard');
        break;
      default:
        setDashboardPage('/dashboard');
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('jwt');
    localStorage.removeItem('nama');
    navigate('/login');
  };

  return (
    <header className='header'>
      <div className='left-side'>
        <div className="menu-button">
          {/* Menu button content if any */}
        </div>
        <h2>
          <Link to={dashboardPage} className="no-underline">
            Learning Management System
          </Link>
        </h2>
      </div>
      <div className="right-side">
        <div className="dropdown">
          <div className="dropdown-text" onClick={toggleDropdown}>
            <h2 className="dropdown-toggle">
              {localStorage.getItem('nama')}
            </h2>
            <IoMdArrowDropdown className="btn-dropdown" size={30}/>
          </div>
          {isDropdownOpen && (
            <div className="dropdown-content mr-3">
              <ul>
                <li onClick={handleLogout} className="no-underline-link">Logout</li>
                <Link to="/profile-setting" className="no-underline-link"><li>Setting</li></Link>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
