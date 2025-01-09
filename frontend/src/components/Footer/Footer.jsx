const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>&copy; {currentYear} Lauri Luoma</p>
    </footer>
  );
};

export default Footer;