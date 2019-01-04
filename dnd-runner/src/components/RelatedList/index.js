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

import BasketIcon from '@material-ui/icons/ShoppingBasketTwoTone';
import DeleteIcon from '@material-ui/icons/Clear';

import genericAction from '../../actions';
import apiCall from '../../api';
import { titleCase } from '../../utils';

class RelatedList extends Component {
    handleDelete = id => () => {
        let { parentName, resource } = this.props;
        parentName = parentName.toLowerCase();
        const resourceName = resource.toUpperCase();

        apiCall('delete', {
            resource: `${parentName}-${resource}`,
            id: `${this.props.edit.data.id}/${id}`
        }).then(response => {
            let newValue = this.props.edit.data;
            newValue[resource] = newValue[resource].filter(value => value.id !== id);
            this.props.replaceValue(newValue, parentName);
            this.props.setEdit({
                ...this.props.edit,
                data: newValue
            });
            this.setState({
                openNotification: true,
                notification: `Deleted '${resourceName}'`
            });
        });
    };

    render() {
        const resourceName = titleCase(this.props.resource);
        return (
            <Card style={{ margin: 10 }}>
                <List>
                    <ListItem>
                        <ListItemText
                            primary={`${titleCase(this.props.parentName)} ${resourceName}`}
                        />
                        <ListItemIcon>
                            <BasketIcon />
                        </ListItemIcon>
                    </ListItem>

                    <Divider />
                    {this.props.items.length ? (
                        this.props.items.map(item => (
                            <ListItem key={item.id} button>
                                <ListItemText primary={item.name} secondary={`${item.weight}kg`} />
                                <ListItemSecondaryAction>
                                    <IconButton onClick={this.handleDelete(item.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))
                    ) : (
                        <ListItem>
                            <ListItemText secondary="No Items Found" />
                        </ListItem>
                    )}
                </List>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    edit: state.edit
});

const mapDispatchToProps = dispatch => ({
    setEdit: data => dispatch(genericAction('SET', 'EDIT', data)),
    replaceValue: (value, resource) => dispatch(genericAction('ADD', resource, value))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RelatedList);
