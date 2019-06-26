import './SimpleGenerator.scss';
import React from "react";
import Select, {Option} from '@material/react-select';
import LeagueNameField from './LeagueNameField';
import TeamTextField from './TeamTextField';
import {Fab} from "@material/react-fab";
import {RouteComponentProps} from "react-router";

interface SimpleGeneratorProps extends RouteComponentProps {}

interface SimpleGeneratorState {
    leagueName: string;
    teamNames: string[];
    showButtonLabel: boolean;
}

class SimpleGenerator extends React.Component<SimpleGeneratorProps, SimpleGeneratorState> {
    private static DEFAULT_LEAGUE_NAME = 'League Name';
    private static DEFAULT_NUMBER_OF_TEAMS = 10;
    public static STORAGE_KEYS = {
        'LEAGUE_NAME': 'league-name',
        'TEAM_NAMES': 'team-names',
    };

    constructor(props: SimpleGeneratorProps) {
        super(props);

        this.state = {
            leagueName: sessionStorage.getItem(SimpleGenerator.STORAGE_KEYS.LEAGUE_NAME) || SimpleGenerator.DEFAULT_LEAGUE_NAME,
            teamNames: JSON.parse(sessionStorage.getItem(SimpleGenerator.STORAGE_KEYS.TEAM_NAMES) || '[]'),
            showButtonLabel: false,
        };
    }

    private onEnhancedChange = (index: number, item: Element) => {
        const numberOfTeams = +(item.getAttribute('data-value') || 0);

        this.setupTeamNames(numberOfTeams);
    }

    private updateShowButtonLabelStatus = () => {
        const width = window.innerWidth;
        this.setState({showButtonLabel: (width >= 640 && width < 1000) || width >= 1200});
    }

    private generateClicked = () => {
        this.props.history.push('/simple-generator-results');
    };

    private updateTeamName = (index: number, newTeamName: string) => {
        const teamNames = [...this.state.teamNames];

        teamNames.splice(index, 1, newTeamName);

        this.saveTeamNames(teamNames);
    };

    private setupTeamNames(howMany: number): void {
        const teamNames = [];

        for (let i = 0; i < howMany; i++) {
            // if we have an existing team at the current index, use that
            const teamName = this.state.teamNames[i] || 'Team ' + (i + 1);

            teamNames.push(teamName);
        }

        this.saveTeamNames(teamNames);
    }

    private saveLeagueName(leagueName: string): void {
        this.setState({leagueName});
        window.sessionStorage.setItem(SimpleGenerator.STORAGE_KEYS.LEAGUE_NAME, leagueName);
    }

    private saveTeamNames(teamNames: string[]): void {
        this.setState({teamNames});
        window.sessionStorage.setItem(SimpleGenerator.STORAGE_KEYS.TEAM_NAMES, JSON.stringify(teamNames));
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
                <div id="simple-generator">
                    <div id="input-options">
                        <LeagueNameField leagueName={this.state.leagueName} onLeagueNameChange={(newLeagueName: string) => this.saveLeagueName(newLeagueName)} />

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
            </>
        )
    }
}

export default SimpleGenerator;
