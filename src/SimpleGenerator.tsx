import React from "react";
import Select, {Option} from '@material/react-select';
import LeagueNameField from './LeagueNameField';
import TeamTextField from './TeamTextField';
import {Fab} from "@material/react-fab";
import Button from "@material/react-button";
import {RouteComponentProps} from "react-router";
import './SimpleGenerator.scss';
import espnLogo from './importers/espn/espn-fantasy-football.png';
import {Headline5} from "@material/react-typography";
import DividerText from "./DividerText";
import SlideUpContent from "./layout/SlideUpContent/SlideUpContent";
import SlideUpContentHeading from "./layout/SlideUpContent/SlideUpContentHeading";
import SlideUpContentBody from "./layout/SlideUpContent/SlideUpContentBody";
import MaterialIcon from "@material/react-material-icon";
import {TopAppBarIcon} from "@material/react-top-app-bar";

interface SimpleGeneratorProps extends RouteComponentProps {}

interface SimpleGeneratorState {
    leagueName: string;
    teamNames: string[];
    showButtonLabel: boolean;
    opacity: number;
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
            opacity: 0,
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
        const totalTeams = this.state.teamNames.length === 0 ? SimpleGenerator.DEFAULT_NUMBER_OF_TEAMS : this.state.teamNames.length;
        this.setupTeamNames(totalTeams);
        window.addEventListener('resize', this.updateShowButtonLabelStatus);
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.updateShowButtonLabelStatus);
    }

    render() {
        return (
            <>
                <SlideUpContent>
                    <SlideUpContentHeading logo={espnLogo} hasMenuToggle={true}>
                        Fantasy Football<br />Draft Order Generator
                    </SlideUpContentHeading>
                    <SlideUpContentBody>
                        <div id="simple-generator" className="simple-generator">
                            <div className="simple-generator__app-content">
                                <div className="simple-generator__importers">
                                    <div className="simple-generator__importers-item">
                                        <img src={espnLogo} alt="" className="simple-generator__importers-item-image" />
                                        <Button raised onClick={() => this.props.history.push('/espn-importer')} className="simple-generator__importers-item-button">Import From ESPN</Button>
                                    </div>
                                </div>
                                <div className="simple-generator__generator">
                                    <div className="simple-generator__generator-inputs">
                                        <div className="simple-generator__generator-input-league-name">
                                            <LeagueNameField leagueName={this.state.leagueName} onLeagueNameChange={(newLeagueName: string) => this.saveLeagueName(newLeagueName)} />
                                        </div>
                                        <Fab className="simple-generator__generator-execute-button" onClick={this.generateClicked} textLabel={this.state.showButtonLabel ? 'Generate' : ''} icon={<span className="material-icons">casino</span>}/>
                                        <div className="simple-generator__generator-input-number-teams">
                                            <Select
                                                enhanced
                                                label='How Many Teams?'
                                                value={this.state.teamNames.length.toString()}
                                                onEnhancedChange={this.onEnhancedChange}
                                            >
                                                <Option value=''>Select Number Of Teams</Option>
                                                <Option value='6'>6 Teams</Option>
                                                <Option value='8'>8 Teams</Option>
                                                <Option value='10'>10 Teams</Option>
                                                <Option value='12'>12 Teams</Option>
                                                <Option value='14'>14 Teams</Option>
                                                <Option value='16'>16 Teams</Option>
                                                <Option value='18'>18 Teams</Option>
                                                <Option value='20'>20 Teams</Option>
                                                {/*<Option value='0'>Custom # Of Teams</Option>*/}
                                            </Select>
                                        </div>

                                    </div>
                                    <div className="simple-generator__generator-teams">
                                        {this.state.teamNames.map((teamName: string, index: number) =>
                                            <div className="simple-generator__generator-team-input" key={index}>
                                                <TeamTextField teamName={teamName} onTeamNameChange={(newTeamName: string) => this.updateTeamName(index, newTeamName)} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SlideUpContentBody>
                </SlideUpContent>
            </>
        )
    }
}

export default SimpleGenerator;
