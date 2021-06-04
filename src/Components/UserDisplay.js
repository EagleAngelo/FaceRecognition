import React, { Component } from "react";

const classStyles = {
    div1: "white f3",
};

export class UserDisplay extends Component {
    render() {
        return (
            <div>
                <div className={classStyles.div1}>{"Hello"}</div>
            </div>
        );
    }
}

export default UserDisplay;
