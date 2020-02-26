import React from "react";
import './ImportLeageSelection.scss';
import {Button} from "@material/react-button";
import {Headline5, Headline6, Subtitle1, Subtitle2} from '@material/react-typography';
import {League} from "../espn/EspnImporter";
import defaultLogo from "../espn/espn-fantasy-football.png";

interface ImportLeagueSelectionProps {
    leagues: League[];
    onLeagueSelected: (league: League) => void;
    onRecheckSelected: () => void;
}

interface ImportLeagueSelectionState {
}

class ImportLeagueSelection extends React.Component<ImportLeagueSelectionProps, ImportLeagueSelectionState> {
    render() {
        const { leagues, onLeagueSelected, onRecheckSelected } = this.props;

        return (
            <div className="import-league-selection">
                <div className="import-league-selection__headline">
                    <Headline5>You are in multiple leagues. Which one do you want to use?</Headline5>
                </div>
                <div className="import-league-selection__options">
                    { leagues.map((league: League) =>
                        <div key={league.id} className="import-league-selection__option">
                            <div className="import-league-selection__option-content">
                                <img className="import-league-selection__option-team-logo" src={defaultLogo} alt=""/>
                                <div className="import-league-selection__option-league-info">
                                    <Headline6 className="import-league-selection__option-league-name">{league.leagueName}</Headline6>
                                    <Subtitle1 className="import-league-selection__option-team-name">{league.teamName}</Subtitle1>
                                    <Subtitle2 className="import-league-selection__option-number-teams">{league.teams.length} Teams</Subtitle2>
                                </div>
                            </div>
                            <div className="import-league-selection__option-actions">
                                <div className="import-league-selection__option-select-button"><Button onClick={() => onLeagueSelected(league)}>Select League</Button></div>
                            </div>
                        </div>
                    )}
                </div>
                <Button className="import-league-selection__recheck-button" onClick={() => onRecheckSelected()}>Re-Check Leagues</Button>
            </div>
        );
    }
}

export default ImportLeagueSelection;
