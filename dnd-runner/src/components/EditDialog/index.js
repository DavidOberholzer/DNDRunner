import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

import ImageSelect from '../ImageSelect';
import RelatedList from '../RelatedList';

export class EditDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: this.initializeState(),
            errors: new Set([])
        };
    }

    componentWillReceiveProps() {
        this.setState({ fields: this.initializeState() });
    }

    initializeState = () =>
        this.props.fields.reduce((accumulator, field) => {
            accumulator[field.name] = {
                ...field,
                value: this.props.data[field.name] || (field.type === 'number' ? 0 : '')
            };
            return accumulator;
        }, {});

    handleChange = event => {
        const name = event.target.id || event.target.name;
        const value = event.target.value || event.target.checked;
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
        const errors = new Set([]);
        const data =
            add &&
            Object.entries(this.state.fields).reduce((accumulator, [name, details]) => {
                if (
                    details.required &&
                    (details.type === 'number' ? isNaN(details.value) : !details.value)
                ) {
                    errors.add(name);
                }
                accumulator[name] = details.value;
                return accumulator;
            }, {});
        if (errors.size === 0) {
            this.setState({
                fields: this.initializeState()
            });
            this.props.handleUpdate(this.props.data.id, data);
        } else {
            this.setState({ errors });
        }
    };

    render() {
        const { data, error, open, resource } = this.props;
        return (
            <Dialog open={open} onClose={this.handleClose(false)}>
                <DialogTitle>
                    Edit {resource}: {data.name}
                </DialogTitle>
                <DialogContent style={{ minWidth: 500 }}>
                    <form className="Column-Form" noValidate autoComplete="off">
                        {Object.entries(this.state.fields).map(([name, details]) =>
                            details.type === 'boolean' ? (
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
                                    error={this.state.errors.has(name)}
                                    required={details.required}
                                />
                            ) : (
                                <TextField
                                    key={name}
                                    id={name}
                                    error={this.state.errors.has(name)}
                                    label={details.label}
                                    type={details.type}
                                    value={details.value}
                                    onChange={this.handleChange}
                                    required={details.required}
                                    style={{ margin: '10px' }}
                                    multiline
                                />
                            )
                        )}
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
                    {this.state.errors.size !== 0 && (
                        <DialogContentText>
                            Fields '{Array.from(this.state.errors).join(', ')}' are Required!
                        </DialogContentText>
                    )}
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

const mapStateToProps = state => ({ images: state.images });

export default connect(
    mapStateToProps,
    {}
)(EditDialog);
