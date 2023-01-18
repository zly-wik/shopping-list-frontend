import React, { Component } from "react";
import { Form, Button, Label, Input, FormGroup } from "reactstrap";

class LoginForm extends Component {
    state = {
        email: "",
        username: "",
        password: "",
        isLogin: false,
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submit = (e) => {
        e.preventDefault();
    };

    switchLoginRegister() {
        var current = this.state.isLogin;
        this.setState(() => {
            return { isLogin: !current };
        });
    }

    render() {
        var registerButton = this.state.isLogin ? (
            <Button onClick={() => this.switchLoginRegister()}>Register</Button>
        ) : (
            <Button onClick={() => this.switchLoginRegister()}>Login</Button>
        );

        var login = (
            <FormGroup>
                <Label for="username">Username:</Label>
                <Input type="text" name="username" onChange={this.onChange} />

                <Label for="password">Password:</Label>
                <Input
                    type="password"
                    name="password"
                    onChange={this.onChange}
                />
                <Button type="submit">Login</Button>
            </FormGroup>
        );

        var form = this.state.isLogin ? (
            <>{login}</>
        ) : (
            <>
                <FormGroup>
                    <Label for="email">Email:</Label>
                    <Input type="text" name="email" onChange={this.onChange} />
                </FormGroup>
                {login}
            </>
        );

        return (
            <>
                {registerButton}
                <div className="login-form">
                    <Form onSubmit={this.submit}>{form}</Form>
                </div>
            </>
        );
    }
}

export default LoginForm;
