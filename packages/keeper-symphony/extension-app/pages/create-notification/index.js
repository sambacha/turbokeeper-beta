import React, { useState } from 'react';
import {
  Box,
  FormBox,
  Text,
  FormGroup,
  DecisionDropdown,
  Label,
  InputField,
  Button,
} from 'symphony-bdk-ui-toolkit';
import { Link } from 'react-router-dom';
import { setupLinkPrefix } from 'utils/system/setup-url';

const LINK_PREFIX = setupLinkPrefix();

const CreateNotificationPage = (props) => {
  const {
    instances, submitHandler, loading, editingNotification,
  } = props;
  const getInstanceFromId = () => {
    const foundInstance = instances.find(el => el.id === editingNotification.instanceId);
    if (!foundInstance) { return null; }
    return {
      label: foundInstance.name,
      value: foundInstance.id,
    };
  };

  const [chosenInstance, setChosenInstance] = useState(
    editingNotification ? getInstanceFromId() : null,
  );
  const [notificationName, setNotificationName] = useState(
    editingNotification ? editingNotification.name : null,
  );
  const parsedInstances = instances.map(el => ({
    value: el.id,
    label: el.name,
  }));

  const disableSubmit = !chosenInstance || !notificationName;
  return (
    <Box style={{ maxWidth: '30rem', marginTop: '60px' }}>
      <Text isTitle type="primary">
        {editingNotification
          ? `Edit notification "${editingNotification.name}"`
          : 'Create'}{' '}
        Notification
      </Text>
      <FormBox>
        <FormGroup>
          <Label>Choose Instance</Label>
          <DecisionDropdown
            value={chosenInstance}
            onChange={e => setChosenInstance(e)}
            data={parsedInstances}
          />
        </FormGroup>
        <FormGroup>
          <Label>Notification Name</Label>
          <InputField
            value={notificationName}
            onChange={e => setNotificationName(e.target.value)}
          />
        </FormGroup>
      </FormBox>
      <Box horizontal justify="flex-end" align="flex-end">
        <Link to={`${LINK_PREFIX}/home/1`}>
          <Button fill="outlined">Cancel</Button>
        </Link>
        <Button
          loading={loading}
          disabled={disableSubmit}
          onClick={() => (editingNotification
            ? submitHandler({
              ...editingNotification,
              instanceId: chosenInstance.value,
              name: notificationName,
            })
            : submitHandler({
              instanceId: chosenInstance.value,
              name: notificationName,
            }))
          }
        >
          {editingNotification ? 'Update' : 'Create'}
        </Button>
      </Box>
    </Box>
  );
};

export default CreateNotificationPage;
