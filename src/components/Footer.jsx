function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#222',
        padding: '20px 0',
        textAlign: 'center',
        fontSize: '14px',
        color: '#ffffff',
      }}
    >
      <p style={{ fontWeight: 600, letterSpacing: '0.5px', marginBottom: '8px' }}>Richard Anderson</p>
      <p>
        <a href="mailto:richard.b.anderson@icloud.com" style={{ color: '#cccccc', margin: '0 10px' }}>
          richard.b.anderson@icloud.com
        </a>
        <a href="https://github.com/mrandrson" style={{ color: '#cccccc', margin: '0 10px' }}>
          @mrandrson
        </a>
      </p>
    </footer>
  );
}

export default Footer;
