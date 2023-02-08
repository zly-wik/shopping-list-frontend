import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="menu">
                <Link className="menu-button" to="/">
                    Home
                </Link>
                <Link className="menu-button" to="/shoppinglists">
                    Lists
                </Link>
                <Link className="menu-button" to="/me">
                    My Profile
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
