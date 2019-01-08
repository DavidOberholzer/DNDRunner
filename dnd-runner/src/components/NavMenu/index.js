import React, { Component } from 'react';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import genericAction from '../../actions';
import { setMode } from '../../actions/mode';

class NavMenu extends Component {
    handleMyAccount = () => {
        this.props.setMode();
    };

    handleLogout = () => {
        this.props.setLogout();
    };

    render() {
        return (
            <Menu
                anchorEl={this.props.anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={this.props.open}
                onClose={this.props.handleCloseMenu}
            >
                <MenuItem onClick={this.handleMyAccount}>My Account</MenuItem>
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
            </Menu>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    setMode: () => dispatch(setMode('account')),
    setLogout: () => dispatch(genericAction('SET', 'LOGOUT', true))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavMenu);
