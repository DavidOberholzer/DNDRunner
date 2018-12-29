import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import genericAction from '../../actions';
import { getRelated } from '../../api';
import { isEmpty } from '../../utils';

export class CampaignScreen extends Component {
    state = {
        redirect: null
    };

    componentDidMount() {
        if (isEmpty(this.props.campaign)) {
            this.setState({ redirect: '/' });
        } else {
            Promise.all([
                getRelated('players-in-campaign', this.props.match.params.id),
                getRelated('battles-in-campaign', this.props.match.params.id)
            ]).then(([players, battles]) => {
                this.props.setPlayers(players);
                this.props.setBattles(battles);
            });
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={this.state.redirect} />;
        }
        return <div />;
    }
}

const mapStateToProps = state => ({
    campaign: state.campaign,
    players: state.players,
    battles: state.battles
});

const mapDispatchToProps = dispatch => ({
    setPlayers: players => dispatch(genericAction('SET_MANY', 'PLAYER', players)),
    setBattles: battles => dispatch(genericAction('SET_MANY', 'BATTLE', battles)),
    setBattle: battle => dispatch(genericAction('SET', 'BATTLE', battle))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CampaignScreen);
