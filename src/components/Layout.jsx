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
    <div className="site-shell">
      <Header />
      <main className="page-content" aria-label="Content">
        <div className="wrapper content-card">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
