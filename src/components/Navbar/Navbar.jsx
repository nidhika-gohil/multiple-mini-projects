import { Link } from "react-router-dom";
import { GET_NAVBAR_DATA } from "../../util/constants";
import "./Navbar.css"

const Navbar = () => {
    const navBarData = GET_NAVBAR_DATA;
    return (
      <div className="navbar-container">
        <ul>
          {navBarData.map((item, index) => {
            return (
              <li key={index} className="carousel"><Link to={item.toLowerCase()}>{item}</Link></li>
            )
          })}
        </ul>
      </div>
    )
};

export default Navbar;