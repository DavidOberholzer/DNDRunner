import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import genericAction from '../../actions';
import { setMode } from '../../actions/mode';

class LogoutDialog extends Component {
    handleLogout = logout => () => {
        if (logout) {
            this.props.clearAll();
        }
        this.props.clearLogout();
    };

    render() {
        return (
            <Dialog open={this.props.logout} onClose={this.handleLogout(false)}>
                <DialogTitle>Logout</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to logout?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleLogout(false)} color="primary">
                        No
                    </Button>
                    <Button onClick={this.handleLogout(true)} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = state => ({
    logout: state.logout
});

const mapDispatchToProps = dispatch => ({
    clearLogout: () => dispatch(genericAction('CLEAR', 'LOGOUT', {})),
    clearAll: () => {
        localStorage.clear();
        dispatch(genericAction('CLEAR', 'MANAGE', null));
        dispatch(genericAction('CLEAR', 'TOKEN', null));
        dispatch(genericAction('CLEAR', 'CAMPAIGN', null));
        dispatch(setMode('campaign'));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutDialog);
