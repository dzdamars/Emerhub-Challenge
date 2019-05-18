import { put } from 'redux-saga/effects';
import { exchangeRateLoaded, exchangeRateLoadingError } from '../actions';
import { loadExchangeRateSaga } from '../saga';
import { LOAD_EXCHANGE_RATE } from '../constants';

describe('loadExchangeRateSaga', () => {
  let loadExchangeSagaGenerator;
  const mockAction = {
    type: LOAD_EXCHANGE_RATE,
    query: { base: 'usd' },
  };
  beforeEach(() => {
    loadExchangeSagaGenerator = loadExchangeRateSaga();
    const callDescriptor = loadExchangeSagaGenerator.next(mockAction).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the exchangeRateLoaded action if it requests the data successfully', () => {
    const response = {
      date: '2018-11-19',
      rates: {
        BGN: 1.9558,
      },
      base: 'EUR',
    };
    const putDescriptor = loadExchangeSagaGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(exchangeRateLoaded(response)));
  });

  it('should call the exchangeRateLoadingError action if the response errors', () => {
    const response = 'Some error';
    const putDescriptor = loadExchangeSagaGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(exchangeRateLoadingError(response)));
  });
});
