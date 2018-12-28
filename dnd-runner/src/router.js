import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import CampaignScreen from './components/CampaignScreen';
import CampaignSelect from './components/CampaignSelect';

const DnDRunnerRouter = () => (
    <Router>
        <div>
            <Route exact path="/" component={CampaignSelect} />
            <Route path="/campaign/:id" component={Campaign} />
        </div>
    </Router>
);

const Campaign = () => (
    <div>
        {/* <Navbar>
            <Link to="/">
                <NavbarItem>Campaigns</NavbarItem>
            </Link>
        </Navbar> */}
        <div>
            <CampaignScreen />
        </div>
    </div>
);

export default DnDRunnerRouter;
