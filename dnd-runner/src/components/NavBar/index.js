import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';

import AddDialog from '../AddDialog';
import CampaignSelect from '../CampaignSelect';
import Notification from '../Notification';

import genericAction from '../../actions';
import apiCall from '../../api';
import { isEmpty } from '../../utils';

class NavBar extends Component {
    state = {
        left: false,
        open: false,
        openNotification: false
    };

    toggleDrawer = open => () => {
        this.setState({
            left: open
        });
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = data => {
        if (!isEmpty(data)) {
            apiCall('addNew', {
                resource: 'campaigns',
                data: data
            })
                .then(campaign => {
                    this.props.setCampaign(campaign);
                    this.setState({
                        open: false,
                        openNotification: true,
                        notification: 'Added Campaign',
                        error: null
                    });
                })
                .catch(error => {
                    this.setState({ error: error.message });
                });
        } else {
            this.setState({ open: false, error: null });
        }
    };

    handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openNotification: false });
    };

    render() {
        return (
            <div>
                <AddDialog
                    title="Add a New Campaign"
                    open={this.state.open}
                    handleClose={this.handleClose}
                    fields={[
                        { name: 'name', type: 'text', label: 'Name', value: '' },
                        { name: 'description', type: 'text', label: 'Description', value: '' }
                    ]}
                    error={this.state.error}
                />
                <Drawer open={this.state.left} onClose={this.toggleDrawer(false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer(false)}
                        onKeyDown={this.toggleDrawer(false)}
                    >
                        <CampaignSelect />
                    </div>
                </Drawer>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Menu"
                            onClick={this.toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" style={{ flexGrow: 1 }}>
                            {!isEmpty(this.props.campaign) ? this.props.campaign.name : 'Campaigns'}
                        </Typography>
                        <Button color="inherit" onClick={this.handleOpen}>
                            Add Campaign <AddIcon />
                        </Button>
                    </Toolbar>
                </AppBar>
                <Notification
                    open={this.state.openNotification}
                    message={this.state.notification}
                    handleClose={this.handleCloseNotification}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    campaign: state.campaign
});

const mapDispatchToProps = dispatch => ({
    setCampaign: campaign => dispatch(genericAction('SET', 'CAMPAIGN', campaign))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar);
