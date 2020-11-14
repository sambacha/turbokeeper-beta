import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Table } from 'symphony-bdk-ui-toolkit';

const columns = [
  {
    header: 'Name',
    accessor: 'name',
  }, {
    header: 'URL',
    accessor: 'url',
  }, {
    sortable: false,
    acessor: null,
    width: 50,
    hasActions: true,
  },
];

const InstanceManagePage = (props) => {
  const { instances } = props;

  return (
    <Box style={{ width: '100%' }}>
      <Text isTitle>Manage Instances</Text>
      <Table columns={columns} data={instances} />
    </Box>
  );
};

InstanceManagePage.propTypes = {
  instances: PropTypes.array,
};

InstanceManagePage.defaultProps = {
  instances: null,
};

export default InstanceManagePage;
