import React, { Component } from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';

const styles = {
    card: {
        width: '20%',
        height: '20%',
        margin: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    addIcon: {
        fontSize: 30
    }
};

class AddBox extends Component {
    handleClick = event => {
        console.log(event);
    };

    render() {
        return (
            <Card style={styles.card} onClick={this.handleClick}>
                <CardContent style={{ alignContent: 'center' }}>
                    <IconButton>
                        <Add color="primary" style={styles.addIcon} />
                    </IconButton>
                </CardContent>
            </Card>
        );
    }
}

export default AddBox;
