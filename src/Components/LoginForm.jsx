import { useState } from "react";
import { Button, Form, Input } from "reactstrap";

function LoginForm({ handleLogin }) {
    const [isLogin, setIsLogin] = useState(true);

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
                <Form onSubmit={(form) => handleLogin(form.data)}>
                    {renderForm()}
                </Form>
            </div>
        </>
    );
}

export default LoginForm;
