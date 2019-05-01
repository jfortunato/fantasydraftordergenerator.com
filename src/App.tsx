import React from 'react';
import './App.css';
import TopAppBar, {TopAppBarFixedAdjust} from '@material/react-top-app-bar';
import '@material/react-top-app-bar/dist/top-app-bar.css';
import MaterialIcon from '@material/react-material-icon';
import '@material/react-material-icon/dist/material-icon.css';
import "@material/react-drawer/dist/drawer.css";
import Drawer, {DrawerAppContent, DrawerContent, DrawerHeader, DrawerTitle} from '@material/react-drawer';
import List, {ListItem, ListItemGraphic, ListItemText} from '@material/react-list';
import '@material/react-list/dist/list.css';
import TextField, {HelperText, Input} from '@material/react-text-field';
import '@material/react-text-field/dist/text-field.css';
import '@material/react-typography/dist/typography.css';
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
                        <TopAppBar title='Football' navigationIcon={<MaterialIcon icon='menu' onClick={() => this.setState({open: true})} />} />

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

// const App: React.FC = () => {
//
//     return (
//         <div className="App">
//
//             <TopAppBar
//                 title='Football'
//                 navigationIcon={<MaterialIcon
//                     icon='menu'
//                     onClick={() => console.log('click')}
//                 />}
//             />
//
//             <Drawer></Drawer>
//
//             <header className="App-header">
//                 <img src={logo} className="App-logo" alt="logo" />
//                 <p>
//                     Edit <code>src/App.tsx</code> and save to reload.
//                 </p>
//                 <a
//                     className="App-link"
//                     href="https://reactjs.org"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                 >
//                     Learn React
//                 </a>
//             </header>
//         </div>
//     );
// }

export default App;
