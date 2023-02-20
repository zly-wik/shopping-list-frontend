import { Link } from "react-router-dom";

function Navbar() {
    return (
        <>
            <div className="row">
                {/* <span className="col-3"></span> */}
                <nav className="navbar">
                    <div className="menu">
                        <Link className="col-6 col-s-12 menu-button" to="/">
                            Home
                        </Link>
                        <Link
                            className="col-6 col-s-12 menu-button"
                            to="/shoppinglists"
                        >
                            Lists
                        </Link>
                    </div>
                </nav>
            </div>
            <Link className=" col-3 col-s-3 profile-button" to="/me">
                My Profile
            </Link>
        </>
    );
}

export default Navbar;
