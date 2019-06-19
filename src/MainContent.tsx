import './MainContent.scss';
import React from "react";
import TextField, {HelperText, Input} from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import Select, {Option} from '@material/react-select';

class MainContent extends React.Component {
    public state: any = {value: ''};
    private onEnhancedChange = (index: number, item: Element) => { this.setState({value: item.getAttribute('data-value')}) }
    private handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { this.setState({value: e.currentTarget.value}) }

    render() {
        return (
            <>
                <Select
                    enhanced
                    outlined
                    label='How Many Teams?'
                    value={this.state.value}
                    onEnhancedChange={this.onEnhancedChange}
                >
                    <Option value='6'>6 Teams</Option>
                    <Option value='10'>10 Teams</Option>
                    <Option value='12'>12 Teams</Option>
                    <Option value='16'>16 Teams</Option>
                    <Option value='custom'>Custom # Of Teams</Option>
                </Select>

                <TextField
                    label='Name'
                    helperText={<HelperText>Help Me!</HelperText>}
                    onTrailingIconSelect={() => this.setState({value: ''})}
                    trailingIcon={<MaterialIcon role="button" icon="delete"/>}
                ><Input
                    value={this.state.value}
                    onChange={this.handleInputChange} />
                </TextField>

                <TextField
                    label='Name'
                    helperText={<HelperText>Help Me!</HelperText>}
                    onTrailingIconSelect={() => this.setState({value: ''})}
                    trailingIcon={<MaterialIcon role="button" icon="delete"/>}
                ><Input
                    value={this.state.value}
                    onChange={this.handleInputChange} />
                </TextField>
            </>
        )
    }
}

export default MainContent;
