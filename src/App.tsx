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
import SimpleGeneratorResults from './SimpleGeneratorResults';

interface AppProps extends RouteComponentProps { }

interface AppState {
    drawerOpen: boolean;
    permanentDrawer: boolean;
    topBarTitle: string;
}

class App extends React.Component<AppProps, AppState> {
    private static DEFAULT_TITLE = 'Fantasy Draft Order Generator';
    public state: AppState = {drawerOpen: false, permanentDrawer: false, topBarTitle: App.DEFAULT_TITLE};

    private updatePermanentDrawerStatus = () => {
        this.setState({permanentDrawer: window.innerWidth >= 1000});
    }

    private listItemClicked = (selectedIndex: number) => {
        if (selectedIndex === 0 && this.props.location.pathname !== '/') {
            this.props.history.push('/');
        }

        this.setState({drawerOpen: false});
    };

    private topBarIconClicked = () => {
        if (this.isOnResultsPage()) {
            return this.props.history.goBack();
        }

        this.setState({drawerOpen: true});
    };

    private isOnResultsPage(): boolean {
        return this.props.location.pathname === '/simple-generator-results';
    }

    private updateTitle(): void {
        const routeToTitle = [
            { route: '/', title: App.DEFAULT_TITLE },
            { route: '/simple-generator-results', title: 'Results' },
        ];

        const match = routeToTitle.find(r => r.route === this.props.location.pathname);

        this.setState({topBarTitle: match ? match.title : App.DEFAULT_TITLE});
    }

    componentDidMount(): void {
        this.updatePermanentDrawerStatus();
        this.updateTitle();
        window.addEventListener('resize', this.updatePermanentDrawerStatus);
    }

    componentDidUpdate(prevProps: Readonly<AppProps>): void {
        // update the top app bar title when route changed
        if (this.props.location !== prevProps.location) {
            this.updateTitle();
        }
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
                                    {(!this.state.permanentDrawer || this.isOnResultsPage()) &&
                                    <TopAppBarIcon navIcon tabIndex={0}>
                                        <MaterialIcon hasRipple icon={this.isOnResultsPage() ? 'arrow_back' : 'menu'} onClick={this.topBarIconClicked}/>
                                    </TopAppBarIcon>
                                    }
                                    <TopAppBarTitle>{this.state.topBarTitle}</TopAppBarTitle>
                                </TopAppBarSection>
                            </TopAppBarRow>
                        </TopAppBar>

                        <TopAppBarFixedAdjust>
                            <main className="main-content" id="main-content">
                                <Route path="/" exact component={SimpleGenerator} />
                                <Route path="/simple-generator-results" component={SimpleGeneratorResults} />
                            </main>
                        </TopAppBarFixedAdjust>
                    </DrawerAppContent>
                </div>
            </div>
        );
    }
}

export default withRouter(App);
