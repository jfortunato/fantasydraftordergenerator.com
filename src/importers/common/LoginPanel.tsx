import React from "react";
import UsernameInput from "./UsernameInput";
import PasswordInput from "./PasswordInput";
import {Button} from "@material/react-button";
import './LoginPanel.scss';

interface LoginPanelProps {
    onLoginButtonClick: (username: string, password: string) => void;
    logo: string;
    primaryColor: string;
    headingText: string;
    buttonLabel: string;
}

interface LoginPanelState {
    username: string;
    password: string;
}

class LoginPanel extends React.Component<LoginPanelProps, LoginPanelState> {
    public state: LoginPanelState = {username: '', password: ''};

    render() {
        const { logo, onLoginButtonClick, primaryColor, headingText, buttonLabel } = this.props;
        const { username, password } = this.state;

        return (
            <div className="login-panel">
                <div className="login-panel__heading" style={{ borderTop: `4px solid ${primaryColor}` }}>{headingText}</div>
                <div className="login-panel__body">
                    <img className="login-panel__logo" src={logo} alt="" />
                    <div className="login-panel__username"><UsernameInput value={username} onValueChange={(newValue: string) => this.setState({username: newValue})}></UsernameInput></div>
                    <div className="login-panel__password"><PasswordInput value={password} onValueChange={(newValue: string) => this.setState({password: newValue})}></PasswordInput></div>
                    <Button className="login-panel__login-button" raised onClick={() => onLoginButtonClick(username, password)}>{buttonLabel}</Button>
                </div>
            </div>
        );
    }
}

export default LoginPanel;
