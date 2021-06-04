import React, { Component } from "react";
import "./ImageLinkForm.css";

const classStyles = {
    p: "f3",
    input1: "f4 pa2 w-70 center",
    button1: "w-30 grow f4 link ph3 pv2 dib white bg-blue",
    divDetectBar: "center",
    divDetectBar2: "form center pa4 br3 shadow-5",
};

export class ImageLinkForm extends Component {
    render(props) {
        return (
            <div>
                <p className={classStyles.p}>
                    A simple face detection/recognition app
                </p>
                <div className={classStyles.divDetectBar}>
                    <div className={classStyles.divDetectBar2}>
                        <input
                            className={classStyles.input1}
                            onChange={this.props.onInputChange}
                            type="text"
                            placeholder="Enter Image URL"
                        />
                        <button
                            className={classStyles.button1}
                            onClick={this.props.onSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ImageLinkForm;
