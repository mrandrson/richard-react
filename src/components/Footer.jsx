import assetPath from '../utils/assetPath';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrapper footer-inner">
        <p className="footer-name">Richard Anderson</p>
        <div className="footer-links">
          <a href="mailto:richard.b.anderson@icloud.com">
            Email
          </a>
          <a href="https://github.com/mrandrson" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={assetPath('Anderson_CV.pdf')}>CV</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
