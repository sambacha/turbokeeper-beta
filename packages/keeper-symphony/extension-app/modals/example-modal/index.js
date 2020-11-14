import React from 'react';
import { Box, Text } from 'symphony-bdk-ui-toolkit';

const ExampleModal = (props) => {
  const { data } = props;
  return (
    <Box>
      <Text isTitle type="primary">Example Modal</Text>
      <Text>A modal to show location routing. Caught the following object:</Text>
      <Text type="secondary">{JSON.stringify(data, null, 2)}</Text>
    </Box>
  );
};

export default ExampleModal;
