import {
  LOAD_EXCHANGE_RATE,
  LOAD_EXCHANGE_RATE_ERROR,
  LOAD_EXCHANGE_RATE_LOADED,
} from './constants';

export function loadExchangeRate(query) {
  return {
    type: LOAD_EXCHANGE_RATE,
    query,
  };
}

export function exchangeRateLoaded(response) {
  return {
    type: LOAD_EXCHANGE_RATE_LOADED,
    response,
  };
}

export function exchangeRateLoadingError(error) {
  return {
    type: LOAD_EXCHANGE_RATE_ERROR,
    error,
  };
}
