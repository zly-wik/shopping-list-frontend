import { useState } from "react";
import axios from "axios";

import { API_URL } from "../Constants";
import "../Styles/index.css";
import Logo from "./Logo";
import Navbar from "./Navbar";
import Home from "./Home";
import LoginForm from "./LoginForm";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [menu, setMenu] = useState(<Home />);

    const changeMenu = (newMenu) => {
        setMenu(newMenu);
    };

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
        <div className="App">
            <Logo />
            <Navbar changeMenu={changeMenu} isLoggedIn={isLoggedIn} />
            <div className="content">{menu}</div>
            {loginForm()}
        </div>
    );
}

export default App;
