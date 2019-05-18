import { fromJS } from 'immutable';
import {
  LOAD_EXCHANGE_RATE,
  LOAD_EXCHANGE_RATE_ERROR,
  LOAD_EXCHANGE_RATE_LOADED,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  exchangeRate: {
    data: {},
    loading: false,
    loaded: false,
    error: false,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_EXCHANGE_RATE:
      return state
        .setIn(['exchangeRate', 'loading'], true)
        .setIn(['exchangeRate', 'loaded'], false)
        .setIn(['exchangeRate', 'error'], false);
    case LOAD_EXCHANGE_RATE_LOADED: {
      let currencyList = [];
      const { rates } = action.response;
      if (rates) {
        Object.keys(rates).map(item => {
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
        ...action.response,
        currencyList,
      };
      return state
        .setIn(['exchangeRate', 'data'], newResponse)
        .setIn(['exchangeRate', 'loading'], false)
        .setIn(['exchangeRate', 'loaded'], true)
        .setIn(['exchangeRate', 'error'], false);
    }

    case LOAD_EXCHANGE_RATE_ERROR:
      return state
        .setIn(['exchangeRate', 'loaded'], false)
        .setIn(['exchangeRate', 'loading'], false)
        .setIn(['exchangeRate', 'error'], action.error);
    default:
      return state;
  }
}

export default appReducer;
