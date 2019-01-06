import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import TimeManageIcon from '@material-ui/icons/AddAlarm';
import AddIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';

import genericAction from '../../actions';
import apiCall from '../../api';
import { titleCase } from '../../utils';

class TimeManager extends Component {
    state = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    handleChange = event => {
        let { id, value } = event.target;
        if (value < 0 || value === '') {
            value = 0;
        }
        switch (id) {
            case 'days':
                break;
            case 'hours':
                if (value > 24) {
                    value = 24;
                }
                break;
            default:
                if (value > 60) {
                    value = 60;
                }
        }
        this.setState({ [id]: value });
    };

    handleTimeUpdate = sign => () => {
        let { time_of_day, day } = this.props.campaign;
        let date = new Date(
            0,
            0,
            0,
            time_of_day.slice(0, 2),
            time_of_day.slice(3, 5),
            time_of_day.slice(6, 8)
        );
        date.setSeconds(date.getSeconds() + this.state.seconds * sign);
        date.setMinutes(date.getMinutes() + this.state.minutes * sign);
        date.setHours(date.getHours() + this.state.hours * sign);
        time_of_day = date.toLocaleTimeString();
        day += this.state.days * sign + (date.getDay() !== 0 ? 1 : 0) * sign;
        if (day < 1) {
            day = 1;
        }
        this.updateCampaign(time_of_day, day);
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
            <Card style={{ marginBottom: '10px' }}>
                <CardHeader
                    avatar={
                        <Avatar>
                            <TimeManageIcon />
                        </Avatar>
                    }
                    title="Time Manager"
                    subheader="Adjust the time of the current campaign"
                />
                <CardContent>
                    <form className="Row-Form">
                        {Object.entries(this.state).map(([name, value]) => (
                            <TextField
                                key={name}
                                id={name}
                                label={titleCase(name)}
                                type="number"
                                value={value}
                                onChange={this.handleChange}
                                style={{ margin: '10px' }}
                            />
                        ))}
                    </form>
                </CardContent>
                <CardActions>
                    <Fab
                        onClick={this.handleTimeUpdate(1)}
                        color="primary"
                        variant="extended"
                        style={{ width: '50%' }}
                    >
                        <AddIcon />
                        Progress Time
                    </Fab>
                    <Fab
                        onClick={this.handleTimeUpdate(-1)}
                        color="secondary"
                        variant="extended"
                        style={{ width: '50%' }}
                    >
                        <MinusIcon />
                        Revert Time
                    </Fab>
                </CardActions>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    campaign: state.campaign
});

const mapDispatchToProps = dispatch => ({
    setCampaign: campaign => {
        dispatch(genericAction('SET', 'CAMPAIGN', campaign));
        dispatch(genericAction('ADD', 'CAMPAIGNS', campaign));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeManager);
