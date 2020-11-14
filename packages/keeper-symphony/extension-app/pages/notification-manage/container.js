import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getNotifications,
  deleteNotification,
} from 'reducers/notifications/actions';
import { Loader, Box } from 'symphony-bdk-ui-toolkit';
import NotificationManagePage from '.';

const NotificationPageContainer = (props) => {
  const {
    loading, instances, actions, notifications,
  } = props;

  const firstLoading = !notifications && loading;
  const deleteLoading = notifications && loading;

  useEffect(() => {
    if (!notifications) {
      actions.getNotifications();
    }
  }, []);

  if (firstLoading) {
    return (
      <Box horizontal>
        <Loader />
      </Box>
    );
  }

  return (
    <NotificationManagePage
      notifications={notifications}
      deleteLoading={deleteLoading}
      deleteHandler={id => actions.deleteNotification(id)}
      instances={instances}
    />
  );
};

NotificationPageContainer.propTypes = {
  loading: PropTypes.bool,
  instances: PropTypes.array,
  notifications: PropTypes.array,
  actions: PropTypes.object.isRequired,
};

NotificationPageContainer.defaultProps = {
  loading: false,
  instances: null,
  notifications: null,
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { getNotifications, deleteNotification },
    dispatch,
  ),
});

const mapStateToProps = state => ({
  loading: state.notifications.loading,
  notifications: state.notifications.notifications,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NotificationPageContainer);
