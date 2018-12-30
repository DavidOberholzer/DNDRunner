import React, { Component } from 'react';
import './App.css';

import CampaignScreen from './components/CampaignScreen';
import NavBar from './components/NavBar';

class App extends Component {
    render() {
        return (
            <div style={{ height: '100%' }}>
                <NavBar />
                <CampaignScreen />
            </div>
        );
    }
}

export default App;
