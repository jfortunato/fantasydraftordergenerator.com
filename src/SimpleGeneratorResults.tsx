import "./SimpleGeneratorResults.scss";
import React from "react";
import {Body1, Headline4, Headline5} from "@material/react-typography";
import {RouteComponentProps} from "react-router";
import SimpleGenerator from "./SimpleGenerator";
import LinearProgress from "@material/react-linear-progress";

interface SimpleGeneratorResultsProps extends RouteComponentProps {}

interface SimpleGeneratorResultsState {
    leagueName: string;
    results: OrderResult[];
}

class SimpleGeneratorResults extends React.Component<SimpleGeneratorResultsProps, SimpleGeneratorResultsState> {
    constructor(props: SimpleGeneratorResultsProps) {
        super(props);

        const leagueName = sessionStorage.getItem(SimpleGenerator.STORAGE_KEYS.LEAGUE_NAME) || '';

        if (this.getTeamNames().length === 0) {
            props.history.push('/');
        }

        this.state = { leagueName, results: [] };
    }

    componentDidMount(): void {
        this.generateDelayedResults().then(results => this.setState({results: results}));
    }

    private getTeamNames(): string[] {
        return JSON.parse(sessionStorage.getItem(SimpleGenerator.STORAGE_KEYS.TEAM_NAMES) || '[]');
    }

    /*
     * Introduce an artificial delay to improve the perception that cpu-intensive
     * randomization is being performed.
     */
    private generateDelayedResults(): Promise<OrderResult[]> {
        return new Promise<OrderResult[]>(resolve => {
            setTimeout(() => resolve(this.generateResults(this.getTeamNames())), 1000);
        });
    }

    /**
     * Fisher-Yates (aka Knuth) shuffle
     */
    private generateResults(teamNames: string[]): OrderResult[] {
        const array = [...teamNames];

        let currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array.map((teamName, index) => ({ pickNumber: index + 1, teamName: teamName })).reverse();
    }

    render() {
        if (this.state.results.length === 0) {
            return (
                <>
                    <Headline4 className="generating-results">Generating Results...</Headline4>
                    <LinearProgress indeterminate={true} />
                </>
            );
        }

        return (
            <div>
                <Headline4 className="league-name">{ this.state.leagueName }</Headline4>

                <table id="results-table">
                    <thead>
                        <tr>
                            <th><Headline5>Pick #</Headline5></th>
                            <th><Headline5>Team</Headline5></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.results.map(result =>
                        <tr key={result.pickNumber}>
                            <td><Body1>{ result.pickNumber }</Body1></td>
                            <td>{ result.teamName }</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

interface OrderResult {
    pickNumber: number;
    teamName: string;
}

export default SimpleGeneratorResults;
