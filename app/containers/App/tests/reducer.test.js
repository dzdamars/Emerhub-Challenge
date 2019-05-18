import { fromJS } from 'immutable';
import AppReducer from '../reducer';
import {
  loadExchangeRate,
  exchangeRateLoaded,
  exchangeRateLoadingError,
} from '../actions';

describe('AppReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      exchangeRate: {
        data: {},
        loading: false,
        loaded: false,
        error: false,
      },
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(AppReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the loadExchangeRate action correctly', () => {
    const query = { base: 'usd' };
    const expectedResult = state
      .setIn(['exchangeRate', 'loading'], true)
      .setIn(['exchangeRate', 'loaded'], false)
      .setIn(['exchangeRate', 'error'], false);

    expect(AppReducer(state, loadExchangeRate(query))).toEqual(expectedResult);
  });

  it('should handle the exchangeRateLoaded action correctly', () => {
    const response = {
      date: '2018-11-19',
      rates: {
        BGN: 1.9558,
      },
      base: 'EUR',
    };
    let currencyList = [];
    if (response.rates) {
      Object.keys(response.rates).map(item => {
        currencyList = [
          ...currencyList,
          {
            text: item,
            value: item,
          },
        ];
        return true;
      });
    }
    const newResponse = {
      ...response,
      currencyList,
    };
    const expectedResult = state
      .setIn(['exchangeRate', 'data'], newResponse)
      .setIn(['exchangeRate', 'loading'], false)
      .setIn(['exchangeRate', 'loaded'], true)
      .setIn(['exchangeRate', 'error'], false);

    expect(AppReducer(state, exchangeRateLoaded(response))).toEqual(
      expectedResult,
    );
  });

  it('should handle the exchangeRateLoadingError action correctly', () => {
    const error = 'err';
    const expectedResult = state
      .setIn(['exchangeRate', 'loaded'], false)
      .setIn(['exchangeRate', 'loading'], false)
      .setIn(['exchangeRate', 'error'], error);

    expect(AppReducer(state, exchangeRateLoadingError(error))).toEqual(
      expectedResult,
    );
  });
});
