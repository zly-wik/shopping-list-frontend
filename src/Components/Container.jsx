import React, { Component } from "react";
import Home from "./Home";

// function Container(props) {
//     if (props.currentMenu === "Home") {
//         var container = <Home isLoggedIn={props.isLoggedIn} />;
//     } else if (props.currentMenu === "Checklists") {
//         var container = <p>Not implemented</p>;
//     } else if (props.currentMenu === "Profile") {
//         var container = <p>Not implemented</p>;
//     }

//     return container;
// }

class Container extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: props.isLoggedIn,
        };
    }

    renderMenu = (currentMenu) => {
        if (currentMenu === "Home") {
            return <Home isLoggedIn={this.state.isLoggedIn} />;
        } else if (currentMenu === "Checklists") {
            return <p>Not implemented</p>;
        } else if (currentMenu === "Profile") {
            return <p>Not implemented</p>;
        }

        return <p>Not implemented</p>;
    };

    render() {
        return this.renderMenu(this.props.currentMenu);
    }
}

export default Container;
