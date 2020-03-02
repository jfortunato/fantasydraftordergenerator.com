import React from "react";
import './SlideUpContentHeading.scss';
import {Headline5} from "@material/react-typography";
import MaterialIcon from "@material/react-material-icon";

interface SlideUpContentHeadingProps {
    logo: string;
    hasMenuToggle: boolean;
}

interface SlideUpContentHeadingState {
    opacity: number;
    isFullyHidden: boolean;
}

class SlideUpContentHeading extends React.Component<SlideUpContentHeadingProps, SlideUpContentHeadingState>{
    public state: SlideUpContentHeadingState = { opacity: 0, isFullyHidden: false };

    private updateOpacity = () => {
        const height = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--slide-up-content-header-height'));

        let opacity = window.scrollY / height;

        if (opacity >= 1) {
            opacity = 1;
        }

        const isFullyHidden = opacity >= 1;

        this.setState({opacity, isFullyHidden});
    }

    private menuClicked = () => {
        window.dispatchEvent(new Event('toggle-menu-clicked'));
    }

    componentDidMount(): void {
        window.addEventListener('scroll', this.updateOpacity);
    }

    componentWillUnmount(): void {
        window.removeEventListener('scroll', this.updateOpacity);
    }

    render() {
        const { logo } = this.props;
        const { opacity, isFullyHidden } = this.state;

        const hiddenModifier = isFullyHidden ? 'fully-hidden' : 'visible'

        const overlayStyles = {
            opacity: opacity,
            display: opacity === 0 ? 'none' : 'block',
        };

        return (
            <div className={`slide-up-content__heading slide-up-content__heading--${hiddenModifier}`}>
                <MaterialIcon hasRipple icon='menu' onClick={this.menuClicked} className="slide-up-content__heading-menu-toggle" />
                <img src={logo} alt="" className="slide-up-content__heading-logo" />
                <Headline5 tag="h1" className="slide-up-content__heading-tagline">{this.props.children}</Headline5>
                <div className="slide-up-content__heading-advertising"></div>
                <div className="slide-up-content__heading-overlay" style={overlayStyles}></div>
            </div>
        );
    }
}

export default SlideUpContentHeading;
