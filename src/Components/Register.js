import React, { Component } from "react";
import "./Register.css";

const classStyles = {
    div1: "center",
    div2: "ba b--blue bw2 regDiv2",
};

export class Register extends Component {
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
                                    ></input>
                                </div>
                            </fieldset>
                            <div className="">
                                <input
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="submit"
                                    value="Submit"
                                    onClick={() =>
                                        this.props.onRouteChange("signin")
                                    }
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
