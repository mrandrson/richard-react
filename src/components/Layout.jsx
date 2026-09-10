import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import 'katex/dist/katex.min.css';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  const location = useLocation();
  const contentRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let observer;

    import('katex/contrib/auto-render').then(({ default: renderMathInElement }) => {
      if (cancelled || !contentRef.current) {
        return;
      }

      const content = contentRef.current;
      const renderMath = () => {
        if (cancelled) {
          return;
        }

        observer?.disconnect();
        renderMathInElement(content, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '\\[', right: '\\]', display: true },
            { left: '\\(', right: '\\)', display: false },
            { left: '$', right: '$', display: false },
          ],
          throwOnError: false,
        });
        observer?.observe(content, { childList: true, characterData: true, subtree: true });
      };

      observer = new MutationObserver(renderMath);
      renderMath();
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
    };
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <Header />
      <main ref={contentRef} className="page-content" aria-label="Content">
        <div className="wrapper content-card">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
