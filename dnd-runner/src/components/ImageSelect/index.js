import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

class ImageSelect extends Component {
    render() {
        const { details, error, handleChange } = this.props;
        return (
            <FormControl style={{ margin: '10px' }}>
                <InputLabel htmlFor={details.name}>{details.label}</InputLabel>
                <Select
                    error={error}
                    value={details.value}
                    onChange={handleChange}
                    inputProps={{
                        name: details.name,
                        id: details.name
                    }}
                    required={details.required}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {this.props.images.map(choice => (
                        <MenuItem key={choice} value={choice}>
                            {choice}
                        </MenuItem>
                    ))}
                </Select>
                {details.value && (
                    <Avatar
                        style={{ margin: '10px' }}
                        src={`${process.env.PUBLIC_URL}/images/${details.value}`}
                    />
                )}
            </FormControl>
        );
    }
}

const mapStateToProps = state => ({
    images: state.images
});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageSelect);
