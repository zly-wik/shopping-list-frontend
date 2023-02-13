import { useState } from "react";
import { Button, Form, Input } from "reactstrap";
import axios from "axios";

import { API_URL, csrfToken } from "../Constants";

function LoginForm({ onLoginSuccess }) {
    const [isLogin, setIsLogin] = useState(true);

    const loginRequest = (event) => {
        event.preventDefault();
        let data = {
            username: event.target.elements.username.value,
            password: event.target.elements.password.value,
        };

        axios.post(`${API_URL}auth/jwt/create`, data).then((res) => {
            if (res.status === 200) {
                sessionStorage.setItem("access", "JWT " + res.data.access);
                onLoginSuccess(true);
            }
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
            <div className="content">Login to access your shopping lists.</div>
            <div className="login-form">
                <Button onClick={() => switchLoginRegister(true)}>Login</Button>
                <Button onClick={() => switchLoginRegister(false)}>
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
