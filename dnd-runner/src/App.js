import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import './App.css';
import CampaignScreen from './components/CampaignScreen';
import LoginScreen from './components/LoginScreen';
import NavBar from './components/NavBar';
import { isEmpty } from './utils';
import genericAction from './actions';

class App extends Component {
    componentDidMount() {
        this.props.setToken(localStorage.getItem('token'));
    }

    render() {
        const hour = !isEmpty(this.props.campaign)
            ? parseInt(this.props.campaign.time_of_day.slice(0, 2), 10)
            : 12;
        const nightTime = hour > 17 || hour < 7;
        const theme = createMuiTheme({
            palette: {
                type: nightTime ? 'dark' : 'light'
            },
            typography: {
                useNextVariants: true
            }
        });
        return (
            <MuiThemeProvider theme={theme}>
                {this.props.token ? (
                    <div style={{ height: '100%' }}>
                        <NavBar />
                        <CampaignScreen />
                    </div>
                ) : (
                    <LoginScreen />
                )}
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => ({
    token: state.token,
    campaign: state.campaign
});

const mapDispatchToProps = dispatch => ({
    setToken: token => dispatch(genericAction('SET', 'TOKEN', token))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
