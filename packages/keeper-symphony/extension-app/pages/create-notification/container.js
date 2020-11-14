import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postNotification, editNotification } from 'reducers/notifications/actions';
import { Redirect } from 'react-router-dom';
import { setupLinkPrefix } from 'utils/system/setup-url';
import CreateNotificationPage from '.';

const LINK_PREFIX = setupLinkPrefix();

const CreateNotificationContainer = (props) => {
  const {
    loading, instances, actions, error, history: { location: { state } },
  } = props;
  const [actionFired, setActionFired] = useState(false);

  if (actionFired && !loading && !error) {
    return <Redirect to={`${LINK_PREFIX}/home/1`} />;
  }
  const editingNotification = state ? (state.notification || null) : null;
  return (
    <CreateNotificationPage
      loading={loading}
      editingNotification={editingNotification}
      instances={instances}
      submitHandler={(notification) => {
        if (editingNotification) {
          actions.editNotification(notification);
        } else {
          actions.postNotification(notification);
        }
        setActionFired(true);
      }}
    />
  );
};

CreateNotificationContainer.propTypes = {
  loading: PropTypes.bool,
  instances: PropTypes.array,
  actions: PropTypes.object.isRequired,
  error: PropTypes.string,
  history: PropTypes.object,
};

CreateNotificationContainer.defaultProps = {
  loading: false,
  instances: null,
  error: null,
  history: null,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ postNotification, editNotification }, dispatch),
});

const mapStateToProps = state => ({
  loading: state.notifications.loading,
  error: state.notifications.error,
  instances: state.instances.instances,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateNotificationContainer);
