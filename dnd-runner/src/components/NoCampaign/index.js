import React, { Component } from 'react';

import NatureIcon from '@material-ui/icons/NaturePeopleOutlined';

class NoCampaign extends Component {

    render() {
        return (
            <div className="No-Campaign">
                <div>
                    <NatureIcon color="disabled" style={{ fontSize: 400 }} />
                </div>
                <p style={{ fontSize: 50, color: "#bdbdbd" }}>Select a Campaign To Play</p>
            </div>
        );
    }
}

export default NoCampaign;
