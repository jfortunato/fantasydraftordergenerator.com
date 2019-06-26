import "./SimpleGeneratorResults.scss";
import React from "react";
import {Body1, Headline4, Headline5} from "@material/react-typography";
import {RouteComponentProps} from "react-router";
import SimpleGenerator from "./SimpleGenerator";

interface SimpleGeneratorResultsProps extends RouteComponentProps {}

interface SimpleGeneratorResultsState {
    leagueName: string;
    results: OrderResult[];
}

class SimpleGeneratorResults extends React.Component<SimpleGeneratorResultsProps, SimpleGeneratorResultsState> {
    public state: SimpleGeneratorResultsState = {leagueName: '', results: []};

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

    componentDidMount(): void {
        const leagueName = window.sessionStorage.getItem(SimpleGenerator.STORAGE_KEYS.LEAGUE_NAME) || '';
        const teamNames = window.sessionStorage.getItem(SimpleGenerator.STORAGE_KEYS.TEAM_NAMES);

        if (teamNames === null) {
            return this.props.history.push('/');
        }

        this.setState({leagueName: leagueName, results: this.generateResults(JSON.parse(teamNames))});
    }

    render() {
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
