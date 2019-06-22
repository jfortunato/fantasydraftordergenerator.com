import React from "react";
import TextField, {HelperText, Input} from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';

interface TeamTextFieldProps {
    teamName: string;
    onTeamNameChange: Function;
}

interface TeamTextFieldState { }

class TeamTextField extends React.Component<TeamTextFieldProps, TeamTextFieldState> {
    private handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onTeamNameChange(e.currentTarget.value);
    };

    render() {
        return (
            <TextField
                label="Team Name"
                helperText={<HelperText>Help Me!</HelperText>}
                onTrailingIconSelect={() => this.props.onTeamNameChange('')}
                trailingIcon={<MaterialIcon role="button" icon="delete"/>}
            ><Input
                value={this.props.teamName}
                onChange={this.handleInputChange} />
            </TextField>
        );
    }
}

export default TeamTextField;
