import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';

class AddBox extends Component {
    render() {
        return (
            <Card style={{ margin: 10 }}>
                <CardContent>
                    <IconButton onClick={this.props.onClick}>
                        <AddIcon />
                        <Typography variant="subtitle1">Add {this.props.resource}</Typography>
                    </IconButton>
                </CardContent>
            </Card>
        );
    }
}

export default AddBox;
