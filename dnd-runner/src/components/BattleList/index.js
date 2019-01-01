import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import ViewIcon from '@material-ui/icons/Visibility';

import EditDialog from '../EditDialog';

import apiCall from '../../api';
import { isEmpty } from '../../utils';
import genericAction from '../../actions';
import { setMode } from '../../actions/mode';

class BattleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...Object.values(props.battles).reduce((accumulator, battle) => {
                accumulator[battle.name] = false;
                return accumulator;
            }, {})
        };
    }

    handleView = id => () => {
        this.props.setBattle(this.props.battles[id]);
        apiCall('getRelated', {
            resource: 'enemies-in-battle',
            id
        }).then(enemies => {
            this.props.setEnemies(enemies);
            this.props.setBattleMode();
        });
    };

    handleOpen = name => () => {
        this.setState({ [name]: true });
    };

    handleUpdate = (id, data) => {
        if (!isEmpty(data)) {
            apiCall('update', {
                resource: 'battles',
                id,
                data
            })
                .then(response => {
                    this.props.addBattle(response);
                    this.setState({ [response.name]: false, error: null });
                })
                .catch(error => {
                    this.setState({ error: error.message });
                });
        } else {
            this.setState({ [this.props.battles[id].name]: false, error: null });
        }
    };

    render() {
        const { battles } = this.props;
        return (
            <React.Fragment>
                <Typography style={{ margin: '15px' }} variant="headline">
                    Battles
                </Typography>
                {!isEmpty(battles) &&
                    Object.values(battles).map(battle => (
                        <Card key={battle.id} style={{ margin: '10px' }}>
                            {this.state[battle.name] && (
                                <EditDialog
                                    open={this.state[battle.name]}
                                    data={battle}
                                    fields={this.props.fields}
                                    handleUpdate={this.handleUpdate}
                                />
                            )}
                            <CardHeader
                                avatar={<Avatar>{battle.name.charAt(0)}</Avatar>}
                                action={
                                    <IconButton onClick={this.props.handleDelete(battle.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                                title={battle.name}
                            />
                            <CardContent>
                                <Typography variant="subheading" component="h3">
                                    {battle.description}
                                </Typography>
                            </CardContent>
                            <CardActions style={{ marginBottom: '10px' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleView(battle.id)}
                                >
                                    <ViewIcon />
                                    View
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleOpen(battle.name)}
                                >
                                    <EditIcon />
                                    Edit
                                </Button>
                                <Button variant="contained" color="secondary">
                                    Run!
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    battles: state.battles
});

const mapDispatchToProps = dispatch => ({
    setBattleMode: () => dispatch(setMode('battle')),
    setBattle: battle => dispatch(genericAction('SET', 'BATTLE', battle)),
    addBattle: battle => dispatch(genericAction('ADD', 'BATTLE', battle)),
    setEnemies: enemies => dispatch(genericAction('SET_MANY', 'ENEMY', enemies))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BattleList);
