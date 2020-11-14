export const ENRICHER_EVENTS = {
  WELCOME_MESSAGE_DIRECT_CHAT: {
    type: 'com.symphony.ms.template.welcomeMessageDirectChat',
    json: {
      message: 'Thank <b>you</b> for using the template app!',
    },
  },
  HELP_COMMAND: {
    type: 'com.symphony.ms.template.helpCommand',
    json: {
      title: 'Bot Commands',
      content: [
        '<b>@botname</b> /help - will display the list of commands',
        '<b>@botname</b> /buy GOOG 1000 - sends a <i>Buy</i> order with ticker symbol and quantity',
        '<b>@botname</b> /sell TSLA 2000 - sends a <i>Sell</i> order with ticker symbol and quantity',
      ],
    },
  },
  NOTIFICATION: {
    type: 'com.symphony.ms.notification',
    json: {
      alert: false,
      title: 'Something Interesting occurred!',
      content: {
        header: 'This is an example of a notification, expand to see more',
        body: 'The BDK comes with ready-to-use message templates that you can use to render messages with your own data. You can add you own templates using the extension application.',
      },
      showStatusBar: true,
      comment: {
        body: 'so interesting!',
      },
      description: 'this is a brief description',
      assignee: {
        displayName: 'John Doe',
      },
      type: {
        name: 'sample',
      },
      status: {
        name: 'Awesome',
      },
      priority: {
        name: 'normal',
      },
      labels: [
        {
          text: 'Example',
        },
        {
          text: 'BDK',
        },
        {
          text: 'MS',
        },
      ],
    },
  },
  EXTENDED_CARD: {
    type: 'com.symphony.ms.testingEntity',
    json: {
      extraContent: 'This is an other content that\'s in the entities.js file',
      link: {
        url: 'https://google.com',
        content: 'Click here for google!',
      },
    },
  },
  CURRENCY_QUOTE: {
    type: 'com.symphony.ms.currencyQuote',
    json: {
      from: 'USD',
      to: 'EUR',
      rate: 0.9124,
    },
  },
};

export const MODAL_IDS = {
  EXAMPLE_MODAL: {
    entity: 'example-modal',
    type: 'com.symphony.ms.example-modal',
    entityData: {},
  },
  CURRENCY_QUOTE_MODAL: {
    entity: 'currency-quote',
    type: 'com.symphony.ms.currency-quote-modal',
    entityData: {},
  },
};
