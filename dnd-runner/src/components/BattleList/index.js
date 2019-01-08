import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import ManageIcon from '@material-ui/icons/Build';

import apiCall from '../../api';
import { isEmpty } from '../../utils';
import genericAction from '../../actions';
import { setMode } from '../../actions/mode';
import { RESOURCE_FIELDS } from '../../constants';

class BattleList extends Component {
    handleView = id => () => {
        this.props.setBattle(this.props.battles[id]);
        apiCall('getRelated', {
            resource: 'enemies-in-battle',
            id,
            token: this.props.token
        }).then(enemies => {
            this.props.setEnemies(enemies);
            this.props.setBattleMode();
        });
    };

    handleOpenEdit = data => () => {
        const resource = 'battle';
        this.props.setEdit({ data, resource, fields: RESOURCE_FIELDS[resource] });
    };

    render() {
        const { battles } = this.props;
        return (
            <React.Fragment>
                <Typography style={{ margin: '20px' }} variant="h5">
                    Battles
                </Typography>
                {!isEmpty(battles) &&
                    Object.values(battles).map(battle => (
                        <Card key={battle.id} style={{ margin: '10px' }}>
                            <CardHeader
                                avatar={<Avatar>{battle.name.charAt(0)}</Avatar>}
                                title={battle.name}
                            />
                            <CardContent>
                                <Typography variant="subtitle1" component="h3">
                                    {battle.description}
                                </Typography>
                                <Typography variant="subtitle1" component="h3">
                                    XP Reward: {battle.experience}
                                </Typography>
                            </CardContent>
                            <CardActions style={{ marginBottom: '10px' }}>
                                <Button color="primary" onClick={this.handleView(battle.id)}>
                                    <ManageIcon />
                                    Manage
                                </Button>
                                <Button color="primary" onClick={this.handleOpenEdit(battle)}>
                                    <EditIcon />
                                    Edit
                                </Button>
                                {this.props.mode !== 'combat' && this.props.mode !== 'turn-order' && (
                                    <Button
                                        color="secondary"
                                        onClick={this.props.handleDelete(battle.id)}
                                    >
                                        <DeleteIcon />
                                        Delete
                                    </Button>
                                )}
                            </CardActions>
                        </Card>
                    ))}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    battles: state.battles,
    mode: state.mode,
    token: state.token
});

const mapDispatchToProps = dispatch => ({
    setEdit: data => dispatch(genericAction('SET', 'EDIT', data)),
    setBattleMode: () => dispatch(setMode('battle')),
    setBattle: battle => dispatch(genericAction('SET', 'BATTLE', battle)),
    addBattle: battle => dispatch(genericAction('ADD', 'BATTLE', battle)),
    setEnemies: enemies => dispatch(genericAction('SET_MANY', 'ENEMY', enemies))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BattleList);
