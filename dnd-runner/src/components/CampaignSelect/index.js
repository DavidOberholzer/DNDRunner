import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AddIcon from '@material-ui/icons/Add';

import genericAction from '../../actions';
import { getAll } from '../../api';
import { isEmpty } from '../../utils';

class CampaignSelect extends Component {
    state = {
        redirect: null
    };

    componentDidMount() {
        if (isEmpty(this.props.campaigns)) {
            getAll('campaigns').then(data => {
                this.props.setCampaigns(data);
            });
        }
    }

    handleSelect = id => () => {
        this.props.setCampaign(this.props.campaigns[id]);
        this.setState({ redirect: `/campaign/${id}` });
    };

    render() {
        const { campaigns } = this.props;
        if (this.state.redirect) {
            return <Redirect push to={this.state.redirect} />;
        }
        return (
            <List>
                {!isEmpty(campaigns) &&
                    Object.values(campaigns).map(campaign => (
                        <ListItem key={campaign.id} button onClick={this.handleSelect(campaign.id)}>
                            <ListItemText primary={campaign.name} />
                        </ListItem>
                    ))}
                <ListItem button>
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Campaign" />
                </ListItem>
            </List>
        );
    }
}

const mapStateToProps = state => ({
    campaigns: state.campaigns
});

const mapDispatchToProps = dispatch => ({
    setCampaigns: campaigns => dispatch(genericAction('SET_MANY', 'CAMPAIGN', campaigns)),
    setCampaign: campaign => dispatch(genericAction('SET', 'CAMPAIGN', campaign))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CampaignSelect);
