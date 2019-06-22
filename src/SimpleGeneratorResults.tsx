import React from "react";

interface SimpleGeneratorResultsProps {
    leagueName: string;
    teamNames: string[];
    onStartOver: Function;
}

class SimpleGeneratorResults extends React.Component<SimpleGeneratorResultsProps, {}> {
    /**
     * Fisher-Yates (aka Knuth) shuffle
     */
    private generateResults() {
        const array = [...this.props.teamNames];

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

        return array;
    }

    render() {
        return (
            <div>
                <h1>Results - {this.props.leagueName}</h1>
                <ol>
                { this.generateResults().map((teamName, index) =>
                    <li key={index}>{teamName}</li>
                )}
                </ol>
                <button onClick={() => this.props.onStartOver()}>Start Over</button>
            </div>
        );
    }
}

export default SimpleGeneratorResults;
