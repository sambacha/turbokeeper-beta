/* global SYMPHONY */

import React, { useEffect, useState } from 'react';
import Styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setupLinkPrefix } from 'utils/system/setup-url';
import { getJWTFromSymphony } from 'reducers/users/actions';
import {
  THEME_TYPES,
  Loader,
  ToasterProvider,
  ModalProvider,
  ModalRoot,
} from 'symphony-bdk-ui-toolkit';
import ToastConnector from 'components/toast-connector';
import { PROJECT_THEMES } from '../utils/themes/PROJECT_THEMES';
import LocationRouter from './location-router';
import MainPageContainer from './main-page/container';
import CreateNotificationContainer from './create-notification/container';

const LINK_PREFIX = setupLinkPrefix();

const LoadContainer = Styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ContainerWrapper = Styled.div`
  max-width: 100%;
  margin: 0px 21px;
`;

const getFontSize = ({ theme }) => {
  switch (theme.size) {
    case 'xsmall':
      return '12px';
    case 'small':
      return '13px';
    case 'large':
      return '17px';
    default:
      return '14px';
  }
};
const GlobalChanger = createGlobalStyle`
  html {
    font-size: ${props => getFontSize(props)};
  }

  body {
    background-color: ${({ theme }) => theme.colors.mainbackground};
  }
`;

const Routes = (props) => {
  const [currentTheme, setTheme] = useState(PROJECT_THEMES[0]);

  const setThemeProps = () => {
    const isDark = window.themeColor
      ? window.themeColor === THEME_TYPES.DARK
      : false;
    setTheme(
      isDark
        ? { ...PROJECT_THEMES[1], size: window.themeSize }
        : { ...PROJECT_THEMES[0], size: window.themeSize },
    );
    document.body.className = `symphony-external-app ${window.themeColor.toLowerCase()} ${
      window.themeSize
    }`;
  };

  useEffect(() => {
    const { actions, jwtService } = props;
    actions.getJWTFromSymphony(jwtService);
  }, []);

  useEffect(() => {
    const uiService = SYMPHONY.services.subscribe('ui');

    uiService.listen('themeChangeV2', () => {
      SYMPHONY.remote.hello().then((theme) => {
        const themeSize = theme.themeV2.size;
        const themeColor = theme.themeV2.name;
        const appTheme = themeColor.toUpperCase() === THEME_TYPES.DARK
          ? THEME_TYPES.DARK
          : themeColor.toUpperCase() === THEME_TYPES.LIGHT
            ? THEME_TYPES.LIGHT
            : THEME_TYPES.LIGHT;
        window.themeColor = appTheme;
        window.themeSize = themeSize;
        setThemeProps();
      });
    });

    setThemeProps();
  }, [window.themeColor, window.themeSize]);

  const { jwt } = props;
  const Default = () => <Redirect to={`${LINK_PREFIX}/app.html`} />;

  if (jwt) {
    if (jwt === 'loading') {
      return (
        <ThemeProvider theme={currentTheme}>
          <LoadContainer>
            <Loader />
          </LoadContainer>
        </ThemeProvider>
      );
    }

    return (
      <ContainerWrapper>
        <ThemeProvider theme={currentTheme}>
          <GlobalChanger />
          <ToasterProvider>
            <ModalProvider>
              <ModalRoot />
              <BrowserRouter>
                <Switch>
                  <Route
                    exact
                    path={`${LINK_PREFIX}/app.html`}
                    component={LocationRouter}
                  />
                  <Route
                    exact
                    path={`${LINK_PREFIX}/home/:tab`}
                    component={MainPageContainer}
                  />
                  <Route
                    exact
                    path={`${LINK_PREFIX}/createNotification`}
                    component={CreateNotificationContainer}
                  />
                  <Route
                    exact
                    path={`${LINK_PREFIX}/editNotification`}
                    component={CreateNotificationContainer}
                  />
                  <Route component={Default} />
                </Switch>
              </BrowserRouter>
              <ToastConnector />
            </ModalProvider>
          </ToasterProvider>
        </ThemeProvider>
      </ContainerWrapper>
    );
  }

  return <p>JWT Error</p>;
};

Routes.propTypes = {
  jwt: PropTypes.string,
};

Routes.defaultProps = {
  jwt: 'loading',
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getJWTFromSymphony }, dispatch),
});

const mapStateToProps = state => ({
  jwt: state.user.jwt,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Routes);
