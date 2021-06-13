//import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import Navigation from "../Components/Navigation";
import Logo from "../Components/Logo";
import ImageLinkForm from "../Components/ImageLinkForm";
//import UserDisplay from "../Components/UserDisplay";
import Particles from "react-particles-js";
//import Clarifai from "clarifai";
import FaceRecognition from "../FaceRecognition/FaceRecognition";
import SignIn from "../SignIn/SignIn";
import Register from "../Components/Register";
import Rank from "../Components/Rank";

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

const initialState = {
    inputLink: "",
    input: "",
    box: {},
    route: "signin",
    signedIn: true,
    user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
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
            route: "signin",
            signedIn: true,
            user: {
                id: "",
                name: "",
                email: "",
                entries: 0,
                joined: "",
            },
        };
    }

    registerUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entires: data.entries,
                joined: data.joined,
            },
        });
    };

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined,
            },
        });

        //console.log("loadUser state", this.state);
        //console.log("loadUser data", data);
    };

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

    /* componentDidMount() {
        fetch("http://localhost:3001")
            .then((response) => response.json())
            .then((data) => console.log(data));
    } */

    onRouteChange = (route) => {
        if (route === "home") {
            this.setState(initialState);
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

        fetch("https://intense-bayou-04107.herokuapp.com/imageurl", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                input: this.state.input,
            }),
        })
            .then((respo) => respo.json())
            .then((response) => {
                console.log(
                    response.outputs[0].data.regions[0].region_info.bounding_box
                );

                if (response) {
                    fetch("https://intense-bayou-04107.herokuapp.com/image", {
                        method: "put",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id: this.state.user.id,
                        }),
                    })
                        .then((response) => response.json())
                        .then((count) => {
                            this.setState(
                                Object.assign(this.state.user, {
                                    entries: count,
                                })
                            );
                            //console.log("submitstate", this.state);
                        })
                        .catch((err) => console.log(err));
                }

                this.displayBox(this.faceCoords(response));
            })
            .catch((err) => console.log(err));
    };

    render() {
        //console.log("state render", this.state);
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
                        <Rank
                            name={this.state.user.name}
                            entries={this.state.user.entries}
                        ></Rank>
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
                        <SignIn
                            loadUser={this.loadUser}
                            onRouteChange={this.onRouteChange}
                        ></SignIn>
                    </div>
                ) : (
                    <div>
                        <Logo></Logo>
                        <Register
                            registerUser={this.registerUser}
                            onRouteChange={this.onRouteChange}
                        ></Register>
                    </div>
                )}
            </div>
        );
    }
}

export default App;
