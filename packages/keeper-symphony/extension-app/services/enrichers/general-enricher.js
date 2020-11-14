/* global SYMPHONY */
import { openModal } from 'services/modal-service';
import { frontendURL, setupLinkPrefix } from 'utils/system/setup-url';
import { SmsRenderer } from 'sms-sdk-renderer-node';
import { CURRENCY_LOOKUP } from 'utils/helpers/currency-lookup';
import { ENRICHER_EVENTS, MODAL_IDS } from './entities';
import AlertTest from './templates/base/alert-test-body.hbs';
import LinkTemplate from './templates/text/link.hbs';
import MyTemplate from './templates/base/custom-template.hbs';
import CurrencyQuote from './templates/base/currency-quote.hbs';
import ActionButton from './templates/components/action-button.hbs';
import FlagTemplate from './templates/components/flag.hbs';
import { FLAG_CODES } from './templates/components/flag-position';

const LINK_PREFIX = setupLinkPrefix();
const FRONTEND_SERVE_URL = frontendURL();

const CUSTOM_TEMPLATE_NAMES = {
  MY_TEMPLATE: 'my-template',
  CURRENCY_QUOTE: 'currency-quote',
};

const partials = {
  'alert-test': AlertTest,
  link: LinkTemplate,
  'action-button': ActionButton,
  flag: FlagTemplate,
};

const customTemplates = {
  [CUSTOM_TEMPLATE_NAMES.MY_TEMPLATE]: MyTemplate,
  [CUSTOM_TEMPLATE_NAMES.CURRENCY_QUOTE]: CurrencyQuote,
};

export default class GeneralEnricher {
  constructor(name) {
    this.name = name;
    this.messageEvents = Object.keys(ENRICHER_EVENTS).map(
      key => ENRICHER_EVENTS[key].type,
    );
    this.implements = ['render', 'action'];
    SmsRenderer.register(partials, customTemplates);
  }

  static getMessages() {
    return Object.keys(ENRICHER_EVENTS).map(key => ENRICHER_EVENTS[key].type);
  }

  getName() {
    return this.name;
  }

  init() {
    SYMPHONY.services.make(this.name, this, this.implements, true);
  }

  register() {
    const entity = SYMPHONY.services.subscribe('entity');
    this.messageEvents.forEach((element) => {
      entity.registerRenderer(element, {}, this.name);
    });
  }

  render(type, entity) {
    let data = {};
    if (entity.id) {
      data = typeof entity.id === 'object' ? entity.id : JSON.parse(entity.id);
    } else if (entity.payload) {
      data = typeof entity.payload === 'object'
        ? entity.payload
        : JSON.parse(entity.payload);
    }

    let actionData = {};
    let template;
    let from;
    let to;
    switch (type) {
      case ENRICHER_EVENTS.NOTIFICATION.type:
        template = SmsRenderer.renderAppMessage(
          {
            alert: data.alert,
            title: data.title,
            content: data.content,
            showStatusBar: data.showStatusBar,
            comment: data.comment,
            description: data.description,
            assignee: data.assignee,
            type: data.type,
            status: data.status,
            priority: data.priority,
            labels: data.labels,
          },
          SmsRenderer.smsTypes.NOTIFICATION,
        );
        break;
      case ENRICHER_EVENTS.HELP_COMMAND.type:
        template = SmsRenderer.renderAppMessage(
          {
            title: data.title,
            content: data.content,
          },
          SmsRenderer.smsTypes.LIST,
        );
        break;
      case ENRICHER_EVENTS.WELCOME_MESSAGE_DIRECT_CHAT.type:
        template = SmsRenderer.renderAppMessage(
          {
            title: 'Welcome!',
            description: data.message,
          },
          SmsRenderer.smsTypes.INFORMATION,
        );
        break;
      case ENRICHER_EVENTS.EXTENDED_CARD.type:
        template = SmsRenderer.renderAppMessage(
          {
            title: 'My custom entity editor',
            link: data.link,
            extraContent: data.extraContent,
          },
          CUSTOM_TEMPLATE_NAMES.MY_TEMPLATE,
        );
        break;
      case ENRICHER_EVENTS.CURRENCY_QUOTE.type:
        actionData = GeneralEnricher.actionFactory(
          [
            {
              id: 'Buy',
              service: this.name,
              type: MODAL_IDS.CURRENCY_QUOTE_MODAL.type,
              entityData: data,
              label: 'Buy',
            },
          ],
          this.name,
          MODAL_IDS.CURRENCY_QUOTE_MODAL.entity,
        );

        from = data.from.toUpperCase();
        to = data.to.toUpperCase();

        template = SmsRenderer.renderAppMessage(
          {
            header: {
              ...data,
              from,
              from_flag: FLAG_CODES[CURRENCY_LOOKUP[from].flag],
              from_name: CURRENCY_LOOKUP[from].name,
              to,
              to_flag: FLAG_CODES[CURRENCY_LOOKUP[to].flag],
              to_name: CURRENCY_LOOKUP[to].name,
              rate: data.rate,
            },
            buttons: [{ buttonId: 'Buy' }],
          },
          CUSTOM_TEMPLATE_NAMES.CURRENCY_QUOTE,
        );

        break;
      default:
        template = `<messageML><p>No template found for this message entity</p><br />Caught: ${type}</messageML>`;
        break;
    }

    return {
      template,
      data: actionData,
    };
  }

  action(data) {
    switch (data.type) {
      case MODAL_IDS.EXAMPLE_MODAL.type:
        openModal(
          MODAL_IDS.EXAMPLE_MODAL.entity,
          this.name,
          `${FRONTEND_SERVE_URL}${LINK_PREFIX}`,
          '560px',
          { page: MODAL_IDS.EXAMPLE_MODAL.entity, data },
        );
        break;
      case MODAL_IDS.CURRENCY_QUOTE_MODAL.type:
        openModal(
          MODAL_IDS.CURRENCY_QUOTE_MODAL.entity,
          this.name,
          `${FRONTEND_SERVE_URL}${LINK_PREFIX}`,
          '260px',
          { page: MODAL_IDS.CURRENCY_QUOTE_MODAL.entity, data },
        );
        break;
      default:
        openModal(
          'noEntityDialog',
          this.name,
          `${FRONTEND_SERVE_URL}${LINK_PREFIX}`,
          '300px',
          { page: 'error' },
        );
        break;
    }
  }

  static actionFactory(actions, service, entity) {
    return actions.reduce((result, action) => {
      const actionObj = {};
      const actionId = action.id || action.type;

      const actionData = {
        service,
        label: action.label,
        data: {
          entity,
          service: action.service,
          type: action.type,
          entityData: action.entityData,
        },
      };

      actionObj[actionId] = actionData;
      return Object.assign(result, actionObj);
    }, {});
  }
}
