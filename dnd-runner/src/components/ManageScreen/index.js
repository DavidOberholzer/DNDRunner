import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/DeleteForever';

import ManageImages from '../ManageImages';
import WarningDialog from '../WarningDialog';
import genericAction from '../../actions';
import apiCall from '../../api';
import { isEmpty, titleCase, pluralToSingular } from '../../utils';

export class ManageScreen extends Component {
    handleDelete = performDelete => () => {
        if (performDelete) {
            const { id } = this.props.delete;
            const { deleteImage, manage, removeOne, resource } = this.props;
            apiCall('delete', {
                resource,
                id
            }).then(response => {
                if (manage === 'images') {
                    deleteImage(id);
                } else {
                    const stateResource = (manage.includes('all')
                        ? `${manage.slice(3)}`
                        : manage
                    ).toUpperCase();
                    removeOne(id, stateResource);
                }
                this.props.clearDelete();
            });
        } else {
            this.props.clearDelete();
        }
    };

    openDelete = id => () => {
        this.props.setDelete({
            ...(this.props.manage === 'images'
                ? { id, name: id }
                : this.props.allValues(this.props.manage)[`${id}`]),
            resource: this.props.resource
        });
    };

    render() {
        const title = titleCase(this.props.resource);
        return (
            <div className="Column-Display">
                <WarningDialog type="delete" handleDelete={this.handleDelete} />
                <Card style={{ width: '50%' }}>
                    <List>
                        <ListItem>
                            <ListItemText primary={title} />
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                        </ListItem>
                        <Divider />
                        {this.props.manage === 'images' ? (
                            <ManageImages title={title} openDelete={this.openDelete} />
                        ) : !isEmpty(this.props.values) ? (
                            Object.values(this.props.values).map(item => (
                                <ListItem key={item.id} button>
                                    <ListItemText
                                        primary={item.name}
                                        secondary={`ID: ${item.id}`}
                                    />
                                    <ListItemSecondaryAction>
                                        <IconButton onClick={this.openDelete(item.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))
                        ) : (
                            <ListItem>
                                <ListItemText secondary={`No ${title} Found`} />
                            </ListItem>
                        )}
                    </List>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    allValues: resource => state[resource],
    delete: state.delete,
    manage: state.manage,
    resource: state.manage.includes('all') ? state.manage.slice(3).toLowerCase() : state.manage,
    values: state[state.manage]
});

const mapDispatchToProps = dispatch => ({
    clearDelete: () => dispatch(genericAction('CLEAR', 'DELETE', {})),
    deleteImage: name => dispatch(genericAction('DELETE', 'IMAGE', name)),
    removeOne: (id, resource) => {
        dispatch(genericAction('DELETE', `ALL_${pluralToSingular(resource).toUpperCase()}`, id));
        dispatch(genericAction('DELETE', resource.toUpperCase(), {}));
    },
    setDelete: data => dispatch(genericAction('SET', 'DELETE', data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageScreen);
