import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import LockIcon from '@material-ui/icons/Lock';

import genericAction from '../../actions';
import apiCall from '../../api';

class LoginScreen extends Component {
    state = {
        mode: 'login',
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        message: null
    };

    clearState = () => {
        this.setState({ username: '', password: '', confirmPassword: '', email: '' });
    };

    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    };

    handleLogin = () => {
        if (this.state.mode === 'login') {
            const data = {
                username: this.state.username,
                password: this.state.password
            };
            apiCall('auth', { data })
                .then(response => {
                    this.props.setToken(response.access_token);
                    localStorage.setItem('token', response.access_token);
                })
                .catch(error => {
                    this.clearState();
                    this.setState({ message: error.message });
                });
        } else {
            this.clearState();
            this.setState({ mode: 'login', message: '' });
        }
    };

    handleSignup = () => {
        if (this.state.mode === 'signup') {
            if (this.state.password === this.state.confirmPassword) {
                const data = {
                    username: this.state.username,
                    password: this.state.password,
                    email: this.state.email
                };
                apiCall('addNew', {
                    resource: 'users',
                    data
                })
                    .then(response => {
                        this.clearState();
                        this.setState({
                            message: 'Account Created! Please Login.',
                            mode: 'login'
                        });
                    })
                    .catch(error => {
                        this.setState({ message: error.message });
                    });
            } else {
                this.setState({
                    message: 'Passwords do not match!',
                    password: '',
                    confirmPassword: ''
                });
            }
        } else {
            this.clearState();
            this.setState({ mode: 'signup', message: '' });
        }
    };

    render() {
        return (
            <Paper className="Login Column-Display">
                <Card className="Login-Form">
                    <Avatar style={{ margin: '10px', backgroundColor: '#afa3fe' }}>
                        <LockIcon color="primary" />
                    </Avatar>
                    <Typography>Login</Typography>
                    <CardContent className="Column-Display">
                        <TextField
                            id="username"
                            type="text"
                            label="Username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                        <TextField
                            id="password"
                            type="password"
                            label="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        {this.state.mode === 'signup' && (
                            <React.Fragment>
                                <TextField
                                    id="confirmPassword"
                                    type="password"
                                    label="Confirm Password"
                                    value={this.state.confirmPassword}
                                    onChange={this.handleChange}
                                />
                                <TextField
                                    id="email"
                                    type="text"
                                    label="E-mail"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </React.Fragment>
                        )}
                        {this.state.message && (
                            <Typography style={{ marginTop: '10px' }} color="secondary">
                                {this.state.message}
                            </Typography>
                        )}
                    </CardContent>
                    <CardActions>
                        <Button color="primary" onClick={this.handleLogin}>
                            Login
                        </Button>
                        <Button color="primary" onClick={this.handleSignup}>
                            Sign Up
                        </Button>
                    </CardActions>
                </Card>
            </Paper>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
    setToken: token => dispatch(genericAction('SET', 'TOKEN', token))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen);
