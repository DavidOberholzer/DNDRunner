import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import genericAction from '../../actions';
import apiCall from '../../api';
import { isEmpty, pluralToSingular } from '../../utils';

class WarningDialog extends Component {
    handleDelete = performDelete => () => {
        if (performDelete) {
            const { id, name, parentName, resource } = this.props.delete;
            apiCall('delete', {
                resource: `${parentName}-${resource}`,
                id: `${this.props[`${parentName}`].id}/${id}`
            }).then(response => {
                const resourceName = pluralToSingular(resource).toUpperCase();
                this.props.deleteValue(id, resourceName);
                this.setState({
                    openNotification: true,
                    notification: `Deleted '${name}'`
                });
            });
        }
        this.props.clearDelete();
    };

    render() {
        return (
            <Dialog open={!isEmpty(this.props.delete)} onClose={this.handleDelete(false)}>
                <DialogTitle>Delete</DialogTitle>
                <DialogContent>
                    {this.props.delete.resource && (
                        <Typography>
                            {`Are you dure you want to delete the ${pluralToSingular(
                                this.props.delete.resource
                            )} ${this.props.delete.name}?`}
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleDelete(false)} color="primary">
                        No
                    </Button>
                    <Button onClick={this.handleDelete(true)} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = state => ({
    campaign: state.campaign,
    battle: state.battle,
    delete: state.delete
});

const mapDispatchToProps = dispatch => ({
    clearDelete: () => dispatch(genericAction('CLEAR', 'DELETE', {})),
    deleteValue: (id, resource) => dispatch(genericAction('DELETE', resource, id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WarningDialog);
