import React from 'react';
import './App.scss';
import TopAppBar, {TopAppBarFixedAdjust, TopAppBarIcon, TopAppBarRow, TopAppBarSection, TopAppBarTitle} from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import Drawer, {DrawerAppContent, DrawerContent, DrawerHeader, DrawerTitle} from '@material/react-drawer';
import List, {ListItem, ListItemGraphic, ListItemText} from '@material/react-list';
import TextField, {HelperText, Input} from '@material/react-text-field';
import {Headline5} from "@material/react-typography";

class App extends React.Component {
    public state: any = {open: false, value: ''};
    private handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { this.setState({value: e.currentTarget.value}) }

    render() {
        return (
            <div className="App">

                <div className='drawer-container'>
                    <Drawer modal open={this.state.open} onClose={() => this.setState({open: false})}>
                        <DrawerHeader>
                            <DrawerTitle tag='h2'>
                                Fantasy Football
                            </DrawerTitle>
                        </DrawerHeader>

                        <DrawerContent>
                            <List singleSelection selectedIndex={0}>
                                <ListItem>
                                    <ListItemGraphic graphic={<MaterialIcon icon='folder'/>} />
                                    <ListItemText primaryText='Mail' />
                                </ListItem>
                            </List>
                        </DrawerContent>
                    </Drawer>

                    <DrawerAppContent className='drawer-app-content'>
                        <TopAppBar>
                            <TopAppBarRow>
                                <TopAppBarSection align='start'>
                                    <TopAppBarIcon navIcon tabIndex={0}>
                                        <MaterialIcon hasRipple icon='menu' onClick={() => this.setState({open: true})}/>
                                    </TopAppBarIcon>
                                    <TopAppBarTitle>Football</TopAppBarTitle>
                                </TopAppBarSection>
                            </TopAppBarRow>
                        </TopAppBar>

                        <TopAppBarFixedAdjust>
                            <main className="main-content" id="main-content">
                                <Headline5>Fantasy Draft Order Generator</Headline5>

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
                            </main>
                        </TopAppBarFixedAdjust>
                    </DrawerAppContent>
                </div>

            </div>
        );
    }
}

export default App;
