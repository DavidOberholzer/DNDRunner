import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class Notification extends Component {

    render() {
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                }}
                open={this.props.open}
                autoHideDuration={6000}
                onClose={this.props.handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id'
                }}
                message={<span id="message-id">{this.props.message}</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={this.props.handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                ]}
            />
        );
    }
}

export default Notification;
