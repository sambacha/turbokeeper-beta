import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getInstances } from 'reducers/instances/actions';
import { Loader, Box } from 'symphony-bdk-ui-toolkit';
import MainPage from '.';

const MainPageContainer = (props) => {
  const {
    loading, instances, actions, match,
  } = props;
  let chosenTab = 0;
  if (match) {
    chosenTab = parseInt(match.params.tab, 10);
  }

  useEffect(() => {
    if (!instances) {
      actions.getInstances();
    }
  }, []);

  if (loading) {
    return <Box horizontal><Loader /></Box>;
  }

  return (<MainPage instances={instances} chosenTab={chosenTab} />);
};

MainPageContainer.propTypes = {
  loading: PropTypes.bool,
  instances: PropTypes.array,
  actions: PropTypes.object.isRequired,
  match: PropTypes.object,
};

MainPageContainer.defaultProps = {
  loading: false,
  instances: null,
  match: null,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getInstances }, dispatch),
});

const mapStateToProps = state => ({
  loading: state.instances.loading,
  instances: state.instances.instances,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPageContainer);
