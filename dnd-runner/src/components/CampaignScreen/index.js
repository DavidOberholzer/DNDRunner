import React, { Component } from 'react';
import { connect } from 'react-redux';

import GenericList from '../GenericList';
import OptionList from '../OptionList';
import NoCampaign from '../NoCampaign';

import genericAction from '../../actions';
import { isEmpty } from '../../utils';

export class CampaignScreen extends Component {
    state = {
        mode: 'campaign'
    };

    render() {
        return !isEmpty(this.props.campaign) ? (
            <div className="Row-Display">
                {this.props.players && (
                    <GenericList
                        values={this.props.players}
                        parentName="campaign"
                        resource="players"
                        resourceName="Player"
                        fields={[
                            { name: 'name', type: 'text', label: 'Name', value: '' },
                            { name: 'health', type: 'number', label: 'Health', value: 0 },
                            {
                                name: 'current_health',
                                type: 'number',
                                label: 'Current Health',
                                value: 0
                            },
                            {
                                name: 'carry_capacity',
                                type: 'number',
                                label: 'Carry Capacity',
                                value: 0
                            }
                        ]}
                        character
                    />
                )}
                <OptionList mode={this.state.mode} />
                {this.props.battles && (
                    <GenericList
                        values={this.props.battles}
                        parentName="campaign"
                        resource="battles"
                        resourceName="Battle"
                        fields={[
                            { name: 'name', type: 'text', label: 'Name', value: '' },
                            { name: 'description', type: 'text', label: 'Description', value: '' }
                        ]}
                    />
                )}
            </div>
        ) : (
            <NoCampaign />
        );
    }
}

const mapStateToProps = state => ({
    campaign: state.campaign,
    players: state.players,
    battles: state.battles
});

const mapDispatchToProps = dispatch => ({
    setBattle: battle => dispatch(genericAction('SET', 'BATTLE', battle))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CampaignScreen);
