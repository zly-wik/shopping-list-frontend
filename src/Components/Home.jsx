import React, { Component } from "react";
import LoginForm from "./LoginForm";

class Home extends Component {
    props = {
        isLoggedIn: false,
    };
    state = {};
    render() {
        return (
            <>
                if this.props.isLoggedIn
                {<LoginForm />}
            </>
        );
    }
}

export default Home;
