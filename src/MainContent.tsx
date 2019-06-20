import './MainContent.scss';
import React from "react";
import Select, {Option} from '@material/react-select';
import LeagueNameField from './LeagueNameField';
import TeamTextField from './TeamTextField';
import {Fab} from "@material/react-fab";

interface MainContentState {
    numberOfTeams: number;
    showButtonLabel: boolean;
}

class MainContent extends React.Component<{}, MainContentState> {
    public state: MainContentState = {numberOfTeams: 10, showButtonLabel: false};

    private onEnhancedChange = (index: number, item: Element) => {
        this.setState({numberOfTeams: +(item.getAttribute('data-value') || 0)})
    }

    private updateShowButtonLabelStatus = () => {
        this.setState({showButtonLabel: window.innerWidth >= 1200});
    }

    componentDidMount(): void {
        this.updateShowButtonLabelStatus();
        window.addEventListener('resize', this.updateShowButtonLabelStatus);
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.updateShowButtonLabelStatus);
    }

    render() {
        return (
            <>
                <div id="input-options">
                    <LeagueNameField defaultName="League Name" />

                    <Fab textLabel={this.state.showButtonLabel ? 'Generate' : ''} icon={<span className="material-icons">casino</span>}/>

                    <Select
                        enhanced
                        // outlined
                        label='How Many Teams?'
                        value={this.state.numberOfTeams.toString()}
                        onEnhancedChange={this.onEnhancedChange}
                    >
                        <Option value='6'>6 Teams</Option>
                        <Option value='8'>8 Teams</Option>
                        <Option value='10'>10 Teams</Option>
                        <Option value='12'>12 Teams</Option>
                        <Option value='14'>14 Teams</Option>
                        <Option value='16'>16 Teams</Option>
                        <Option value='18'>18 Teams</Option>
                        <Option value='20'>20 Teams</Option>
                        <Option value='0'>Custom # Of Teams</Option>
                    </Select>
                </div>

                <div className="team-text-field-list">
                    {[...Array(this.state.numberOfTeams)].map((n, index) =>
                        <div className="team-text-field-container" key={index}>
                            <TeamTextField defaultName={'Team ' + (index + 1)} />
                        </div>
                    )}
                </div>
            </>
        )
    }
}

export default MainContent;
