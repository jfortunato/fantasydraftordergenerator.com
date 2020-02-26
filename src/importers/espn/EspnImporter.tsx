import React from "react";
import SimpleGenerator from "../../SimpleGenerator";
import {RouteComponentProps} from "react-router";
import LoginPanel from "../common/LoginPanel";
import logo from "./espn-fantasy-football.png";
import './EspnImporter.scss'
import ImportLeagueSelection from "../common/ImportLeagueSelection";

interface EspnImporterProps extends RouteComponentProps {}

interface EspnImporterState {
    showingLeagues: boolean;
    leagues: League[];
}

class EspnImporter extends React.Component<EspnImporterProps, EspnImporterState> {
    public static STORAGE_KEYS = {
        'ESPN_LEAGUES': 'espn-leagues',
    };

    constructor(props: EspnImporterProps) {
        super(props);

        const leagues = JSON.parse(localStorage.getItem(EspnImporter.STORAGE_KEYS.ESPN_LEAGUES) || '[]');

        this.state = {
            showingLeagues: leagues.length > 0,
            leagues: leagues,
        };
    }

    private selectLeague = (league: League) => {
        window.sessionStorage.setItem(SimpleGenerator.STORAGE_KEYS.LEAGUE_NAME, league.leagueName);
        window.sessionStorage.setItem(SimpleGenerator.STORAGE_KEYS.TEAM_NAMES, JSON.stringify(league.teams));
        this.props.history.push('/');
    };

    private async fetchLeagues(username: string, password: string): Promise<League[]> {
        const response = await fetch(`http://localhost:8000?username=${username}&password=${password}`);
        const leagues = await response.json();

        window.localStorage.setItem(EspnImporter.STORAGE_KEYS.ESPN_LEAGUES, JSON.stringify(leagues));
        this.setState({showingLeagues: true, leagues});

        return leagues;
    }

    render() {
        const { showingLeagues, leagues } = this.state;

        return (
            <div className="espn-importer">
                { !showingLeagues &&
                <LoginPanel
                    headingText="Enter your ESPN credentials to automatically import all team names for your league."
                    logo={logo}
                    primaryColor="#39b14a"
                    buttonLabel="Check Leagues"
                    onLoginButtonClick={(username: string, password: string) => this.fetchLeagues(username, password)}>
                </LoginPanel>
                }

                {showingLeagues &&
                <ImportLeagueSelection leagues={leagues} onLeagueSelected={this.selectLeague} onRecheckSelected={() => this.setState({showingLeagues: false})}></ImportLeagueSelection>
                }
            </div>
        );
    }
}

export interface League {
    id: string;
    leagueName: string;
    teamName: string;
    teams: string[];
}

export default EspnImporter;
