import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddBox from '../AddBox';
import AddDialog from '../AddDialog';
import BattleList from '../BattleList';
import CharacterList from '../CharacterList';
import Notification from '../Notification';

import genericAction from '../../actions';
import apiCall from '../../api';
import { isEmpty } from '../../utils';

class GenericList extends Component {
    state = {
        open: false,
        openNotification: false
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = async (data, newOne) => {
        console.log(data);
        if (!isEmpty(data)) {
            try {
                const resource = this.props.resource.slice(0, -1).toUpperCase();
                if (newOne) {
                    data = await apiCall('addNew', {
                        resource: this.props.resource,
                        data: data
                    });
                    this.props.addOne(data, resource);
                }

                this.props.addValue(data, resource);

                await apiCall('addNew', {
                    resource: `${this.props.parentName}-${this.props.resource}`,
                    data: {
                        [`${this.props.resource.slice(0, -1)}_id`]: data.id,
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
                    <CharacterList characters={values} />
                ) : (
                    <BattleList battles={values} />
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
    campaign: state.campaign
});

const mapDispatchToProps = dispatch => ({
    addValue: (value, resource) => dispatch(genericAction('ADD', resource, value)),
    addOne: (value, resource) => dispatch(genericAction('ADD', `ALL_${resource}`, value))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GenericList);
