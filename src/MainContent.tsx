import './MainContent.scss';
import React from "react";
import Select, {Option} from '@material/react-select';
import TeamTextField from './TeamTextField';

class MainContent extends React.Component {
    public state: any = {value: '10'};
    private onEnhancedChange = (index: number, item: Element) => { this.setState({value: item.getAttribute('data-value')}) }

    render() {
        return (
            <>
                <Select
                    enhanced
                    // outlined
                    label='How Many Teams?'
                    value={this.state.value}
                    onEnhancedChange={this.onEnhancedChange}
                >
                    <Option value='6'>6 Teams</Option>
                    <Option value='10'>10 Teams</Option>
                    <Option value='12'>12 Teams</Option>
                    <Option value='16'>16 Teams</Option>
                    <Option value='0'>Custom # Of Teams</Option>
                </Select>


                <div className="team-text-field-list">
                    {[...Array(+this.state.value)].map((n, index) =>
                        <div className="team-text-field-container" key={index}>
                            <TeamTextField />
                        </div>
                    )}
                </div>
            </>
        )
    }
}

export default MainContent;
