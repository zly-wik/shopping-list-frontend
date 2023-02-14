import { useState } from "react";
import { Button, Form, Input } from "reactstrap";
import axios from "axios";

import { API_URL, csrfToken } from "../Constants";

function LoginForm({ onLoginSuccess }) {
    const [isLogin, setIsLogin] = useState(true);
    const [requestError, setRequestError] = useState(null);

    const registerRequest = (event) => {
        event.preventDefault();

        let data = {
            email: event.target.elements.email.value,
            username: event.target.elements.username.value,
            password: event.target.elements.password.value,
        };
        axios
            .post(`${API_URL}auth/users/`, data)
            .then((res) => {
                if (res.status === 201) {
                    setRequestError(null);
                    alert("Account created");
                }
            })
            .catch((err) => {
                setRequestError(err.message);
            });
    };

    const loginRequest = (event) => {
        event.preventDefault();
        if (!isLogin) {
            registerRequest(event);
            return;
        }

        let data = {
            username: event.target.elements.username.value,
            password: event.target.elements.password.value,
        };

        axios
            .post(`${API_URL}auth/jwt/create`, data)
            .then((res) => {
                if (res.status === 200) {
                    setRequestError(null);
                    sessionStorage.setItem("access", "JWT " + res.data.access);
                    onLoginSuccess(true);
                }
            })
            .catch((err) => {
                setRequestError(err.message);
            });
    };

    const switchLoginRegister = (login) => {
        setIsLogin(login);
    };

    const renderForm = () => {
        const registerForm = (
            <Input type="email" name="email" placeholder="email" />
        );

        const loginForm = (
            <>
                <Input name="username" placeholder="username" />
                <Input type="password" name="password" placeholder="password" />
            </>
        );

        const form = (
            <>
                {isLogin ? (
                    loginForm
                ) : (
                    <>
                        {registerForm}
                        {loginForm}
                    </>
                )}
                <Button type="submit">{isLogin ? "LogIn" : "Register"}</Button>
            </>
        );

        return form;
    };

    return (
        <>
            <div className="content">
                Login to access your shopping lists.
                <div className="error">{requestError}</div>
            </div>
            <div className="login-form">
                <Button
                    color="primary"
                    onClick={() => switchLoginRegister(true)}
                    active
                >
                    Login
                </Button>
                &nbsp;
                <Button
                    color="secondary"
                    onClick={() => switchLoginRegister(false)}
                    active
                >
                    Register
                </Button>
                <Form onSubmit={loginRequest}>
                    <input type="hidden" name="_token" value={csrfToken} />
                    {renderForm()}
                </Form>
            </div>
        </>
    );
}

export default LoginForm;
