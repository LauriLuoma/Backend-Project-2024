/**
 * Footer component for the Learn Words app.
 * Displays the current year and the author's name.
 */
const Footer = () => {
  // Get the current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Display the current year */}
      <p>&copy; {currentYear} Lauri Luoma</p>
    </footer>
  );
};

export default Footer;