import React from "react";
import './SlideUpContent.scss';

interface SlideUpContentProps {
}

interface SlideUpContentState {
}

class SlideUpContent extends React.Component<SlideUpContentProps, SlideUpContentState>{

    render() {
        return (
            <div className="slide-up-content">
                {this.props.children}
            </div>
        );
    }
}

export default SlideUpContent;
