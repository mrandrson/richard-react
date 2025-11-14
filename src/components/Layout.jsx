import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  const location = useLocation();

  useEffect(() => {
    if (window.MathJax?.typesetPromise) {
      window.MathJax.typesetPromise();
    }
  }, [location.pathname]);

  return (
    <div style={{ backgroundColor: '#ffffff', color: '#1e1e1e', minHeight: '100vh' }}>
      <Header />
      <main className="page-content" aria-label="Content">
        <div className="wrapper">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
