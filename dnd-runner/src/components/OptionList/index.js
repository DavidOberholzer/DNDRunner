import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import AddDialog from '../AddDialog';
import Notification from '../Notification';
import genericAction from '../../actions';
import apiCall from '../../api';
import { RESOURCE_FIELDS } from '../../constants';
import { isEmpty } from '../../utils';

class OptionList extends Component {
    state = {
        itemAddOpen: false,
        openNotification: false
    };

    handleOpen = () => {
        this.setState({ itemAddOpen: true });
    };

    handleCloseAddItem = async (data, newOne) => {
        if (!isEmpty(data)) {
            try {
                if (!data.player_id) {
                    throw Error('Player Field Required!');
                }
                let player_id = data.player_id;
                delete data.player_id;
                if (newOne) {
                    data = await apiCall('addNew', {
                        resource: 'items',
                        data: data
                    });
                    this.props.addOne(data, 'ITEM');
                }

                await apiCall('addNew', {
                    resource: 'player-items',
                    data: {
                        item_id: data.id,
                        player_id
                    }
                });

                data['amount'] = 1;

                let player = this.props.players[player_id];
                player.items = [...player.items, data];

                this.props.addValue(player, 'PLAYER');

                this.setState({
                    itemAddOpen: false,
                    openNotification: true,
                    notification: `Added Item to Player`,
                    error: null
                });
            } catch (e) {
                this.setState({ error: e.message });
            }
        } else {
            this.setState({ itemAddOpen: false, error: null });
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
            <div className="List">
                <AddDialog
                    title="Add New/Existing Item"
                    open={this.state.itemAddOpen}
                    handleClose={this.handleCloseAddItem}
                    fields={RESOURCE_FIELDS.item}
                    error={this.state.error}
                    existing="items"
                />
                <Typography style={{ margin: '20px' }} variant="h5">
                    Game Options
                </Typography>
                <Card>
                    <List>
                        <ListItem button onClick={this.handleOpen}>
                            <ListItemText primary="Give Player Item" />
                        </ListItem>
                    </List>
                </Card>
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
    players: state.players
});

const mapDispatchToProps = dispatch => ({
    addValue: (value, resource) => dispatch(genericAction('ADD', resource, value)),
    addOne: (value, resource) => dispatch(genericAction('ADD', `ALL_${resource}`, value))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OptionList);
