import React, { Component } from 'react';
import { connect } from 'react-redux';

import GenericList from '../GenericList';
import OptionList from '../OptionList';
import NoCampaign from '../NoCampaign';

import genericAction from '../../actions';
import { setMode } from '../../actions/mode';
import apiCall from '../../api';
import { RESOURCE_FIELDS } from '../../constants';
import { isEmpty, pluralToSingular } from '../../utils';

export class CampaignScreen extends Component {
    state = {
        mode: 'campaign'
    };

    componentDidMount() {
        const allNames = ['players', 'battles', 'enemies', 'items'];
        Promise.all([
            apiCall('getAll', {
                resource: 'campaigns'
            }),
            ...allNames.map(name =>
                apiCall('getAll', {
                    resource: name
                }).then(response => {
                    return {
                        response,
                        name
                    };
                })
            )
        ]).then(([campaigns, ...other]) => {
            this.props.setCampaigns(campaigns);

            other.map(one => {
                this.props.setAll(pluralToSingular(one.name).toUpperCase(), one.response);
                return null;
            });
        });
    }

    handleBack = () => {
        this.props.clearEnemies();
        this.props.setCampaignMode();
    };

    render() {
        const isCampaignMode = this.props.mode === 'campaign';

        const listProps = {
            values: isCampaignMode ? this.props.battles : this.props.enemies,
            parentName: isCampaignMode ? 'campaign' : 'battle',
            resource: isCampaignMode ? 'battles' : 'enemies',
            resourceName: isCampaignMode ? 'battle' : 'enemy',
            fields: isCampaignMode ? RESOURCE_FIELDS.battle : RESOURCE_FIELDS.enemy,
            character: isCampaignMode ? false : true,
            back: isCampaignMode ? null : this.handleBack
        };

        return !isEmpty(this.props.campaign) ? (
            <div className="Row-Display">
                {this.props.players && (
                    <GenericList
                        values={this.props.players}
                        parentName="campaign"
                        resource="players"
                        resourceName="Player"
                        fields={RESOURCE_FIELDS.player}
                        character
                    />
                )}
                <OptionList mode={this.state.mode} />
                {listProps.values && <GenericList {...listProps} />}
            </div>
        ) : (
            <NoCampaign />
        );
    }
}

const mapStateToProps = state => ({
    campaigns: state.campaigns,
    campaign: state.campaign,
    players: state.players,
    battles: state.battles,
    enemies: state.enemies,
    mode: state.mode
});

const mapDispatchToProps = dispatch => ({
    clearEnemies: () => dispatch(genericAction('SET_MANY', 'ENEMY', [])),
    setCampaignMode: () => dispatch(setMode('campaign')),
    setCampaigns: campaigns => dispatch(genericAction('SET_MANY', 'CAMPAIGN', campaigns)),
    setAll: (resource, values) => dispatch(genericAction('SET_MANY', `ALL_${resource}`, values))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CampaignScreen);
