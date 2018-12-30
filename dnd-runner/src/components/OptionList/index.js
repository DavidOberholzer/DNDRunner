import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

class OptionList extends Component {
    render() {
        return (
            <div className="List">
                <Typography style={{ margin: '15px' }} variant="headline">
                    Game Options
                </Typography>
                <List>
                    <ListItem button>
                        <ListItemText primary="Give Player Item" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Damage/Heal Player" />
                    </ListItem>
                </List>
            </div>
        );
    }
}

export default OptionList;
