import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import CombatScreen from '../CombatScreen';
import TurnOrder from '../TurnOrder';
import genericAction from '../../actions';
import { setMode } from '../../actions/mode';
import { clearOrder } from '../../actions/order';
import apiCall from '../../api';

class BattleScreen extends Component {
    handleRun = () => {
        this.props.setNewMode('turn-order');
    };

    handleStop = () => {
        this.props.clearOrderList();
        this.props.setNewMode('battle');
    };

    handleComplete = () => {
        const count = Object.values(this.props.players).filter(player => player.alive).length;
        const split = parseInt(this.props.battle.experience / count, 10);
        const newPlayers = Object.values(this.props.players).map(player => {
            player.experience += split;
            apiCall('update', {
                resource: 'players',
                id: player.id,
                data: {
                    experience: player.experience
                },
                token: this.props.token
            });
            return player;
        });
        this.props.setPlayers(newPlayers);
        newPlayers.map(player => this.props.addAllPlayers(player));
        this.props.clearOrderList();
        this.props.setNewMode('battle');
    };

    render() {
        const { mode } = this.props;
        return (
            <React.Fragment>
                <Card style={{ marginBottom: '10px' }}>
                    {mode === 'battle' ? (
                        <Button
                            style={{ width: '100%' }}
                            variant="contained"
                            onClick={this.handleRun}
                        >
                            Run Battle!
                        </Button>
                    ) : mode === 'turn-order' ? (
                        <TurnOrder />
                    ) : (
                        mode === 'combat' && <CombatScreen />
                    )}
                </Card>
                {(mode === 'turn-order' || mode === 'combat') && (
                    <Card>
                        <Button
                            style={{ width: '100%' }}
                            variant="contained"
                            onClick={this.handleStop}
                        >
                            Stop Battle
                        </Button>
                        {mode === 'combat' && (
                            <Button
                                style={{ width: '100%', marginTop: '10px' }}
                                variant="contained"
                                onClick={this.handleComplete}
                            >
                                Complete Battle (Reward XP)
                            </Button>
                        )}
                    </Card>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    mode: state.mode,
    battle: state.battle,
    players: state.players,
    token: state.token
});

const mapDispatchToProps = dispatch => ({
    setPlayers: players => dispatch(genericAction('SET_MANY', 'PLAYER', players)),
    addAllPlayers: player => dispatch(genericAction('ADD', 'ALL_PLAYER', player)),
    setNewMode: mode => dispatch(setMode(mode)),
    clearOrderList: () => dispatch(clearOrder())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BattleScreen);
