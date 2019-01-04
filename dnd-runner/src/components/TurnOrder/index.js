import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DiceIcon from '@material-ui/icons/Casino';

import { setMode } from '../../actions/mode';
import { setOrder, stepForwardOrder, stepBackwardOrder } from '../../actions/order';
import { titleCase } from '../../utils';

class TurnOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: this.initializeState('players'),
            enemies: this.initializeState('enemies')
        };
    }

    initializeState = resource => ({
        ...Object.values(this.props[resource]).reduce((accumulator, value) => {
            accumulator[value.name] = 0;
            return accumulator;
        }, {})
    });

    handleChange = resource => event => {
        this.setState({
            [resource]: {
                ...this.state[resource],
                [event.target.id]: event.target.value
            }
        });
    };

    submitInitiative = () => {
        let totalList = [];
        ['players', 'enemies'].map(resource => {
            Object.entries(this.state[resource]).map(([key, value]) => {
                totalList.push({ name: key, value });
                return null;
            });
            return null;
        });
        for (let i = 0; i < totalList.length; i++) {
            for (let j = i + 1; j < totalList.length; j++) {
                if (totalList[i].value > totalList[j].value) {
                    let temp = totalList[i];
                    totalList[i] = totalList[j];
                    totalList[j] = temp;
                }
            }
        }
        this.props.setOrderList(totalList);
        this.props.setMode('combat');
    };

    render() {
        return (
            <React.Fragment>
                <CardHeader
                    avatar={
                        <Avatar style={{ backgroundColor: '#1230af' }}>
                            <DiceIcon />
                        </Avatar>
                    }
                    title="Enter each character's initiative results:"
                />
                <CardContent>
                    <form className="Column-Form" noValidate autoComplete="off">
                        {['players', 'enemies'].map(name => (
                            <React.Fragment key={name}>
                                <Typography variant="h6">{titleCase(name)}</Typography>
                                {Object.entries(this.state[name]).map(([key, value]) => (
                                    <TextField
                                        key={key}
                                        id={key}
                                        label={key}
                                        type="number"
                                        value={value}
                                        onChange={this.handleChange(name)}
                                        style={{ margin: '10px' }}
                                    />
                                ))}
                            </React.Fragment>
                        ))}
                    </form>
                </CardContent>
                <CardActions>
                    <Button variant="contained" size="small" onClick={this.submitInitiative}>
                        Start Turn Order
                    </Button>
                </CardActions>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    players: state.players,
    enemies: state.enemies
});

const mapDispatchToProps = dispatch => ({
    setMode: mode => dispatch(setMode(mode)),
    setOrderList: order => dispatch(setOrder(order)),
    stepOrderListForward: () => dispatch(stepForwardOrder()),
    stepOrderListBackward: () => dispatch(stepBackwardOrder())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TurnOrder);
