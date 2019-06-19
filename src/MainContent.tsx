import './MainContent.scss';
import React from "react";
import Select, {Option} from '@material/react-select';
import TeamTextField from './TeamTextField';

interface MainContentState {
    value: number;
}

class MainContent extends React.Component<{}, MainContentState> {
    public state: MainContentState = {value: 10};

    private onEnhancedChange = (index: number, item: Element) => {
        this.setState({value: +(item.getAttribute('data-value') || 0)})
    }

    render() {
        return (
            <>
                <Select
                    enhanced
                    // outlined
                    label='How Many Teams?'
                    value={this.state.value.toString()}
                    onEnhancedChange={this.onEnhancedChange}
                >
                    <Option value='6'>6 Teams</Option>
                    <Option value='10'>10 Teams</Option>
                    <Option value='12'>12 Teams</Option>
                    <Option value='16'>16 Teams</Option>
                    <Option value='0'>Custom # Of Teams</Option>
                </Select>


                <div className="team-text-field-list">
                    {[...Array(this.state.value)].map((n, index) =>
                        <div className="team-text-field-container" key={index}>
                            <TeamTextField defaultName={'Team ' + (index + 1)} />
                        </div>
                    )}
                </div>
            </>
        )
    }
}

export default MainContent;
