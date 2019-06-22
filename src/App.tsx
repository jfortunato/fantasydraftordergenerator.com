import React from 'react';
import './App.scss';
import TopAppBar, {
    TopAppBarFixedAdjust,
    TopAppBarIcon,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle
} from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import Drawer, {DrawerAppContent, DrawerContent, DrawerHeader, DrawerTitle} from '@material/react-drawer';
import List, {ListItem, ListItemGraphic, ListItemText} from '@material/react-list';
import SimpleGenerator from "./SimpleGenerator";
import {Route, RouteComponentProps, withRouter} from "react-router-dom";

interface AppProps extends RouteComponentProps { }

interface AppState {
    drawerOpen: boolean;
    permanentDrawer: boolean;
}

class App extends React.Component<AppProps, AppState> {
    public state: AppState = {drawerOpen: false, permanentDrawer: false};

    private updatePermanentDrawerStatus = () => {
        this.setState({permanentDrawer: window.innerWidth >= 1000});
    }

    private listItemClicked = (selectedIndex: number) => {
        if (selectedIndex === 0) {
            this.props.history.push('/');
        }

        this.setState({drawerOpen: false});
    };

    componentDidMount(): void {
        this.updatePermanentDrawerStatus();
        window.addEventListener('resize', this.updatePermanentDrawerStatus);
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.updatePermanentDrawerStatus);
    }

    render() {
        return (
            <div className="App">
                <div className='drawer-container'>
                    <Drawer modal={!this.state.permanentDrawer} open={this.state.drawerOpen} onClose={() => this.setState({drawerOpen: false})}>
                        <DrawerHeader>
                            <DrawerTitle tag='h2'>
                                Draft Type
                            </DrawerTitle>
                        </DrawerHeader>

                        <DrawerContent>
                            <List singleSelection selectedIndex={0} handleSelect={selectedIndex => this.listItemClicked(selectedIndex)}>
                                <ListItem>
                                    <ListItemGraphic graphic={<MaterialIcon icon='casino'/>} />
                                    <ListItemText primaryText='Simple Generator' />
                                </ListItem>
                                <ListItem>
                                    <ListItemGraphic graphic={<MaterialIcon icon='today'/>} />
                                    <ListItemText primaryText='Live Results' />
                                </ListItem>
                                <ListItem>
                                    <ListItemGraphic graphic={<MaterialIcon icon='swap_vert'/>} />
                                    <ListItemText primaryText='Weighted Lottery' />
                                </ListItem>
                            </List>
                        </DrawerContent>
                    </Drawer>

                    <DrawerAppContent className='drawer-app-content'>
                        <TopAppBar>
                            <TopAppBarRow>
                                <TopAppBarSection align='start'>
                                    {!this.state.permanentDrawer &&
                                    <TopAppBarIcon navIcon tabIndex={0}>
                                        <MaterialIcon hasRipple icon='menu' onClick={() => this.setState({drawerOpen: true})}/>
                                    </TopAppBarIcon>
                                    }
                                    <TopAppBarTitle>Draft Order Maker</TopAppBarTitle>
                                </TopAppBarSection>
                            </TopAppBarRow>
                        </TopAppBar>

                        <TopAppBarFixedAdjust>
                            <main className="main-content" id="main-content">
                                <Route path="/" exact component={SimpleGenerator} />
                                {/*<Route path="/simple-generator-results" component={SimpleGeneratorResults} />*/}
                            </main>
                        </TopAppBarFixedAdjust>
                    </DrawerAppContent>
                </div>
            </div>
        );
    }
}

export default withRouter(App);
