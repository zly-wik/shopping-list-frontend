import React, { Component } from "react";

class LoginForm extends Component {
    state = {
        username: "",
        password: "",
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    login = (e) => {
        e.preventDefault();
    };

    render() {
        return (
            <>
                <Form onSubmit={this.login}>
                    <label for="username">Username:</label>
                    <input
                        type="text"
                        name="username"
                        onChange={this.onChange}
                    />
                    <label for="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        onChange={this.onChange}
                    />
                    <Button type="submit">Login</Button>
                </Form>
            </>
        );
    }
}

export default LoginForm;
