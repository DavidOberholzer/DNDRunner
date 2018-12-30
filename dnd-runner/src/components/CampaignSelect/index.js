import React, { Component } from 'react';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import genericAction from '../../actions';
import apiCall from '../../api';
import { isEmpty } from '../../utils';

class CampaignSelect extends Component {
    state = {
        open: false
    };

    componentDidMount() {
        if (isEmpty(this.props.campaigns)) {
            apiCall('getAll', {
                resource: 'campaigns'
            }).then(data => {
                this.props.setCampaigns(data);
            });
        }
    }

    handleSelect = id => () => {
        this.props.setCampaign(this.props.campaigns[id]);
        Promise.all([
            apiCall('getRelated', {
                resource: 'players-in-campaign',
                id
            }),
            apiCall('getRelated', {
                resource: 'battles-in-campaign',
                id
            })
        ]).then(([players, battles]) => {
            this.props.setPlayers(players);
            this.props.setBattles(battles);
        });
        this.setState({ redirect: `/campaign/${id}` });
    };

    render() {
        const { campaigns } = this.props;
        return (
            <List>
                {!isEmpty(campaigns) ? (
                    Object.values(campaigns).map(campaign => (
                        <ListItem key={campaign.id} button onClick={this.handleSelect(campaign.id)}>
                            <ListItemText primary={campaign.name} />
                        </ListItem>
                    ))
                ) : (
                    <ListItem>
                        <ListItemText primary="No Campaigns Found" />
                    </ListItem>
                )}
            </List>
        );
    }
}

const mapStateToProps = state => ({
    campaigns: state.campaigns
});

const mapDispatchToProps = dispatch => ({
    setCampaigns: campaigns => dispatch(genericAction('SET_MANY', 'CAMPAIGN', campaigns)),
    setCampaign: campaign => dispatch(genericAction('SET', 'CAMPAIGN', campaign)),
    setPlayers: players => dispatch(genericAction('SET_MANY', 'PLAYER', players)),
    setBattles: battles => dispatch(genericAction('SET_MANY', 'BATTLE', battles))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CampaignSelect);
