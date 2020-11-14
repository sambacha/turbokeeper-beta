import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ToasterConsumer } from 'symphony-bdk-ui-toolkit';
import { connect } from 'react-redux';

const ToastConnector = (props) => {
  const {
    type, message,
  } = props;

  const [hasMessage, setHasMessage] = useState(false);

  useEffect(() => {
    if (message && type) {
      setHasMessage(true);
    }
  }, [message, type]);

  return (
    <ToasterConsumer>
      {(context) => {
        if (hasMessage) {
          context.showToast({ message, type });
          setHasMessage(false);
        }
        return null;
      }}
    </ToasterConsumer>
  );
};

ToastConnector.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};

ToastConnector.defaultProps = {
  type: null,
  message: null,
};

const mapDispatchToProps = () => ({});

const mapStateToProps = state => ({
  message: state.toast.message,
  type: state.toast.type,
});

export default connect(mapStateToProps, mapDispatchToProps)(ToastConnector);
