import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/DeleteForever';
import UploadIcon from '@material-ui/icons/CloudUpload';

import apiCall from '../../api';
import genericAction from '../../actions';

class ManageImages extends Component {
    state = {
        image: ''
    };

    handleFileSelect = event => {
        this.setState({ image: event.target.files[0] });
    };

    uploadFile = () => {
        let data = new FormData();
        data.append('file', this.state.image);
        apiCall('uploadImage', data).then(done => {
            this.props.addImage(this.state.image.name);
            this.setState({ image: '' });
        });
    };

    render() {
        return (
            <React.Fragment>
                {this.props.images.length ? (
                    this.props.images.map(item => (
                        <ListItem key={item} button>
                            <Avatar src={`${process.env.PUBLIC_URL}/images/${item}`} />
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
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    images: state.images
});

const mapDispatchToProps = dispatch => ({
    addImage: image => dispatch(genericAction('ADD', 'IMAGE', image))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageImages);
