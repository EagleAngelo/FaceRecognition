import React, { Component } from "react";
import "./FaceRecognition.css";

const classStyles = {
    div1: "center ma",
    div2: "absolute mt2",
    box: "box",
};

const styles = (box) => {
    return {
        top: box.top,
        right: box.right,
        bottom: box.bottom,
        left: box.left,
    };
};

export class FaceRecognition extends Component {
    render(props) {
        return (
            <div className={classStyles.div1}>
                <div className={classStyles.div2}>
                    <img id="inputImg" alt="" src={this.props.img}></img>
                    <div
                        className={classStyles.box}
                        style={styles(this.props.box)}
                    ></div>
                </div>
            </div>
        );
    }
}

export default FaceRecognition;
