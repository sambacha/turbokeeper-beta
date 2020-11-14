import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, NavTabs, HelpPageBuilder } from 'symphony-bdk-ui-toolkit';
import NotificationPageContainer from 'pages/notification-manage/container';
import InstanceManagePage from 'pages/instance-page';
import instanceImage from 'public/assets/instance.gif';
import notifStep1Image from 'public/assets/n_step1.gif';
import notifStep2Image from 'public/assets/n_step2.gif';
import notifStep3Image from 'public/assets/n_step3.gif';
import { BookBookmark, Bookmark } from 'styled-icons/boxicons-regular';

const StyledBookBookmarkIcon = styled(BookBookmark)`
  width: 32px;
  height: 32px;
  color: ${({ theme }) => theme.colors.primary_500};
`;

const StyledBookmarkIcon = styled(Bookmark)`
  width: 32px;
  height: 32px;
  color: ${({ theme }) => theme.colors.primary_500};
`;

const PAGE_DATA_TWO_LEVELS = {
  title: 'Help page',
  description: 'this is a two levels help Page, it has topics, sub-topic and contents',
  topics: [
    {
      title: 'How to create an Instance',
      description: 'how to create an Mocked Instance',
      icon: <StyledBookBookmarkIcon size={32} />,
      topics: [
        {
          id: '0_1',
          title: 'Creating an Instance',
          description: 'A guide on how to create an Instnace',
          icon: <StyledBookmarkIcon />,
          contents: [
            {
              title: 'Step 1',
              description: 'Go to the Manage Notifications Tab',
              imageUrl: notifStep1Image,
            },
            {
              title: 'Step 2',
              description: 'Click the Create Notification button',
              imageUrl: notifStep2Image,
            },
            {
              title: 'Step 3',
              description: 'On the Create Notification page fill the form and press Create',
              imageUrl: notifStep3Image,
            },
          ],
        },
      ],
    },
    {
      id: '1_0',
      title: 'How to List Instances',
      description: 'A guide on how to list Active Instances',
      icon: <StyledBookBookmarkIcon size={32} />,
      contents: [
        {
          title: 'Step 1',
          description: 'Go to the Instances Tab',
          imageUrl: instanceImage,
        },
      ],
      relatedContent: [
        {
          id: '0_1',
          title: 'How to create an Instance',
        },
      ],
    },
  ],
};

const MainPage = (props) => {
  const { instances, chosenTab } = props;

  return (
    <Box space={20}>
      <Box horizontal space={60} style={{ maxWidth: '50rem' }}>
        <NavTabs activeTab={chosenTab}>
          <div label="Instances">
            <InstanceManagePage instances={instances} />
          </div>
          <div label="Notifications">
            <NotificationPageContainer instances={instances} />
          </div>
          <div label="Help" align="right">
            <HelpPageBuilder config={PAGE_DATA_TWO_LEVELS} />
          </div>
        </NavTabs>
      </Box>
    </Box>
  );
};

MainPage.propTypes = {
  instances: PropTypes.array,
  chosenTab: PropTypes.number,
};

MainPage.defaultProps = {
  instances: null,
  chosenTab: 0,
};

export default MainPage;
