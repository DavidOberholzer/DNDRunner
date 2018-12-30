import React, { Component } from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/DeleteOutline';

import { isEmpty } from '../../utils';
import genericAction from '../../actions';

class BattleList extends Component {
    render() {
        const { battles } = this.props;
        return (
            <React.Fragment>
                <Typography style={{ margin: '15px' }} variant="headline">
                    Battles
                </Typography>
                {!isEmpty(battles) &&
                    Object.values(battles).map(battle => (
                        <Card key={battle.id} style={{ margin: '10px' }}>
                            <CardHeader
                                avatar={<Avatar>{battle.name.charAt(0)}</Avatar>}
                                action={
                                    <IconButton onClick={this.props.handleDelete(battle.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                }
                                title={battle.name}
                            />
                            <CardContent>
                                <Typography variant="subheading" component="h3">
                                    {battle.description}
                                </Typography>
                            </CardContent>
                            <CardActions style={{ marginBottom: '10px' }}>
                                <Button variant="contained" color="primary">
                                    View
                                </Button>
                                <Button variant="contained" color="secondary">
                                    Run!
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    battles: state.battles
});

const mapDispatchToProps = dispatch => ({
    setBattle: battle => dispatch(genericAction('SET', 'BATTLE', battle))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BattleList);
