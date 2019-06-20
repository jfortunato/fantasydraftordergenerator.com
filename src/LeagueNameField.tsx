import React from "react";
import TextField, {Input} from "@material/react-text-field";


interface LeagueNameFieldProps {
    defaultName: string;
}

interface LeagueNameFieldState {
    leagueName: string;
}

class LeagueNameField extends React.Component<LeagueNameFieldProps, LeagueNameFieldState> {
    public state: LeagueNameFieldState = {leagueName: this.props.defaultName};
    private handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { this.setState({leagueName: e.currentTarget.value}) }

    render() {
        return (
            <TextField
                // outlined
                label="League Name"
                onTrailingIconSelect={() => this.setState({leagueName: ''})}
            ><Input
                value={this.state.leagueName}
                onChange={this.handleInputChange} />
            </TextField>
        );
    }
}

export default LeagueNameField;
