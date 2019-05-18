/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const makeSelectExchangeRateData = () =>
  createSelector(selectGlobal, globalState =>
    globalState.getIn(['exchangeRate', 'data']),
  );

const makeSelectExchangeRateLoading = () =>
  createSelector(selectGlobal, globalState =>
    globalState.getIn(['exchangeRate', 'loading']),
  );

const makeSelectExchangeRateLoaded = () =>
  createSelector(selectGlobal, globalState =>
    globalState.getIn(['exchangeRate', 'loaded']),
  );

const makeSelectExchangeRateError = () =>
  createSelector(selectGlobal, globalState =>
    globalState.getIn(['exchangeRate', 'error']),
  );

export {
  makeSelectExchangeRateData,
  makeSelectExchangeRateLoading,
  makeSelectExchangeRateLoaded,
  makeSelectExchangeRateError,
};
