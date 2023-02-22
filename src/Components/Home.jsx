function Home() {
    return (
        <div className="col-6 col-s-12 content">
            <h2>
                Welcome to <b>shopping list</b> app.
            </h2>
            <br />
            <p>
                This is my portfolio project created with Django and React.
                <br />
                <br />
                Visit my GitHub:&nbsp;
                <a
                    className="btn-logout"
                    href="https://github.com/zly-wik"
                    alt="GitHub link"
                    target="_blank"
                    rel="noreferrer"
                >
                    https://github.com/zly-wik
                </a>
                <br />
                And LinkedIn:&nbsp;
                <a
                    className="btn-logout"
                    href="https://www.linkedin.com/in/zlywik/"
                    alt="LinkedIn link"
                    target="_blank"
                    rel="noreferrer"
                >
                    https://www.linkedin.com/in/zlywik/
                </a>
            </p>
            <br />
        </div>
    );
}

export default Home;
