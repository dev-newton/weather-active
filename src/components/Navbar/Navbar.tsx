import { Link } from "react-router-dom";
import "./Navbar.styles.scss";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">
        <h1>WeatherActive.</h1>
      </Link>
    </nav>
  );
};

export default Navbar;
