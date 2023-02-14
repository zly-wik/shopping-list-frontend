import { useState } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "../Styles/index.css";
import Logo from "./Logo";
import Navbar from "./Navbar";
import Home from "./Home";
import LoginForm from "./LoginForm";
import ShoppingLists from "./ShoppingLists";
import ListDetails from "./ListDetails";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        sessionStorage.getItem("access") !== null
    );

    const loginForm = () => {
        if (isLoggedIn) {
            return <></>;
        }
        return <LoginForm onLoginSuccess={(val) => setIsLoggedIn(val)} />;
    };

    return (
        <Router>
            <div className="App">
                <Logo />
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route
                            exact
                            path="/shoppinglists"
                            element={<ShoppingLists />}
                        />
                        {/* /me endpoint */}
                        <Route
                            exact
                            path={`/shoppinglists/:id`}
                            element={<ListDetails />}
                        />
                    </Routes>
                </div>
                {loginForm()}
            </div>
        </Router>
    );
}

export default App;
