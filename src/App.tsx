import React from 'react';
import './App.scss';
import TopAppBar, {TopAppBarFixedAdjust, TopAppBarIcon, TopAppBarRow, TopAppBarSection, TopAppBarTitle} from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import Drawer, {DrawerAppContent, DrawerContent, DrawerHeader, DrawerTitle} from '@material/react-drawer';
import List, {ListItem, ListItemGraphic, ListItemText} from '@material/react-list';
import MainContent from "./MainContent";

interface AppState {
    drawerOpen: boolean;
}

class App extends React.Component<{}, AppState> {
    public state: AppState = {drawerOpen: false};

    render() {
        return (
            <div className="App">
                <div className='drawer-container'>
                    <Drawer modal open={this.state.drawerOpen} onClose={() => this.setState({drawerOpen: false})}>
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
                                        <MaterialIcon hasRipple icon='menu' onClick={() => this.setState({drawerOpen: true})}/>
                                    </TopAppBarIcon>
                                    <TopAppBarTitle>Fantasy Draft Order Generator</TopAppBarTitle>
                                </TopAppBarSection>
                            </TopAppBarRow>
                        </TopAppBar>

                        <TopAppBarFixedAdjust>
                            <main className="main-content" id="main-content">
                                <MainContent />
                            </main>
                        </TopAppBarFixedAdjust>
                    </DrawerAppContent>
                </div>
            </div>
        );
    }
}

export default App;
