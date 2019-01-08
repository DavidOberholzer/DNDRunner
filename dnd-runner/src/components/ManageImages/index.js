import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import UploadIcon from '@material-ui/icons/CloudUpload';

import apiCall from '../../api';
import genericAction from '../../actions';

class ManageImages extends Component {
    state = {
        image: '',
        error: null
    };

    handleFileSelect = event => {
        this.setState({ image: event.target.files[0] });
    };

    uploadFile = () => {
        let data = new FormData();
        data.append('file', this.state.image);
        apiCall('uploadImage', { data, token: this.props.token })
            .then(done => {
                this.props.addImage(this.state.image.name);
                this.setState({ image: '', error: null });
            })
            .catch(error => {
                this.setState({ error: error.message });
            });
    };

    render() {
        return (
            <React.Fragment>
                {this.props.images.length ? (
                    this.props.images.map(item => (
                        <ListItem key={item} button>
                            <Avatar src={`${process.env.REACT_APP_API_URL}images/${item}`} />
                            <ListItemText primary={item} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={this.props.openDelete(item)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                ) : (
                    <ListItem>
                        <ListItemText secondary={`No ${this.props.title} Found`} />
                    </ListItem>
                )}
                <ListItem>
                    <TextField
                        type="file"
                        files={[this.state.image]}
                        onChange={this.handleFileSelect}
                    />
                    <ListItemSecondaryAction>
                        <IconButton onClick={this.uploadFile}>
                            <UploadIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                {this.state.error && (
                    <Typography color="secondary" style={{ margin: '0.75rem' }}>
                        {this.state.error}
                    </Typography>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    images: state.images,
    token: state.token
});

const mapDispatchToProps = dispatch => ({
    addImage: image => dispatch(genericAction('ADD', 'IMAGE', image))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageImages);
