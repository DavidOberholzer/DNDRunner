import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import BackIcon from '@material-ui/icons/KeyboardBackspace';
import Typography from '@material-ui/core/Typography';

import EditDialog from '../EditDialog';

import genericAction from '../../actions';
import apiCall from '../../api';
import { isEmpty, pluralToSingular } from '../../utils';
import { CardActions } from '@material-ui/core';

class CharacterList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...Object.values(props.characters).reduce((accumulator, character) => {
                accumulator[character.name] = false;
                return accumulator;
            }, {})
        };
    }

    handleOpen = data => () => {
        this.props.setEdit(data);
        this.setState({ [data.name]: true });
    };

    handleUpdate = (id, data) => {
        if (!isEmpty(data)) {
            apiCall('update', {
                resource: this.props.resource.toLowerCase(),
                id,
                data
            })
                .then(response => {
                    this.props.setCharacter(
                        pluralToSingular(this.props.resource).toUpperCase(),
                        response
                    );
                    this.setState({ [response.name]: false, error: null });
                })
                .catch(error => {
                    this.setState({ error: error.message });
                });
        } else {
            this.setState({ [this.props.characters[id].name]: false, error: null });
        }
    };

    render() {
        const { characters } = this.props;
        return (
            <React.Fragment>
                <Typography style={{ margin: '15px' }} variant="headline">
                    {this.props.resource}
                    {this.props.back && (
                        <IconButton onClick={this.props.back}>
                            <BackIcon />
                        </IconButton>
                    )}
                </Typography>

                {!isEmpty(characters) &&
                    Object.values(characters).map(character => (
                        <Card key={character.id} style={{ margin: 10 }}>
                            {this.state[character.name] && (
                                <EditDialog
                                    open={this.state[character.name]}
                                    data={character}
                                    fields={this.props.fields}
                                    handleUpdate={this.handleUpdate}
                                    resource={this.props.resource}
                                />
                            )}
                            <CardHeader
                                avatar={<Avatar>{character.name.charAt(0)}</Avatar>}
                                title={character.name}
                                subheader={character.alive ? 'Alive' : 'Dead'}
                            />
                            <CardContent>
                                <Typography variant="subheading" component="h3">
                                    Health: {character.current_health} / {character.health}
                                </Typography>
                            </CardContent>
                            <CardActions style={{ marginBottom: '10px' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleOpen(character)}
                                >
                                    <EditIcon />
                                    Edit
                                </Button>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={this.props.handleDelete(character.id)}
                                >
                                    <DeleteIcon /> Delete
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    setEdit: data => dispatch(genericAction('SET', 'EDIT', data)),
    setCharacter: (resource, data) => dispatch(genericAction('ADD', resource, data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CharacterList);
