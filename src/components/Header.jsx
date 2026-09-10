import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const navLinks = [
  { path: '/', label: 'Home', end: true },
  { path: '/research', label: 'Research' },
  { path: '/code', label: 'Code' },
  { path: '/cv', label: 'CV' },
];

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="wrapper header-wrapper">
        <NavLink to="/" className="site-title">
          Richard Anderson
          <span>Physics & Mathematics</span>
        </NavLink>

        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((current) => !current)}
        >
          <span className="menu-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          Menu
        </button>

        <nav
          id="primary-navigation"
          className={`site-nav${open ? ' is-open' : ''}`}
          aria-label="Primary navigation"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setOpen(false);
            }
          }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
