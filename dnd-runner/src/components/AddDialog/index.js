import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';

import ImageSelect from '../ImageSelect';
import { isEmpty, titleCase } from '../../utils';

class AddDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: this.initializeState(),
            existing: '',
            checkedExisting: true
        };
    }

    componentWillReceiveProps() {
        this.setState({ fields: this.initializeState() });
    }

    initializeState = () =>
        this.props.fields.reduce((accumulator, field) => {
            accumulator[field.name] = {
                ...field
            };
            return accumulator;
        }, {});

    handleChange = event => {
        const name = event.target.id || event.target.name;
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

    handleChangeExisting = event => {
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
                data = Object.entries(this.state.fields).reduce((accumulator, [name, details]) => {
                    if (details.global) {
                        accumulator[name] = details.value;
                    }
                    return accumulator;
                }, {});
                data = add && {
                    ...this.props.storeValues(this.resourceName)[this.state.existing],
                    ...data
                };
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
            existing: '',
            checkedExisting: true
        });
        this.props.existing ? this.props.handleClose(data, newOne) : this.props.handleClose(data);
    };

    render() {
        this.resourceName = titleCase(this.props.existing);
        return (
            <Dialog open={this.props.open} onClose={this.handleClose(false)}>
                <DialogTitle>{this.props.title}</DialogTitle>
                <DialogContent style={{ minWidth: 500 }}>
                    <form className="Column-Form" noValidate autoComplete="off">
                        {Object.entries(this.state.fields).map(([name, details]) => {
                            if (details.global) {
                                return (
                                    <FormControl key={name} style={{ width: '100%' }}>
                                        <InputLabel htmlFor={details.name}>
                                            {details.label}
                                        </InputLabel>
                                        <Select
                                            value={details.value}
                                            onChange={this.handleChange}
                                            inputProps={{
                                                name: details.name,
                                                id: details.name
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {(Array.isArray(details.values)
                                                ? details.values
                                                : Object.values(
                                                      this.props.storeValues(details.values)
                                                  )
                                            ).map(choice => (
                                                <MenuItem key={choice.id} value={choice.id}>
                                                    {choice.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                );
                            }
                            return null;
                        })}
                        {this.props.existing &&
                        this.state.checkedExisting &&
                        !isEmpty(this.props.storeValues(this.resourceName)) ? (
                            <FormControl style={{ width: '100%' }}>
                                <InputLabel htmlFor="existing-simple">
                                    Existing {this.resourceName}
                                </InputLabel>
                                <Select
                                    value={this.state.existing}
                                    onChange={this.handleChangeExisting}
                                    inputProps={{
                                        name: 'existing',
                                        id: 'existing-simple'
                                    }}
                                >
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
                            Object.entries(this.state.fields).map(([name, details]) => {
                                if (!details.global) {
                                    return details.type === 'boolean' ? (
                                        <FormControlLabel
                                            key={name}
                                            control={
                                                <Checkbox
                                                    id={name}
                                                    checked={details.value}
                                                    onChange={this.handleChange}
                                                />
                                            }
                                            label={details.label}
                                            style={{ marginLeft: 0 }}
                                        />
                                    ) : details.type === 'image' ? (
                                        <ImageSelect
                                            key={name}
                                            details={details}
                                            handleChange={this.handleChange}
                                        />
                                    ) : (
                                        <TextField
                                            key={name}
                                            id={name}
                                            label={details.label}
                                            type={details.type}
                                            value={details.value}
                                            onChange={this.handleChange}
                                            style={{ margin: '10px' }}
                                            multiline
                                        />
                                    );
                                }
                                return null;
                            })
                        )}
                    </form>
                    {this.props.existing && !isEmpty(this.props.storeValues(this.resourceName)) && (
                        <div>
                            <Switch
                                checked={this.state.checkedExisting}
                                onChange={this.handleSwitch}
                            />
                            <Typography>New/Existing</Typography>
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
    images: state.images,
    storeValues: resource => state[`all${resource}`]
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddDialog);
