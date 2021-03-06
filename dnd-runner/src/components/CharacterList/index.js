import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import Fab from '@material-ui/core/Fab';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import BackIcon from '@material-ui/icons/KeyboardBackspace';

import genericAction from '../../actions';
import { isEmpty, pluralToSingular } from '../../utils';
import { CardActions } from '@material-ui/core';
import { RESOURCE_FIELDS } from '../../constants';

class CharacterList extends Component {
    handleOpenEdit = data => () => {
        const resource = pluralToSingular(this.props.resource).toLowerCase();
        this.props.setEdit({ data, resource, fields: RESOURCE_FIELDS[resource] });
    };

    getWeight = character => {
        let weight = 0;
        character.items.map(item => (weight += item.weight * item.amount));
        return weight;
    };

    render() {
        const { characters } = this.props;
        const title =
            this.props.parent && this.props.parent.name
                ? `${this.props.parent.name}: ${this.props.resource} (${
                      this.props.parent.experience
                  } XP)`
                : this.props.resource;
        return (
            <React.Fragment>
                <Typography style={{ margin: this.props.back ? '15.5px' : '20px' }} variant="h5">
                    {this.props.back &&
                        this.props.mode !== 'turn-order' &&
                        this.props.mode !== 'combat' && (
                            <Fab
                                onClick={this.props.back}
                                size="small"
                                color="primary"
                                style={{ marginRight: 10 }}
                            >
                                <BackIcon />
                            </Fab>
                        )}
                    {title}
                </Typography>

                {!isEmpty(characters) &&
                    Object.values(characters).map(character => {
                        const weight = character.items && this.getWeight(character);
                        const encumbered = weight > character.carry_capacity;
                        const dying = character.current_health <= 0;
                        return (
                            <Card key={character.id} style={{ margin: 10 }}>
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            alt={character.name.charAt(0)}
                                            src={`${process.env.REACT_APP_API_URL}images/${
                                                character.avatar
                                            }`}
                                        />
                                    }
                                    title={`${character.name} - Level ${character.level}`}
                                    subheader={
                                        !character.alive ? 'Dead' : dying ? 'Dying' : 'Alive'
                                    }
                                />
                                <CardContent>
                                    <Typography variant="subtitle1" component="h3">
                                        Health: {character.current_health} / {character.health}
                                    </Typography>
                                    <LinearProgress
                                        color="secondary"
                                        variant="determinate"
                                        value={(character.current_health * 100) / character.health}
                                        style={{ marginBottom: '1rem' }}
                                    />
                                    {weight !== undefined && (
                                        <Typography
                                            variant="subtitle1"
                                            component="h3"
                                            color={encumbered ? `secondary` : `default`}
                                        >
                                            Carrying Weight: {weight} / {character.carry_capacity}
                                            {encumbered && ` - Encumbered`}
                                        </Typography>
                                    )}
                                    {character.experience !== undefined && (
                                        <Typography variant="subtitle1" component="h3">
                                            XP: {character.experience}
                                        </Typography>
                                    )}
                                </CardContent>
                                <CardActions style={{ marginBottom: '10px' }}>
                                    <Button
                                        color="primary"
                                        onClick={this.handleOpenEdit(character)}
                                    >
                                        <EditIcon />
                                        Edit
                                    </Button>
                                    {this.props.mode !== 'combat' &&
                                        this.props.mode !== 'turn-order' && (
                                            <Button
                                                color="secondary"
                                                onClick={this.props.handleDelete(character.id)}
                                            >
                                                <DeleteIcon /> Delete
                                            </Button>
                                        )}
                                </CardActions>
                            </Card>
                        );
                    })}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    mode: state.mode
});

const mapDispatchToProps = dispatch => ({
    setEdit: data => dispatch(genericAction('SET', 'EDIT', data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CharacterList);
