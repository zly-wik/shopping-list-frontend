import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "../Styles/index.css";
import Logo from "./Logo";
import Navbar from "./Navbar";
import Home from "./Home";
import LoginForm from "./LoginForm";
import ShoppingLists from "./ShoppingLists";
import ListDetails from "./ListDetails";
import UserProfile from "./UserProfile";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        sessionStorage.getItem("access") !== null
    );

    const loginForm = () => {
        if (isLoggedIn) {
            return <></>;
        }
        return (
            <>
                <Home />
                <LoginForm onLoginSuccess={(val) => setIsLoggedIn(val)} />
            </>
        );
    };

    return (
        <Router>
            <div className="App">
                <Logo />

                <Navbar />

                {!isLoggedIn && loginForm()}
                {isLoggedIn && (
                    <div className="content">
                        <Routes>
                            <Route exact path="/" element={<Home />} />
                            <Route
                                exact
                                path="/shoppinglists"
                                element={<ShoppingLists />}
                            />
                            <Route
                                exact
                                path="/me"
                                element={
                                    <UserProfile
                                        logoutCallback={() =>
                                            setIsLoggedIn(false)
                                        }
                                    />
                                }
                            />
                            <Route
                                exact
                                path={`/shoppinglists/:id`}
                                element={<ListDetails />}
                            />
                        </Routes>
                    </div>
                )}
            </div>
        </Router>
    );
}

export default App;
