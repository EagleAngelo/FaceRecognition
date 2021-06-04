import React, { Component } from "react";

const classStyles = {
    p: "f3 link dim black underline pa3 pointer",
};

const styles = {
    nav: {
        display: "flex",
        justifyContent: "flex-end",
    },
};

export class Navigation extends Component {
    render(props) {
        if (this.props.signedIn) {
            return (
                <div>
                    <nav style={styles.nav}>
                        <p
                            className={classStyles.p}
                            onClick={() => this.props.onRouteChange("signin")}
                        >
                            Sign Out
                        </p>
                    </nav>
                </div>
            );
        } else {
            return (
                <div>
                    <nav style={styles.nav}>
                        <p
                            className={classStyles.p}
                            onClick={() => this.props.onRouteChange("register")}
                        >
                            Register
                        </p>
                        <p
                            className={classStyles.p}
                            onClick={() => this.props.onRouteChange("signin")}
                        >
                            Sign In
                        </p>
                    </nav>
                </div>
            );
        }
    }
}

export default Navigation;
