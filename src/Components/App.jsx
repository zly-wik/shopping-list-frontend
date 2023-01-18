import React, { Component } from "react";
import { Button } from "reactstrap";
import { API_URL } from "../Constants";
import Container from "./Container";

class App extends Component {
    state = {
        isLoggedIn: false,
        currentMenu: "Home",
        response: null,
    };

    setCurrentMenu(url, new_menu) {
        this.setState(() => {
            return { currentMenu: new_menu };
        });
    }

    render() {
        return (
            <div>
                <h1>Shopping List</h1>
                <div className="menu">
                    <Button
                        onClick={() => this.setCurrentMenu(API_URL, "Home")}
                    >
                        Home
                    </Button>
                    <br />
                    <Button
                        onClick={() =>
                            this.setCurrentMenu(
                                `${API_URL}checklists/`,
                                "Checklists"
                            )
                        }
                    >
                        Checklists
                    </Button>
                    <br />
                    <Button
                        onClick={() =>
                            this.setCurrentMenu(`${API_URL}me/`, "Profile")
                        }
                    >
                        Profile
                    </Button>
                    <br />
                </div>
                <Container
                    isLoggedIn={this.state.isLoggedIn}
                    currentMenu={this.state.currentMenu}
                />
            </div>
        );
    }
}

export default App;
