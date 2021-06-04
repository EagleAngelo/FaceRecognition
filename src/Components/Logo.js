import React, { Component } from "react";
import Tilt from "react-tilt";
import "./Logo.css";
import camera from "./cameraIcon.png";

const classStyles = {
    div1: "ma4 mt0",
    tilt: "Tilt br2 shadow-2",
    tiltInner: "Tilt-inner",
};

const styles = {
    nav: {
        display: "flex",
        justifyContent: "flex-end",
    },
    tilt: {
        height: 100,
        width: 100,
    },
};

export class Logo extends Component {
    render() {
        return (
            <div className={classStyles.div1}>
                <Tilt
                    className={classStyles.tilt}
                    options={{ max: 50 }}
                    style={styles.tilt}
                >
                    <div className={classStyles.tiltInner}>
                        <img alt="logo" src={camera}></img>
                    </div>
                </Tilt>
            </div>
        );
    }
}

export default Logo;
