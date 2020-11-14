import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Text,
  Table,
  Button,
  ModalConsumer,
  DangerConfirmationModal,
} from 'symphony-bdk-ui-toolkit';
import { Link, Redirect } from 'react-router-dom';
import { setupLinkPrefix } from 'utils/system/setup-url';

const LINK_PREFIX = setupLinkPrefix();

const columns = [
  {
    header: 'Name',
    accessor: 'name',
    sortable: false,
  },
  {
    header: 'Instance',
    accessor: 'instance',
    tooltip: 'This column is sortable!',
  },
  {
    sortable: false,
    acessor: null,
    width: 50,
    hasActions: true,
  },
];

const Confirmation = (props) => {
  const { hideModal, deleteHandler } = props;
  return (
    <DangerConfirmationModal
      hideModal={hideModal}
      confirmButtonText="Yes, I'm sure"
      message="Doing this action will permanetly change the way you perceive the universe around you."
      modalTitle="Are you sure?"
      confirmationHandler={() => {
        deleteHandler();
        hideModal();
      }}
    />
  );
};

const NotificationManagePage = (props) => {
  const {
    notifications, instances, deleteLoading, deleteHandler,
  } = props;
  const [triggerOpenModal, setTriggerOpenModal] = useState(null);
  const [editNotificationRedirect, setEditNotificationRedirect] = useState(null);
  const parsedNotifications = notifications.map(el => ({
    ...el,
    instance: instances.find(i => el.instanceId === i.id).name,
    actionsMenu: el.isEditable
      ? [
        {
          label: 'Edit',
          callback: () => {
            setEditNotificationRedirect(el);
          },
          type: 'info',
        },
        {
          label: 'Delete',
          callback: () => {
            setTriggerOpenModal(el.id);
          },
          type: 'error',
        },
      ]
      : undefined,
  }));

  if (editNotificationRedirect) {
    return (
      <Redirect
        to={{
          pathname: `${LINK_PREFIX}/createNotification`,
          state: { notification: editNotificationRedirect },
        }}
      />
    );
  }

  return (
    <ModalConsumer>
      {(context) => {
        if (triggerOpenModal) {
          context.showModal(
            Confirmation,
            {
              hideModal: context.hideModal,
              deleteHandler: () => deleteHandler(triggerOpenModal),
            },
            { hasClose: false },
          );
          setTriggerOpenModal(null);
        }
        return (
          <Box style={{ width: '100%' }}>
            <Text isTitle type="primary">
              Manage Notifications
            </Text>
            <div>
              <Link to={`${LINK_PREFIX}/createNotification`}>
                <Button>Create Notification</Button>
              </Link>
            </div>
            <Table
              loading={deleteLoading}
              columns={columns}
              data={parsedNotifications}
            />
          </Box>
        );
      }}
    </ModalConsumer>
  );
};

NotificationManagePage.propTypes = {
  notifications: PropTypes.array,
  instances: PropTypes.array,
  deleteLoading: PropTypes.bool,
  deleteHandler: PropTypes.func.isRequired,
};

NotificationManagePage.defaultProps = {
  notifications: null,
  instances: null,
  deleteLoading: false,
};

export default NotificationManagePage;
