import React, { Component } from 'react';
import { connect } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BasketIcon from '@material-ui/icons/ShoppingBasketOutlined';
import BattleIcon from '@material-ui/icons/WarningOutlined';
import EnemiesIcon from '@material-ui/icons/PetsOutlined';
import PlayersIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
import SettingsIcon from '@material-ui/icons/SettingsApplications';
import TerrainIcon from '@material-ui/icons/TerrainOutlined';

import genericAction from '../../actions';

class ManageSelect extends Component {
    handleSelect = page => () => {
        this.props.setManage(page);
    };

    render() {
        return (
            <List>
                <ListItem>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Manage Pages" secondary="Select from below to view" />
                </ListItem>
                <Divider />
                <ListItem button onClick={this.handleSelect('campaigns')}>
                    <ListItemIcon>
                        <TerrainIcon />
                    </ListItemIcon>
                    <ListItemText primary="Campaigns" />
                </ListItem>
                <ListItem button onClick={this.handleSelect('allBattles')}>
                    <ListItemIcon>
                        <BattleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Battles" />
                </ListItem>
                <ListItem button onClick={this.handleSelect('allPlayers')}>
                    <ListItemIcon>
                        <PlayersIcon />
                    </ListItemIcon>
                    <ListItemText primary="Players" />
                </ListItem>
                <ListItem button onClick={this.handleSelect('allEnemies')}>
                    <ListItemIcon>
                        <EnemiesIcon />
                    </ListItemIcon>
                    <ListItemText primary="Enemies" />
                </ListItem>
                <ListItem button onClick={this.handleSelect('allItems')}>
                    <ListItemIcon>
                        <BasketIcon />
                    </ListItemIcon>
                    <ListItemText primary="Items" />
                </ListItem>
            </List>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    setManage: value => dispatch(genericAction('SET', 'MANAGE', value))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageSelect);
