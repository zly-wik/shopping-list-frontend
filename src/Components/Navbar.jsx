import { Button } from "reactstrap";
import Home from "./Home";
import ShoppingLists from "./ShoppingLists";
import Profile from "./Profile";

function Navbar(props) {
    return (
        <nav className="navbar">
            <div className="menu">
                <Button
                    className="menu-button"
                    onClick={() =>
                        props.changeMenu(<Home isLoggedIn={props.isLoggedIn} />)
                    }
                >
                    Home
                </Button>
                <Button
                    className="menu-button"
                    onClick={() =>
                        props.changeMenu(
                            <ShoppingLists isLoggedIn={props.isLoggedIn} />
                        )
                    }
                >
                    Lists
                </Button>
                <Button
                    className="menu-button"
                    onClick={() =>
                        props.changeMenu(
                            <Profile isLoggedIn={props.isLoggedIn} />
                        )
                    }
                >
                    My Profile
                </Button>
            </div>
        </nav>
    );
}

export default Navbar;
