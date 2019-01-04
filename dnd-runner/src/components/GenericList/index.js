import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddBox from '../AddBox';
import AddDialog from '../AddDialog';
import BattleList from '../BattleList';
import CharacterList from '../CharacterList';
import Notification from '../Notification';

import genericAction from '../../actions';
import apiCall from '../../api';
import { isEmpty, pluralToSingular, titleCase } from '../../utils';

class GenericList extends Component {
    state = {
        open: false,
        openNotification: false
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = async (data, newOne) => {
        if (!isEmpty(data)) {
            try {
                const resource = pluralToSingular(this.props.resource);
                const resourceUpper = resource.toUpperCase();
                if (newOne) {
                    data = await apiCall('addNew', {
                        resource: this.props.resource,
                        data: data
                    });
                    this.props.addOne(data, resourceUpper);
                }

                this.props.addValue(data, resourceUpper);

                await apiCall('addNew', {
                    resource: `${this.props.parentName}-${this.props.resource}`,
                    data: {
                        [`${resource}_id`]: data.id,
                        [`${this.props.parentName}_id`]: this.props[`${this.props.parentName}`].id
                    }
                });

                this.setState({
                    open: false,
                    openNotification: true,
                    notification: `Added ${this.props.resourceName}`,
                    error: null
                });
            } catch (e) {
                this.setState({ error: e.message });
            }
        } else {
            this.setState({ open: false, error: null });
        }
    };

    handleDelete = id => () => {
        this.props.setDelete({
            ...this.props[this.props.resource][`${id}`],
            parentName: this.props.parentName,
            resource: this.props.resource
        });
    };

    handleCloseNotification = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openNotification: false });
    };

    render() {
        const { values } = this.props;
        return (
            <div className="Card-List">
                <AddDialog
                    title={`Add New/Existing ${this.props.resourceName}`}
                    open={this.state.open}
                    handleClose={this.handleClose}
                    fields={this.props.fields}
                    error={this.state.error}
                    existing={this.props.resource}
                />
                {this.props.character ? (
                    <CharacterList
                        characters={values}
                        handleDelete={this.handleDelete}
                        fields={this.props.fields}
                        resource={titleCase(this.props.resource)}
                        back={this.props.back}
                        parent={this.props.parent}
                    />
                ) : (
                    <BattleList handleDelete={this.handleDelete} fields={this.props.fields} />
                )}
                <AddBox resource={this.props.resourceName} onClick={this.handleOpen} />
                <Notification
                    open={this.state.openNotification}
                    message={this.state.notification}
                    handleClose={this.handleCloseNotification}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    campaign: state.campaign,
    battle: state.battle,
    battles: state.battles,
    players: state.players,
    enemies: state.enemies
});

const mapDispatchToProps = dispatch => ({
    addValue: (value, resource) => dispatch(genericAction('ADD', resource, value)),
    addOne: (value, resource) => dispatch(genericAction('ADD', `ALL_${resource}`, value)),
    setDelete: data => dispatch(genericAction('SET', 'DELETE', data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GenericList);
