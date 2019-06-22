import React from "react";
import TextField, {Input} from "@material/react-text-field";

interface LeagueNameFieldProps {
    leagueName: string;
    onLeagueNameChange: Function;
}

interface LeagueNameFieldState {
    leagueName: string;
}

class LeagueNameField extends React.Component<LeagueNameFieldProps, LeagueNameFieldState> {
    private handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onLeagueNameChange(e.currentTarget.value);
    }

    render() {
        return (
            <TextField
                // outlined
                label="League Name"
                onTrailingIconSelect={() => this.props.onLeagueNameChange('')}
            ><Input
                value={this.props.leagueName}
                onChange={this.handleInputChange} />
            </TextField>
        );
    }
}

export default LeagueNameField;
