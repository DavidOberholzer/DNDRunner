import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';

import RelatedList from '../RelatedList';
import { pluralToSingular } from '../../utils';

export class EditDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: this.initializeState()
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
                value: this.props.data[field.name]
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

    handleClose = add => () => {
        const data =
            add &&
            Object.entries(this.state.fields).reduce((accumulator, [name, details]) => {
                if (details.value) {
                    accumulator[name] = details.value;
                }
                return accumulator;
            }, {});
        this.setState({
            fields: this.initializeState()
        });
        this.props.handleUpdate(this.props.data.id, data);
    };

    render() {
        const { data, error, onSubmit, open } = this.props;
        const resource = pluralToSingular(this.props.resource);
        return (
            <Dialog open={open} onClose={this.handleClose(false)}>
                <DialogTitle>
                    Edit {resource}: {data.name}
                </DialogTitle>
                <DialogContent style={{ minWidth: 500 }}>
                    <form
                        className="Column-Display"
                        onSubmit={onSubmit}
                        noValidate
                        autoComplete="off"
                    >
                        {Object.entries(this.state.fields).map(([name, details]) => (
                            <TextField
                                key={name}
                                id={name}
                                label={details.label}
                                type={details.type}
                                value={details.value}
                                onChange={this.handleChange}
                                style={{ margin: '10px' }}
                            />
                        ))}
                    </form>
                    {Object.entries(data).map(([key, value]) => {
                        if (Array.isArray(value)) {
                            return (
                                <RelatedList
                                    key={key}
                                    items={value}
                                    parentName={resource}
                                    resource={key}
                                />
                            );
                        }
                        return null;
                    })}

                    {error && <DialogContentText>{error}</DialogContentText>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose(false)} color="primary">
                        Close
                    </Button>
                    <Button onClick={this.handleClose(true)} color="primary" autoFocus>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default EditDialog;
