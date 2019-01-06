import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';

import EditDialog from '../EditDialog';
import GenericList from '../GenericList';
import OptionList from '../OptionList';
import NoCampaign from '../NoCampaign';

import genericAction from '../../actions';
import { setMode } from '../../actions/mode';
import apiCall from '../../api';
import { RESOURCE_FIELDS } from '../../constants';
import { isEmpty, pluralToSingular, singularToPlural } from '../../utils';
import ManageScreen from '../ManageScreen';
import RemoveDialog from '../RemoveDialog';

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

    handleUpdate = (id, data) => {
        if (!isEmpty(data)) {
            apiCall('update', {
                resource: singularToPlural(this.props.edit.resource),
                id,
                data
            })
                .then(response => {
                    this.props.setThing(this.props.edit.resource.toUpperCase(), response);
                    this.props.clearEdit();
                })
                .catch(error => {
                    this.props.setEdit({
                        ...this.props.edit,
                        error: error.message
                    });
                });
        } else {
            this.props.clearEdit();
        }
    };

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
            back: isCampaignMode ? null : this.handleBack,
            parent: isCampaignMode ? null : this.props.battle
        };

        return this.props.manage ? (
            <ManageScreen />
        ) : !isEmpty(this.props.campaign) ? (
            <Card className="Row-Display">
                <RemoveDialog />
                {!isEmpty(this.props.edit) && (
                    <EditDialog
                        open={!isEmpty(this.props.edit)}
                        data={this.props.edit.data}
                        fields={this.props.edit.fields}
                        handleUpdate={this.handleUpdate}
                        resource={this.props.edit.resource}
                        error={this.props.edit.error}
                    />
                )}
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
            </Card>
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
    battle: state.battle,
    enemies: state.enemies,
    mode: state.mode,
    edit: state.edit,
    manage: state.manage
});

const mapDispatchToProps = dispatch => ({
    clearEnemies: () => dispatch(genericAction('SET_MANY', 'ENEMY', [])),
    clearEdit: () => dispatch(genericAction('CLEAR', 'EDIT', {})),
    setAll: (resource, values) => dispatch(genericAction('SET_MANY', `ALL_${resource}`, values)),
    setCampaignMode: () => dispatch(setMode('campaign')),
    setCampaigns: campaigns => dispatch(genericAction('SET_MANY', 'CAMPAIGN', campaigns)),
    setEdit: data => dispatch(genericAction('SET', 'EDIT', data)),
    setThing: (resource, data) => dispatch(genericAction('ADD', resource, data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CampaignScreen);
