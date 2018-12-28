import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AddBox from '../AddBox';

class CampaignSelect extends Component {
    static propTypes = {
        prop: PropTypes
    };

    render() {
        return (
            <div className="Campaign-Select">
                <AddBox />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    campaigns: state.campaigns
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CampaignSelect);
