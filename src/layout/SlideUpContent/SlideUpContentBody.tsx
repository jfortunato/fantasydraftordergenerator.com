import React from "react";
import './SlideUpContentBody.scss';

interface SlideUpContentBodyProps {
}

interface SlideUpContentBodyState {
}

class SlideUpContentBody extends React.Component<SlideUpContentBodyProps, SlideUpContentBodyState> {
    render() {
        return (
            <div className="slide-up-content__body">
                {this.props.children}
            </div>
        );
    }
}

export default SlideUpContentBody;
