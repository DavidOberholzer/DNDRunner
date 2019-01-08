import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import TimeManageIcon from '@material-ui/icons/AddAlarm';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
        this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    };

    updateCampaign = (time_of_day, day) => {
        apiCall('update', {
            resource: 'campaigns',
            id: this.props.campaign.id,
            data: {
                time_of_day,
                day
            },
            token: this.props.token
        }).then(response => {
            this.props.setCampaign(response);
        });
    };

    render() {
        return (
            <Card style={{ marginBottom: '10px' }}>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <CardHeader
                            avatar={
                                <Avatar>
                                    <TimeManageIcon />
                                </Avatar>
                            }
                            title="Time Manager"
                            subheader="Adjust the time of the current campaign"
                        />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="Column-Display">
                        <CardContent>
                            <form>
                                {Object.entries(this.state).map(([name, value]) => (
                                    <TextField
                                        key={name}
                                        id={name}
                                        label={titleCase(name)}
                                        type="number"
                                        value={value}
                                        onChange={this.handleChange}
                                        style={{ margin: '10px', width: '5rem' }}
                                    />
                                ))}
                            </form>
                        </CardContent>
                        <CardActions>
                            <Fab
                                onClick={this.handleTimeUpdate(1)}
                                color="primary"
                                variant="extended"
                                style={{ width: '50%', margin: '10px' }}
                            >
                                Add
                            </Fab>
                            <Fab
                                onClick={this.handleTimeUpdate(-1)}
                                color="secondary"
                                variant="extended"
                                style={{ width: '50%', margin: '10px' }}
                            >
                                Minus
                            </Fab>
                        </CardActions>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    campaign: state.campaign,
    token: state.token
});

const mapDispatchToProps = dispatch => ({
    setCampaign: campaign => {
        dispatch(genericAction('SET', 'CAMPAIGN', campaign));
        dispatch(genericAction('ADD', 'CAMPAIGN', campaign));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimeManager);
