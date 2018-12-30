import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';

import { isEmpty } from '../../utils';

class CharacterList extends Component {
    render() {
        const { characters } = this.props;
        return (
            <React.Fragment>
                <Typography style={{ margin: '15px' }} variant="headline">
                    Players
                </Typography>
                {!isEmpty(characters) &&
                    Object.values(characters).map(character => (
                        <Card key={character.id} style={{ margin: 10 }}>
                            <CardHeader
                                avatar={<Avatar>{character.name.charAt(0)}</Avatar>}
                                title={character.name}
                                subheader={character.alive ? 'Alive' : 'Dead'}
                            />
                            <CardContent>
                                <Typography variant="subheading" component="h3">
                                    Health: {character.health} / {character.current_health}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}{' '}
            </React.Fragment>
        );
    }
}

export default CharacterList;
