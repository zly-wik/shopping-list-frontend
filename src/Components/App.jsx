import React, { Component } from "react";
import axios from "axios";
import { API_URL } from "../Constants";
import Home from "./Home";

class App extends Component {
    state = {
        isLoggedIn: false,
        currentMenu: "",
    };

    setCurrentMenu(url, new_menu) {
        currentMenu = new_menu;
    }

    render() {
        return (
            <>
                <h1>Shopping List</h1>
                <div className="menu">
                    <button
                        type="submit"
                        value="Home"
                        onClick={setCurrentMenu(API_URL, "Home")}
                    />
                    <br />
                    <button
                        type="submit"
                        value="Checklists"
                        onClick={setCurrentMenu(
                            API_URL + "checklists/",
                            "Checklists"
                        )}
                    />
                    <br />
                    <button
                        type="submit"
                        value="Profile"
                        onClick={setCurrentMenu(API_URL + "me/", "Profile")}
                    />
                    <br />
                </div>
                <div className="container">
                    if (this.state.currentMenu == "Home")
                    {<Home isLoggedIn={this.state.isLoggedIn} />}
                </div>
            </>
        );
    }
}

export default App;
