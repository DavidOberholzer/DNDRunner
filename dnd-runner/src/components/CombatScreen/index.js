import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';

import FaceIcon from '@material-ui/icons/Face';
import QueueIcon from '@material-ui/icons/Group';

import { stepForwardOrder, stepBackwardOrder } from '../../actions/order';
import apiCall from '../../api';
import genericAction from '../../actions';

class CombatScreen extends Component {
    handleStepForward = () => {
        this.props.stepOrderListForward();
        if (this.props.order[1] === this.props.start) {
            let { time_of_day, day } = this.props.campaign;
            let date = new Date(
                0,
                0,
                0,
                time_of_day.slice(0, 2),
                time_of_day.slice(3, 5),
                time_of_day.slice(6, 8)
            );
            date.setSeconds(date.getSeconds() + 6);
            time_of_day = date.toLocaleTimeString();
            day += date.getDay();
            this.updateCampaign(time_of_day, day);
        }
    };

    handleStepBackward = () => {
        this.props.stepOrderListBackward();
        if (this.props.order[0] === this.props.start) {
            let { time_of_day, day } = this.props.campaign;
            let date = new Date(
                0,
                0,
                0,
                time_of_day.slice(0, 2),
                time_of_day.slice(3, 5),
                time_of_day.slice(6, 8)
            );
            date.setSeconds(date.getSeconds() - 6);
            time_of_day = date.toLocaleTimeString();
            day += date.getDay();
            this.updateCampaign(time_of_day, day);
        }
    };

    updateCampaign = (time_of_day, day) => {
        apiCall('update', {
            resource: 'campaigns',
            id: this.props.campaign.id,
            data: {
                time_of_day,
                day
            }
        }).then(response => {
            this.props.setCampaign(response);
        });
    };

    render() {
        return (
            <React.Fragment>
                <CardHeader
                    avatar={
                        <Avatar style={{ backgroundColor: '#1230af' }}>
                            <QueueIcon />
                        </Avatar>
                    }
                    title="Current Turn Order:"
                />
                <CardContent>
                    {this.props.order.map((character, index) => (
                        <Chip
                            avatar={
                                <Avatar>
                                    <FaceIcon />
                                </Avatar>
                            }
                            key={`${character.name}-${character.resource}`}
                            label={`${character.name} - ${character.value}`}
                            color={
                                index === 0
                                    ? character.resource === 'players'
                                        ? 'primary'
                                        : 'secondary'
                                    : 'default'
                            }
                            variant="outlined"
                            style={{ margin: '10px' }}
                        />
                    ))}
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={this.handleStepForward}
                        style={{ margin: '10px', width: '100%' }}
                    >
                        Next Turn
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={this.handleStepBackward}
                        style={{ margin: '10px', width: '100%' }}
                    >
                        Previous Turn
                    </Button>
                </CardActions>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    campaign: state.campaign,
    order: state.order.order,
    start: state.order.start
});

const mapDispatchToProps = dispatch => ({
    setCampaign: campaign => dispatch(genericAction('SET', 'CAMPAIGN', campaign)),
    stepOrderListForward: () => dispatch(stepForwardOrder()),
    stepOrderListBackward: () => dispatch(stepBackwardOrder())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CombatScreen);
