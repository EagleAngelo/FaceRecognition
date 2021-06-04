//import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import Navigation from "../Components/Navigation";
import Logo from "../Components/Logo";
import ImageLinkForm from "../Components/ImageLinkForm";
import UserDisplay from "../Components/UserDisplay";
import Particles from "react-particles-js";
import Clarifai from "clarifai";
import FaceRecognition from "../FaceRecognition/FaceRecognition";
import SignIn from "../SignIn/SignIn";
import Register from "../Components/Register";

const app = new Clarifai.App({
    apiKey: "YOUR_API_KEY_HERE",
});

const particleOptions = {
    polygon: {
        particles: {
            line_linked: {
                shadow: {
                    enable: true,
                    color: "#3CA9D1",
                    blur: 5,
                },
            },
        },
    },
};

class App extends Component {
    constructor() {
        super();
        //this.inputLinkField = React.createRef();
        this.state = {
            inputLink: "",
            input: "",
            box: {},
            user: {
                id: "",
                entries: 0,
            },
            route: "signin",
            signedIn: true,
        };
    }

    faceCoords = (data) => {
        const coords = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById("inputImg");
        const width = Number(image.width);
        const height = Number(image.height);

        return {
            left: coords.left_col * width,
            top: coords.top_row * height,
            right: width - coords.right_col * width,
            bottom: height - coords.bottom_row * height,
        };
    };

    onRouteChange = (route) => {
        if (route === "home") {
            this.setState({ signedIn: true });
        } else {
            this.setState({ signedIn: false });
        }
        this.setState({ route: route });
    };

    displayBox = (box) => {
        this.setState({ box: box });
        console.log(box);
    };

    onInputChange = (event) => {
        //console.log(event.target.value);
        this.setState({ input: event.target.value });
    };

    onSubmit = (event) => {
        //console.log(event.target);

        this.setState({ inputLink: this.state.input });

        //console.log(this.state.inputLink);
        //console.log(this.state.input);

        app.models
            .initModel({
                id: Clarifai.FACE_DETECT_MODEL,
            })
            .then((faceDetectModel) => {
                return faceDetectModel.predict(this.state.input);
            })
            .then((response) => {
                console.log(
                    response.outputs[0].data.regions[0].region_info.bounding_box
                );
                this.displayBox(this.faceCoords(response));
            })
            .catch((err) => console.log(err));
    };

    render() {
        return (
            <div className="App">
                <Particles className="particles" params={particleOptions} />
                <Navigation
                    onRouteChange={this.onRouteChange}
                    signedIn={this.state.signedIn}
                ></Navigation>

                {this.state.route === "home" ? (
                    <div>
                        <Logo></Logo>
                        <UserDisplay></UserDisplay>
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onSubmit={this.onSubmit}
                        ></ImageLinkForm>
                        <FaceRecognition
                            img={this.state.inputLink}
                            box={this.state.box}
                        ></FaceRecognition>
                    </div>
                ) : this.state.route === "signin" ? (
                    <div>
                        <Logo></Logo>
                        <SignIn onRouteChange={this.onRouteChange}></SignIn>
                    </div>
                ) : (
                    <div>
                        <Logo></Logo>
                        <Register onRouteChange={this.onRouteChange}></Register>
                    </div>
                )}
            </div>
        );
    }
}

export default App;
