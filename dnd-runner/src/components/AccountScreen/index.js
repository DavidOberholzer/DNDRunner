import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import EditIcon from '@material-ui/icons/Edit';
import UserIcon from '@material-ui/icons/PermIdentity';

import genericAction from '../../actions';
import { setMode } from '../../actions/mode';
import apiCall from '../../api';

class AccountScreen extends Component {
    state = {
        username: this.props.user.username || '',
        email: this.props.user.email || '',
        message: null
    };

    componentDidMount() {
        this.setState({ message: null });
    }

    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    };

    handleUpdate = () => {
        apiCall('update', {
            resource: 'users',
            id: this.props.user.id,
            data: {
                ...this.state
            },
            token: this.props.token
        })
            .then(response => {
                this.props.updateUser(response);
                this.setState({ message: 'Account Updated!' });
            })
            .catch(error => {
                this.setState({ message: error.description });
            });
    };

    render() {
        return (
            <Card>
                <CardHeader
                    avatar={
                        <Avatar>
                            <UserIcon />
                        </Avatar>
                    }
                    title={`User Account: ${this.state.username}`}
                />
                <CardContent className="Column-Display">
                    <TextField
                        id="username"
                        type="text"
                        label="Username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        style={{ margin: '10px' }}
                    />
                    <TextField
                        id="email"
                        type="text"
                        label="E-mail"
                        value={this.state.email}
                        onChange={this.handleChange}
                        style={{ margin: '10px' }}
                    />
                    {this.state.message && (
                        <Typography style={{ marginTop: '10px' }} color="secondary">
                            {this.state.message}
                        </Typography>
                    )}
                </CardContent>
                <CardActions disableActionSpacing>
                    <Button color="primary" onClick={this.handleUpdate}>
                        <EditIcon />
                        Update
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    token: state.token,
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    setMode: () => dispatch(setMode('campaign')),
    updateUser: user => dispatch(genericAction('SET', 'USER', user))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountScreen);
