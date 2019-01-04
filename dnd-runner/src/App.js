import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './App.css';
import CampaignScreen from './components/CampaignScreen';
import NavBar from './components/NavBar';
import { isEmpty } from './utils';

class App extends Component {
    render() {
        const hour = !isEmpty(this.props.campaign)
            ? parseInt(this.props.campaign.time_of_day.slice(0, 2), 10)
            : 12;
        const nightTime = hour > 17 || hour < 7;
        const theme = createMuiTheme({
            palette: {
                type: nightTime ? 'dark' : 'light',
                primary: {
                    main: '#880e4f'
                },
                secondary: {
                    main: '#ff5722'
                }
            },
            typography: {
                useNextVariants: true
            }
        });
        return (
            <MuiThemeProvider theme={theme}>
                <div style={{ height: '100%' }}>
                    <NavBar />
                    <CampaignScreen />
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => ({
    campaign: state.campaign
});

export default connect(
    mapStateToProps,
    {}
)(App);
