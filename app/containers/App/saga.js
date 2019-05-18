import { call, put, takeLatest } from 'redux-saga/effects';
import { getBasic } from 'utils/request';
import { EXCHANGE_RATE_API, LOAD_EXCHANGE_RATE } from './constants';
import { exchangeRateLoaded, exchangeRateLoadingError } from './actions';
export function* loadExchangeRateSaga(action) {
  try {
    const json = yield call(getBasic, EXCHANGE_RATE_API, action.query);
    yield put(exchangeRateLoaded(json));
  } catch (err) {
    yield put(exchangeRateLoadingError(err));
  }
}

export default function* genericWatch() {
  yield takeLatest(LOAD_EXCHANGE_RATE, loadExchangeRateSaga);
}
