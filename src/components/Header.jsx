import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const researchLinks = [
  { path: '/pproject', label: 'Planetesimal Project' },
  { path: '/nextdataanalysis', label: 'NEXT Data Analysis' },
  { path: '/missilesystems', label: 'Missile Systems Design' },
  { path: '/pebblebed', label: 'Pebble Bed Nuclear Reactors' },
];

const personalLinks = [{ path: '/personalprojects', label: 'Personal Projects' }];

const dropdownContentStyle = {
  position: 'absolute',
  top: '100%',
  left: 0,
  backgroundColor: '#ffffff',
  border: '1px solid #ccc',
  padding: '10px 0',
  minWidth: '220px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  zIndex: 50,
};

const navLinkStyle = {
  display: 'block',
  padding: '10px 20px',
  color: '#333333',
  textDecoration: 'none',
  fontSize: '15px',
};

function Dropdown({ title, links }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="dropdown"
      style={{ position: 'relative' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span style={{ color: '#ffffff', cursor: 'pointer', fontSize: '16px' }}>
        {title} &#9207;
      </span>
      {open && (
        <div className="dropdown-content" style={dropdownContentStyle}>
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              style={navLinkStyle}
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
    <header
      className="site-header"
      style={{ backgroundColor: '#222', borderBottom: '1px solid #444', padding: '15px 0' }}
    >
      <div
        className="wrapper"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <NavLink
          to="/"
          style={{
            color: '#ffffff',
            fontSize: '24px',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Richard Anderson
        </NavLink>

        <nav
          className="site-nav"
          style={{ marginLeft: 'auto', display: 'flex', gap: '30px', position: 'relative' }}
        >
          <Dropdown title="Research" links={researchLinks} />
          <Dropdown title="Personal Projects" links={personalLinks} />
        </nav>
      </div>
    </header>
  );
}

export default Header;
