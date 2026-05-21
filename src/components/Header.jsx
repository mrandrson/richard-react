import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const researchLinks = [
  { path: '/pproject', label: 'Planetesimal Project' },
  { path: '/nextdataanalysis', label: 'NEXT Data Analysis' },
  { path: '/missilesystems', label: 'Missile Systems Design' },
  { path: '/pebblebed', label: 'Pebble Bed Nuclear Reactors' },
];

const personalLinks = [{ path: '/personalprojects', label: 'Personal Projects' }];

function Dropdown({ title, links }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="dropdown"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="dropdown-trigger">
        {title}
        <span aria-hidden="true">⌄</span>
      </span>
      {open && (
        <div className="dropdown-content">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className="nav-link"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="wrapper header-wrapper">
        <NavLink to="/" className="site-title">
          Richard Anderson
          <span>Physics & Mathematics</span>
        </NavLink>

        <nav className="site-nav" aria-label="Primary navigation">
          <Dropdown title="Research" links={researchLinks} />
          <Dropdown title="Personal Projects" links={personalLinks} />
        </nav>
      </div>
    </header>
  );
}

export default Header;
