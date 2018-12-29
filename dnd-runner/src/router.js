import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CampaignScreen from './components/CampaignScreen';
import NoCampaign from './components/NoCampaign';
import NavBar from './components/NavBar';

const DnDRunnerRouter = () => (
    <div style={{ height: '100%' }}>
        <Route exact path="/" component={NoCampaign} />
        <Route path="/campaign/:id" component={CampaignScreen} />
    </div>
);

const MainRouter = () => (
    <Router>
        <div style={{ height: '100%' }}>
            <NavBar />
            <DnDRunnerRouter />
        </div>
    </Router>
);

export default MainRouter;
