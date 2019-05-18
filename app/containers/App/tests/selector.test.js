import { fromJS } from 'immutable';

import {
  makeSelectExchangeRateLoaded,
  makeSelectExchangeRateData,
  makeSelectExchangeRateError,
  makeSelectExchangeRateLoading,
} from '../selectors';

describe('makeSelectExchangeRateData', () => {
  const exchangeRateDataSelector = makeSelectExchangeRateData();
  it('should select the exchange rate data', () => {
    const data = fromJS([]);
    const mockedState = fromJS({
      global: {
        exchangeRate: {
          data,
        },
      },
    });
    expect(exchangeRateDataSelector(mockedState)).toEqual(data);
  });
});

describe('makeSelectExchangeRateError', () => {
  const errorSelector = makeSelectExchangeRateError();
  it('should select the error', () => {
    const error = 404;
    const mockedState = fromJS({
      global: {
        exchangeRate: {
          error,
        },
      },
    });
    expect(errorSelector(mockedState)).toEqual(error);
  });
});

describe('makeSelectExchangeRateLoading', () => {
  const loadingSelector = makeSelectExchangeRateLoading();
  it('should select the loading', () => {
    const loading = false;
    const mockedState = fromJS({
      global: {
        exchangeRate: {
          loading,
        },
      },
    });
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectExchangeRateLoaded', () => {
  const loadingSelector = makeSelectExchangeRateLoaded();
  it('should select the loaded', () => {
    const loaded = true;
    const mockedState = fromJS({
      global: {
        exchangeRate: {
          loaded,
        },
      },
    });
    expect(loadingSelector(mockedState)).toEqual(loaded);
  });
});
