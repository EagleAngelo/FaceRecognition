import React, { Component } from "react";
import "./Register.css";

const classStyles = {
    div1: "center",
    div2: "ba b--blue bw2 regDiv2",
};

export class Register extends Component {
    constructor() {
        super();

        this.state = {
            name: "",
            email: "",
            pass: "",
        };
    }

    onNameChange = (event) => {
        this.setState({ name: event.target.value });
    };

    onEmailChange = (event) => {
        this.setState({ email: event.target.value });
    };

    onPassChange = (event) => {
        this.setState({ pass: event.target.value });
    };

    onSubmit = () => {
        fetch("https://intense-bayou-04107.herokuapp.com/register", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.pass,
            }),
        })
            .then((response) => response.json())
            .then((user) => {
                if (user.id) {
                    this.props.registerUser(user);
                    this.props.onRouteChange("signin");
                }
            });
    };

    render(props) {
        return (
            <div className={classStyles.div1}>
                <div className={classStyles.div2}>
                    <main className="pa4 black-80 center">
                        <div className="measure">
                            <fieldset
                                id="sign_up"
                                className="ba b--transparent ph0 mh0"
                            >
                                <legend className="ba b--black bw1 f4 fw6 ph0 mh0 bg-blue">
                                    Register
                                </legend>

                                <div className="mt3">
                                    <label
                                        className="db fw6 lh-copy f6"
                                        htmlFor="name"
                                    >
                                        Name
                                    </label>
                                    <input
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="text"
                                        name="name"
                                        id="name"
                                        onChange={this.onNameChange}
                                    ></input>
                                </div>
                                <div className="mt3">
                                    <label
                                        className="db fw6 lh-copy f6"
                                        htmlFor="email-address"
                                    >
                                        Email
                                    </label>
                                    <input
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="email"
                                        name="email-address"
                                        id="email-address"
                                        onChange={this.onEmailChange}
                                    ></input>
                                </div>
                                <div className="mv3">
                                    <label
                                        className="db fw6 lh-copy f6"
                                        htmlFor="password"
                                    >
                                        Password
                                    </label>
                                    <input
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="password"
                                        name="password"
                                        id="password"
                                        onChange={this.onPassChange}
                                    ></input>
                                </div>
                            </fieldset>
                            <div className="">
                                <input
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="submit"
                                    value="Submit"
                                    onClick={this.onSubmit}
                                ></input>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default Register;
