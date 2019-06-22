import './SimpleGenerator.scss';
import React from "react";
import Select, {Option} from '@material/react-select';
import LeagueNameField from './LeagueNameField';
import TeamTextField from './TeamTextField';
import {Fab} from "@material/react-fab";
import {RouteComponentProps} from "react-router";
import SimpleGeneratorResults from "./SimpleGeneratorResults";

interface MainContentProps extends RouteComponentProps{ }

interface MainContentState {
    leagueName: string;
    teamNames: string[];
    showButtonLabel: boolean;
    showResults: boolean;
}

class SimpleGenerator extends React.Component<MainContentProps, MainContentState> {
    private static DEFAULT_LEAGUE_NAME = 'League Name';
    private static DEFAULT_NUMBER_OF_TEAMS = 10;

    public state: MainContentState = {leagueName: SimpleGenerator.DEFAULT_LEAGUE_NAME, teamNames: [], showButtonLabel: false, showResults: false};

    private onEnhancedChange = (index: number, item: Element) => {
        const numberOfTeams = +(item.getAttribute('data-value') || 0);

        this.setupTeamNames(numberOfTeams);
    }

    private updateShowButtonLabelStatus = () => {
        const width = window.innerWidth;
        this.setState({showButtonLabel: (width >= 640 && width < 1000) || width >= 1200});
    }

    private generateClicked = () => {
        // this.props.history.push('/simple-generator-results');
        this.setState({showResults: true});
    };

    private updateTeamName = (index: number, newTeamName: string) => {
        const teamNames = [...this.state.teamNames];

        teamNames.splice(index, 1, newTeamName);

        this.setState({teamNames});
    };

    private setupTeamNames(howMany: number): void {
        const teamNames = [];

        for (let i = 0; i < howMany; i++) {
            // if we have an existing team at the current index, use that
            const teamName = this.state.teamNames[i] || 'Team ' + (i + 1);

            teamNames.push(teamName);
        }

        this.setState({teamNames});
    }

    componentDidMount(): void {
        this.updateShowButtonLabelStatus();
        this.setupTeamNames(SimpleGenerator.DEFAULT_NUMBER_OF_TEAMS);
        window.addEventListener('resize', this.updateShowButtonLabelStatus);
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.updateShowButtonLabelStatus);
    }

    render() {
        return (
            <>
                { !this.state.showResults &&
                <div id="simple-generator">
                    <div id="input-options">
                        <LeagueNameField leagueName={this.state.leagueName} onLeagueNameChange={(newLeagueName: string) => this.setState({leagueName: newLeagueName})} />

                        <Fab onClick={this.generateClicked} textLabel={this.state.showButtonLabel ? 'Generate' : ''} icon={<span className="material-icons">casino</span>}/>

                        <Select
                            enhanced
                            // outlined
                            label='How Many Teams?'
                            value={this.state.teamNames.length.toString()}
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
                        {this.state.teamNames.map((teamName, index) =>
                            <div className="team-text-field-container" key={index}>
                                <TeamTextField teamName={teamName} onTeamNameChange={(newTeamName: string) => this.updateTeamName(index, newTeamName)} />
                            </div>
                        )}
                    </div>
                </div>
                }

                { this.state.showResults &&
                <div id="simple-generator-results">
                    <SimpleGeneratorResults leagueName={this.state.leagueName} teamNames={this.state.teamNames} onStartOver={() => this.setState({showResults: false})} />
                </div>
                }
            </>
        )
    }
}

export default SimpleGenerator;
