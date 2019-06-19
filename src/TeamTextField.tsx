import React from "react";
import TextField, {HelperText, Input} from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';

class TeamTextField extends React.Component{
    public state: any = {teamName: ''};
    private handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { this.setState({teamName: e.currentTarget.value}) }

    render() {
        return (
            <TextField
                label='Name'
                helperText={<HelperText>Help Me!</HelperText>}
                onTrailingIconSelect={() => this.setState({teamName: ''})}
                trailingIcon={<MaterialIcon role="button" icon="delete"/>}
            ><Input
                value={this.state.teamName}
                onChange={this.handleInputChange} />
            </TextField>
        );
    }
}

export default TeamTextField;
