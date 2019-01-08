import React, { Component } from 'react';
import { connect } from 'react-redux';

import WarningDialog from '../WarningDialog';

import genericAction from '../../actions';
import apiCall from '../../api';
import { pluralToSingular } from '../../utils';

class RemoveDialog extends Component {
    handleDelete = performDelete => () => {
        if (performDelete) {
            const { id, name, parentName, resource } = this.props.delete;
            apiCall('delete', {
                resource: `${parentName}-${resource}`,
                id: `${this.props[`${parentName}`].id}/${id}`,
                token: this.props.token
            }).then(response => {
                const resourceName = pluralToSingular(resource).toUpperCase();
                this.props.deleteValue(id, resourceName);
                this.setState({
                    openNotification: true,
                    notification: `Deleted '${name}'`
                });
                this.props.clearDelete();
            });
        } else {
            this.props.clearDelete();
        }
    };

    render() {
        return <WarningDialog type="remove" handleDelete={this.handleDelete} />;
    }
}

const mapStateToProps = state => ({
    campaign: state.campaign,
    battle: state.battle,
    delete: state.delete,
    token: state.token
});

const mapDispatchToProps = dispatch => ({
    clearDelete: () => dispatch(genericAction('CLEAR', 'DELETE', {})),
    deleteValue: (id, resource) => dispatch(genericAction('DELETE', resource, id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RemoveDialog);
