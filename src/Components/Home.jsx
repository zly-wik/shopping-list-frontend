import React, { Component } from "react";
import LoginForm from "./LoginForm";

class Home extends Component {
    props = {
        isLoggedIn: false,
    };
    render() {
        return (
            <>
                <h2>Shopping list app is my portfolio project</h2>
                <br />
                Code available at:
                <br />
                <a
                    href="https://github.com/zly-wik/shopping-list"
                    target="blank"
                    alt="GitHub link"
                >
                    GitHub
                </a>
                <br />
                <br />
                <LoginForm />
            </>
        );
    }
}

export default Home;
