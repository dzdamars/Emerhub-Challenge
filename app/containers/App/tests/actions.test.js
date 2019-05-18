import {
  LOAD_EXCHANGE_RATE_ERROR,
  LOAD_EXCHANGE_RATE,
  LOAD_EXCHANGE_RATE_LOADED,
} from '../constants';
import {
  exchangeRateLoadingError,
  exchangeRateLoaded,
  loadExchangeRate,
} from '../actions';

describe('App Actions', () => {
  describe('loadExchangeRate', () => {
    it('should return the exchange rate from the provided api', () => {
      const query = { base: 'usd' };
      const expectedResult = {
        type: LOAD_EXCHANGE_RATE,
        query,
      };

      expect(loadExchangeRate(query)).toEqual(expectedResult);
    });
  });

  describe('exchangeRateLoaded', () => {
    it('return true if LOAD_EXCHANGE_RATE successfully executed', () => {
      const response = true;
      const expectedResult = {
        type: LOAD_EXCHANGE_RATE_LOADED,
        response,
      };
      expect(exchangeRateLoaded(response)).toEqual(expectedResult);
    });
  });

  describe('exchangeRateLoadingError', () => {
    it('return error if LOAD_EXCHANGE_RATE fail to be executed or return error', () => {
      const error = 'err';
      const expectedResult = {
        type: LOAD_EXCHANGE_RATE_ERROR,
        error,
      };
      expect(exchangeRateLoadingError(error)).toEqual(expectedResult);
    });
  });
});
