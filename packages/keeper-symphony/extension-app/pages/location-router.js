import React from 'react';
import ExampleModal from 'modals/example-modal';
import MainPageContainer from './main-page/container';
import CurrencyQuoteModal from '../modals/currency-quote';
import { MODAL_IDS } from '../services/enrichers/entities';

const INNER_QUERY = 'queryObj';

function getInnerQuery(query) {
  if (!query) {
    return { page: 'app' };
  }

  const part = query.split(`${INNER_QUERY}=`);

  return JSON.parse(decodeURIComponent(decodeURIComponent(part[1])));
}

function route() {
  const currentQuery = window.location.href.split('?')[1];
  const queryObj = getInnerQuery(currentQuery);
  const currentPage = queryObj.page || 'app';
  switch (currentPage) {
    case 'config':
    case 'app':
      return <MainPageContainer />;
    case MODAL_IDS.EXAMPLE_MODAL.entity:
      return <ExampleModal data={queryObj.data.entityData} />;
    case MODAL_IDS.CURRENCY_QUOTE_MODAL.entity:
      return <CurrencyQuoteModal />;
    default:
      return <p>Oops! Page error.</p>;
  }
}

const LocationRouter = () => route();

export default LocationRouter;
