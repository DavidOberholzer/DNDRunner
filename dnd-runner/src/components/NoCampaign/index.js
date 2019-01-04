import React, { Component } from 'react';
import Card from '@material-ui/core/Card';

import NatureIcon from '@material-ui/icons/NaturePeopleOutlined';

class NoCampaign extends Component {

    render() {
        return (
            <Card className="Column-Display">
                <div>
                    <NatureIcon color="disabled" style={{ fontSize: 400 }} />
                </div>
                <p style={{ fontSize: 50, color: "#bdbdbd" }}>Select a Campaign To Play</p>
            </Card>
        );
    }
}

export default NoCampaign;
