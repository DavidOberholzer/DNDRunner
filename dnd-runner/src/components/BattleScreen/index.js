import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import CombatScreen from '../CombatScreen';
import TurnOrder from '../TurnOrder';
import { setMode } from '../../actions/mode';
import { clearOrder } from '../../actions/order';

class BattleScreen extends Component {
    handleRun = () => {
        this.props.setNewMode('turn-order');
    };

    handleStop = () => {
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
                            color="primary"
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
                            color="primary"
                            onClick={this.handleStop}
                        >
                            Stop Battle
                        </Button>
                    </Card>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    mode: state.mode
});

const mapDispatchToProps = dispatch => ({
    setNewMode: mode => dispatch(setMode(mode)),
    clearOrderList: () => dispatch(clearOrder())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BattleScreen);
