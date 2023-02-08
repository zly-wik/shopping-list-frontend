import { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { API_URL } from "../Constants";
import "../Styles/index.css";
import Logo from "./Logo";
import Navbar from "./Navbar";
import Home from "./Home";
import LoginForm from "./LoginForm";
import ShoppingLists from "./ShoppingLists";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const handleRegister = (data) => {
        console.log("Register");
    };

    const handleLogin = (event) => {
        event.preventDefault();
        if (!isLoggedIn) {
            handleRegister(event.data);
            return;
        }
        axios
            .post(`${API_URL}auth/jwt/create`, event.data)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data["access"]);
                    // setIsLoggedIn(true);
                }
                console.log(res.status);
            })
            .catch((res) => console.log(res.status));
        return;
    };

    const loginForm = () => {
        if (isLoggedIn) {
            return <></>;
        }
        return <LoginForm handleLogin={handleLogin} />;
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
                    </Routes>
                </div>
                {loginForm()}
            </div>
        </Router>
    );
}

export default App;
