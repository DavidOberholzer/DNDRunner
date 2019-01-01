import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';

import { isEmpty, titleCase } from '../../utils';

class AddDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: this.initializeState(),
            existing: 0,
            checkedExisting: true
        };
    }

    componentWillReceiveProps() {
        this.setState({ fields: this.initializeState() });
    }

    initializeState = () =>
        this.props.fields.reduce((accumulator, field) => {
            accumulator[field.name] = {
                type: field.type,
                label: field.label,
                value: field.value
            };
            return accumulator;
        }, {});

    handleChange = event => {
        const name = event.target.id;
        const value = event.target.value;
        this.setState({
            fields: {
                ...this.state.fields,
                [name]: {
                    ...this.state.fields[name],
                    value: value
                }
            }
        });
    };

    handleChangeSelect = event => {
        this.setState({ existing: event.target.value });
    };

    handleSwitch = () => {
        this.setState({ checkedExisting: !this.state.checkedExisting });
    };

    handleClose = add => () => {
        let data = {};
        let newOne = false;
        if (
            this.state.checkedExisting &&
            this.props.existing &&
            !isEmpty(this.props.storeValues(this.resourceName))
        ) {
            if (this.state.existing) {
                data = add && this.props.storeValues(this.resourceName)[this.state.existing];
            }
        } else {
            data =
                add &&
                Object.entries(this.state.fields).reduce((accumulator, [name, details]) => {
                    if (details.value) {
                        accumulator[name] = details.value;
                    }
                    return accumulator;
                }, {});
            newOne = true;
        }
        this.setState({
            fields: this.initializeState(),
            existing: 0,
            checkedExisting: true
        });
        this.props.existing ? this.props.handleClose(data, newOne) : this.props.handleClose(data);
    };

    render() {
        this.resourceName = titleCase(this.props.existing);
        return (
            <Dialog open={this.props.open} onClose={this.handleClose(false)}>
                <DialogTitle>{this.props.title}</DialogTitle>
                <DialogContent>
                    <form
                        className="Column-Display"
                        onSubmit={this.props.onSubmit}
                        noValidate
                        autoComplete="off"
                    >
                        {this.props.existing &&
                        this.state.checkedExisting &&
                        !isEmpty(this.props.storeValues(this.resourceName)) ? (
                            <FormControl>
                                <Select
                                    value={this.state.existing}
                                    onChange={this.handleChangeSelect}
                                    inputProps={{
                                        name: 'existing',
                                        id: 'existing-simple'
                                    }}
                                >
                                    <MenuItem value={0}>None</MenuItem>
                                    {Object.values(this.props.storeValues(this.resourceName)).map(
                                        choice => (
                                            <MenuItem key={choice.id} value={choice.id}>
                                                {choice.name}
                                            </MenuItem>
                                        )
                                    )}
                                </Select>
                            </FormControl>
                        ) : (
                            Object.entries(this.state.fields).map(([name, details]) => (
                                <TextField
                                    key={name}
                                    id={name}
                                    label={details.label}
                                    type={details.type}
                                    value={details.value}
                                    onChange={this.handleChange}
                                    style={{ margin: '10px' }}
                                />
                            ))
                        )}
                    </form>
                    {this.props.existing && !isEmpty(this.props.storeValues(this.resourceName)) && (
                        <div>
                            <Switch
                                checked={this.state.checkedExisting}
                                onChange={this.handleSwitch}
                            />
                            <Typography>Existing/New</Typography>
                        </div>
                    )}
                    {this.props.error && <DialogContentText>{this.props.error}</DialogContentText>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose(false)} color="primary">
                        Close
                    </Button>
                    <Button onClick={this.handleClose(true)} color="primary" autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = state => ({
    storeValues: resource => state[`all${resource}`]
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddDialog);
