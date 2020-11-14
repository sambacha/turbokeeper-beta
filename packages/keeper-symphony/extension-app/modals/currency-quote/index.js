import React, { useState } from 'react';
import {
  Text, Box, InputField, FormBox, FormGroup, Button,
} from 'symphony-bdk-ui-toolkit';
import { ExchangeAlt } from 'styled-icons/fa-solid';
import styled from 'styled-components';

const StyledExchangedIcon = styled(ExchangeAlt)`
  font-size: 16;
  margin-left: 10px;
`;

const CurrencyQuoteModal = () => {
  const [value, setValue] = useState(null);
  const inputError = value === null || value >= 1 ? null : 'error';
  return (
    <Box horizontal type="primary" align="center" style={{ height: '100%' }}>
      <Box>
        <Text isTitle>How much would you like to buy?</Text>
      </Box>
      <FormBox>
        <FormGroup>
          <InputField
            type="number"
            value={value}
            onChange={e => setValue(e.target.value)}
            label="Amount"
            errorMessage="The amount must be greater than one"
            inputState={inputError}
          />
        </FormGroup>
        <Box horizontal align="end">
          <Button>
            <Box horizontal space={10}>
              <Text style={{ fontWeight: 'inherit', color: 'inherit' }}>Buy</Text>
              <StyledExchangedIcon size={16} />
            </Box>
          </Button>
        </Box>
      </FormBox>
    </Box>
  );
};

export default CurrencyQuoteModal;
