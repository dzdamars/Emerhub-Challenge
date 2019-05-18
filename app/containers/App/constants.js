/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const EXCHANGE_RATE_API = 'https://api.exchangeratesapi.io/latest';
export const LOAD_EXCHANGE_RATE = 'App/LOAD_EXCHANGE_RATE';
export const LOAD_EXCHANGE_RATE_LOADED = 'App/LOAD_EXCHANGE_RATE_LOADED';
export const LOAD_EXCHANGE_RATE_ERROR = 'App/LOAD_EXCHANGE_RATE_ERROR';
