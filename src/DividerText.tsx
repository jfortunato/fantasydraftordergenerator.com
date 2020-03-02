import React from "react";
import './DividerText.scss';

interface DividerTextProps {
    align: "left" | "center" | "right";
}

interface DividerTextState {
}

class DividerText extends React.Component<DividerTextProps, DividerTextState> {
    render() {
        const { children, align } = this.props;

        return (
            <div className="divider-text" style={{textAlign: align}}>
                <div className="divider-text__text">{children}</div>
                <div className="divider-text__line"></div>
            </div>
        );
    }
}

export default DividerText;
