import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import { isEmpty, pluralToSingular, titleCase } from '../../utils';

class WarningDialog extends Component {
    render() {
        return (
            <Dialog open={!isEmpty(this.props.delete)} onClose={this.props.handleDelete(false)}>
                <DialogTitle>{titleCase(this.props.type)}</DialogTitle>
                <DialogContent>
                    {this.props.type && (
                        <Typography>
                            {`Are you sure you want to ${this.props.type} ${this.props.delete
                                .resource &&
                                ` this ${pluralToSingular(this.props.delete.resource)} ${
                                    this.props.delete.name
                                }?`}`}
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleDelete(false)} color="primary">
                        No
                    </Button>
                    <Button onClick={this.props.handleDelete(true)} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = state => ({
    delete: state.delete
});

export default connect(
    mapStateToProps,
    {}
)(WarningDialog);
